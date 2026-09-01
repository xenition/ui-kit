import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { BarChart } from '../charts';
import { formatMoney } from '../commerce/money';
import { attainment, spokenLine, TABULAR } from './internal/crm-v4';
import type { DealForecastProps } from './DealForecast';

export interface DealForecastV4Props extends DealForecastProps {
  /** How the target figure is spelled. Default `formatMoney(cents, currency)`. */
  formatTarget?: (cents: number) => string;
  /** Caption over the attainment figure. Default `'vs target'`. */
  targetLabel?: string;
  /** Word shown and announced once quota is met. Default `'Target met'`. */
  attainedLabel?: string;
}

/**
 * **V4 deal forecast** — same props as {@link DealForecast} plus
 * `formatTarget`, `targetLabel` and `attainedLabel`.
 *
 * ## Four changes
 *
 * 1. **The target is actually shown.** `targetCents` is documented as "shown
 *    as a labelled reference" and was only ever divided into the total: a
 *    caller supplied a quota and saw a percentage and the words "vs target",
 *    never the quota itself. It now prints, through `formatTarget`.
 * 2. **Attainment is clamped.** The base divided raw, so a reversed period
 *    rendered a negative percent; `attainment()` clamps to 0-100.
 * 3. **Hitting quota is a word, not a colour.** Crossing 100% swapped the
 *    figure to `success` and said nothing else — invisible in greyscale, and
 *    silent to a reader. `attainedLabel` renders beside the figure and joins
 *    the block's accessible name.
 * 4. **The figures are tabular** and the empty state carries status semantics
 *    rather than being one muted line in a blank region.
 */
export function DealForecastV4({
  periods,
  title = 'Forecast',
  currency = 'USD',
  targetCents,
  color = 'primary',
  height = 128,
  emptyLabel = 'No forecast data',
  formatTarget,
  targetLabel = 'vs target',
  attainedLabel = 'Target met',
  style,
}: DealForecastV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();

  const total = periods.reduce(
    (sum, p) => sum + (Number.isFinite(p.valueCents) ? p.valueCents : 0),
    0
  );
  const pct = attainment(total, targetCents);
  const attained = pct != null && pct >= 100;
  const totalLabel = formatMoney(total, currency);
  const target =
    targetCents != null && targetCents > 0
      ? (formatTarget ?? ((cents: number) => formatMoney(cents, currency)))(targetCents)
      : undefined;

  return (
    <CardV4 padding="md" style={[{ gap: tokens.spacing.md }, style]}>
      <View
        accessible
        accessibilityLabel={spokenLine([
          title,
          totalLabel,
          target ? `${targetLabel} ${target}` : null,
          pct != null ? `${Math.round(pct)}%` : null,
          attained ? attainedLabel : null,
        ])}
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: tokens.spacing.sm,
        }}
      >
        <View style={{ flex: 1, minWidth: 0, gap: tokens.spacing.xs / 2 }}>
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            {title}
          </TextV4>
          <TextV4 size="2xl" weight="bold" tone="onCard" style={TABULAR}>
            {totalLabel}
          </TextV4>
        </View>
        {pct != null ? (
          <View style={{ alignItems: 'flex-end', gap: tokens.spacing.xs / 2 }}>
            {/* The quota the caller supplied, printed at last. */}
            <TextV4 size="xs" tone="mutedText" style={TABULAR}>
              {target ? `${targetLabel} ${target}` : targetLabel}
            </TextV4>
            <TextV4
              size="base"
              weight="bold"
              tone={attained ? 'successText' : 'onCard'}
              style={TABULAR}
            >
              {`${Math.round(pct)}%`}
            </TextV4>
            {attained ? (
              <TextV4 size="xs" weight="semibold" tone="successText">
                {attainedLabel}
              </TextV4>
            ) : null}
          </View>
        ) : null}
      </View>

      {periods.length === 0 ? (
        <View
          accessibilityRole="summary"
          style={{ paddingVertical: tokens.spacing.lg, alignItems: 'center' }}
        >
          <TextV4 size="sm" tone="mutedText" align="center">
            {emptyLabel}
          </TextV4>
        </View>
      ) : (
        <BarChart
          data={periods.map((p) => (Number.isFinite(p.valueCents) ? p.valueCents : 0))}
          labels={periods.map((p) => p.label)}
          color={color}
          height={height}
          accessibilityLabel={spokenLine([
            `Forecast across ${periods.length} periods`,
            `total ${totalLabel}`,
            target ? `${targetLabel} ${target}` : null,
          ])}
        />
      )}
    </CardV4>
  );
}
