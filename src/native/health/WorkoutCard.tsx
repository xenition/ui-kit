import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme, type SemanticColors } from '../theme';
import { Button } from '../primitives';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter } from '../primitives/internal/motion';

/** Resolve a fill semantic key to its contrast-safe `*Text` sibling when one exists. */
function textTone(colors: SemanticColors, key: keyof SemanticColors): string {
  return (colors as unknown as Record<string, string>)[`${key}Text`] ?? colors[key];
}

export type WorkoutVariant = 'strength' | 'cardio' | 'yoga' | 'cycling' | 'running' | 'swimming' | 'hiit' | 'walking';

interface WorkoutMeta {
  glyph: string;
  label: string;
  color: keyof SemanticColors;
}

const WORKOUT_META: Record<WorkoutVariant, WorkoutMeta> = {
  strength: { glyph: '🏋️', label: 'Strength', color: 'primary' },
  cardio: { glyph: '❤️', label: 'Cardio', color: 'danger' },
  yoga: { glyph: '🧘', label: 'Yoga', color: 'accent' },
  cycling: { glyph: '🚴', label: 'Cycling', color: 'primary' },
  running: { glyph: '🏃', label: 'Running', color: 'warn' },
  swimming: { glyph: '🏊', label: 'Swimming', color: 'accent' },
  hiit: { glyph: '🔥', label: 'HIIT', color: 'danger' },
  walking: { glyph: '🚶', label: 'Walking', color: 'success' },
};

export interface WorkoutCardProps {
  /** Workout name, e.g. "Upper body push". */
  title: string;
  /** Discipline; drives the icon, tag label, and accent tone. */
  variant: WorkoutVariant;
  /** Duration in minutes. */
  durationMin?: number;
  /** Calories burned / estimated. */
  calories?: number;
  /** Optional short description or focus. */
  description?: string;
  /** Whether the workout is already completed. */
  completed?: boolean;
  /** CTA label; defaults to "Start". Hidden when `completed` or no `onStart`. */
  startLabel?: string;
  onStart?: () => void;
  /** Surface treatment for visual diversity; defaults to `classic` (the historical look). */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A workout summary card: discipline icon + tag, title, a duration / calories
 * stat strip, and a single dominant "Start" action. Completed workouts swap the
 * CTA for a `success` "Completed" note. The `variant` sets the icon and accent
 * tone. `appearance` selects the surface treatment (classic by default). Token-only colors.
 */
export function WorkoutCard({
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
}: WorkoutCardProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const meta = WORKOUT_META[variant];
  const enter = useEnter();

  return (
    <Animated.View style={{ opacity: enter.opacity, transform: enter.transform }}>
    <View
      accessibilityLabel={`${meta.label} workout: ${title}${completed ? ', completed' : ''}`}
      style={[
        {
          ...appearanceStyle(appearance, colors, tokens),
          borderRadius: tokens.radius.lg,
          padding: tokens.spacing.lg,
          gap: tokens.spacing.md,
        },
        style,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
        <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.xl }}>
          {meta.glyph}
        </Text>
        <View style={{ flex: 1, gap: 2 }}>
          <Text
            style={{ color: textTone(colors, meta.color), fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }}
          >
            {meta.label}
          </Text>
          <Text numberOfLines={1} style={{ color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }}>
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
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Duration</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {durationMin} min
            </Text>
          </View>
        ) : null}
        {calories != null ? (
          <View style={{ gap: 2 }}>
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>Calories</Text>
            <Text style={{ color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }}>
              {calories} kcal
            </Text>
          </View>
        ) : null}
      </View>

      {completed ? (
        <Text style={{ color: colors.successText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
          ✓ Completed
        </Text>
      ) : onStart ? (
        <Button variant="primary" onPress={onStart}>
          {startLabel}
        </Button>
      ) : null}
    </View>
    </Animated.View>
  );
}
