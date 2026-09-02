import * as React from 'react';
import { Text, View, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { clampPct } from './internal';
import type { LoadPlanBarProps, LoadSegment } from './LoadPlanBar';

/** Drop-in for {@link LoadPlanBarProps} — same props, the V4 "dispatch" design. */
export type LoadPlanBarV4Props = LoadPlanBarProps;

/**
 * LoadPlanBar — **V4** "dispatch" design (native twin of the web V4). The
 * confident, operations-desk take on a trailer/container load plan: an elevated
 * rounded card with a soft shadow holding a caption row with a big legible
 * **tabular-nums** utilization figure, and a thick stacked capacity bar. Pass
 * `segments` (each a token-ramp slice) or a single `utilization`; the bar fills
 * proportionally and flips to a warn ramp past `warnAt`. Utilization is announced
 * via the `progressbar` role + `accessibilityValue` and echoed in the figure, so
 * fullness is never color-only. Token-only colors via `useXenitionTheme()`.
 */
export function LoadPlanBarV4({
  segments,
  utilization,
  caption,
  warnAt = 90,
  loading = false,
  style,
}: LoadPlanBarV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const list = Array.isArray(segments) ? segments : [];
  const total = list.length
    ? clampPct(list.reduce((sum, s) => sum + clampPct(s.pct), 0))
    : clampPct(utilization);
  const over = total >= clampPct(warnAt);
  const shell: ViewStyle = {
    backgroundColor: colors.card,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: tokens.radius.lg,
    padding: tokens.spacing.md,
    gap: tokens.spacing.sm,
    shadowColor: colors.onSurface,
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 2,
  };

  const rampFor = (emphasis: LoadSegment['emphasis']): string => {
    if (over) return tokens.ramps.accent[400];
    if (emphasis === 'soft') return tokens.ramps.primary[200];
    if (emphasis === 'medium') return tokens.ramps.primary[400];
    return tokens.ramps.primary[500];
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`}
      accessibilityValue={loading ? undefined : { min: 0, max: 100, now: total }}
      style={[shell, style]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }}>
        <Text numberOfLines={1} style={{ flex: 1, fontSize: tokens.typography.scale.sm, fontWeight: '600', color: colors.muted }}>{caption ?? 'Load plan'}</Text>
        <Text style={{ fontSize: tokens.typography.scale['2xl'], fontWeight: '700', fontVariant: ['tabular-nums'], color: over ? colors.accent : colors.onSurface }}>{`${total}%`}</Text>
      </View>

      <View style={{ height: 16, borderRadius: tokens.radius.full, backgroundColor: tokens.ramps.neutral[100], overflow: 'hidden', flexDirection: 'row' }}>
        {loading ? (
          <View style={{ width: '35%', height: '100%', backgroundColor: tokens.ramps.neutral[200] }} />
        ) : list.length ? (
          list.map((seg, i) => {
            const w = clampPct(seg.pct);
            if (w <= 0) return null;
            return (
              <View key={seg.id} style={{ width: `${w}%`, height: '100%', backgroundColor: rampFor(seg.emphasis), borderRightWidth: i < list.length - 1 ? 1 : 0, borderRightColor: colors.surface }} />
            );
          })
        ) : (
          <View style={{ width: `${total}%`, height: '100%', backgroundColor: rampFor('strong') }} />
        )}
      </View>

      {over ? (
        <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, borderRadius: tokens.radius.full, backgroundColor: withAlpha(colors.accent, 0.1) }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: colors.accent }}>⚠</Text>
          <Text style={{ fontSize: tokens.typography.scale.xs, fontWeight: '700', color: colors.accent }}>Near capacity</Text>
        </View>
      ) : null}
    </View>
  );
}
