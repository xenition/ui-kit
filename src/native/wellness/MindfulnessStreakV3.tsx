import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import type { MindfulnessStreakProps, MindfulnessStreakTone } from './MindfulnessStreak';

/** Drop-in for {@link MindfulnessStreakProps} — same props, a different design. */
export type MindfulnessStreakV3Props = MindfulnessStreakProps;

const TONE_KEY: Record<MindfulnessStreakTone, keyof SemanticColors> = {
  primary: 'primary',
  accent: 'accent',
  success: 'success',
  warn: 'warn',
  danger: 'danger',
};

/**
 * MindfulnessStreak — **compact line** design (v3). One slim row: a small flame,
 * the day count with its unit, the best streak as a muted trailing stat, and a
 * tight inline 7-dot strip on the right (practiced days fill the tone color,
 * missed days read as a muted track — state via fill + a11y, not color alone).
 * At `count` 0 it shows a seed and an encouraging prompt. Same props as
 * {@link MindfulnessStreakProps}; token-only colors.
 */
export function MindfulnessStreakV3({
  count,
  best,
  week,
  tone = 'primary',
  unit = 'day',
  emptyLabel = 'Start your streak',
  style,
}: MindfulnessStreakV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const accent = colors[TONE_KEY[tone] ?? 'primary'];
  const active = count > 0;
  const last7 = (week ?? []).slice(-7);
  const summary = active
    ? `${count} ${unit}${count === 1 ? '' : 's'} streak${best != null ? `, best ${best}` : ''}`
    : emptyLabel;

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
      <View
        accessibilityLabel={summary}
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          },
          style,
        ]}
      >
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
          {active ? '🔥' : '🌱'}
        </Text>

        {active ? (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, flexShrink: 1 }}>
            <Text style={{ color: accent, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>{count}</Text>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
              {unit}
              {count === 1 ? '' : 's'}
            </Text>
            {best != null ? (
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>· best {best}</Text>
            ) : null}
          </View>
        ) : (
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600', flexShrink: 1 }}>
            {emptyLabel}
          </Text>
        )}

        {last7.length > 0 ? (
          <View
            accessibilityLabel={`Last ${last7.length} days`}
            style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginLeft: 'auto' }}
          >
            {last7.map((d, i) => {
              const done = d === true;
              return (
                <View
                  key={i}
                  accessibilityLabel={`${done ? 'Practiced' : 'Missed'}, day ${i + 1}`}
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: tokens.radius.full,
                    backgroundColor: done ? accent : withAlpha(colors.muted, 0.2),
                  }}
                />
              );
            })}
          </View>
        ) : null}
      </View>
    </Animated.View>
  );
}
