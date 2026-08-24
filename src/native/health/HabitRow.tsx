import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface HabitRowProps {
  /** Habit name, e.g. "Drink water". */
  name: string;
  /** Whether the habit is done for the current period. */
  done: boolean;
  /** Current streak length; a flame + count is shown when `> 0`. */
  streak?: number;
  /** Secondary line, e.g. "Daily · 8 glasses". */
  meta?: string;
  /** Fires with the next `done` state when the row / checkbox is toggled. */
  onToggle?: (next: boolean) => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A habit-tracker row: a tappable check control, the habit name + meta, and a
 * streak flame. Completing a habit reads in the `success` tone. `onToggle`
 * receives the next boolean state. Token-only; a11y announces done state and
 * streak.
 */
export function HabitRow({
  name,
  done,
  streak = 0,
  meta,
  onToggle,
  style,
}: HabitRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const safeStreak = Math.max(Math.floor(streak), 0);
  const a11y = `${name}, ${done ? 'done' : 'not done'}${safeStreak > 0 ? `, ${safeStreak} day streak` : ''}`;

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          minHeight: 56,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: tokens.radius.full,
          borderWidth: 2,
          borderColor: done ? colors.success : colors.border,
          backgroundColor: done ? colors.success : colors.surface,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {done ? (
          <Text allowFontScaling={false} style={{ color: colors.onSuccess, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            ✓
          </Text>
        ) : null}
      </View>
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          numberOfLines={1}
          style={{
            color: done ? colors.muted : colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
            textDecorationLine: done ? 'line-through' : 'none',
          }}
        >
          {name}
        </Text>
        {meta ? (
          <Text numberOfLines={1} style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>
            {meta}
          </Text>
        ) : null}
      </View>
      {safeStreak > 0 ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text allowFontScaling={false} style={{ fontSize: tokens.typography.scale.sm }}>
            🔥
          </Text>
          <Text style={{ color: colors.warn, fontSize: tokens.typography.scale.sm, fontWeight: '700' }}>
            {safeStreak}
          </Text>
        </View>
      ) : null}
    </View>
  );

  if (!onToggle) {
    return <View accessibilityLabel={a11y}>{content}</View>;
  }
  return (
    <Pressable
      accessibilityRole="checkbox"
      accessibilityState={{ checked: done }}
      accessibilityLabel={a11y}
      onPress={() => onToggle(!done)}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
