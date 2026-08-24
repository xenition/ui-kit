import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Icon } from '../primitives';
import { withAlpha } from './tint';

export interface ReadUnreadToggleProps {
  /** Current read state; `false` means the message is unread. */
  read?: boolean;
  /** Fires with the next read value when tapped. */
  onToggle?: (read: boolean) => void;
  /** Hide the text label and render icon-only (compact toolbars). */
  iconOnly?: boolean;
  /** Block interaction and dim. */
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

/**
 * A control that flips a message between read and unread. The glyph (open vs.
 * filled envelope) and the word label both change with state, and the tap
 * target announces the *action* ("Mark as read" / "Mark as unread") so it never
 * relies on color alone. Controlled via `read` / `onToggle`. No literal colors.
 */
export function ReadUnreadToggle({
  read = false,
  onToggle,
  iconOnly = false,
  disabled = false,
  style,
}: ReadUnreadToggleProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  // Tapping toggles: if currently read → mark unread, and vice-versa.
  const nextRead = !read;
  const actionLabel = nextRead ? 'Mark as read' : 'Mark as unread';

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={actionLabel}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => onToggle?.(nextRead)}
      hitSlop={6}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.xs,
          paddingVertical: tokens.spacing.xs,
          paddingHorizontal: iconOnly ? tokens.spacing.xs : tokens.spacing.sm,
          borderRadius: tokens.radius.md,
          backgroundColor: iconOnly ? 'transparent' : withAlpha(colors.primary, 0.1),
          opacity: disabled ? 0.5 : pressed ? 0.7 : 1,
        },
        style,
      ]}
    >
      <Icon glyph={read ? '✉️' : '📩'} size="base" color={read ? 'muted' : 'primary'} />
      {iconOnly ? null : (
        <Text
          style={{
            color: read ? colors.muted : colors.primary,
            fontSize: tokens.typography.scale.sm,
            fontWeight: '600',
          }}
        >
          {actionLabel}
        </Text>
      )}
      {/* Non-visual redundancy: current state exposed as plain text for AT. */}
      <View accessibilityElementsHidden importantForAccessibility="no" style={{ width: 0, height: 0 }} />
    </Pressable>
  );
}
