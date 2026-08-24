import * as React from 'react';
import { Animated, Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Checkbox } from '../primitives';
import { type Appearance, appearanceStyle } from '../primitives/internal/appearance';
import { usePressScale } from '../primitives/internal/motion';
import { PriorityTag, type PriorityLevel } from './PriorityTag';
import { DueDatePill, type DueDateTone } from './DueDatePill';

/**
 * TaskRow layout variants:
 * - `checkbox` — leading checkbox + title only (the baseline task line).
 * - `priority` — adds a trailing {@link PriorityTag} dot.
 * - `dated`    — adds a trailing {@link DueDatePill}.
 */
export type TaskRowVariant = 'checkbox' | 'priority' | 'dated';

export interface TaskRowProps {
  /** Task title. */
  title: string;
  /** Completed state — toggles the checkbox and strikes the title. */
  done?: boolean;
  /** Fires with the next done value when the checkbox is pressed. */
  onToggle?: (done: boolean) => void;
  /** Fires when the row body (not the checkbox) is pressed. */
  onPress?: () => void;
  /** Which trailing accessory to show. */
  variant?: TaskRowVariant;
  /** Priority — required for the `priority` variant. */
  priority?: PriorityLevel;
  /** Due-date label — required for the `dated` variant. */
  dueLabel?: string;
  /** Due-date urgency tone for the `dated` variant. */
  dueTone?: DueDateTone;
  /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single task line: a leading {@link Checkbox}, the title (struck through when
 * `done`), and a variant-driven trailing accessory (priority tag or due-date
 * pill). The checkbox carries its own `checkbox` a11y role; the row body is a
 * separate pressable. No literal colors.
 */
export function TaskRow({
  title,
  done = false,
  onToggle,
  onPress,
  variant = 'checkbox',
  priority = 'low',
  dueLabel,
  dueTone = 'upcoming',
  appearance = 'classic',
  style,
}: TaskRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const press = usePressScale();

  return (
    <View
      style={[
        appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens),
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.sm,
          borderRadius: tokens.radius.md,
        },
        style,
      ]}
    >
      <Checkbox checked={done} onCheckedChange={onToggle} accessibilityLabel={title} />

      <Animated.View style={{ flex: 1, transform: [{ scale: press.scale }] }}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={title}
          onPress={onPress}
          onPressIn={press.onPressIn}
          onPressOut={press.onPressOut}
          disabled={!onPress}
          style={{ flex: 1 }}
        >
          <Text
            numberOfLines={2}
            style={{
              color: done ? colors.muted : colors.onSurface,
              fontSize: tokens.typography.scale.sm,
              fontWeight: '500',
              textDecorationLine: done ? 'line-through' : 'none',
            }}
          >
            {title}
          </Text>
        </Pressable>
      </Animated.View>

      {variant === 'priority' ? <PriorityTag level={priority} /> : null}
      {variant === 'dated' && dueLabel ? <DueDatePill label={dueLabel} tone={dueTone} /> : null}
    </View>
  );
}
