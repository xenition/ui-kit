import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { type Appearance, appearanceStyle } from '../primitives/internal/appearance';
import { DueDatePill, type DueDateTone } from './DueDatePill';

export interface ReminderRowProps {
  /** Reminder text. */
  title: string;
  /** Pre-formatted time label (e.g. `'9:00 AM'`). */
  timeLabel?: string;
  /** Urgency tone for the time pill. */
  tone?: DueDateTone;
  /** Whether the reminder is enabled (bell on). */
  enabled?: boolean;
  /** Fires with the next enabled value when the bell is toggled. */
  onToggle?: (enabled: boolean) => void;
  /** Fires when the row body is pressed. */
  onPress?: () => void;
  /** Surface treatment (visual-diversity preset). Defaults to `classic`. */
  appearance?: Appearance;
  style?: StyleProp<ViewStyle>;
}

/**
 * A reminder line: title, an optional time {@link DueDatePill}, and a bell toggle
 * that reads as primary (on) or muted (off) and exposes a `switch` a11y role with
 * a stateful label. No literal colors.
 */
export function ReminderRow({
  title,
  timeLabel,
  tone = 'upcoming',
  enabled = true,
  onToggle,
  onPress,
  appearance = 'classic',
  style,
}: ReminderRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

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
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        disabled={!onPress}
        style={{ flex: 1, gap: 2 }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: enabled ? colors.onSurface : colors.muted,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '500',
          }}
        >
          {title}
        </Text>
        {timeLabel ? <DueDatePill label={timeLabel} tone={tone} glyph="⏰" /> : null}
      </Pressable>

      <Pressable
        accessibilityRole="switch"
        accessibilityState={{ checked: enabled }}
        accessibilityLabel={`${title} reminder`}
        onPress={() => onToggle?.(!enabled)}
        hitSlop={8}
        style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1, padding: tokens.spacing.xs })}
      >
        <Text style={{ color: enabled ? colors.primaryText : colors.muted, fontSize: tokens.typography.scale.lg }}>
          {enabled ? '🔔' : '🔕'}
        </Text>
      </Pressable>
    </View>
  );
}
