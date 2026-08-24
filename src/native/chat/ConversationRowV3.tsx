import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { PresenceDot } from './PresenceDot';
import { TypingIndicator } from './TypingIndicator';
import type { ConversationRowProps } from './ConversationRow';

/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV3Props = ConversationRowProps;

/**
 * ConversationRow — **dense minimal** variant. A single tight line: a tiny `xs`
 * avatar, the name and message preview flowing inline (name bold, preview
 * muted), an unread state shown as a small leading dot, and the timestamp
 * pinned far-right. Built for high-density inboxes (many rows on screen) — the
 * opposite of the spacious v2 card. Same props as `ConversationRow`. No literal
 * colors.
 */
export function ConversationRowV3({
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
  appearance = 'classic',
  style,
}: ConversationRowV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const unread = unreadCount > 0;
  const press = usePressScale();
  const enter = useEnter();

  const a11yLabel = [
    name,
    typing ? 'typing' : lastMessage,
    unread ? `${unreadCount} unread` : undefined,
    muted ? 'muted' : undefined,
  ]
    .filter(Boolean)
    .join(', ');

  return (
    <Animated.View
      style={{ opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }}
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11yLabel}
        accessibilityState={{ selected }}
        onPress={onPress}
        onLongPress={onLongPress}
        onPressIn={press.onPressIn}
        onPressOut={press.onPressOut}
        style={({ pressed }) => [
          appearance === 'classic' ? null : appearanceStyle(appearance, colors, tokens),
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderBottomWidth: 1,
            borderBottomColor: withAlpha(colors.border, 0.6),
            backgroundColor:
              selected || pressed
                ? withAlpha(colors.primary, 0.08)
                : appearance === 'classic'
                  ? colors.surface
                  : undefined,
            opacity: muted && !unread ? 0.6 : 1,
          },
          style,
        ]}
      >
        {/* Leading unread dot keeps the line single-height without a wide badge. */}
        <View
          style={{
            width: 6,
            height: 6,
            borderRadius: 3,
            backgroundColor: unread ? colors.primary : 'transparent',
          }}
        />

        <View>
          <Avatar size="xs" src={avatarUri} name={name} />
          {presence ? (
            <View style={{ position: 'absolute', bottom: -2, right: -2 }}>
              <PresenceDot status={presence} size={7} />
            </View>
          ) : null}
        </View>

        <Text
          numberOfLines={1}
          style={{
            color: colors.onSurface,
            fontSize: tokens.typography.scale.sm,
            fontWeight: unread ? '700' : '600',
            flexShrink: 0,
            maxWidth: '45%',
          }}
        >
          {name}
        </Text>

        {typing ? (
          <View style={{ flex: 1 }}>
            <TypingIndicator name="typing…" bubble={false} />
          </View>
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

        {muted ? <Icon glyph="🔇" size="sm" color="muted" accessibilityLabel="Muted" /> : null}
        {timestamp ? (
          <Text
            style={{
              color: unread ? colors.primaryText : colors.muted,
              fontSize: tokens.typography.scale.xs,
              fontWeight: unread ? '600' : '400',
            }}
          >
            {timestamp}
          </Text>
        ) : null}
      </Pressable>
    </Animated.View>
  );
}
