import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { chartSeries } from '../../primitives/internal/v4-chart';
import { MiniBarV4 } from './MiniBarV4';

/** Flatten a possibly-nested RN `style` into one object. */
function flat(style: unknown): Record<string, unknown> {
  const merged: Record<string, unknown> = {};
  const walk = (s: unknown): void => {
    if (!s) return;
    if (Array.isArray(s)) {
      s.forEach(walk);
      return;
    }
    if (typeof s === 'object') Object.assign(merged, s as Record<string, unknown>);
  };
  walk(style);
  return merged;
}

/** Every node carrying an `accessibilityLabel`, in tree order. */
function labels(root: ReactTestInstance): string[] {
  return root
    .findAll((n) => typeof n.props?.accessibilityLabel === 'string')
    .map((n) => n.props.accessibilityLabel as string);
}

/** The five derived slots for the light seed. */
function slots(): string[] {
  const tokens = toNativeTokens(compileTheme(SEED_LIGHT));
  return chartSeries(tokens.ramps.primary[500] as string, 'light');
}

describe('MiniBarV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);
  const light = theme.light;
  const tokens = toNativeTokens(theme);

  // ── §5 Group A: a mark, no chrome ───────────────────────────────────

  it('renders a track with a fill inside it, and prints nothing', () => {
    const { getByTestId } = renderThemed(<MiniBarV4 value={40} />, SEED_LIGHT);
    const track = getByTestId('minibar-track');
    const fill = getByTestId('minibar-fill');
    expect(track).toBeTruthy();
    expect(flat(fill.props.style).width).toBe('40%');
    // A mark carries no title, no legend and no axis.
    expect(track.findAll((n) => n.type === 'Text').length).toBe(0);
  });

  // ── §1 rules 1–2, §3.3: the palette and the chrome ──────────────────

  it('paints the track from the derived neutral, not from `border`', () => {
    const { getByTestId } = renderThemed(<MiniBarV4 value={40} />, SEED_LIGHT);
    const bg = flat(getByTestId('minibar-track').props.style).backgroundColor;
    expect(bg).not.toBe(light.border);
    // `onSurface` mixed into the page, so it follows the theme with no rule.
    expect(String(bg)).toMatch(/^rgba\(/);
  });

  it('paints the fill from slot 1 by default, never `colors.primary`', () => {
    const { getByTestId } = renderThemed(<MiniBarV4 value={40} />, SEED_LIGHT);
    const bg = flat(getByTestId('minibar-fill').props.style).backgroundColor;
    expect(bg).toBe(slots()[0]);
    expect(bg).not.toBe(light.primary);
  });

  it('takes another slot when told to, and a status hue only via `tone`', () => {
    const slotted = renderThemed(<MiniBarV4 value={40} slot={3} />, SEED_LIGHT);
    expect(flat(slotted.getByTestId('minibar-fill').props.style).backgroundColor).toBe(slots()[3]);

    const toned = renderThemed(<MiniBarV4 value={90} max={80} tone="danger" />, SEED_LIGHT);
    expect(flat(toned.getByTestId('minibar-fill').props.style).backgroundColor).toBe(light.danger);
  });

  it('throws past the fifth slot rather than cycling (§1 rule 4)', () => {
    expect(() => renderThemed(<MiniBarV4 value={1} slot={5} />, SEED_LIGHT)).toThrow(
      /never cycled/
    );
  });

  it('takes its height from the spacing scale, and still accepts an override', () => {
    const auto = renderThemed(<MiniBarV4 value={40} />, SEED_LIGHT);
    expect(flat(auto.getByTestId('minibar-track').props.style).height).toBe(tokens.spacing.sm);

    const explicit = renderThemed(<MiniBarV4 value={40} height={6} />, SEED_LIGHT);
    expect(flat(explicit.getByTestId('minibar-track').props.style).height).toBe(6);
  });

  it('is a pill at both ends — a meter, not a bar on an axis (§4.4)', () => {
    const { getByTestId } = renderThemed(<MiniBarV4 value={40} />, SEED_LIGHT);
    expect(flat(getByTestId('minibar-track').props.style).borderRadius).toBe(tokens.radius.full);
    expect(flat(getByTestId('minibar-fill').props.style).borderRadius).toBe(tokens.radius.full);
  });

  // ── §4.5: the degenerate inputs ─────────────────────────────────────

  it('renders the empty track at full footprint when the value is zero', () => {
    const { getByTestId } = renderThemed(<MiniBarV4 value={0} />, SEED_LIGHT);
    expect(getByTestId('minibar-track')).toBeTruthy();
    expect(flat(getByTestId('minibar-fill').props.style).width).toBe('0%');
  });

  it('does not divide by zero when `max` is zero, negative or not a number', () => {
    for (const max of [0, -10, Number.NaN, Number.POSITIVE_INFINITY]) {
      const { getByTestId } = renderThemed(<MiniBarV4 value={5} max={max} />, SEED_LIGHT);
      expect(String(flat(getByTestId('minibar-fill').props.style).width)).not.toMatch(
        /NaN|Infinity/
      );
    }
  });

  it('clamps a non-finite or out-of-range value rather than emitting `NaN%`', () => {
    const nan = renderThemed(<MiniBarV4 value={Number.NaN} />, SEED_LIGHT);
    expect(flat(nan.getByTestId('minibar-fill').props.style).width).toBe('0%');

    const under = renderThemed(<MiniBarV4 value={-5} />, SEED_LIGHT);
    expect(flat(under.getByTestId('minibar-fill').props.style).width).toBe('0%');

    const over = renderThemed(<MiniBarV4 value={500} />, SEED_LIGHT);
    expect(flat(over.getByTestId('minibar-fill').props.style).width).toBe('100%');
  });

  it('renders the single-datum case — one value at its ceiling — as a full bar', () => {
    const { getByTestId } = renderThemed(<MiniBarV4 value={7} max={7} />, SEED_LIGHT);
    expect(flat(getByTestId('minibar-fill').props.style).width).toBe('100%');
  });

  it('shows the skeleton at the mark’s own footprint while loading', () => {
    const { queryByTestId, toJSON } = renderThemed(
      <MiniBarV4 value={40} loading />,
      SEED_LIGHT
    );
    expect(queryByTestId('minibar-track')).toBeNull();
    expect(toJSON()).toBeTruthy();
  });

  // ── §1 rule 6: it says its value in words ───────────────────────────

  it('derives a sentence, formats it, and takes an override', () => {
    const plain = renderThemed(<MiniBarV4 value={40} max={80} />, SEED_LIGHT);
    expect(labels(plain.root)).toContain('40 of 80');

    const money = renderThemed(
      <MiniBarV4 value={40} max={80} formatValue={(v) => `£${v}`} />,
      SEED_LIGHT
    );
    expect(labels(money.root)).toContain('£40 of £80');

    const custom = renderThemed(
      <MiniBarV4 value={40} accessibilityLabel="Storage, 40 of 100 GB" />,
      SEED_LIGHT
    );
    expect(labels(custom.root)).toContain('Storage, 40 of 100 GB');
  });
});
