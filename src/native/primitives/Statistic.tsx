import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export type StatisticTrend = 'up' | 'down' | 'flat';

export interface StatisticProps {
  /** Small caption above the value. */
  label: React.ReactNode;
  /** The headline number/string. */
  value: React.ReactNode;
  /** Optional change indicator shown beside the value. */
  delta?: string | number;
  /**
   * Tone/arrow for `delta`. Omit to infer from a numeric `delta`
   * (positive → up/success, negative → down/danger, 0 → flat/muted).
   */
  trend?: StatisticTrend;
  /** Optional unit/suffix rendered muted after the value (e.g. `%`, `MB`). */
  suffix?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

/**
 * Compact inline metric: caption label, a large token-scaled value, and an
 * optional up/down/flat delta. Not a card — it renders bare so it can sit in
 * rows, headers, or grids. Delta tone maps to `colors.success` / `colors.danger`
 * / `colors.muted`. All colors and sizes come from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors.
 */
export function Statistic({
  label,
  value,
  delta,
  trend,
  suffix,
  style,
}: StatisticProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const resolvedTrend = trend ?? inferTrend(delta);
  const trendColor =
    resolvedTrend === 'up' ? colors.success : resolvedTrend === 'down' ? colors.danger : colors.muted;
  const arrow = resolvedTrend === 'up' ? '▲' : resolvedTrend === 'down' ? '▼' : '→';

  return (
    <View accessibilityRole="summary" style={style}>
      {typeof label === 'string' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
      ) : (
        label
      )}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
        {typeof value === 'string' || typeof value === 'number' ? (
          <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }}>
            {value}
          </Text>
        ) : (
          value
        )}
        {suffix != null ? (
          typeof suffix === 'string' ? (
            <Text
              style={{
                color: colors.muted,
                fontSize: tokens.typography.scale.base,
                marginBottom: tokens.spacing.xs,
              }}
            >
              {suffix}
            </Text>
          ) : (
            suffix
          )
        ) : null}
      </View>
      {delta != null ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text style={{ color: trendColor, fontSize: tokens.typography.scale.xs }}>{arrow}</Text>
          <Text style={{ color: trendColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
            {String(delta)}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
