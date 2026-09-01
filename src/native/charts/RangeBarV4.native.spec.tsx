import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { compileTheme } from '../../theme/compile';
import {
  CHART_AXIS_MIX,
  CHART_GRID_MIX,
  CHART_MARK,
  chartSeries,
} from '../../primitives/internal/v4-chart';
import { withAlpha } from '../primitives/internal/color';
import { minTap } from '../primitives/internal/nav-v4';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { RangeBarV4 } from './RangeBarV4';

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500], 'light');

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

/** Every node carrying a `testID` — the marks are accessibility-hidden. */
function marks(root: ReactTestInstance, id: string): ReactTestInstance[] {
  return root.findAll((n) => typeof n.type === 'string' && n.props?.testID === id);
}

/** The band's own style, flattened. */
function band(root: ReactTestInstance): Record<string, unknown> {
  return flat((marks(root, 'xen-v4-range')[0] as ReactTestInstance).props.style);
}

/** A percentage style value as a number — float noise is not the assertion. */
function pct(value: unknown): number {
  return Number.parseFloat(String(value));
}

/** Every style value in the tree, as strings — the divide-by-zero net. */
function styleValues(root: ReactTestInstance): string[] {
  const out: string[] = [];
  root.findAll(() => true).forEach((node) => {
    Object.values(flat(node.props?.style)).forEach((v) => {
      if (typeof v === 'string' || typeof v === 'number') out.push(String(v));
    });
  });
  return out;
}

