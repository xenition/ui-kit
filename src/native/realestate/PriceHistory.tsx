import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, formatMoney } from '../primitives';
import { Sparkline } from '../charts/Sparkline';

/** One point in a listing's price timeline. */
export interface PricePoint {
  /** Short axis label (e.g. "Jan", "2023"). */
  label?: string;
  /** Price in integer minor units (cents). */
  cents: number;
}

export interface PriceHistoryProps {
  /** Chronological price points. Empty renders a muted note. */
  points: PricePoint[];
  /** ISO 4217 currency (default `USD`). */
  currency?: string;
  /** Card heading. */
  title?: string;
  /** Sparkline height in px (default 48). */
  chartHeight?: number;
  style?: StyleProp<ViewStyle>;
}

/**
 * A listing's price-over-time card — the latest price, the net change from the
 * first point (tinted `success` up / `danger` down / `muted` flat), and a
 * token-bound {@link Sparkline} of the trend. Presentational: cents in, nothing
 * fetches. Guards empty input with a muted note and never indexes an empty
 * array. Token-only colors.
 */
export function PriceHistory({
  points,
  currency = 'USD',
  title = 'Price history',
  chartHeight = 48,
  style,
}: PriceHistoryProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const card = (children: React.ReactNode): React.ReactElement => (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.surface,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.sm,
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
        <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }}>
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
        accessibilityLabel={`Price history sparkline, ${points.length} points, ${
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
