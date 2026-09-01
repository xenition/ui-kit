import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type StatisticTrend } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import type { NeighborhoodStatProps } from './NeighborhoodStat';

/** Drop-in for {@link NeighborhoodStatProps} — same props, the V4 "listing" design. */
export type NeighborhoodStatV4Props = NeighborhoodStatProps;

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

const TREND_ARROW: Record<StatisticTrend, string> = {
  up: '▲',
  down: '▼',
  flat: '→',
};

/**
 * NeighborhoodStat — **V4** "listing" design. The editorial take on a single
 * neighborhood metric: an optional glyph in a soft-primary disc, a **big value
 * numeral** with its label, and an above/below-average trend indicator (arrow +
 * delta, tinted `success` up / `danger` down / `muted` flat). Same
 * props/behavior as {@link NeighborhoodStatProps} — the value/label/suffix/
 * caption and the delta tone/arrow logic are preserved. Token-only colors via
 * `useXenitionTheme()`.
 */
export function NeighborhoodStatV4({
  label,
  value,
  delta,
  trend,
  suffix,
  glyph,
  caption,
  style,
}: NeighborhoodStatV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const resolvedTrend = trend ?? inferTrend(delta);
  const trendColor =
    resolvedTrend === 'up' ? colors.success : resolvedTrend === 'down' ? colors.danger : colors.muted;

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'flex-start',
          gap: tokens.spacing.md,
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: tokens.spacing.lg,
          shadowColor: colors.onSurface,
          shadowOpacity: 0.08,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 6 },
          elevation: 3,
        },
        style,
      ]}
    >
      {glyph ? (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.1),
          }}
        >
          <Text style={{ color: colors.primary, fontSize: tokens.typography.scale['2xl'] }}>{glyph}</Text>
        </View>
      ) : null}
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
            {value}
          </Text>
          {suffix != null ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, paddingBottom: 2 }}>
              {suffix}
            </Text>
          ) : null}
        </View>
        {delta != null ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, marginTop: tokens.spacing.xs }}>
            <Text style={{ color: trendColor, fontSize: tokens.typography.scale.xs }}>
              {TREND_ARROW[resolvedTrend]}
            </Text>
            <Text style={{ color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
              {String(delta)}
            </Text>
          </View>
        ) : null}
        {caption ? (
          <Text
            style={{
              color: colors.muted,
              fontSize: tokens.typography.scale.xs,
              marginTop: tokens.spacing.xs,
            }}
          >
            {caption}
          </Text>
        ) : null}
      </View>
    </View>
  );
}
