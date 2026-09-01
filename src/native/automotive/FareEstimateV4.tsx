import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { BadgeV4 } from '../primitives/BadgeV4';
import { CardV4 } from '../primitives/CardV4';
import { TextV4 } from '../primitives/TextV4';
import { formatMoney } from '../commerce/money';
import { metaLine, skeletonFill } from './internal/fleet-v4';
import type { FareEstimateProps } from './FareEstimate';

export interface FareEstimateV4Props extends FareEstimateProps {
  /** Label on the total row. Default `'Total'`. */
  totalLabel?: string;
  /** Build the surge chip. Default `'1.8× surge'`. */
  formatSurge?: (multiplier: number) => string;
  /** Copy when there is nothing to estimate. Default `'No estimate yet.'`. */
  emptyMessage?: string;
}

/**
 * **V4 fare estimate** — same props as {@link FareEstimate} plus `totalLabel`,
 * `formatSurge` and `emptyMessage`.
 *
 * ## Four changes
 *
 * 1. **Every figure is tabular and the column has an edge.** A fare breakdown
 *    is a column of money; with proportional figures `$4.50` and `$11.20` are
 *    different widths and there is nothing to scan down. This is the whole job
 *    of the component and the base did not do it.
 * 2. **Surge is a labelled chip, not a red number.** The base tinted the total
 *    when `surgeMultiplier > 1` — colour alone, and `danger` on a price, which
 *    §35.4 reserves for something going wrong rather than costing more.
 * 3. **The total is separated by a hairline and set in the display face**, so
 *    the figure a rider is deciding on is not the same weight as the line
 *    items above it.
 * 4. **An empty estimate says so** rather than rendering a bordered blank.
 */
export function FareEstimateV4({
  items = [],
  totalCents,
  currency = 'USD',
  surgeMultiplier,
  distanceLabel,
  durationLabel,
  variant = 'detailed',
  totalLabel = 'Total',
  formatSurge,
  emptyMessage = 'No estimate yet.',
  loading = false,
  style,
}: FareEstimateV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;

  if (loading) {
    return (
      <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
        {[60, 45, 80].map((w) => (
          <View
            key={w}
            style={{
              height: tokens.typography.scale.sm,
              width: `${w}%`,
              borderRadius: tokens.radius.sm,
              backgroundColor: skeletonFill(theme),
            }}
          />
        ))}
      </CardV4>
    );
  }

  const lines = variant === 'detailed' ? items : [];
  const hasTotal = typeof totalCents === 'number' && Number.isFinite(totalCents);
  const surging = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
  const caption = metaLine([distanceLabel, durationLabel]);

  if (!hasTotal && lines.length === 0) {
    return (
      <CardV4 style={style}>
        <TextV4 size="sm" tone="mutedText">
          {emptyMessage}
        </TextV4>
      </CardV4>
    );
  }

  return (
    <CardV4 style={[{ gap: tokens.spacing.sm }, style]}>
      {caption || surging ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {caption ? (
            <TextV4 size="xs" tone="mutedText" style={{ flex: 1 }}>
              {caption}
            </TextV4>
          ) : (
            <View style={{ flex: 1 }} />
          )}
          {/*
            Surge is a labelled chip. The base tinted the total `danger`, which
            is colour alone AND the wrong tone: a higher price is not an error
            (§35.4), it is a condition, and the word is what says so.
          */}
          {surging ? (
            <BadgeV4 tone="warn" variant="soft" size="sm">
              {(formatSurge ?? ((m: number) => `${m}× surge`))(surgeMultiplier as number)}
            </BadgeV4>
          ) : null}
        </View>
      ) : null}

      {lines.map((item) => (
        <View
          key={item.label}
          style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: tokens.spacing.md }}
        >
          <TextV4 size="sm" tone="mutedText" style={{ flexShrink: 1 }}>
            {item.label}
          </TextV4>
          <TextV4 size="sm" tone="onCard" numeric="tabular">
            {formatMoney(item.cents, currency)}
          </TextV4>
        </View>
      ))}

      {hasTotal ? (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'baseline',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
            borderTopWidth: lines.length > 0 ? 1 : 0,
            borderTopColor: colors.border,
            paddingTop: lines.length > 0 ? tokens.spacing.sm : 0,
          }}
        >
          <TextV4 size="base" weight="semibold" tone="onCard">
            {totalLabel}
          </TextV4>
          <TextV4 face="heading" size="xl" weight="bold" tone="onCard" numeric="tabular">
            {formatMoney(totalCents as number, currency)}
          </TextV4>
        </View>
      ) : null}
    </CardV4>
  );
}
