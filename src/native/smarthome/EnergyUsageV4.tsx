import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { BarChart } from '../charts';
import type { EnergyUsageProps } from './EnergyUsage';

/** Drop-in for {@link EnergyUsageProps} — same props, the V4 "ambient" design. */
export type EnergyUsageV4Props = EnergyUsageProps;

/**
 * Trend of a usage series — compares the first vs last samples. For **usage**,
 * rising is bad: `up`→danger, `down`→success, `flat`→muted. The meaning is
 * always carried by an arrow glyph + label, never color alone.
 */
function usageTrend(
  data: number[]
): { glyph: string; label: string; color: keyof SemanticColors } | null {
  if (data.length < 2) return null;
  const first = data[0]!;
  const last = data[data.length - 1]!;
  if (last > first) return { glyph: '↑', label: 'Up', color: 'danger' };
  if (last < first) return { glyph: '↓', label: 'Down', color: 'success' };
  return { glyph: '→', label: 'Flat', color: 'muted' };
}

/**
 * EnergyUsage — **V4** "ambient" design. The calm take on an energy panel: a
 * **big kWh/cost numeral** leads, a **trend indicator** reads the series
 * (rising usage → danger, falling → success, by arrow + label so it is legible
 * without color), a soft breakdown {@link BarChart} keeps the base's per-period
 * data, and the `title` sits as the period caption. When `data` is empty the
 * card shows a muted "No usage data yet" line instead of an axis. Same
 * props/behavior as {@link EnergyUsageProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export function EnergyUsageV4({
  data,
  labels,
  title = 'Energy usage',
  total,
  unit,
  color = 'primary',
  height = 120,
  style,
}: EnergyUsageV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const hasData = data.length > 0;
  const trend = usageTrend(data);

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          padding: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }}>
        {/* Ambient accent disc. */}
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(colors.primary, 0.12),
            borderWidth: 1,
            borderColor: withAlpha(colors.primary, 0.4),
          }}
        >
          <Icon glyph="⚡" color="primary" size="lg" />
        </View>
        <View style={{ flex: 1 }}>
          {total != null ? (
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
              <Text
                style={{
                  color: colors.onSurface,
                  fontSize: tokens.typography.scale['3xl'],
                  fontWeight: '800',
                  fontFamily: tokens.typography.fontHeading,
                }}
              >
                {String(total)}
              </Text>
              {unit != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base }}>{unit}</Text>
              ) : null}
            </View>
          ) : null}
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }}>
            {title}
          </Text>
        </View>
        {trend != null ? (
          <Text
            accessibilityLabel={`Trend ${trend.label}`}
            style={{ color: colors[trend.color], fontSize: tokens.typography.scale.sm, fontWeight: '600' }}
          >
            {trend.glyph} {trend.label}
          </Text>
        ) : null}
      </View>

      <View style={{ marginTop: tokens.spacing.md }}>
        {hasData ? (
          <BarChart data={data} labels={labels} height={height} color={color} accessibilityLabel={`${title}, ${data.length} periods`} />
        ) : (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>No usage data yet</Text>
        )}
      </View>
    </View>
  );
}
