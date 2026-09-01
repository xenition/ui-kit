import * as React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { withAlpha } from '../primitives/internal/color';
import { DueDatePill } from './DueDatePill';
import type { ReminderRowProps } from './ReminderRow';

/** Drop-in for {@link ReminderRowProps} — same props, the V4 "flow" design. */
export type ReminderRowV4Props = ReminderRowProps;

/**
 * ReminderRow — **V4** "flow" design. The focused-workspace take on a reminder
 * line: a bell glyph seated in a **soft-primary disc**, a bigger legible title
 * over its time {@link DueDatePill}, and an enable toggle exposing a `switch`
 * a11y role with a stateful label. When the reminder is enabled the whole row
 * settles into a calm **soft-primary tint** so an active reminder reads at a
 * glance. Same props/behavior as {@link ReminderRowProps}; token-only colors via
 * `useXenitionTheme()` + `withAlpha`.
 */
export function ReminderRowV4({
  title,
  timeLabel,
  tone = 'upcoming',
  enabled = true,
  onToggle,
  onPress,
  style,
}: ReminderRowV4Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingVertical: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: enabled ? withAlpha(colors.primary, 0.08) : 'transparent',
        },
        style,
      ]}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: tokens.radius.full,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: enabled ? withAlpha(colors.primary, 0.14) : withAlpha(colors.border, 0.5),
        }}
      >
        <Text style={{ color: enabled ? colors.primaryText : colors.mutedText, fontSize: tokens.typography.scale.lg }}>
          {enabled ? '🔔' : '🔕'}
        </Text>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        disabled={!onPress}
        style={{ flex: 1, gap: 4 }}
      >
        <Text
          numberOfLines={1}
          style={{
            color: enabled ? colors.onSurface : colors.mutedText,
            fontSize: tokens.typography.scale.base,
            fontWeight: '600',
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
        style={({ pressed }) => ({
          width: 44,
          height: 44,
          alignItems: 'center',
          justifyContent: 'center',
          opacity: pressed ? 0.7 : 1,
        })}
      >
        <Text style={{ color: enabled ? colors.primaryText : colors.mutedText, fontSize: tokens.typography.scale.lg }}>
          {enabled ? '🔔' : '🔕'}
        </Text>
      </Pressable>
    </View>
  );
}
