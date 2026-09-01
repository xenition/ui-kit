import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ChatBubbleV4 } from '../primitives/ChatBubbleV4';
import type { MessageGroupProps } from './MessageGroup';
import { ReadReceiptV4 } from './ReadReceiptV4';

export interface MessageGroupV4Props extends MessageGroupProps {
  /**
   * Fires when the failed receipt's retry is clicked. Passed straight to
   * {@link ReadReceiptV4} — the receipt is where a failure actually shows.
   */
  onRetry?: () => void;
  /** Copy on that retry. */
  retryLabel?: string;
}

/**
 * **V4 message group** — the web twin of the native `MessageGroupV4`, same
 * props as {@link MessageGroup} plus `onRetry` and `retryLabel`.
 *
 * ## Four changes
 *
 * 1. **A failed send can be retried**, through the receipt.
 * 2. **The group is one labelled list**, so a reader hears "Ada, 3 messages"
 *    and can step through them, rather than meeting a wall of bubbles with no
 *    author attached to any of them.
 * 3. **The avatar column is reserved even when the avatar is hidden**, so
 *    consecutive groups from the same author stay on one left edge instead of
 *    stepping in and out.
 * 4. **Renders nothing for an empty `messages`** (§4.5) — the base drew an
 *    avatar and a receipt attached to no message at all.
 */
export const MessageGroupV4 = React.forwardRef<HTMLDivElement, MessageGroupV4Props>(
  function MessageGroupV4(
    {
      side = 'them',
      messages,
      authorName,
      avatarUri,
      showAvatar = true,
      receipt,
      onRetry,
      retryLabel,
      className,
      ...rest
    },
    ref
  ) {
    const list = messages?.filter((m) => m?.id != null) ?? [];
    if (list.length === 0) return null;

    const me = side === 'me';
    const groupName = authorName
      ? `${authorName}, ${list.length} ${list.length === 1 ? 'message' : 'messages'}`
      : undefined;

    return (
      <div
        ref={ref}
        className={cn('flex w-full gap-sm', me ? 'flex-row-reverse' : 'flex-row', className)}
        {...rest}
      >
        {!me && (
          // Reserved even when hidden, so consecutive groups keep one edge.
          <div className="w-8 shrink-0">
            {showAvatar && <AvatarV4 size="sm" src={avatarUri} name={authorName} alt="" />}
          </div>
        )}

        <ul
          aria-label={groupName}
          className={cn('flex min-w-0 flex-1 flex-col gap-xs', me ? 'items-end' : 'items-start')}
        >
          {list.map((message, index) => (
            <li key={message.id} className={cn('flex w-full', me ? 'justify-end' : 'justify-start')}>
              <ChatBubbleV4
                side={side}
                meta={
                  index === 0 && authorName && !me
                    ? authorName
                    : index === list.length - 1
                      ? message.time
                      : undefined
                }
              >
                {message.text}
              </ChatBubbleV4>
            </li>
          ))}
        </ul>

        {me && receipt != null && (
          <div className="flex shrink-0 items-end pb-xs">
            <ReadReceiptV4 status={receipt} onRetry={onRetry} retryLabel={retryLabel} />
          </div>
        )}
      </div>
    );
  }
);
