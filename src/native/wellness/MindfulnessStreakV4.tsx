import * as React from 'react';
import { Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { GradientSurface } from './internal/GradientSurface';
import { calmGradient, calmInk, calmInkSoft, calmTile, calmBorder } from './internal/calm';
import type { MindfulnessStreakProps } from './MindfulnessStreak';

export type MindfulnessStreakV4Props = MindfulnessStreakProps;

const DAY_LABELS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'] as const;

/**
 * MindfulnessStreakV4 — the "calm" restyle of {@link MindfulnessStreak}. Same
 * props, defaults, labels, a11y and behavior; the card becomes a soft gradient
 * hero: the streak count huge in near-white ink, the unit and best-streak stat
 * in the softer ink, and the last-7 week as frosted dots (filled vs outline).
 * The empty state (`count` 0) shows the same encouraging prompt.
 */
export function MindfulnessStreakV4({
  count,
  best,
  week,
  // tone retained for parity; the calm ground is single-hue.
  tone = 'primary',
  unit = 'day',
  emptyLabel = 'Start your streak',
  style,
}: MindfulnessStreakV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const r = tokens.ramps;
  const ink = calmInk(r);
  const inkSoft = calmInkSoft(r);
  const active = count > 0;
  void tone;

  const last7 = (week ?? []).slice(-7);
  const summary = active
    ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
    : emptyLabel;

  return (
    <View accessibilityLabel={summary} style={[{ borderRadius: tokens.radius.lg }, style]}>
      <GradientSurface
        colors={calmGradient(r)}
        style={{
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          overflow: 'hidden',
          gap: tokens.spacing.md,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: tokens.radius.full,
              backgroundColor: calmTile(r, 0.22),
              borderWidth: 1,
              borderColor: calmBorder(r),
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
                      color: ink,
                      fontSize: tokens.typography.scale['3xl'],
                      fontWeight: '800',
                      fontFamily: tokens.typography.fontHeading,
                    }}
                  >
                    {count}
                  </Text>
                  <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.sm }}>
                    {unit}
                    {count === 1 ? '' : 's'}
                  </Text>
                </View>
                {best != null ? (
                  <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>
                    Best {best} {unit}
                    {best === 1 ? '' : 's'}
                  </Text>
                ) : null}
              </>
            ) : (
              <Text style={{ color: ink, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
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
                      borderColor: calmBorder(r),
                      backgroundColor: done ? calmTile(r, 0.9) : 'transparent',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {done ? (
                      <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xs, color: tokens.ramps.primary[700] }}>
                        ✓
                      </Text>
                    ) : null}
                  </View>
                  <Text style={{ color: inkSoft, fontSize: tokens.typography.scale.xs }}>{day}</Text>
                </View>
              );
            })}
          </View>
        ) : null}
      </GradientSurface>
    </View>
  );
}
