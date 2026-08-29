import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { mixToken } from '../../primitives/internal/v4-depth';
import type { ThemeSeed } from '../../theme/types';
import { MultiSelectV4 } from './MultiSelectV4';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

const OPTIONS = [
  { label: 'Design', value: 'design' },
  { label: 'Engineering', value: 'eng' },
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

function trigger(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.minHeight === THEME.spacing['2xl'] && s.borderWidth === 1);
}

describe('MultiSelectV4 (native)', () => {
  it('makes the trigger a field, on the shared V4 metrics', () => {
    const { root } = renderThemed(<MultiSelectV4 options={OPTIONS} />, SEED_LIGHT);
    const style = trigger(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('reserves the ring and lights it while the trigger is held', () => {
    const { root, getByRole } = renderThemed(<MultiSelectV4 options={OPTIONS} />, SEED_LIGHT);
    const halo = (): Record<string, unknown> | undefined =>
      styles(root).find((s) => s.padding === RING && s.margin === -RING);
    expect(halo()?.backgroundColor).toBe('transparent');
    fireEvent(getByRole('button'), 'pressIn');
    expect(halo()?.backgroundColor).not.toBe('transparent');
  });

  it('tints a chip with an opaque brand mix, not the accent slot', () => {
    const { root } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} />,
      SEED_LIGHT
    );
    const expected = mixToken(THEME.light.surface, THEME.light.primary, 0.14);
    const chip = styles(root).find((s) => s.backgroundColor === expected);
    expect(chip).toBeDefined();
    // Never the accent slot, which would put a second brand hue on every chip.
    expect(styles(root).find((s) => s.backgroundColor === THEME.light.accent)).toBeUndefined();
  });

  it('keeps chips square when the seed asked for square', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    const theme = compileTheme(sharp);
    const { root } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} />,
      sharp
    );
    const expected = mixToken(theme.light.surface, theme.light.primary, 0.14);
    expect(styles(root).find((s) => s.backgroundColor === expected)?.borderRadius).toBe(0);
  });

  it('labels a chip in the contrast-safe text form, not the vivid slot', () => {
    const { getByText } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} />,
      SEED_LIGHT
    );
    expect((getByText('Design').props.style as { color: string }).color).toBe(
      THEME.light.primaryText
    );
  });

  it('shows the placeholder when nothing is chosen', () => {
    const { getByText } = renderThemed(<MultiSelectV4 options={OPTIONS} />, SEED_LIGHT);
    expect((getByText('Select…').props.style as { color: string }).color).toBe(THEME.light.muted);
  });

  it('opens a sheet that is a real layer over a scrim that stays dark', () => {
    const { getByRole, UNSAFE_root: root } = renderThemed(
      <MultiSelectV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(
      styles(root).find((s) => s.shadowOpacity === THEME.lightElevation.sheet.opacity)
    ).toBeDefined();
    const scrim = styles(root).find((s) => s.position === 'absolute' && s.bottom === 0);
    expect(String(scrim?.backgroundColor)).toContain('rgba(');
  });

  it('toggles a value in and out, reporting the whole next selection', () => {
    const onChange = jest.fn();
    const { getByRole, getAllByText } = renderThemed(
      <MultiSelectV4 options={OPTIONS} value={['design']} onChange={onChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    fireEvent.press(getAllByText('Engineering').at(-1)!);
    expect(onChange).toHaveBeenCalledWith(['design', 'eng']);

    onChange.mockClear();
    fireEvent.press(getAllByText('Design').at(-1)!);
    expect(onChange).toHaveBeenCalledWith([]);
  });

  it('closes on Done, which says what it does rather than "Submit"', () => {
    const { getByRole, getByLabelText, queryByText } = renderThemed(
      <MultiSelectV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(queryByText('Done')).toBeTruthy();
    fireEvent.press(getByLabelText('Done'));
    expect(queryByText('Done')).toBeNull();
  });

  it('borders in danger when invalid', () => {
    const { root } = renderThemed(<MultiSelectV4 options={OPTIONS} invalid />, SEED_LIGHT);
    expect(trigger(root)?.borderColor).toBe(THEME.light.danger);
  });
});
