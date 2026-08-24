import * as React from 'react';
import { Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';

export type MindfulnessStreakTone = 'primary' | 'accent' | 'success' | 'warn' | 'danger';

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

export interface MindfulnessStreakProps {
  /** Current consecutive-day streak. */
  count: number;
  /** Best / longest streak (shown as a secondary stat). */
  best?: number;
  /**
   * Last-7-days completion, oldest→newest. `true` = practiced that day.
   * Trailing/short arrays are tolerated; only the last 7 are shown.
   */
  week?: boolean[];
  /** Accent tone. Default `'primary'`. */
  tone?: MindfulnessStreakTone;
  /** Word for the unit. Default "day". */
  unit?: string;
  /** Prompt shown when `count` is 0. Default "Start your streak". */
  emptyLabel?: string;
  style?: StyleProp<ViewStyle>;
}

const TONE_KEY: Record<MindfulnessStreakTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * A mindfulness streak card: a flame + big day count, an optional best-streak
 * stat, and a 7-day dot strip where practiced days fill in the tone color and
 * missed days read as a muted track (state via fill + a11y label, not color
 * alone). At `count` 0 it drops the flame and shows an encouraging prompt.
 * Token-only colors (semantic slots + a `withAlpha` tint).
 */
export function MindfulnessStreak({
  count,
  best,
  week,
  tone = 'primary',
  unit = 'day',
  emptyLabel = 'Start your streak',
  style,
}: MindfulnessStreakProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const accent = colors[TONE_KEY[tone] ?? 'primary'];
  const active = count > 0;

  const last7 = (week ?? []).slice(-7);
  const summary = active
    ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
    : emptyLabel;

  return (
    <View
      accessibilityLabel={summary}
      style={[
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
        <View
          style={{
            width: 56,
            height: 56,
            borderRadius: tokens.radius.full,
            backgroundColor: withAlpha(accent, active ? 0.16 : 0.08),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
            {active ? '🔥' : '🌱'}
          </Text>
        </View>
        <View style={{ flex: 1, gap: 2 }}>
          {active ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }}>
                <Text
                  style={{
                    color: accent,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                    fontFamily: tokens.typography.fontHeading,
                  }}
                >
                  {count}
                </Text>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  {unit}
                  {count === 1 ? '' : 's'}
                </Text>
              </View>
              {best != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
                  Best {best} {unit}
                  {best === 1 ? '' : 's'}
                </Text>
              ) : null}
            </>
          ) : (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {emptyLabel}
            </Text>
          )}
        </View>
      </View>

      {last7.length > 0 ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {DAY_LABELS.map((day, i) => {
            const done = last7[i] === true;
            return (
              <View key={i} style={{ alignItems: 'center', gap: tokens.spacing.xs }}>
                <View
                  accessibilityLabel={`${done ? 'Practiced' : 'Missed'}, day ${i + 1}`}
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: tokens.radius.full,
                    borderWidth: 1,
                    borderColor: done ? accent : colors.border,
                    backgroundColor: done ? accent : withAlpha(colors.muted, 0.12),
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {done ? (
                    <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: colors.onPrimary }}>
                      ✓
                    </Text>
                  ) : null}
                </View>
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{day}</Text>
              </View>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}
