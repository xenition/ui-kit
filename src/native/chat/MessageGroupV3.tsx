import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { withAlpha } from '../primitives/internal/color';
import { useEnter } from '../primitives/internal/motion';
import { ReadReceipt } from './ReadReceipt';
import type { MessageGroupProps } from './MessageGroup';

/** Drop-in alternate design for {@link MessageGroup} — identical props. */
export type MessageGroupV3Props = MessageGroupProps;

/**
 * MessageGroup — **flat channel row** variant (Slack feel). No bubbles and no
 * side-alignment: every group is a left-aligned block with the avatar in a
 * gutter, a bold sender name + time header, and the messages as plain flat text
 * lines. A thin vertical **sender rule** runs down the left edge — primary-tinted
 * for your own messages, a hairline border for others — so authorship reads
 * without color-filled bubbles. Same props as `MessageGroup`. No literal colors.
 */
export function MessageGroupV3({
  side = 'them',
  messages,
  authorName,
  avatarUri,
  showAvatar,
  receipt,
  style,
}: MessageGroupV3Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const me = side === 'me';
  const withAvatar = showAvatar ?? true;
  const lastIndex = messages.length - 1;
  const enter = useEnter();

  const displayName = authorName ?? (me ? 'You' : undefined);
  const lastTime = messages[lastIndex]?.time;

  return (
    <Animated.View
      accessibilityLiveRegion={me ? 'none' : 'polite'}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          alignItems: 'flex-start',
          paddingVertical: tokens.spacing.xs,
          paddingLeft: tokens.spacing.sm,
          // The sender rule: a thin left stripe, tinted for `me`.
          borderLeftWidth: 2,
          borderLeftColor: me ? withAlpha(colors.primary, 0.55) : colors.border,
          opacity: enter.opacity,
          transform: enter.transform,
        },
        style,
      ]}
    >
      {withAvatar ? (
        <Avatar size="sm" src={avatarUri} name={displayName} shape="rounded" />
      ) : null}

      <View style={{ flex: 1, gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }}>
          {displayName ? (
            <Text
              style={{
                color: me ? colors.primaryText : colors.onSurface,
                fontSize: tokens.typography.scale.sm,
                fontWeight: '700',
              }}
            >
              {displayName}
            </Text>
          ) : null}
          {lastTime ? (
            <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs }}>
              {lastTime}
            </Text>
          ) : null}
        </View>

        {messages.map((msg) => (
          <Text
            key={msg.id}
            style={{
              color: colors.onSurface,
              fontSize: tokens.typography.scale.base,
              lineHeight: tokens.typography.scale.base * 1.35,
            }}
          >
            {msg.text}
          </Text>
        ))}

        {me && receipt ? <ReadReceipt status={receipt} /> : null}
      </View>
    </Animated.View>
  );
}
