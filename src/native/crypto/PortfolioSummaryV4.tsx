import * as React from 'react';
import { View, type DimensionValue } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { MoneyAmount } from '../finance/MoneyAmount';
import { DonutChartV4 } from '../charts/DonutChartV4';
import { RadialLegendV4, foldPieDataV4, shareOfV4, segmentLegendLabelV4 } from '../charts/PieChartV4';
import { formatMoney } from '../../commerce/money';
import { changeInk, changeParts, skeletonFill, spokenLine } from './internal/market-v4';
import { formatPct } from './internal/format';
import type { PortfolioSummaryProps } from './PortfolioSummary';

export interface PortfolioSummaryV4Props extends PortfolioSummaryProps {
  /** Wording for the movement. Defaults `up` / `down` / `unchanged`. */
  directionLabels?: { up?: string; down?: string; flat?: string };
  /**
   * The figure printed beside each allocation.
   *
   * `value` is the slice's own weight, exactly as it was handed in — so a
   * caller whose weights are cents can print money and a caller whose weights
   * are already percentages can print percentages. Omitted, the legend shows
   * the slice's whole-percent share of the total.
   */
  formatAllocation?: (label: string, value: number) => string;
}

/** The skeleton's three bands, in the shape the loaded card takes. */
const SKELETON_STEPS = { caption: 1, total: 2, chart: 8 } as const;

/**
 * **V4 portfolio hero** — same props as {@link PortfolioSummary} plus
 * `directionLabels` and `formatAllocation`.
 *
 * ## Four changes
 *
 * 1. **The allocation numbers are rendered.** The donut was colour-matching
 *    only: "how much of this is ETH" was answerable solely by holding a legend
 *    swatch against a ring segment. Every segment now carries a figure through
 *    {@link PortfolioSummaryV4Props.formatAllocation}.
 * 2. **The direction and the money are toned from one source.** The base took
 *    the tone from `changePct ?? changeCents` and the money's own tone from
 *    the cents, so `changePct={0}` with `changeCents={-500}` drew a muted `•`
 *    beside a red `−$5.00`. Both now come from a single `changeParts()` call
 *    on the cents, falling back to the percentage.
 * 3. **A loss is announced as a loss.** `up +3.20%` / `down +3.20%` came from
 *    `pct >= 0 ? 'up' : 'down'` glued to `formatPct(Math.abs(pct))`, which
 *    re-applies the sign — and `>= 0` sent a flat `0` down the "up" branch
 *    while the glyph beside it drew `•`.
 * 4. **Loading is the card's own shape**, not a 120px grey slab, and the
 *    donut's `thickness` is left to the chart family so it means the same
 *    number on both twins — the bases read it as pixels here and as a
 *    fraction on the web.
 */
export function PortfolioSummaryV4({
  totalCents,
  currency = 'USD',
  changeCents,
  changePct,
  allocations = [],
  loading = false,
  directionLabels,
  formatAllocation,
  style,
}: PortfolioSummaryV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { tokens } = theme;

  if (loading) {
    const band = (steps: number, width: DimensionValue): React.ReactElement => (
      <View
        style={{
          height: tokens.spacing.md * steps,
          width,
          borderRadius: tokens.radius.sm,
          backgroundColor: skeletonFill(theme),
        }}
      />
    );
    return (
      <CardV4 variant="elevated" style={style}>
        <View
          accessible
          accessibilityLabel="Loading portfolio"
          style={{ gap: tokens.spacing.md }}
        >
          {band(SKELETON_STEPS.caption, '35%')}
          {band(SKELETON_STEPS.total, '60%')}
          {band(SKELETON_STEPS.chart, '100%')}
        </View>
      </CardV4>
    );
  }

  // The money is the figure on screen, so the money decides the tone. The base
  // asked the percentage first and then toned the cents separately.
  const change = changeParts(changeCents ?? changePct, directionLabels);
  const ink = changeInk(theme, change.tone);
  const hasChange = changeCents != null || changePct != null;

  const fold = allocations.length > 0 ? foldPieDataV4(allocations.map((a) => ({ label: a.label, value: a.value }))) : null;

  return (
    <CardV4 variant="elevated" style={style}>
      <View style={{ gap: tokens.spacing.md }}>
        <View style={{ gap: tokens.spacing.xs }}>
          <TextV4 size="sm" weight="semibold" tone="mutedText">
            Total balance
          </TextV4>
          <MoneyAmount cents={totalCents} currency={currency} tone="neutral" size="xl" />

          {hasChange ? (
            <View
              accessible
              accessibilityLabel={spokenLine([
                change.word,
                changeCents != null ? formatMoney(changeCents, currency) : null,
                changePct != null ? formatPct(changePct) : null,
              ])}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
              }}
            >
              <TextV4 size="sm" style={{ color: ink }}>
                {change.glyph}
              </TextV4>
              {changeCents != null ? (
                <MoneyAmount
                  cents={changeCents}
                  currency={currency}
                  tone={
                    change.tone === 'success'
                      ? 'income'
                      : change.tone === 'danger'
                        ? 'expense'
                        : 'neutral'
                  }
                  size="sm"
                  signDisplay="always"
                />
              ) : null}
              {changePct != null ? (
                <TextV4 size="sm" weight="semibold" numeric="tabular" style={{ color: ink }}>
                  {formatPct(changePct)}
                </TextV4>
              ) : null}
            </View>
          ) : null}
        </View>

        {fold != null && fold.segments.length > 0 ? (
          <View style={{ alignItems: 'center', gap: tokens.spacing.sm }}>
            <DonutChartV4
              data={allocations.map((a) => ({ label: a.label, value: a.value }))}
              legend={false}
            />
            {/* The chart's own legend prints a share and nothing else. This one
                is the same rows, the same slots, with the caller's figure. */}
            <RadialLegendV4
              items={fold.segments.map((segment, i) => ({
                label: segmentLegendLabelV4(segment),
                slot: i,
                value:
                  formatAllocation != null
                    ? formatAllocation(segment.label, segment.value)
                    : `${shareOfV4(segment.value, fold.total)}%`,
              }))}
            />
          </View>
        ) : null}
      </View>
    </CardV4>
  );
}
