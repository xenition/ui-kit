import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, ChatBubble } from '../primitives';
import { ReadReceipt, type ReceiptStatus } from './ReadReceipt';

export interface GroupMessage {
  /** Stable identifier. */
  id: string;
  /** Message body text. */
  text: string;
  /** Optional timestamp label shown on the last bubble (e.g. "09:41"). */
  time?: string;
}

export interface MessageGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** `me` aligns right on the primary fill; `them` aligns left on a surface fill. */
  side?: 'me' | 'them';
  /** Consecutive messages from one author, oldest first. */
  messages: GroupMessage[];
  /** Author display name (shown for `them` group headers). */
  authorName?: string;
  /** Avatar image URL for the author (shown on the `them` side). */
  avatarUri?: string;
  /** Show the author avatar (default true for `them`, false for `me`). */
  showAvatar?: boolean;
  /** Delivery state for an outgoing group — a receipt on the last bubble. */
  receipt?: ReceiptStatus;
}

/**
 * A run of consecutive messages from a single author, rendered as stacked
 * primitive `ChatBubble`s with a shared avatar + name header. Outgoing groups
 * can show a `ReadReceipt` on the last bubble. Incoming (`them`) groups are a
 * polite live region so new messages are announced. No literal colors.
 */
export const MessageGroup = React.forwardRef<HTMLDivElement, MessageGroupProps>(function MessageGroup(
  { side = 'them', messages, authorName, avatarUri, showAvatar, receipt, className, ...rest },
  ref
) {
  const me = side === 'me';
  const withAvatar = showAvatar ?? !me;
  const lastIndex = messages.length - 1;

  return (
    <div
      ref={ref}
      aria-live={me ? 'off' : 'polite'}
      className={cn('flex gap-2', me ? 'justify-end' : 'justify-start', className)}
      {...rest}
    >
      {withAvatar && !me ? <Avatar size="sm" src={avatarUri} name={authorName} /> : null}
      <div className={cn('flex min-w-0 flex-col gap-1', me ? 'items-end' : 'items-start')}>
        {authorName && !me ? (
          <span className="text-xs font-semibold text-muted">{authorName}</span>
        ) : null}
        {messages.map((msg, i) => (
          <ChatBubble key={msg.id} side={side} meta={i === lastIndex && msg.time ? msg.time : undefined}>
            {msg.text}
          </ChatBubble>
        ))}
        {me && receipt ? <ReadReceipt status={receipt} /> : null}
      </div>
    </div>
  );
});
