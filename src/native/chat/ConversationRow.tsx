import * as React from 'react';
import { Pressable, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Badge, Icon } from '../primitives';
import { PresenceDot, type Presence } from './PresenceDot';
import { TypingIndicator } from './TypingIndicator';

export interface ConversationRowProps {
  /** Contact / group name. */
  name: string;
  /** Preview of the most recent message. */
  lastMessage?: string;
  /** Timestamp label (e.g. "09:41", "Tue"). */
  timestamp?: string;
  /** Avatar image URI. */
  avatarUri?: string;
  /** Presence badge on the avatar. */
  presence?: Presence;
  /** Unread count; > 0 renders a badge and bolds the row. */
  unreadCount?: number;
  /** Muted conversations dim and show a mute glyph. */
  muted?: boolean;
  /** When true the preview is replaced by a live "typing…" indicator. */
  typing?: boolean;
  /** Selected/active state (e.g. tablet split view). */
  selected?: boolean;
  /** Tap handler (open the conversation). */
  onPress?: () => void;
  /** Long-press handler (context actions). */
  onLongPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

/**
 * A single row in a conversation/inbox list — avatar with presence, name,
 * message preview, timestamp, and unread badge. Supports `unread` (bold +
 * count badge), `muted` (dimmed + mute glyph), and `typing` (live indicator
 * replaces the preview) states. No literal colors.
 */
export function ConversationRow({
  name,
  lastMessage,
  timestamp,
  avatarUri,
  presence,
  unreadCount = 0,
  muted = false,
  typing = false,
  selected = false,
  onPress,
  onLongPress,
  style,
}: ConversationRowProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const unread = unreadCount > 0;

  const a11yLabel = [
    name,
    typing ? 'typing' : lastMessage,
    unread ? `${unreadCount} unread` : undefined,
    muted ? 'muted' : undefined,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11yLabel}
      accessibilityState={{ selected }}
      onPress={onPress}
      onLongPress={onLongPress}
      style={({ pressed }) => [
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: tokens.spacing.md,
          paddingHorizontal: tokens.spacing.md,
          paddingVertical: tokens.spacing.sm,
          backgroundColor: selected ? colors.border : pressed ? colors.border : colors.surface,
          opacity: muted && !unread ? 0.7 : 1,
        },
        style,
      ]}
    >
      <View>
        <Avatar size="lg" src={avatarUri} name={name} />
        {presence ? (
          <View style={{ position: 'absolute', bottom: 0, right: 0 }}>
            <PresenceDot status={presence} />
          </View>
        ) : null}
      </View>

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              fontWeight: unread ? '700' : '500',
            }}
          >
            {name}
          </Text>
          {muted ? <Icon glyph="🔇" size="sm" color="muted" accessibilityLabel="Muted" /> : null}
          {timestamp ? (
            <Text
              style={{
                color: unread ? colors.primary : colors.muted,
                fontSize: tokens.typography.scale.xs,
                fontWeight: unread ? '600' : '400',
              }}
            >
              {timestamp}
            </Text>
          ) : null}
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }}>
          {typing ? (
            <TypingIndicator name="typing…" bubble={false} />
          ) : (
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: unread ? colors.onSurface : colors.muted,
                fontSize: tokens.typography.scale.sm,
                fontWeight: unread ? '500' : '400',
              }}
            >
              {lastMessage ?? ''}
            </Text>
          )}
          {unread ? (
            <Badge tone="primary">{unreadCount > 99 ? '99+' : String(unreadCount)}</Badge>
          ) : null}
        </View>
      </View>
    </Pressable>
  );
}
