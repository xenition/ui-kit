import * as React from 'react';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { toNativeTokens } from '../../theme/outputs';
import { chartSeries } from '../../primitives/internal/v4-chart';
import { TrendCardV4 } from './TrendCardV4';

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

/** The card itself — the one host node carrying the stat's spoken label. */
function cardNode(root: ReactTestInstance, label: string): ReactTestInstance {
  return root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityLabel === label
  )[0] as ReactTestInstance;
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

describe('TrendCardV4 (native)', () => {
  const theme = compileTheme(SEED_LIGHT);
  const light = theme.light;

  // ── §3.2 / layout §4.2: the card ground ─────────────────────────────

  it('paints `colors.card`, not the page colour — the pass’s headline fix', () => {
    const { root } = renderThemed(
      <TrendCardV4 label="Revenue" value="£48,210" />,
      SEED_LIGHT
    );
    const style = flat(cardNode(root, 'Revenue, £48,210').props.style);
    expect(style.backgroundColor).toBe(light.card);
    expect(style.backgroundColor).not.toBe(light.surface);
  });

  // ── the type ramp ───────────────────────────────────────────────────

  it('sets the value as the loudest thing in the block, in tabular figures', () => {
    const { getByText } = renderThemed(
      <TrendCardV4 label="Revenue" value="£48,210" />,
      SEED_LIGHT
    );
    const value = getByText('£48,210');
    const style = flat(value.props.style);
    expect(style.fontSize).toBe(theme.typography.scale['3xl']);
    expect(style.fontWeight).toBe('700');
    expect(style.color).toBe(light.onCard);
    expect(style.fontVariant).toEqual(['tabular-nums']);
  });

  it('sets the label small and calm above it, on the `mutedText` promise', () => {
    const { getByText } = renderThemed(
      <TrendCardV4 label="Revenue" value="£48,210" />,
      SEED_LIGHT
    );
    const style = flat(getByText('Revenue').props.style);
    expect(style.fontSize).toBe(theme.typography.scale.sm);
    // `mutedText`, the slot that carries a contrast promise as ink — not the
    // `muted` FILL the base used as a text colour. On some seeds the compiler
    // resolves the two to the same hex, so the assertion is on the slot the
    // component asked for rather than on the value it happened to get.
    expect(style.color).toBe(light.mutedText);
  });

  // ── §5 Group A: the delta ink, and never colour alone ───────────────

  it('inks the delta from the `*Text` slots, never from the fills', () => {
    const up = renderThemed(
      <TrendCardV4 label="A" value="1" delta="+1%" trend="up" />,
      SEED_LIGHT
    );
    expect(flat(up.getByText('+1%').props.style).color).toBe(light.successText);
    expect(flat(up.getByText('+1%').props.style).color).not.toBe(light.success);

    const down = renderThemed(
      <TrendCardV4 label="A" value="1" delta="-1%" trend="down" />,
      SEED_LIGHT
    );
    expect(flat(down.getByText('-1%').props.style).color).toBe(light.dangerText);

    // `flat` is the value the base had no word for.
    const level = renderThemed(<TrendCardV4 label="A" value="1" delta="0.0%" />, SEED_LIGHT);
    expect(flat(level.getByText('0.0%').props.style).color).toBe(light.mutedText);
  });

  it('pairs the ink with a direction glyph, so colour is never the whole signal', () => {
    const { getByTestId } = renderThemed(
      <TrendCardV4 label="A" value="1" delta="+1%" trend="up" />,
      SEED_LIGHT
    );
    const row = getByTestId('trend-delta');
    // The glyph sits beside the number, in the same `*Text` ink.
    expect(row.findAll((n) => typeof n.type === 'string').length).toBeGreaterThan(1);
  });

  // ── §1 rule 8: a V4 composite composes V4 children ──────────────────

  it('composes SparklineV4, so the mark is on the derived palette', () => {
    const { getAllByTestId } = renderThemed(
      <TrendCardV4 label="A" value="1" data={[1, 4, 2]} />,
      SEED_LIGHT
    );
    expect(getAllByTestId('sparkline-line')[0]?.props.stroke).toBe(slots()[0]);
  });

  it('keeps the trend and the series on two different channels', () => {
    // The delta went down; the plot keeps its slot. A line that changes colour
    // when the last point moves is the identity break the palette forbids.
    const { getAllByTestId, getByText } = renderThemed(
      <TrendCardV4 label="A" value="1" delta="-8%" trend="down" data={[5, 3, 1]} />,
      SEED_LIGHT
    );
    expect(getAllByTestId('sparkline-line')[0]?.props.stroke).toBe(slots()[0]);
    expect(flat(getByText('-8%').props.style).color).toBe(light.dangerText);
  });

  it('lets the plot take a status hue only through `tone`, and another slot', () => {
    const toned = renderThemed(
      <TrendCardV4 label="Errors" value="12" data={[1, 4, 9]} tone="danger" />,
      SEED_LIGHT
    );
    expect(toned.getAllByTestId('sparkline-line')[0]?.props.stroke).toBe(light.danger);

    const slotted = renderThemed(
      <TrendCardV4 label="A" value="1" data={[1, 2]} slot={1} />,
      SEED_LIGHT
    );
    expect(slotted.getAllByTestId('sparkline-line')[0]?.props.stroke).toBe(slots()[1]);
  });

  // ── §4.5: empty, single datum, loading ──────────────────────────────

  it('renders nothing at all when it has neither a label nor a value', () => {
    const { toJSON } = renderThemed(<TrendCardV4 label="" value="" />, SEED_LIGHT);
    expect(toJSON()).toBeNull();
  });

  it('renders the card without a plot when the series is empty', () => {
    const { queryAllByTestId, getByText } = renderThemed(
      <TrendCardV4 label="Revenue" value="£0" data={[]} />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('sparkline-line').length).toBe(0);
    expect(queryAllByTestId('sparkline-empty').length).toBe(0);
    // …and never a bare bordered box: the label and the value are still there.
    expect(getByText('Revenue')).toBeTruthy();
    expect(getByText('£0')).toBeTruthy();
  });

  it('draws a single datum as a centred dot rather than dividing by zero', () => {
    const { getAllByTestId, queryAllByTestId } = renderThemed(
      <TrendCardV4 label="Revenue" value="£1" data={[42]} width={100} />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('sparkline-line').length).toBe(0);
    const dot = getAllByTestId('sparkline-dot')[0] as ReactTestInstance;
    expect(dot.props.cx).toBe(50);
    expect(Number.isFinite(dot.props.cy)).toBe(true);
  });

  it('shows skeletons instead of the content while loading, keeping the card', () => {
    const { queryAllByTestId, queryByText, toJSON } = renderThemed(
      <TrendCardV4 label="Revenue" value="£1" data={[1, 2]} loading />,
      SEED_LIGHT
    );
    expect(queryByText('£1')).toBeNull();
    expect(queryAllByTestId('sparkline-line').length).toBe(0);
    // The card itself keeps its footprint rather than disappearing.
    expect(toJSON()).toBeTruthy();
  });

  // ── §1 rule 6: it says its value in words ───────────────────────────

  it('derives one sentence carrying the label, value, delta and caption', () => {
    const { root } = renderThemed(
      <TrendCardV4
        label="Revenue"
        value="£48,210"
        delta="+12.4%"
        trend="up"
        caption="vs last month"
      />,
      SEED_LIGHT
    );
    expect(labels(root)).toContain('Revenue, £48,210, +12.4%, vs last month');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <TrendCardV4 label="Revenue" value="£1" accessibilityLabel="Revenue is up this month" />,
      SEED_LIGHT
    );
    expect(labels(root)).toContain('Revenue is up this month');
  });
});
