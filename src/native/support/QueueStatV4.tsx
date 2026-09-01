import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Card } from '../primitives/Card';
import type { StatisticTrend } from '../primitives/Statistic';
import { withAlpha } from './internal';
import type { QueueStatProps, QueueStatTone } from './QueueStat';

/** Drop-in for {@link QueueStatProps} — same props, the V4 "calm console" design. */
export type QueueStatV4Props = QueueStatProps;

const TONE_SLOT: Record<QueueStatTone, keyof SemanticColors> = {
  neutral: 'muted',
  primary: 'primary',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

function inferTrend(delta: string | number | undefined): StatisticTrend {
  if (typeof delta === 'number') {
    if (delta > 0) return 'up';
    if (delta < 0) return 'down';
  }
  return 'flat';
}

/**
 * QueueStat — **V4** "calm console" design. A clean KPI tile: a muted caption, a
 * **big** value numeral (`scale['3xl']`, weight 800), an optional unit suffix,
 * and an optional delta indicator colored by tone (up→success / down→danger /
 * flat→muted, per the base) with a matching glyph. An optional leading glyph
 * sits in a soft-tint chip whose tone follows the base's `tone` mapping. Same
 * props/behavior as {@link QueueStatProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha` (no literal hex). Supports a `loading`
 * placeholder and an optional card surface.
 */
export function QueueStatV4({
  label,
  value,
  delta,
  trend,
  suffix,
  tone = 'neutral',
  glyph,
  loading = false,
  card = true,
  style,
}: QueueStatV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_SLOT[tone] ?? 'muted'];
  const resolvedTrend = trend ?? inferTrend(delta);
  const trendColor =
    resolvedTrend === 'up' ? colors.success : resolvedTrend === 'down' ? colors.danger : colors.muted;
  const arrow = resolvedTrend === 'up' ? '▲' : resolvedTrend === 'down' ? '▼' : '→';

  const inner = loading ? (
    <View accessibilityLabel="Loading metric" style={{ gap: tokens.spacing.xs }}>
      <View style={{ height: 10, width: '50%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.1) }} />
      <View style={{ height: 32, width: '35%', borderRadius: 4, backgroundColor: withAlpha(colors.onSurface, 0.12) }} />
    </View>
  ) : (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
      {glyph ? (
        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: tokens.radius.md,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: withAlpha(accent, 0.14),
          }}
        >
          <Text style={{ color: accent, fontSize: tokens.typography.scale.xl }}>{glyph}</Text>
        </View>
      ) : null}
      <View style={{ flex: 1, gap: 2 }}>
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{label}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.xs }}>
          {typeof value === 'string' || typeof value === 'number' ? (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }}>
              {value}
            </Text>
          ) : (
            value
          )}
          {suffix != null ? (
            typeof suffix === 'string' || typeof suffix === 'number' ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, marginBottom: tokens.spacing.xs }}>
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
    </View>
  );

  if (!card) {
    return (
      <View accessibilityLabel={`${label}: ${String(value)}`} style={style}>
        {inner}
      </View>
    );
  }

  return (
    <Card variant="elevated" padding="md" radius="lg" accessibilityLabel={`${label}: ${String(value)}`} style={style}>
      {inner}
    </Card>
  );
}
