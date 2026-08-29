import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { RadioGroupV4 } from './RadioGroupV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

const OPTIONS = [
  { label: 'Monthly', value: 'monthly' },
  { label: 'Yearly', value: 'yearly' },
  { label: 'Never', value: 'never', disabled: true },
];

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

/** The mark's outer circle. */
function marks(root: ReactTestInstance): Record<string, unknown>[] {
  return styles(root).filter((s) => s.width === THEME.spacing.lg && s.borderWidth === 1);
}

describe('RadioGroupV4 (native)', () => {
  it('makes the whole row the target, at a full control height', () => {
    const { getAllByRole } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />,
      SEED_LIGHT
    );
    const rows = getAllByRole('radio');
    expect(rows).toHaveLength(3);
    expect((rows[0]!.props.style as { minHeight: number }).minHeight).toBe(THEME.spacing['2xl']);
  });

  it('reads the label at reading size, not caption size', () => {
    const { getByText } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect((getByText('Monthly').props.style as { fontSize: number }).fontSize).toBe(
      THEME.typography.scale.base
    );
  });

  it('borders the chosen mark in the scheme-resolved brand slot', () => {
    const { root } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />,
      SEED_LIGHT
    );
    const borders = marks(root).map((s) => s.borderColor);
    expect(borders).toContain(THEME.light.primary);
    expect(borders).toContain(THEME.light.border);
  });

  it('reserves the press halo whether or not it is showing, and lights it on hold', () => {
    const { root, getAllByRole } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />,
      SEED_LIGHT
    );
    const halo = (): Record<string, unknown> | undefined =>
      styles(root).find((s) => s.padding === RING && s.margin === -RING);
    expect(halo()?.backgroundColor).toBe('transparent');
    fireEvent(getAllByRole('radio')[0]!, 'pressIn');
    expect(
      styles(root).some(
        (s) => s.padding === RING && s.margin === -RING && s.backgroundColor !== 'transparent'
      )
    ).toBe(true);
  });

  it('reports the chosen value, preferring the original spelling', () => {
    const onValueChange = jest.fn();
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <RadioGroupV4
        options={OPTIONS}
        value="monthly"
        onValueChange={onValueChange}
        onChange={onChange}
      />,
      SEED_LIGHT
    );
    fireEvent.press(getAllByRole('radio')[1]!);
    expect(onValueChange).toHaveBeenCalledWith('yearly');
    expect(onChange).not.toHaveBeenCalled();
  });

  it('dims and blocks a disabled option', () => {
    const onChange = jest.fn();
    const { getAllByRole } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={onChange} />,
      SEED_LIGHT
    );
    const off = getAllByRole('radio')[2]!;
    expect((off.props.style as { opacity: number }).opacity).toBe(V4_STATE.disabledContent);
    fireEvent.press(off);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('spends no depth on a list of choices — no gradient, no shadow', () => {
    const { root, queryByLabelText } = renderThemed(
      <RadioGroupV4 options={OPTIONS} value="monthly" onChange={() => {}} />,
      SEED_LIGHT
    );
    expect(queryByLabelText('linear-gradient')).toBeNull();
    expect(styles(root).find((s) => s.shadowOpacity !== undefined)).toBeUndefined();
  });
});
