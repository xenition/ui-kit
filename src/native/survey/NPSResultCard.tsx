import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { focusGradient, focusInk, focusInkSoft, focusTile, focusBorder } from './internal/focus';
import type { NPSBucket } from './NPSScale';

export interface NPSResultCardProps {
  /** The computed Net Promoter Score, `-100`..`100` (clamped for display). */
  score: number;
  /** Total number of responses the score is computed from. */
  responses: number;
  /** Promoter count (a raw response count, not a percentage). */
  promoters: number;
  /** Passive count (a raw response count, not a percentage). */
  passives: number;
  /** Detractor count (a raw response count, not a percentage). */
  detractors: number;
  /** Hero heading over the score. Default `'Net Promoter Score'`. */
  title?: string;
  /** Container style override. */
  style?: StyleProp<ViewStyle>;
}

/** One breakdown segment keyed by its {@link NPSBucket} + its semantic token. */
type Segment = { key: NPSBucket; label: string; count: number; tone: keyof SemanticColors };

/**
 * NPSResultCard — the survey's NPS **results hero** (V4 "focus" line). The big
 * computed score (`-100`..`100`) sits on a brand gradient ground
 * (`focusGradient`) in near-white ink (`focusInk` / `focusInkSoft`) with the
 * response count as a frosted caption tile. Below, a calm surface footer breaks
 * the responses down into three token bars — promoter→success, passive→warn,
 * detractor→danger — each a proportional fill with its raw count, so meaning is
 * never color-only. `promoters` / `passives` / `detractors` are **counts** (not
 * percentages). Presentational only. Token-only colors via `useXenitionTheme()`
 * + `focus*(tokens.ramps)` (no literals), dark-mode safe.
 */
export function NPSResultCard({
  score,
  responses,
  promoters,
  passives,
  detractors,
  title = 'Net Promoter Score',
  style,
}: NPSResultCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = focusInk(r);
  const inkSoft = focusInkSoft(r);

  const clamped = Math.max(-100, Math.min(100, Math.round(score)));
  const displayScore = clamped > 0 ? `+${clamped}` : `${clamped}`;
  const total = Math.max(0, promoters) + Math.max(0, passives) + Math.max(0, detractors);
  const pct = (n: number) => (total > 0 ? Math.round((Math.max(0, n) / total) * 100) : 0);

  const segments: Segment[] = [
    { key: 'promoter', label: 'Promoters', count: promoters, tone: 'success' },
    { key: 'passive', label: 'Passives', count: passives, tone: 'warn' },
    { key: 'detractor', label: 'Detractors', count: detractors, tone: 'danger' },
  ];

  return (
    <View
      style={[
        {
          borderRadius: tokens.radius.lg,
          borderWidth: 1,
          borderColor: colors.border,
          backgroundColor: colors.card,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {/* Brand gradient hero — the computed score in near-white ink. */}
      <GradientSurface
        colors={focusGradient(r)}
        style={{ padding: tokens.spacing.xl, alignItems: 'center' }}
      >
        <Text
          style={{
            color: inkSoft,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
            letterSpacing: 0.5,
            textTransform: 'uppercase',
          }}
        >
          {title}
        </Text>
        <Text
          accessibilityLabel={`${title}: ${displayScore}`}
          allowFontScaling={false}
          style={{
            color: ink,
            fontSize: tokens.typography.scale['3xl'] * 1.6,
            fontWeight: '800',
            letterSpacing: -1,
            marginTop: tokens.spacing.xs,
          }}
        >
          {displayScore}
        </Text>
        <View
          style={{
            marginTop: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: 2,
            borderRadius: tokens.radius.full,
            backgroundColor: focusTile(r),
            borderWidth: 1,
            borderColor: focusBorder(r),
          }}
        >
          <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {responses} {responses === 1 ? 'response' : 'responses'}
          </Text>
        </View>
      </GradientSurface>

      {/* Calm surface footer — the token breakdown bars. */}
      <View
        accessibilityRole="list"
        accessibilityLabel="Response breakdown"
        style={{ padding: tokens.spacing.lg, gap: tokens.spacing.sm }}
      >
        {segments.map((s) => {
          const share = pct(s.count);
          const tone = colors[s.tone];
          return (
            <View
              key={s.key}
              accessibilityRole="progressbar"
              accessibilityValue={{ min: 0, max: 100, now: share }}
              accessibilityLabel={`${s.label}: ${Math.max(0, s.count)}, ${share}%`}
              style={{ gap: tokens.spacing.xs }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
                  <View style={{ width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: tone }} />
                  <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>
                    {s.label}
                  </Text>
                </View>
                <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
                  {Math.max(0, s.count)} · {share}%
                </Text>
              </View>
              <View
                style={{
                  height: 8,
                  borderRadius: tokens.radius.full,
                  backgroundColor: withAlpha(colors.onSurface, 0.1),
                  overflow: 'hidden',
                }}
              >
                <View style={{ width: `${share}%`, height: '100%', borderRadius: tokens.radius.full, backgroundColor: tone }} />
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
}
