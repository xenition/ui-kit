import * as React from 'react';
import { Animated, Text, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { ReadReceipt } from './ReadReceipt';
import type { MessageGroupProps } from './MessageGroup';

/** Drop-in alternate design for {@link MessageGroup} — identical props. */
export type MessageGroupV2Props = MessageGroupProps;

/**
 * MessageGroup — **tailed bubbles** variant (iMessage feel). Rather than the v1
 * stack of uniform rounded `ChatBubble`s, this draws its own bubbles where the
 * *last* bubble in the run grows a directional tail (a squared-off bottom
 * corner) toward the author's side, and the group's avatar sits inline beside
 * the run. Outgoing bubbles use the primary fill; incoming use the surface fill.
 * Same props as `MessageGroup`. No literal colors.
 */
export function MessageGroupV2({
  side = 'them',
  messages,
  authorName,
  avatarUri,
  showAvatar,
  receipt,
  style,
}: MessageGroupV2Props): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const me = side === 'me';
  const withAvatar = showAvatar ?? !me;
  const lastIndex = messages.length - 1;
  const enter = useEnter();

  const bubbleRadius = tokens.radius.lg;
  const tail = tokens.radius.sm;

  return (
    <Animated.View
      accessibilityLiveRegion={me ? 'none' : 'polite'}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
          alignItems: 'flex-end',
          justifyContent: me ? 'flex-end' : 'flex-start',
          opacity: enter.opacity,
          transform: enter.transform,
        },
        style,
      ]}
    >
      {withAvatar && !me ? (
        <Avatar size="sm" src={avatarUri} name={authorName} />
      ) : null}

      <View
        style={{
          flexShrink: 1,
          gap: 3,
          alignItems: me ? 'flex-end' : 'flex-start',
          maxWidth: '78%',
        }}
      >
        {authorName && !me ? (
          <Text
            style={{
              color: colors.accentText,
              fontSize: tokens.typography.scale.xs,
              fontWeight: '700',
              marginLeft: tokens.spacing.sm,
            }}
          >
            {authorName}
          </Text>
        ) : null}

        {messages.map((msg, i) => {
          const isLast = i === lastIndex;
          // The tail is a single squared-off bottom corner on the last bubble,
          // pointing toward the speaker's edge — the iMessage silhouette.
          const meTail = me && isLast ? tail : bubbleRadius;
          const themTail = !me && isLast ? tail : bubbleRadius;
          return (
            <View
              key={msg.id}
              style={{
                borderRadius: bubbleRadius,
                borderBottomRightRadius: meTail,
                borderBottomLeftRadius: themTail,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                backgroundColor: me ? colors.primary : colors.surface,
                borderWidth: me ? 0 : 1,
                borderColor: colors.border,
              }}
            >
              <Text
                style={{
                  color: me ? colors.onPrimary : colors.onSurface,
                  fontSize: tokens.typography.scale.base,
                }}
              >
                {msg.text}
              </Text>
              {isLast && msg.time ? (
                <Text
                  style={{
                    marginTop: 2,
                    alignSelf: 'flex-end',
                    color: me ? colors.onPrimary : colors.muted,
                    opacity: me ? 0.8 : 1,
                    fontSize: tokens.typography.scale.xs,
                  }}
                >
                  {msg.time}
                </Text>
              ) : null}
            </View>
          );
        })}

        {me && receipt ? <ReadReceipt status={receipt} /> : null}
      </View>
    </Animated.View>
  );
}
