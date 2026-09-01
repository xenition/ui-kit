import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, formatMoney } from '../primitives';
import { Sparkline } from '../charts/Sparkline';
import type { PriceHistoryProps } from './PriceHistory';

/** Drop-in for {@link PriceHistoryProps} — same props, the V4 "listing" design. */
export type PriceHistoryV4Props = PriceHistoryProps;

/**
 * PriceHistory — **V4** "listing" design. The editorial, price-forward take on a
 * listing's price-over-time card: the **latest price big**, the net change from
 * the first point (tinted `success` up / `danger` down / `muted` flat), and a
 * token-colored {@link Sparkline} of the series. Same props/behavior as
 * {@link PriceHistoryProps} — guards empty input with a muted note and never
 * indexes an empty array. Token-only colors via `useXenitionTheme()`; money uses
 * the shared `formatMoney`.
 */
export function PriceHistoryV4({
  points,
  currency = 'USD',
  title = 'Price history',
  chartHeight = 48,
  style,
}: PriceHistoryV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const card = (children: React.ReactNode): React.ReactElement => (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
        {title}
      </Text>
      {children}
    </View>
  );

  if (points.length === 0) {
    return card(
      <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No price history</Text>
    );
  }

  const first = points[0]!;
  const last = points[points.length - 1]!;
  const delta = last.cents - first.cents;
  const trendColor = delta > 0 ? colors.success : delta < 0 ? colors.danger : colors.muted;
  const arrow = delta > 0 ? '▲' : delta < 0 ? '▼' : '→';
  const pct = first.cents !== 0 ? Math.round((delta / first.cents) * 100) : 0;
  const sparkColor = delta >= 0 ? 'success' : 'danger';

  return card(
    <>
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }}>
          {formatMoney(last.cents, currency)}
        </Text>
        <Text style={{ color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
          {`${arrow} ${Math.abs(pct)}%`}
        </Text>
      </View>
      <Sparkline
        data={points.map((p) => p.cents)}
        height={chartHeight}
        color={sparkColor}
        accessibilityLabel={`Price history chart, ${points.length} points, ${
          delta >= 0 ? 'up' : 'down'
        } ${Math.abs(pct)} percent`}
      />
      {last.label || first.label ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{first.label ?? ''}</Text>
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{last.label ?? ''}</Text>
        </View>
      ) : null}
    </>
  );
}
