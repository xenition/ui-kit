import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV3Props = WorkoutCardProps;

type WorkoutTone = 'primary' | 'danger' | 'accent' | 'warn' | 'success';

/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors: SemanticColors, key: keyof SemanticColors): string {
  return (colors as unknown as Record<string, string>)[`${key}Text`] ?? colors[key];
}

const META: Record<WorkoutVariant, { glyph: string; label: string; color: WorkoutTone }> = {
  strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
  cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
  yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
  cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
  running: { glyph: '🏃', label: 'Running', color: 'warn' },
  swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
  hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
  walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};

/**
 * WorkoutCard — **compact row** design (v3). A tinted glyph square leads, then
 * the title with its discipline label and an inline `duration · kcal` stat
 * strip, and a trailing start chip (or a `success` check when completed). Reads
 * as one line in a list. Same props as {@link WorkoutCardProps}; token-only.
 */
export function WorkoutCardV3({
  title,
  variant,
  durationMin,
  calories,
  description,
  completed = false,
  startLabel = 'Start',
  onStart,
  appearance = 'classic',
  style,
}: WorkoutCardV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = META[variant];
  const enter = useEnter();
  const press = usePressScale();
  const tint = colors[meta.color];

  const stats: string[] = [];
  if (durationMin != null) stats.push(`${durationMin} min`);
  if (calories != null) stats.push(`${calories} kcal`);
  const showStart = !completed && !!onStart;

  return (
    <Animated.View
      accessibilityLabel={`${meta.label} workout: ${title}${completed ? ', completed' : ''}`}
      style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: showStart ? press.scale : 1 }] }}
    >
      <View
        style={[
          {
            ...(appearance !== 'classic'
              ? { ...appearanceStyle(appearance, colors, tokens), borderRadius: tokens.radius.md }
              : null),
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minHeight: 60,
          },
          style,
        ]}
      >
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: tokens.radius.md,
            backgroundColor: withAlpha(tint, 0.12),
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.lg }}>
            {meta.glyph}
          </Text>
        </View>

        <View style={{ flex: 1, gap: 2 }}>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }}>
            {title}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
            <Text style={{ color: textTone(colors, meta.color), fontWeight: '700' }}>{meta.label}</Text>
            {stats.length ? `  ·  ${stats.join('  ·  ')}` : description ? `  ·  ${description}` : ''}
          </Text>
        </View>

        {completed ? (
          <Text style={{ color: colors.successText, fontSize: tokens.typography.scale.sm, fontWeight: '800' }}>✓</Text>
        ) : showStart ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`${startLabel} ${title}`}
            onPress={onStart}
            onPressIn={press.onPressIn}
            onPressOut={press.onPressOut}
            style={({ pressed }) => ({
              paddingVertical: tokens.spacing.xs,
              paddingHorizontal: tokens.spacing.md,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(colors.primary, 0.14),
              opacity: pressed ? 0.7 : 1,
            })}
          >
            <Text style={{ color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
              {startLabel}
            </Text>
          </Pressable>
        ) : null}
      </View>
    </Animated.View>
  );
}
