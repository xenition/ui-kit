import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface NotificationItemProps {
  title: string;
  /** Optional supporting body line. */
  body?: string;
  /** Timestamp label, e.g. "5m ago". */
  time?: string;
  /** Shows an unread dot and a subtly tinted surface. */
  unread?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Pressable when `onPress` is supplied. Token-only.
 */
export function NotificationItem({
  title,
  body,
  time,
  unread = false,
  onPress,
  style,
}: NotificationItemProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const content = (
    <View
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          paddingVertical: tokens.spacing.sm,
          paddingHorizontal: tokens.spacing.md,
          borderRadius: tokens.radius.md,
          backgroundColor: unread ? colors.muted : colors.surface,
        },
        style,
      ]}
    >
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: tokens.radius.full,
          marginTop: 6,
          backgroundColor: unread ? colors.primary : 'transparent',
        }}
      />
      <View style={{ flex: 1, gap: 2 }}>
        <Text
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.base,
            fontWeight: unread ? '700' : '500',
          }}
        >
          {title}
        </Text>
        {body ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{body}</Text>
        ) : null}
      </View>
      {time ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>{time}</Text>
      ) : null}
    </View>
  );

  if (!onPress) {
    return (
      <View accessibilityRole="text" accessibilityLabel={`${title}${unread ? ', unread' : ''}`}>
        {content}
      </View>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${title}${unread ? ', unread' : ''}`}
      onPress={onPress}
      style={({ pressed }) => ({ opacity: pressed ? 0.7 : 1 })}
    >
      {content}
    </Pressable>
  );
}
