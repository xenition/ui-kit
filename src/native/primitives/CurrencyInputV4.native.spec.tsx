import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { CurrencyInputV4 } from './CurrencyInputV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

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

function shell(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.minHeight === THEME.spacing['2xl'] && s.borderWidth === 1);
}

describe('CurrencyInputV4 (native)', () => {
  it('is a field like the others, on the shared V4 metrics', () => {
    const { root } = renderThemed(<CurrencyInputV4 />, SEED_LIGHT);
    const style = shell(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('sets the amount in tabular figures, right aligned', () => {
    const { getByLabelText } = renderThemed(<CurrencyInputV4 />, SEED_LIGHT);
    const style = getByLabelText('Amount').props.style as {
      fontVariant: string[];
      textAlign: string;
    };
    expect(style.fontVariant).toEqual(['tabular-nums']);
    expect(style.textAlign).toBe('right');
  });

  it('rings the whole field — symbol included — when the amount takes focus', () => {
    const { root, getByLabelText } = renderThemed(<CurrencyInputV4 />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByLabelText('Amount'), 'focus');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
    expect(shell(root)?.borderColor).toBe(THEME.light.primary);
    fireEvent(getByLabelText('Amount'), 'blur');
    expect(halo(root)?.backgroundColor).toBe('transparent');
  });

  it('keeps the currency as context and the number as content', () => {
    const { getByText, getByLabelText } = renderThemed(
      <CurrencyInputV4 symbol="£" />,
      SEED_LIGHT
    );
    expect((getByText('£').props.style as { color: string }).color).toBe(THEME.light.muted);
    expect((getByLabelText('Amount').props.style as { color: string }).color).toBe(
      THEME.light.onSurface
    );
  });

  it('turns the border and the ring danger from one flag', () => {
    const { root, getByLabelText } = renderThemed(<CurrencyInputV4 invalid />, SEED_LIGHT);
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
    fireEvent(getByLabelText('Amount'), 'focus');
    expect(shell(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('reports the parsed number, and null when it is cleared', () => {
    const onChange = jest.fn();
    const { getByLabelText } = renderThemed(<CurrencyInputV4 onChange={onChange} />, SEED_LIGHT);
    fireEvent.changeText(getByLabelText('Amount'), '12.50');
    expect(onChange).toHaveBeenCalledWith(12.5);
    fireEvent.changeText(getByLabelText('Amount'), '');
    expect(onChange).toHaveBeenCalledWith(null);
  });

  it('keeps the base parsing contract: one point, capped to precision', () => {
    const { getByLabelText } = renderThemed(<CurrencyInputV4 precision={2} />, SEED_LIGHT);
    fireEvent.changeText(getByLabelText('Amount'), '1.2.345x');
    expect(getByLabelText('Amount').props.value).toBe('1.23');
  });

  it('dims and blocks when disabled', () => {
    const { root, getByLabelText } = renderThemed(<CurrencyInputV4 disabled />, SEED_LIGHT);
    expect(shell(root)?.opacity).toBe(V4_STATE.disabledContent);
    expect(getByLabelText('Amount').props.accessibilityState).toMatchObject({ disabled: true });
  });

  it('spends no depth on an amount — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(<CurrencyInputV4 />, SEED_LIGHT);
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