function figureLabel(root: ReactTestInstance): string {
  const figure = root.findAll(
    (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'image'
  )[0] as ReactTestInstance;
  return figure.props.accessibilityLabel as string;
}

describe('RangeBarV4 (native)', () => {
  // ── §4.4: the one form rounded at BOTH ends ────────────────────────

  it('rounds both ends, because neither end of a range is a baseline', () => {
    const { root } = renderThemed(<RangeBarV4 start={20} end={60} />, SEED_LIGHT);
    // One `borderRadius` is all four corners — the exception §5 grants this
    // form and grants no other in the family.
    expect(band(root).borderRadius).toBe(CHART_MARK.endRadius);
    // And not the seed's `radius.full`, which a `sharp` seed compiles to 0.
    expect(band(root).borderRadius).not.toBe(theme.radius.full);
  });

  it('positions the band by its share of the domain', () => {
    const { root } = renderThemed(
      <RangeBarV4 start={20} end={60} domainMin={0} domainMax={200} />,
      SEED_LIGHT
    );
    expect(pct(band(root).left)).toBeCloseTo(10, 6);
    expect(pct(band(root).width)).toBeCloseTo(20, 6);
  });

  it('clamps a band that runs past its domain rather than overflowing the track', () => {
    const { root } = renderThemed(
      <RangeBarV4 start={-50} end={500} domainMin={0} domainMax={100} />,
      SEED_LIGHT
    );
    expect(pct(band(root).left)).toBeCloseTo(0, 6);
    expect(pct(band(root).width)).toBeCloseTo(100, 6);
  });

  it('reads a reversed pair as a range rather than a negative width', () => {
    const { root } = renderThemed(
      <RangeBarV4 start={80} end={20} domainMin={0} domainMax={100} />,
      SEED_LIGHT
    );
    expect(pct(band(root).left)).toBeCloseTo(20, 6);
    expect(pct(band(root).width)).toBeCloseTo(60, 6);
  });

  // ── §4.1 / rule 2: slot 1, or a tone that means something ──────────

  it('paints the band slot 1, and `tone` is the only route to a status hue', () => {
    const plain = renderThemed(<RangeBarV4 start={20} end={60} />, SEED_LIGHT);
    expect(band(plain.root).backgroundColor).toBe(SLOTS[0]);
    // The base defaulted to `colors.primary` — a semantic slot as an identity.
    expect(band(plain.root).backgroundColor).not.toBe(theme.light.primary);

    const toned = renderThemed(<RangeBarV4 start={20} end={60} tone="warn" />, SEED_LIGHT);
    expect(band(toned.root).backgroundColor).toBe(theme.light.warn);
  });

  // ── §3.3: track is grid, the domain rule is axis ───────────────────

  it('takes the track from the grid neutral and draws a domain axis the base never had', () => {
    const { root } = renderThemed(<RangeBarV4 start={20} end={60} />, SEED_LIGHT);
    const track = flat((marks(root, 'xen-v4-chart-track')[0] as ReactTestInstance).props.style);
    const axis = flat((marks(root, 'xen-v4-chart-axis')[0] as ReactTestInstance).props.style);

    expect(track.backgroundColor).toBe(withAlpha(theme.light.onSurface, CHART_GRID_MIX));
    expect(track.backgroundColor).not.toBe(theme.light.border);
    expect(axis.backgroundColor).toBe(withAlpha(theme.light.onSurface, CHART_AXIS_MIX));
    expect(axis.height).toBe(1);
  });

  it('sizes the track from `height`', () => {
    const { root } = renderThemed(<RangeBarV4 start={20} end={60} height={14} />, SEED_LIGHT);
    expect(flat((marks(root, 'xen-v4-chart-track')[0] as ReactTestInstance).props.style).height).toBe(
      14
    );
  });

  it('gives the bar the 44 tap floor even though the mark is 10', () => {
    const { root } = renderThemed(<RangeBarV4 start={20} end={60} />, SEED_LIGHT);
    const hit = marks(root, 'xen-v4-range-hit')[0] as ReactTestInstance;
    expect(flat(hit.props.style).minHeight).toBe(minTap(theme.spacing));
  });

  // ── §4.2 / §4.4: the figure frame and the direct labels ────────────

  it('renders the title, summary and caption slots', () => {
    const { getByText } = renderThemed(
      <RangeBarV4 start={20} end={60} title="Latency" summary="240ms" caption="p50 to p95" />,
      SEED_LIGHT
    );
    expect(getByText('Latency')).toBeTruthy();
    expect(getByText('240ms')).toBeTruthy();
    expect(getByText('p50 to p95')).toBeTruthy();
  });

  it('labels the domain ends and the band by default, and stops when told to', () => {
    const on = renderThemed(
      <RangeBarV4 start={20} end={60} domainMin={0} domainMax={100} />,
      SEED_LIGHT
    );
    expect(on.getByText('0')).toBeTruthy();
    expect(on.getByText('100')).toBeTruthy();
    expect(on.getByText('20–60')).toBeTruthy();

    const off = renderThemed(
      <RangeBarV4 start={20} end={60} showValues={false} tooltip={false} />,
      SEED_LIGHT
    );
    expect(marks(off.root, 'xen-v4-chart-value')).toHaveLength(0);
  });

  it('`format` spells every number it shows', () => {
    const { getByText } = renderThemed(
      <RangeBarV4 start={20} end={60} domainMax={100} format={(v) => `${v}ms`} />,
      SEED_LIGHT
    );
    expect(getByText('20ms–60ms')).toBeTruthy();
    expect(getByText('100ms')).toBeTruthy();
  });

  // ── §4.5: empty, single datum, loading ─────────────────────────────

  it('renders the empty state when the domain cannot be read', () => {
    const { root, getByText } = renderThemed(
      <RangeBarV4 start={20} end={60} domainMin={100} domainMax={100} />,
      SEED_LIGHT
    );
    expect(marks(root, 'xen-v4-range')).toHaveLength(0);
    expect(getByText('No data')).toBeTruthy();
    // The base divided by `Math.max(span, 1)` and drew a confident band anyway.
    styleValues(root).forEach((v) => expect(v).not.toContain('NaN'));
  });

  it('renders the empty state for a non-numeric endpoint', () => {
    const { root, getByText } = renderThemed(
      <RangeBarV4 start={Number.NaN} end={60} />,
      SEED_LIGHT
    );
    expect(getByText('No data')).toBeTruthy();
    styleValues(root).forEach((v) => expect(v).not.toContain('NaN'));
  });

  it('takes a custom empty label', () => {
    const { getByText } = renderThemed(
      <RangeBarV4 start={0} end={1} domainMax={0} emptyLabel="No reading" />,
      SEED_LIGHT
    );
    expect(getByText('No reading')).toBeTruthy();
  });

  it('draws a zero-width range as a point rather than as nothing', () => {
    const { root, getByText } = renderThemed(
      <RangeBarV4 start={40} end={40} domainMax={100} />,
      SEED_LIGHT
    );
    expect(pct(band(root).width)).toBeCloseTo(0, 6);
    // The single-datum case: a collapsed range is a real reading, and a point
    // in this line is `dotSize`.
    expect(band(root).minWidth).toBe(CHART_MARK.dotSize);
    expect(getByText('40')).toBeTruthy();
    styleValues(root).forEach((v) => {
      expect(v).not.toContain('NaN');
      expect(v).not.toContain('Infinity');
    });
  });

  it('holds the footprint with a skeleton while loading', () => {
    const { root } = renderThemed(<RangeBarV4 start={20} end={60} loading />, SEED_LIGHT);
    expect(marks(root, 'xen-v4-range')).toHaveLength(0);
  });

  // ── §4.8: the accessible sentence ──────────────────────────────────

  it('derives a sentence naming the form, the headline, the band and the domain', () => {
    const { root } = renderThemed(
      <RangeBarV4 start={20} end={60} domainMax={100} title="Latency" />,
      SEED_LIGHT
    );
    expect(figureLabel(root)).toBe('Range bar, Latency, 20 to 60, on a scale of 0 to 100');
  });

  it('collapses the range in the sentence when it is a single value', () => {
    const { root } = renderThemed(<RangeBarV4 start={40} end={40} domainMax={100} />, SEED_LIGHT);
    expect(figureLabel(root)).toBe('Range bar, 40, on a scale of 0 to 100');
  });

  it('lets the caller override the sentence', () => {
    const { root } = renderThemed(
      <RangeBarV4 start={20} end={60} accessibilityLabel="Well inside budget" />,
      SEED_LIGHT
    );
    expect(figureLabel(root)).toBe('Well inside budget');
  });

  // ── §4.6: press is native's hover ──────────────────────────────────

  it('reveals the band in words on press and reports the ordered pair', () => {
    const onSelect = jest.fn();
    const { root, getByText, queryByText } = renderThemed(
      <RangeBarV4 start={60} end={20} showValues={false} onSelect={onSelect} />,
      SEED_LIGHT
    );
    expect(queryByText('20–60')).toBeNull();

    fireEvent.press(marks(root, 'xen-v4-range-hit')[0] as ReactTestInstance);
    expect(onSelect).toHaveBeenCalledWith(20, 60);
    expect(getByText('20–60')).toBeTruthy();
  });

  // ── §4.7: motion ───────────────────────────────────────────────────

  it('resolves the reveal to fully visible when it is turned off', () => {
    const { root } = renderThemed(<RangeBarV4 start={20} end={60} animate={false} />, SEED_LIGHT);
    const track = marks(root, 'xen-v4-chart-track')[0] as ReactTestInstance;
    const opacity = flat(track.props.style).opacity as number | { __getValue?: () => number };
    expect(typeof opacity === 'number' ? opacity : opacity?.__getValue?.()).toBe(1);
  });
});
