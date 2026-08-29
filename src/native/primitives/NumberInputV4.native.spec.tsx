import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { NumberInputV4 } from './NumberInputV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;
const SIZE = THEME.spacing['2xl'];

function styles(root: ReactTestInstance): Record<string, unknown>[] {
  const out: Record<string, unknown>[] = [];
  const walk = (style: unknown): void => {
    if (!style) return;
    if (Array.isArray(style)) {
      style.forEach(walk);
      return;
    }
    if (typeof style === 'object') out.push(style as Record<string, unknown>);
  };
  root.findAll(() => true).forEach((node) => walk(node.props?.style));
  return out;
}

function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

/** The number field itself. */
function field(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.textAlign === 'center');
}

describe('NumberInputV4 (native)', () => {
  it('gives each stepper a square target at the control height', () => {
    const { getByLabelText } = renderThemed(
      <NumberInputV4 value={3} onChange={() => {}} />,
      SEED_LIGHT
    );
    for (const label of ['Decrease', 'Increase']) {
      const style = getByLabelText(label).props.style as { width: number; height: number };
      expect(style.width).toBe(SIZE);
      expect(style.height).toBe(SIZE);
    }
  });

  it('keeps the value from shuffling the steppers as it grows', () => {
    const { root } = renderThemed(<NumberInputV4 value={3} onChange={() => {}} />, SEED_LIGHT);
    const style = field(root);
    expect(style?.minWidth).toBe(SIZE);
    expect(style?.fontVariant).toEqual(['tabular-nums']);
    expect(style?.height).toBe(SIZE);
  });

  it('rings the whole control when the number takes focus', () => {
    const { root, UNSAFE_getByType } = renderThemed(
      <NumberInputV4 value={3} onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(halo(root)?.backgroundColor).toBe('transparent');
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { TextInput } = require('react-native');
    fireEvent(UNSAFE_getByType(TextInput), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('steps and clamps to the bounds', () => {
    const onValueChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <NumberInputV4 value={9} min={0} max={10} step={5} onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase'));
    expect(onValueChange).toHaveBeenCalledWith(10);
    onValueChange.mockClear();
    fireEvent.press(getByLabelText('Decrease'));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });

  it('prefers the original spelling when both callbacks are passed', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <NumberInputV4 value={1} onValueChange={onValueChange} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByLabelText('Increase'));
    expect(onValueChange).toHaveBeenCalledWith(2);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('disables a stepper at its limit rather than only dimming it', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(
      <NumberInputV4 value={10} min={0} max={10} onChange={onChange} />,
      SEED_LIGHT
    );
    const up = getByLabelText('Increase');
    expect(up.props.accessibilityState).toMatchObject({ disabled: true });
    expect((up.props.style as { opacity: number }).opacity).toBe(V4_STATE.disabledContent);
    fireEvent.press(up);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('ignores an emptied field instead of reporting NaN', () => {
    const onChange = jest.fn();
    const { UNSAFE_getByType } = renderThemed(
      <NumberInputV4 value={3} onChange={onChange} />,
      SEED_LIGHT
    );
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { TextInput } = require('react-native');
    fireEvent.changeText(UNSAFE_getByType(TextInput), '');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('spends no depth on a form control — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(
      <NumberInputV4 value={3} onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
