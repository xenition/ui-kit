import * as React from 'react';
import { Animated, Text, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';
import { Avatar, ChatBubble } from '../primitives';
import { useEnter } from '../primitives/internal/motion';
import { ReadReceipt, type ReceiptStatus } from './ReadReceipt';

export interface GroupMessage {
  /** Stable identifier. */
  id: string;
  /** Message body text. */
  text: string;
  /** Optional timestamp label shown on the last bubble (e.g. "09:41"). */
  time?: string;
}

export interface MessageGroupProps {
  /** `me` aligns right on the primary fill; `them` aligns left on a surface fill. */
  side?: 'me' | 'them';
  /** Consecutive messages from one author, oldest first. */
  messages: GroupMessage[];
  /** Author display name (shown for `them` group headers). */
  authorName?: string;
  /** Avatar image URI for the author (shown on the `them` side). */
  avatarUri?: string;
  /** Show the author avatar (default true for `them`, false for `me`). */
  showAvatar?: boolean;
  /** Delivery state for an outgoing group — a receipt on the last bubble. */
  receipt?: ReceiptStatus;
  style?: StyleProp<ViewStyle>;
}

/**
 * A run of consecutive messages from a single author, rendered as stacked
 * primitive `ChatBubble`s with a shared avatar + name header. Outgoing groups
 * can show a `ReadReceipt` on the last bubble. Incoming (`them`) groups are a
 * polite live region so new messages are announced. No literal colors.
 */
export function MessageGroup({
  side = 'them',
  messages,
  authorName,
  avatarUri,
  showAvatar,
  receipt,
  style,
}: MessageGroupProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const me = side === 'me';
  const withAvatar = showAvatar ?? !me;
  const lastIndex = messages.length - 1;
  // Incoming (and outgoing) message groups gently rise/fade in on mount.
  const enter = useEnter();

  return (
    <Animated.View
      accessibilityLiveRegion={me ? 'none' : 'polite'}
      style={[
        {
          flexDirection: 'row',
          gap: tokens.spacing.sm,
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
      <View style={{ flexShrink: 1, gap: tokens.spacing.xs, alignItems: me ? 'flex-end' : 'flex-start' }}>
        {authorName && !me ? (
          <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }}>
            {authorName}
          </Text>
        ) : null}
        {messages.map((msg, i) => {
          const isLast = i === lastIndex;
          return (
            <ChatBubble
              key={msg.id}
              side={side}
              meta={isLast && msg.time ? msg.time : undefined}
            >
              {msg.text}
            </ChatBubble>
          );
        })}
        {me && receipt ? (
          <ReadReceipt status={receipt} />
        ) : null}
      </View>
    </Animated.View>
  );
}
