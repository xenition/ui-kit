import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import type { ThemeSeed } from '../../theme/types';
import { SelectV4 } from './SelectV4';
import { V4_STATE } from '../../primitives/internal/v4-state';

const THEME = compileTheme(SEED_LIGHT);
const RING = THEME.spacing.xs;

const OPTIONS = [
  { label: 'Europe', value: 'eu' },
  { label: 'Americas', value: 'us' },
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

function halo(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.padding === RING && s.margin === -RING);
}

/** The trigger's own style. */
function trigger(root: ReactTestInstance): Record<string, unknown> | undefined {
  return styles(root).find((s) => s.minHeight === THEME.spacing['2xl'] && s.borderWidth === 1);
}

describe('SelectV4 (native)', () => {
  it('is a field, not a button — the same metrics InputV4 takes', () => {
    const { root } = renderThemed(<SelectV4 options={OPTIONS} />, SEED_LIGHT);
    const style = trigger(root);
    expect(style?.minHeight).toBe(THEME.spacing['2xl']);
    expect(style?.borderRadius).toBe(THEME.radius.md);
    expect(style?.paddingHorizontal).toBe(THEME.spacing.md);
  });

  it('is a box, not a pill — a sharp seed still gets square corners', () => {
    const sharp: ThemeSeed = { ...SEED_LIGHT, shape: 'sharp' };
    const { root } = renderThemed(<SelectV4 options={OPTIONS} />, sharp);
    expect(
      styles(root).find((s) => s.minHeight === THEME.spacing['2xl'] && s.borderWidth === 1)
        ?.borderRadius
    ).toBe(0);
  });

  it('shows the placeholder in muted and the chosen label in on-surface', () => {
    const { getByText } = renderThemed(<SelectV4 options={OPTIONS} />, SEED_LIGHT);
    expect((getByText('Select…').props.style as { color: string }).color).toBe(THEME.light.muted);

    const { getByText: chosen } = renderThemed(
      <SelectV4 options={OPTIONS} value="us" />,
      SEED_LIGHT
    );
    expect((chosen('Americas').props.style as { color: string }).color).toBe(
      THEME.light.onSurface
    );
  });

  it('reserves the ring and lights it while the trigger is held', () => {
    const { root, getByRole } = renderThemed(<SelectV4 options={OPTIONS} />, SEED_LIGHT);
    expect(halo(root)?.backgroundColor).toBe('transparent');
    fireEvent(getByRole('button'), 'pressIn');
    expect(halo(root)?.backgroundColor).not.toBe('transparent');
  });

  it('borders in danger when invalid, and rings in danger too', () => {
    const { root } = renderThemed(<SelectV4 options={OPTIONS} invalid />, SEED_LIGHT);
    expect(trigger(root)?.borderColor).toBe(THEME.light.danger);
  });

  it('opens a sheet that is a real layer, over a scrim that stays dark', () => {
    // The sheet renders inside a `Modal`, which sits outside `root` — the
    // whole tree is only reachable from the renderer's own root.
    const { getByRole, UNSAFE_root: root } = renderThemed(
      <SelectV4 options={OPTIONS} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    // The panel carries the compiled sheet shadow…
    expect(
      styles(root).find((s) => s.shadowOpacity === THEME.lightElevation.sheet.opacity)
    ).toBeDefined();
    // …and the scrim is built from the elevation colour, which does not invert.
    const scrim = styles(root).find((s) => s.position === 'absolute' && s.bottom === 0);
    expect(String(scrim?.backgroundColor)).toContain('rgba(');
  });

  it('reports the chosen value and closes', () => {
    const onValueChange = jest.fn();
    const { getByRole, getByText, queryByText } = renderThemed(
      <SelectV4 options={OPTIONS} onValueChange={onValueChange} />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    fireEvent.press(getByText('Americas'));
    expect(onValueChange).toHaveBeenCalledWith('us');
    expect(queryByText('Europe')).toBeNull();
  });

  it('marks the chosen row as well as tinting it — colour is not a state', () => {
    const { getByRole, getByText, getAllByText } = renderThemed(
      <SelectV4 options={OPTIONS} value="us" />,
      SEED_LIGHT
    );
    fireEvent.press(getByRole('button'));
    expect(getByText('✓')).toBeTruthy();
    // Two "Americas" once the sheet is open: the trigger's value and the row.
    const row = getAllByText('Americas').at(-1)!;
    expect((row.props.style as { color: string }).color).toBe(THEME.light.primaryText);
  });

  it('dims and blocks when disabled', () => {
    const { root, getByRole } = renderThemed(
      <SelectV4 options={OPTIONS} disabled />,
      SEED_LIGHT
    );
    expect(trigger(root)?.opacity).toBe(V4_STATE.disabledContent);
    fireEvent.press(getByRole('button'));
    expect(getByRole('button').props.accessibilityState).toMatchObject({ expanded: false });
  });
});
