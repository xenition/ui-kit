import '../spec-support/real-animations';
import * as React from 'react';
import { act, fireEvent, waitFor } from '@testing-library/react-native';
import { AccessibilityInfo } from 'react-native';
import type { ReactTestInstance } from 'react-test-renderer';
import { SEED_LIGHT, renderThemed } from '../spec-support/render-native';
import { XenitionNativeThemeProvider } from '../theme';
import { compileTheme } from '../../theme/compile';
import { CHART_MARK, chartSeries } from '../../primitives/internal/v4-chart';
import { ProgressBarsV4 } from './ProgressBarsV4';

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

const ITEMS = [
  { label: 'Organic', value: 40 },
  { label: 'Referral', value: 20 },
  { label: 'Direct', value: 10 },
];

describe('ProgressBarsV4 (native)', () => {
  // ── it is a list, not a plot ───────────────────────────────────────

  it('is a list of rows, not one opaque image', () => {
    const { getAllByTestId, UNSAFE_root } = renderThemed(
      <ProgressBarsV4 items={ITEMS} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('progress-row')).toHaveLength(3);
    expect(
      UNSAFE_root.findAll(
        (n) => typeof n.type === 'string' && n.props?.accessibilityRole === 'list'
      ).length
    ).toBe(1);
  });

  it('takes the row family’s two-line height and gutter, imported not restated', () => {
    const { getAllByTestId } = renderThemed(<ProgressBarsV4 items={ITEMS} />, SEED_LIGHT);
    const row = flat(getAllByTestId('progress-row')[0]?.props.style);

    // 72 = `2xl + lg`, M3's two-line list container.
    expect(row.minHeight).toBe(theme.spacing['2xl'] + theme.spacing.lg);
    expect(row.minHeight).toBe(72);
    // 16 = the row gutter, not a plot inset.
    expect(row.paddingHorizontal).toBe(theme.spacing.md);
  });

  // ── colour ─────────────────────────────────────────────────────────

  it('paints every row slot 1 — bar length already carries the magnitude', () => {
    const { getAllByTestId } = renderThemed(<ProgressBarsV4 items={ITEMS} />, SEED_LIGHT);

    getAllByTestId('progress-fill').forEach((fill) =>
      expect(flat(fill.props.style).backgroundColor).toBe(SLOTS[0])
    );
  });

  it('paints a status hue only for a row that opted in with `tone`', () => {
    const { getAllByTestId } = renderThemed(
      <ProgressBarsV4 items={[{ label: 'Overspend', value: 4, tone: 'danger' }]} />,
      SEED_LIGHT
    );

    expect(flat(getAllByTestId('progress-fill')[0]?.props.style).backgroundColor).toBe(
      theme.light.danger
    );
  });

  // ── marks ──────────────────────────────────────────────────────────

  it('gives every row a track so the rows stay comparable', () => {
    const { getAllByTestId } = renderThemed(<ProgressBarsV4 items={ITEMS} />, SEED_LIGHT);
    const tracks = getAllByTestId('progress-track');

    expect(tracks).toHaveLength(3);
    tracks.forEach((track) => {
      expect(flat(track.props.style).height).toBe(CHART_MARK.dotSize);
      // Chart chrome, never a series slot and never `muted`.
      expect(flat(track.props.style).backgroundColor).not.toBe(SLOTS[0]);
      expect(flat(track.props.style).backgroundColor).not.toBe(theme.light.muted);
    });
  });

  it('rounds the data end only — the trailing edge, never the baseline', () => {
    const { getAllByTestId } = renderThemed(<ProgressBarsV4 items={ITEMS} />, SEED_LIGHT);
    const fill = flat(getAllByTestId('progress-fill')[0]?.props.style);

    expect(fill.borderTopRightRadius).toBe(CHART_MARK.endRadius);
    expect(fill.borderBottomRightRadius).toBe(CHART_MARK.endRadius);
    expect(fill.borderTopLeftRadius).toBeUndefined();
  });

  it('scales each fill against the ceiling', () => {
    const { getAllByTestId } = renderThemed(<ProgressBarsV4 items={ITEMS} />, SEED_LIGHT);
    const widths = getAllByTestId('progress-fill').map((f) => flat(f.props.style).width);

    expect(widths).toEqual(['100%', '50%', '25%']);
  });

  it('renders an empty fill rather than dividing by a zero ceiling', () => {
    const { getAllByTestId } = renderThemed(
      <ProgressBarsV4 items={[{ label: 'Nothing', value: 0 }]} />,
      SEED_LIGHT
    );

    expect(flat(getAllByTestId('progress-fill')[0]?.props.style).width).toBe('0%');
  });

  // ── new props ──────────────────────────────────────────────────────

  it('shows values by default and hides them on request', () => {
    expect(
      renderThemed(<ProgressBarsV4 items={ITEMS} />, SEED_LIGHT).queryByText('40')
    ).not.toBeNull();
    expect(
      renderThemed(<ProgressBarsV4 items={ITEMS} showValues={false} />, SEED_LIGHT).queryByText(
        '40'
      )
    ).toBeNull();
  });

  it('formats values through `valueFormat`', () => {
    const { getByText } = renderThemed(
      <ProgressBarsV4 items={ITEMS} valueFormat={(v) => `${v}%`} />,
      SEED_LIGHT
    );
    expect(getByText('40%')).toBeTruthy();
  });

  it('renders a per-row caption, the row family’s supporting line', () => {
    const { getByText } = renderThemed(
      <ProgressBarsV4 items={[{ label: 'Organic', value: 40, caption: 'up 4 this week' }]} />,
      SEED_LIGHT
    );
    expect(getByText('up 4 this week')).toBeTruthy();
  });

  it('measures against an explicit `max` when one is given', () => {
    const { getAllByTestId } = renderThemed(
      <ProgressBarsV4 items={ITEMS} max={80} />,
      SEED_LIGHT
    );
    expect(flat(getAllByTestId('progress-fill')[0]?.props.style).width).toBe('50%');
  });

  it('makes each row a button when it is selectable', () => {
    const onItemSelect = jest.fn();
    const { getAllByTestId } = renderThemed(
      <ProgressBarsV4 items={ITEMS} onItemSelect={onItemSelect} />,
      SEED_LIGHT
    );
    const rows = getAllByTestId('progress-row');

    expect(rows[0]?.props.accessibilityRole).toBe('button');
    expect(rows[1]?.props.accessibilityLabel).toBe('Referral: 20');
    fireEvent.press(rows[1] as ReactTestInstance);
    expect(onItemSelect).toHaveBeenCalledWith(ITEMS[1], 1);
  });

  it('renders the header and the caption', () => {
    const { getByText } = renderThemed(
      <ProgressBarsV4 items={ITEMS} title="Top channels" caption="Last 30 days" />,
      SEED_LIGHT
    );

    expect(getByText('Top channels')).toBeTruthy();
    expect(getByText('Last 30 days')).toBeTruthy();
  });

  it('shows the loading placeholder instead of the rows', () => {
    const { queryAllByTestId } = renderThemed(
      <ProgressBarsV4 items={ITEMS} loading />,
      SEED_LIGHT
    );
    expect(queryAllByTestId('progress-row')).toHaveLength(0);
  });

  // ── empty and single-datum ─────────────────────────────────────────

  it('renders the empty state rather than nothing', () => {
    const { queryAllByTestId, getByText } = renderThemed(
      <ProgressBarsV4 items={[]} emptyLabel="No channels" />,
      SEED_LIGHT
    );

    expect(queryAllByTestId('progress-row')).toHaveLength(0);
    expect(getByText('No channels')).toBeTruthy();
  });

  it('renders a single row at a full bar', () => {
    const { getAllByTestId } = renderThemed(
      <ProgressBarsV4 items={[{ label: 'Organic', value: 7 }]} />,
      SEED_LIGHT
    );

    expect(getAllByTestId('progress-row')).toHaveLength(1);
    expect(flat(getAllByTestId('progress-fill')[0]?.props.style).width).toBe('100%');
  });

  // ── the accessible label ───────────────────────────────────────────

  it('derives a sentence and still leaves every row readable', () => {
    const { getByLabelText, getAllByTestId } = renderThemed(
      <ProgressBarsV4 items={ITEMS} title="Top channels" />,
      SEED_LIGHT
    );

    expect(
      getByLabelText('Top channels, 3 rows, Organic 40, Referral 20, Direct 10.')
    ).toBeTruthy();
    expect(getAllByTestId('progress-row')).toHaveLength(3);
  });

  it('lets a caller override the derived sentence', () => {
    const { getByLabelText } = renderThemed(
      <ProgressBarsV4 items={ITEMS} accessibilityLabel="Acquisition mix" />,
      SEED_LIGHT
    );
    expect(getByLabelText('Acquisition mix')).toBeTruthy();
  });

  // ── §36.6: a value that CHANGES has to move ────────────────────────

  /*
    The entrance ramp is a mount-time opacity and nothing else, so the defect
    this covers is not "does the row appear" — it is what happens when the
    number changes while the reader is looking at it. A row going 40 to 75 used
    to arrive at 75 with no movement in between.

    What proves it travels is that the width is NOT the new number on the frame
    after the change, and IS the new number once the animation has run.
  */
  it('travels the fill to a new value instead of jumping to it', async () => {
    const { getAllByTestId, rerender } = renderThemed(
      <ProgressBarsV4 items={[{ label: 'Organic', value: 40 }]} max={100} />,
      SEED_LIGHT
    );
    const widthNow = (): unknown => flat(getAllByTestId('progress-fill')[0]?.props.style).width;
    expect(widthNow()).toBe('40%');

    rerender(
      <XenitionNativeThemeProvider theme={SEED_LIGHT}>
        <ProgressBarsV4 items={[{ label: 'Organic', value: 75 }]} max={100} />
      </XenitionNativeThemeProvider>
    );
    expect(widthNow()).not.toBe('75%');

    await waitFor(() => expect(widthNow()).toBe('75%'));
  });

  it('sets the fill outright under reduced motion — §36.10', async () => {
    (AccessibilityInfo.isReduceMotionEnabled as jest.Mock).mockResolvedValue(true);
    const { getAllByTestId, rerender } = renderThemed(
      <ProgressBarsV4 items={[{ label: 'Organic', value: 40 }]} max={100} />,
      SEED_LIGHT
    );
    // The preference resolves on a promise, so the reduced path lands on the
    // render after it.
    await act(async () => {});

    rerender(
      <XenitionNativeThemeProvider theme={SEED_LIGHT}>
        <ProgressBarsV4 items={[{ label: 'Organic', value: 75 }]} max={100} />
      </XenitionNativeThemeProvider>
    );
    expect(flat(getAllByTestId('progress-fill')[0]?.props.style).width).toBe('75%');
  });
});