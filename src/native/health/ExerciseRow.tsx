import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { appearanceStyle, type Appearance } from '../primitives/internal/appearance';
import { useEnter, usePressScale } from '../primitives/internal/motion';

export interface ExerciseRowProps {
  /** Exercise name, e.g. "Bench press". */
  name: string;
  /** Number of sets. */
  sets?: number;
  /** Reps per set. */
  reps?: number;
  /** Load, e.g. "60 kg" or a raw number. */
  weight?: React.ReactNode;
  /** Whether the exercise is completed this session. */
  done?: boolean;
  /** Optional muscle group / meta line. */
  meta?: string;
  /** Fires with the next `done` state when toggled. */
  onToggle?: (next: boolean) => void;
  /**
   * Surface treatment for visual diversity; defaults to `classic`. For rows
   * `classic` stays transparent (the historical look).
   */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A workout-set row: exercise name, a `sets × reps` prescription, an optional
 * weight, and a completion toggle. Completed rows read muted with a success
 * check. `onToggle` receives the next boolean. `appearance` selects an optional
 * surface treatment. Token-only.
 */
export function ExerciseRow({
  name,
  sets,
  reps,
  weight,
  done = false,
  meta,
  onToggle,
  appearance = 'classic',
  style,
}: ExerciseRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const enter = useEnter();
  const press = usePressScale();

  const prescription =
    sets != null && reps != null ? `${sets} × ${reps}` : sets != null ? `${sets} sets` : reps != null ? `${reps} reps` : undefined;
  const detailParts = [prescription, weight != null ? String(weight) : undefined, meta].filter(Boolean) as string[];
  const a11y = `${name}${detailParts.length ? `, ${detailParts.join(', ')}` : ''}, ${done ? 'done' : 'not done'}`;

  const content = (
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
          minHeight: 52,
        },
        style,
      ]}
    >
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
          }}
        >
          {name}
        </Text>
        {detailParts.length ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {detailParts.join('  ·  ')}
          </Text>
        ) : null}
      </View>
      <View
        style={{
          width: 24,
          height: 24,
          borderRadius: tokens.radius.sm,
          borderWidth: 2,
          borderColor: done ? colors.success : colors.border,
          backgroundColor: done ? colors.success : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.xs, fontWeight: '700' }}>
            ✓
          </Text>
        ) : null}
      </View>
    </View>
  );

  if (!onToggle) {
    return (
      <Animated.View accessibilityLabel={a11y} style={{ opacity: enter.opacity, transform: enter.transform }}>
        {content}
      </Animated.View>
    );
  }
  return (
    <Animated.View style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityState={{ checked: done }}
        accessibilityLabel={a11y}
        onPress={() => onToggle(!done)}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
      >
        {content}
      </Pressable>
    </Animated.View>
  );
}
