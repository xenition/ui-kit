import * as React from 'react';
import { Animated, Pressable, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, Icon } from '../primitives';
import { appearanceStyle } from '../primitives/internal/appearance';
import { withAlpha } from '../primitives/internal/color';
import { shadow } from '../primitives/internal/elevation';
import { usePressScale, useEnter } from '../primitives/internal/motion';
import { PresenceDot } from './PresenceDot';
import { TypingIndicator } from './TypingIndicator';
import type { ConversationRowProps } from './ConversationRow';

/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV2Props = ConversationRowProps;

/**
 * ConversationRow — **card** variant. A rounded, elevated card with a large
 * `xl` avatar, the name and timestamp on the top line, a bold last-message
 * preview, and a filled **unread pill** in the trailing gutter. Reads as a
 * spacious stacked-card inbox rather than the flat v1 list row. Same props as
 * `ConversationRow`, so a generator swaps only the import. No literal colors.
 */
export function ConversationRowV2({
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
}: ConversationRowV2Props): React.ReactElement {
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
      style={{
        opacity: enter.opacity,
        transform: [...enter.transform, { scale: press.scale }],
      }}
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
          appearance === 'classic'
            ? { backgroundColor: colors.surface, ...shadow('sm', tokens) }
            : appearanceStyle(appearance, colors, tokens),
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            padding: tokens.spacing.md,
            marginHorizontal: tokens.spacing.md,
            marginVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.lg,
            borderWidth: selected ? 1.5 : 0,
            borderColor: selected ? colors.primary : undefined,
            backgroundColor: pressed
              ? withAlpha(colors.primary, 0.06)
              : appearance === 'classic'
                ? colors.surface
                : undefined,
            opacity: muted && !unread ? 0.7 : 1,
          },
          style,
        ]}
      >
        <View>
          <Avatar size="xl" src={avatarUri} name={name} />
          {presence ? (
            <View style={{ position: 'absolute', bottom: 2, right: 2 }}>
              <PresenceDot status={presence} />
            </View>
          ) : null}
        </View>

        <View style={{ flex: 1, gap: tokens.spacing.xs }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }}>
            <Text
              numberOfLines={1}
              style={{
                flex: 1,
                color: colors.onSurface,
                fontSize: tokens.typography.scale.lg,
                fontWeight: '700',
              }}
            >
              {name}
            </Text>
            {muted ? <Icon glyph="🔇" size="sm" color="muted" accessibilityLabel="Muted" /> : null}
            {timestamp ? (
              <Text
                style={{
                  color: unread ? colors.primaryText : colors.muted,
                  fontSize: tokens.typography.scale.xs,
                  fontWeight: unread ? '700' : '500',
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
                numberOfLines={2}
                style={{
                  flex: 1,
                  color: unread ? colors.onSurface : colors.muted,
                  fontSize: tokens.typography.scale.base,
                  fontWeight: unread ? '600' : '400',
                }}
              >
                {lastMessage ?? ''}
              </Text>
            )}
            {unread ? (
              <View
                style={{
                  minWidth: 24,
                  paddingHorizontal: tokens.spacing.sm,
                  paddingVertical: 3,
                  borderRadius: tokens.radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: colors.primary,
                }}
              >
                <Text
                  style={{
                    color: colors.onPrimary,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                  }}
                >
                  {unreadCount > 99 ? '99+' : String(unreadCount)}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </Pressable>
    </Animated.View>
  );
}
