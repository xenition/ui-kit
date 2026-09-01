import * as React from 'react';
import { fireEvent } from '@testing-library/react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { compileTheme } from '../../theme/compile';
import { CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { LegendV4 } from './LegendV4';

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

const theme = compileTheme(SEED_LIGHT);
const SLOTS = chartSeries(theme.ramps.primary[500] as string, 'light');

const ITEMS = [{ label: 'Direct' }, { label: 'Referral' }, { label: 'Organic' }];

const swatchFills = (root: ReactTestInstance): string[] =>
  root
    .findAll((n) => typeof n.type === 'string' && n.props?.testID === 'legend-swatch')
    .map((n) => flat(n.props.style).backgroundColor as string);

describe('LegendV4 (native)', () => {
  // ── the palette, not the status cycle ──────────────────────────────

  it('paints each swatch from its categorical slot, in assignment order', () => {
    const { UNSAFE_root } = renderThemed(<LegendV4 items={ITEMS} />, SEED_LIGHT);

    expect(swatchFills(UNSAFE_root)).toEqual([SLOTS[0], SLOTS[1], SLOTS[2]]);
  });

  it('paints the swatch at CHART_MARK.dotSize, not a `width: 10` literal', () => {
    const { UNSAFE_root } = renderThemed(<LegendV4 items={[{ label: 'Direct' }]} />, SEED_LIGHT);
    const swatch = UNSAFE_root.findAll(
      (n) => typeof n.type === 'string' && n.props?.testID === 'legend-swatch'
    )[0] as ReactTestInstance;

    expect(flat(swatch.props.style).width).toBe(CHART_MARK.dotSize);
    expect(flat(swatch.props.style).height).toBe(CHART_MARK.dotSize);
  });

  it('paints a status hue only for an entry that opted in with `tone`', () => {
    const { UNSAFE_root } = renderThemed(
      <LegendV4 items={[{ label: 'Failures', tone: 'danger' }]} />,
      SEED_LIGHT
    );

    expect(swatchFills(UNSAFE_root)[0]).toBe(theme.light.danger);
  });

  it('never carries the retired `opacity` prop on a swatch', () => {
    const { UNSAFE_root } = renderThemed(<LegendV4 items={ITEMS} />, SEED_LIGHT);

    UNSAFE_root
      .findAll((n) => typeof n.type === 'string' && n.props?.testID === 'legend-swatch')
      .forEach((n) => expect(flat(n.props.style).opacity).toBeUndefined());
  });

  it('throws past the five-slot palette rather than cycling', () => {
    const six = Array.from({ length: 6 }, (_, i) => ({ label: `Series ${i + 1}` }));
    const quiet = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderThemed(<LegendV4 items={six} />, SEED_LIGHT)).toThrow(/never cycled/);
    quiet.mockRestore();
  });

  // ── new props ──────────────────────────────────────────────────────

  it('is not interactive by default — §7 open question 1’s proposal', () => {
    const { UNSAFE_root } = renderThemed(<LegendV4 items={ITEMS} />, SEED_LIGHT);
    const buttons = UNSAFE_root.findAll(
      (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'button'
    );

    expect(buttons).toHaveLength(0);
  });

  it('gives every toggle the composed 44 when `interactive`', () => {
    const { getAllByTestId } = renderThemed(<LegendV4 items={ITEMS} interactive />, SEED_LIGHT);
    const rows = getAllByTestId('legend-item');

    expect(rows).toHaveLength(3);
    rows.forEach((row) => {
      // Rule 10: `minTap(spacing)` = `2xl - xs` = 44, imported from the nav line.
      expect(flat(row.props.style).minHeight).toBe(
        theme.spacing['2xl'] - theme.spacing.xs
      );
      expect(flat(row.props.style).minHeight).toBe(44);
    });
  });

  it('announces the toggled state and reports it, uncontrolled', () => {
    const onToggle = jest.fn();
    const { getAllByTestId } = renderThemed(
      <LegendV4 items={ITEMS} interactive onToggle={onToggle} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('legend-item')[0]?.props.accessibilityState.selected).toBe(true);
    fireEvent.press(getAllByTestId('legend-item')[0] as ReactTestInstance);
    expect(onToggle).toHaveBeenCalledWith(0, true);
    expect(getAllByTestId('legend-item')[0]?.props.accessibilityState.selected).toBe(false);
  });

  it('does not move on its own when `hidden` is controlled', () => {
    const { getAllByTestId } = renderThemed(
      <LegendV4 items={ITEMS} interactive hidden={[1]} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('legend-item')[1]?.props.accessibilityState.selected).toBe(false);
    fireEvent.press(getAllByTestId('legend-item')[0] as ReactTestInstance);
    expect(getAllByTestId('legend-item')[0]?.props.accessibilityState.selected).toBe(true);
  });

  it('drains a hidden swatch to the chrome colour instead of fading it', () => {
    const { UNSAFE_root } = renderThemed(
      <LegendV4 items={ITEMS} interactive hidden={[0]} />,
      SEED_LIGHT
    );

    // The grid mix, not the series slot and not an alpha.
    expect(swatchFills(UNSAFE_root)[0]).not.toBe(SLOTS[0]);
    expect(swatchFills(UNSAFE_root)[1]).toBe(SLOTS[1]);
  });

  it('stacks vertically when asked', () => {
    const { getByTestId } = renderThemed(<LegendV4 items={ITEMS} vertical />, SEED_LIGHT);

    expect(flat(getByTestId('legend').props.style).flexDirection).toBe('column');
  });

  it('never truncates a label', () => {
    const long = 'Organic search from partner referral campaigns';
    const { getByText } = renderThemed(<LegendV4 items={[{ label: long }]} />, SEED_LIGHT);

    expect(getByText(long).props.numberOfLines).toBeUndefined();
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state rather than nothing', () => {
    const { getByText } = renderThemed(<LegendV4 items={[]} />, SEED_LIGHT);
    expect(getByText('No series')).toBeTruthy();
  });

  it('renders a single entry with its readout', () => {
    const { getAllByTestId, getByText } = renderThemed(
      <LegendV4 items={[{ label: 'Direct', value: '48%' }]} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('legend-item')).toHaveLength(1);
    expect(getByText('48%')).toBeTruthy();
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence naming every series', () => {
    const { getByTestId } = renderThemed(<LegendV4 items={ITEMS} />, SEED_LIGHT);

    expect(getByTestId('legend').props.accessibilityLabel).toBe(
      'Legend: Direct, Referral, Organic.'
    );
  });

  it('lets a caller override the derived sentence', () => {
    const { getByTestId } = renderThemed(
      <LegendV4 items={ITEMS} accessibilityLabel="Traffic sources" />,
      SEED_LIGHT
    );

    expect(getByTestId('legend').props.accessibilityLabel).toBe('Traffic sources');
  });
});
