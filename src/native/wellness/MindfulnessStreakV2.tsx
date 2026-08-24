import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { MindfulnessStreakProps, MindfulnessStreakTone } from './MindfulnessStreak';

/** Drop-in for {@link MindfulnessStreakProps} — same props, a different design. */
export type MindfulnessStreakV2Props = MindfulnessStreakProps;

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

const TONE_KEY: Record<MindfulnessStreakTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

const ARC_HEIGHT = 44;
const DOT = 20;

/**
 * MindfulnessStreak — **flame hero** design (v2). A big flame in a large tinted
 * disc with a huge day count beside it and the best streak underneath, crowned
 * by the last 7 days laid out as a curved dot arc (practiced days fill the tone
 * color, missed days read as a muted track — state via fill + a11y, not color
 * alone). At `count` 0 it drops the flame for a seed and an encouraging prompt.
 * Same props as {@link MindfulnessStreakProps}; token-only colors.
 */
export function MindfulnessStreakV2({
  count,
  best,
  week,
  tone = 'primary',
  unit = 'day',
  emptyLabel = 'Start your streak',
  style,
}: MindfulnessStreakV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const accent = colors[TONE_KEY[tone] ?? 'primary'];
  const active = count > 0;
  const last7 = (week ?? []).slice(-7);
  const summary = active
    ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
    : emptyLabel;

  return (
    <Animated.View
      accessibilityLabel={summary}
      style={[{ opacity: enter.opacity, transform: enter.transform }, style]}
    >
      <View
        style={{
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderWidth: 1,
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
          alignItems: 'center',
        }}
      >
        {/* 7-day dot arc */}
        {last7.length > 0 ? (
          <View
            accessibilityLabel={`Last ${last7.length} days`}
            style={{ height: ARC_HEIGHT + DOT + 14, alignSelf: 'stretch' }}
          >
            {DAY_LABELS.map((day, i) => {
              const f = i / (DAY_LABELS.length - 1);
              const done = last7[i] === true;
              const top = ARC_HEIGHT * (1 - Math.sin(Math.PI * f));
              return (
                <View
                  key={i}
                  style={{ position: 'absolute', left: `${6 + f * 88}%`, top, marginLeft: -(DOT / 2), alignItems: 'center', gap: 3 }}
                >
                  <View
                    accessibilityLabel={`${done ? 'Practiced' : 'Missed'}, day ${i + 1}`}
                    style={{
                      width: DOT,
                      height: DOT,
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

        {/* flame + count hero */}
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 84,
              height: 84,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(accent, active ? 0.16 : 0.08),
              borderWidth: 2,
              borderColor: withAlpha(accent, active ? 0.4 : 0.16),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['3xl'] }}>
              {active ? '🔥' : '🌱'}
            </Text>
          </View>

          {active ? (
            <View style={{ gap: 2 }}>
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
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
                  {unit}
                  {count === 1 ? '' : 's'}
                </Text>
              </View>
              {best != null ? (
                <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
                  Best {best} {unit}
                  {best === 1 ? '' : 's'}
                </Text>
              ) : null}
            </View>
          ) : (
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', flexShrink: 1 }}>
              {emptyLabel}
            </Text>
          )}
        </View>
      </View>
    </Animated.View>
  );
}
