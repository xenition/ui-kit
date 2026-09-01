import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { GradientSurface } from './internal/GradientSurface';
import { flowGradient, flowInk, flowInkSoft, flowTile, flowBorder } from './internal/flow';

export interface WeeklyReviewProps {
  /** Tasks completed this week — the big near-white headline numeral. */
  completed: number;
  /** Current streak length in days; rendered as a frosted flame tile. */
  streakDays?: number;
  /**
   * Per-day completions for the 7-bar mini chart. Each bar's height scales to the
   * week's max; heights read in near-white opacity steps.
   */
  perDay?: readonly { label: string; count: number }[];
  /** Optional focused-hours label (e.g. "12h 30m"); rendered as a frosted tile. */
  focusHours?: string;
  /** Fires on the "Share" action. Hidden when unset. */
  onShare?: () => void;
  /** Outer style override for layout composition. */
  style?: StyleProp<ViewStyle>;
}

/**
 * WeeklyReview — the weekly stats / streak hero for the productivity V4 "flow"
 * line. A brand-gradient panel that closes the week: a big near-white
 * **completed** numeral, a 7-bar mini chart of per-day completions (bars in
 * near-white opacity steps), a streak flame tile, an optional focus-hours tile,
 * and an optional "Share" CTA. Presentational — shaped data + a callback, nothing
 * fetches. Every color derives from the brand ramp via `GradientSurface` +
 * `flow*(tokens.ramps)` (bar steps via `withAlpha` on the near-white ink) — no
 * literals, light + dark.
 */
export function WeeklyReview({
  completed,
  streakDays,
  perDay,
  focusHours,
  onShare,
  style,
}: WeeklyReviewProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = flowInk(r);
  const inkSoft = flowInkSoft(r);
  const tile = flowTile(r);
  const border = flowBorder(r);

  const total = Math.max(0, Math.trunc(completed || 0));
  const bars = perDay ?? [];
  const max = bars.reduce((m, d) => Math.max(m, d.count), 0);

  const Tile = ({ glyph, label, value }: { glyph: string; label: string; value: string }) => (
    <View
      style={{
        flex: 1,
        minWidth: 0,
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        backgroundColor: tile,
        borderWidth: 1,
        borderColor: border,
        paddingHorizontal: tokens.spacing.md,
        paddingVertical: tokens.spacing.sm,
      }}
    >
      <Icon glyph={glyph} size="lg" />
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text numberOfLines={1} style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
          {value}
        </Text>
        <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{label}</Text>
      </View>
    </View>
  );

  return (
    <View style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={flowGradient(r)}
        style={{ borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden', gap: tokens.spacing.lg }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }}>
          <View style={{ flex: 1, minWidth: 0 }}>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }}>This week</Text>
            <Text
              accessibilityLabel={`${total} ${total === 1 ? 'task' : 'tasks'} completed this week`}
              allowFontScaling={false}
              style={{ color: ink, fontSize: tokens.typography.scale['3xl'] * 1.15, fontWeight: '800', letterSpacing: -1 }}
            >
              {total}
            </Text>
            <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {total === 1 ? 'task completed' : 'tasks completed'}
            </Text>
          </View>
          {onShare ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Share weekly review"
              onPress={onShare}
              style={({ pressed }) => ({
                width: 44,
                height: 44,
                borderRadius: tokens.radius.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: tile,
                borderWidth: 1,
                borderColor: border,
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Icon glyph="↗" size="lg" />
            </Pressable>
          ) : null}
        </View>

        {bars.length > 0 ? (
          <View
            accessibilityRole="image"
            accessibilityLabel={`Completed per day: ${bars.map((d) => `${d.label} ${d.count}`).join(', ')}`}
            style={{ flexDirection: 'row', alignItems: 'flex-end', gap: tokens.spacing.sm, height: 96 }}
          >
            {bars.map((d, i) => {
              const ratio = max > 0 ? d.count / max : 0;
              // Near-white opacity steps: taller bars read brighter.
              const step = ratio >= 0.75 ? 0.9 : ratio >= 0.5 ? 0.7 : ratio >= 0.25 ? 0.5 : 0.3;
              return (
                <View key={`${d.label}-${i}`} style={{ flex: 1, minWidth: 0, alignItems: 'center', gap: tokens.spacing.xs }}>
                  <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
                    <View
                      style={{
                        width: '100%',
                        height: `${Math.max(6, ratio * 100)}%`,
                        borderRadius: tokens.radius.sm,
                        backgroundColor: withAlpha(ink, step),
                      }}
                    />
                  </View>
                  <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>{d.label}</Text>
                </View>
              );
            })}
          </View>
        ) : null}

        {streakDays != null || focusHours ? (
          <View style={{ flexDirection: 'row', gap: tokens.spacing.sm }}>
            {streakDays != null ? (
              <Tile glyph="🔥" label="Day streak" value={String(Math.max(0, Math.trunc(streakDays)))} />
            ) : null}
            {focusHours ? <Tile glyph="⏱️" label="Focus time" value={focusHours} /> : null}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
