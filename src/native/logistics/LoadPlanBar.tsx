import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { clampPct } from './internal';

export interface LoadSegment {
  /** Stable key. */
  id: string;
  /** Short label for the segment (e.g. a stop, a pallet group). */
  label?: string;
  /** Portion of total capacity this segment occupies, 0–100. */
  pct: number;
  /** Ramp emphasis for the segment fill (all token-derived). */
  emphasis?: 'strong' | 'medium' | 'soft';
}

export interface LoadPlanBarProps {
  /** Capacity segments, drawn left→right; total is clamped to 100%. */
  segments?: LoadSegment[];
  /** When no segments are given, a single utilization percentage 0–100. */
  utilization?: number;
  /** Capacity caption (e.g. `18 / 24 pallets`). */
  caption?: string;
  /** Warn styling once utilization crosses this threshold (default 90). */
  warnAt?: number;
  /** Muted placeholder while the plan is computing. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A stacked capacity/utilization bar for trailer or container load planning.
 * Either pass `segments` (each a token-ramp slice) or a single `utilization`
 * value; the bar fills proportionally and flips to a warn ramp past `warnAt`.
 * Utilization is announced via the `progressbar` role + `accessibilityValue`
 * and echoed in the caption, so fullness is never color-only. No literal
 * colors — every fill is a `tokens.ramps.*` step.
 */
export function LoadPlanBar({
  segments,
  utilization,
  caption,
  warnAt = 90,
  loading = false,
  style,
}: LoadPlanBarProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const list = Array.isArray(segments) ? segments : [];
  const total = list.length
    ? clampPct(list.reduce((sum, s) => sum + clampPct(s.pct), 0))
    : clampPct(utilization);
  const over = total >= clampPct(warnAt);

  const rampFor = (emphasis: LoadSegment['emphasis']): string => {
    if (over) return tokens.ramps.accent[400];
    if (emphasis === 'soft') return tokens.ramps.primary[200];
    if (emphasis === 'medium') return tokens.ramps.primary[400];
    return tokens.ramps.primary[500];
  };

  return (
    <View
      accessibilityRole="progressbar"
      accessibilityLabel={
        loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`
      }
      accessibilityValue={loading ? undefined : { min: 0, max: 100, now: total }}
      style={[{ gap: tokens.spacing.xs }, style]}
    >
      <View
        style={{
          height: 12,
          borderRadius: tokens.radius.full,
          backgroundColor: tokens.ramps.neutral[100],
          overflow: 'hidden',
          flexDirection: 'row',
        }}
      >
        {loading ? (
          <View style={{ width: '35%', height: '100%', backgroundColor: tokens.ramps.neutral[200] }} />
        ) : list.length ? (
          list.map((seg, i) => {
            const w = clampPct(seg.pct);
            if (w <= 0) return null;
            return (
              <View
                key={seg.id}
                style={{
                  width: `${w}%`,
                  height: '100%',
                  backgroundColor: rampFor(seg.emphasis),
                  borderRightWidth: i < list.length - 1 ? 1 : 0,
                  borderRightColor: colors.surface,
                }}
              />
            );
          })
        ) : (
          <View style={{ width: `${total}%`, height: '100%', backgroundColor: rampFor('strong') }} />
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ fontSize: tokens.typography.scale.xs, color: colors.muted }}>{caption ?? ''}</Text>
        <Text
          style={{
            fontSize: tokens.typography.scale.xs,
            fontWeight: '700',
            color: over ? colors.accent : colors.onSurface,
          }}
        >
          {`${total}%${over ? ' · near capacity' : ''}`}
        </Text>
      </View>
    </View>
  );
}
