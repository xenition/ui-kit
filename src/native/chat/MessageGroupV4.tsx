import * as React from 'react';
import { View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ChatBubbleV4 } from '../primitives/ChatBubbleV4';
import { TextV4 } from '../primitives/TextV4';
import { ReadReceiptV4 } from './ReadReceiptV4';
import { metaLine } from './internal/thread-v4';
import type { MessageGroupProps } from './MessageGroup';

export interface MessageGroupV4Props extends MessageGroupProps {
  /**
   * Fires when a failed group's retry is pressed. Passed through to the
   * receipt, which is where a failure is actually shown.
   */
  onRetry?: () => void;
  /** Copy on that retry. Default `'Retry'`. */
  retryLabel?: string;
}

/**
 * **V4 message group** — same props as {@link MessageGroup} plus `onRetry`
 * and `retryLabel`.
 *
 * ## Four changes
 *
 * 1. **A failed group can be retried.** The receipt was the only place a
 *    failure showed and it was inert; the handler now reaches it.
 * 2. **The group is announced as one turn.** The base left the author, each
 *    bubble and the receipt as separate stops, so a reader walking a thread
 *    heard "Ada", "hi", "9:04", "Read" as four unrelated things.
 * 3. **The avatar column's width is reserved on every group**, so consecutive
 *    groups from the same author line up instead of shifting when the avatar
 *    is hidden.
 * 4. **The time is tabular**, so a stack of bubbles has a straight right edge.
 *
 * **Renders nothing for an empty `messages`** (§4.5).
 */
export function MessageGroupV4({
  side = 'them',
  messages,
  authorName,
  avatarUri,
  showAvatar = true,
  receipt,
  onRetry,
  retryLabel = 'Retry',
  style,
}: MessageGroupV4Props): React.ReactElement | null {
  const { tokens } = useXenitionTheme();
  const list = messages?.filter((m) => m?.text) ?? [];
  if (list.length === 0) return null;

  const me = side === 'me';
  const gutter = tokens.spacing['2xl'];

  return (
    <View
      accessible
      accessibilityLabel={metaLine([
        authorName,
        ...list.map((m) => m.text),
        list[list.length - 1]?.time,
      ])}
      style={[
        {
          flexDirection: me ? 'row-reverse' : 'row',
          alignItems: 'flex-end',
          gap: tokens.spacing.sm,
        },
        style,
      ]}
    >
      {/*
        The column is reserved whether or not the avatar shows, so consecutive
        groups from one author line up instead of shifting.
      */}
      <View style={{ width: me ? 0 : gutter, alignItems: 'center' }}>
        {!me && showAvatar ? <AvatarV4 src={avatarUri} name={authorName} size="sm" /> : null}
      </View>

      <View style={{ flexShrink: 1, gap: tokens.spacing.xs / 2, alignItems: me ? 'flex-end' : 'flex-start' }}>
        {!me && authorName ? (
          <TextV4 size="xs" weight="semibold" tone="mutedText">
            {authorName}
          </TextV4>
        ) : null}

        {list.map((message, i) => (
          <ChatBubbleV4
            key={message.id}
            side={side}
            meta={
              i === list.length - 1 ? (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                  }}
                >
                  {message.time ? (
                    <TextV4 size="xs" tone="mutedText" numeric="tabular">
                      {message.time}
                    </TextV4>
                  ) : null}
                  {me && receipt ? (
                    <ReadReceiptV4
                      status={receipt}
                      onRetry={receipt === 'failed' ? onRetry : undefined}
                      retryLabel={retryLabel}
                    />
                  ) : null}
                </View>
              ) : undefined
            }
          >
            {message.text}
          </ChatBubbleV4>
        ))}
      </View>
    </View>
  );
}
