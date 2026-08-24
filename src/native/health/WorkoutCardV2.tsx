import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Badge } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';
import { withAlpha } from '../primitives/internal/color';
import type { WorkoutCardProps, WorkoutVariant } from './WorkoutCard';

/** Drop-in for {@link WorkoutCardProps} — same props, a different design. */
export type WorkoutCardV2Props = WorkoutCardProps;

/** Discipline tones are a subset of {@link SemanticColors} and valid Badge tones. */
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
 * WorkoutCard — **hero** design (v2). A large discipline glyph on a tinted disc
 * anchors the card, with a tag badge, title, and an emphasized stat pair. The
 * primary action is a circular **start FAB** floating in the bottom-right;
 * completed workouts replace it with a `success` chip. Same props as
 * {@link WorkoutCardProps}; token-only colors.
 */
export function WorkoutCardV2({
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
}: WorkoutCardV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = META[variant];
  const enter = useEnter();
  const press = usePressScale();
  const tint = colors[meta.color];

  const showFab = !completed && !!onStart;

  return (
    <Animated.View
      accessibilityLabel={`${meta.label} workout: ${title}${completed ? ', completed' : ''}`}
      style={{ opacity: enter.opacity, transform: enter.transform }}
    >
      <View
        style={[
          {
            ...appearanceStyle(appearance, colors, tokens),
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            paddingBottom: showFab ? tokens.spacing['2xl'] : tokens.spacing.lg,
            gap: tokens.spacing.md,
            overflow: 'hidden',
          },
          style,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }}>
          <View
            style={{
              width: 64,
              height: 64,
              borderRadius: tokens.radius.full,
              backgroundColor: withAlpha(tint, 0.12),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale['2xl'] }}>
              {meta.glyph}
            </Text>
          </View>
          <View style={{ flex: 1, gap: tokens.spacing.xs, alignItems: 'flex-start' }}>
            <Badge tone={meta.color} variant="soft" size="sm">
              {meta.label}
            </Badge>
            <Text numberOfLines={2} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }}>
              {title}
            </Text>
          </View>
        </View>

        {description ? (
          <Text numberOfLines={2} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {description}
          </Text>
        ) : null}

        <View style={{ flexDirection: 'row', gap: tokens.spacing.xl }}>
          {durationMin != null ? (
            <View style={{ gap: 2 }}>
              <Text style={{ color: textTone(colors, meta.color), fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
                {durationMin}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>minutes</Text>
            </View>
          ) : null}
          {calories != null ? (
            <View style={{ gap: 2 }}>
              <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }}>
                {calories}
              </Text>
              <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>kcal</Text>
            </View>
          ) : null}
        </View>

        {completed ? (
          <Badge tone="success" variant="soft">
            ✓ {'Completed'}
          </Badge>
        ) : null}

        {showFab ? (
          <Animated.View
            style={{
              position: 'absolute',
              right: tokens.spacing.lg,
              bottom: tokens.spacing.lg,
              transform: [{ scale: press.scale }],
            }}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${startLabel} ${title}`}
              onPress={onStart}
              onPressIn={press.onPressIn}
              onPressOut={press.onPressOut}
              style={({ pressed }) => ({
                width: 52,
                height: 52,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.85 : 1,
              })}
            >
              <Text allowFontScaling={false} style={{ color: colors.onPrimary, fontSize: tokens.typography.scale.lg, fontWeight: '800' }}>
                ▶
              </Text>
            </Pressable>
          </Animated.View>
        ) : null}
      </View>
    </Animated.View>
  );
}
