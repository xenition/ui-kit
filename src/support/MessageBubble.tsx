import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';

/** Which side of the thread a message sits on. */
export type MessageBubbleSide = 'agent' | 'customer';

/** Delivery state for an outgoing (agent) message. */
export type MessageBubbleStatus = 'sending' | 'sent' | 'failed';

export interface MessageBubbleProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Display name of the sender (announced for a11y, shown as a muted label). */
  author: string;
  /** The message text. */
  body: string;
  /** Optional muted timestamp (e.g. "2:14 PM"). */
  time?: string;
  /**
   * Alignment + treatment. `agent` = right-aligned soft-primary tint bubble;
   * `customer` = left-aligned surface + border bubble. Defaults to `customer`.
   */
  side?: MessageBubbleSide;
  /** Optional sender avatar image URL (initials fall back to `author`). */
  avatarUrl?: string;
  /** Optional delivery hint shown under the bubble (muted, or danger when `failed`). */
  status?: MessageBubbleStatus;
}

// Delivery status → glyph + label. `failed` is the only danger-toned hint.
const STATUS_TEXT: Record<MessageBubbleStatus, string> = {
  sending: 'Sending…',
  sent: '✓ Sent',
  failed: '⚠ Failed to send',
};

/**
 * MessageBubble — **V4** "calm console" chat bubble. A single message in an
 * agent↔customer thread. Agent messages align right on a soft-primary tint
 * bubble; customer messages align left on a bordered surface bubble — one accent
 * = primary, no second color. Comfortable rounded padding, a muted sender label,
 * an optional avatar, an optional muted timestamp, and an optional delivery hint
 * (`sending`/`sent`/`failed`, the last in danger). The whole row is announced as
 * "{author} said: {body}". Presentational only. All colors from `--xen-*` token
 * classes (no literal hex). Dark-mode safe.
 */
export const MessageBubble = React.forwardRef<HTMLDivElement, MessageBubbleProps>(
  function MessageBubble(
    { author, body, time, side = 'customer', avatarUrl, status, className, ...rest },
    ref
  ) {
    const isAgent = side === 'agent';

    return (
      <div
        ref={ref}
        role="group"
        aria-label={`${author} said: ${body}`}
        className={cn('flex w-full gap-2', isAgent ? 'flex-row-reverse' : 'flex-row', className)}
        {...rest}
      >
        <Avatar size="sm" name={author} src={avatarUrl} aria-hidden="true" />
        <div className={cn('flex min-w-0 max-w-[80%] flex-col gap-1', isAgent ? 'items-end' : 'items-start')}>
          <span className="px-1 text-xs font-medium text-muted">{author}</span>
          <div
            className={cn(
              'rounded-[var(--xen-radius-lg)] px-3 py-2 text-sm leading-relaxed',
              isAgent
                ? 'bg-primary/10 text-on-surface rounded-tr-[var(--xen-radius-sm)]'
                : 'border border-border bg-surface text-on-surface rounded-tl-[var(--xen-radius-sm)]'
            )}
          >
            {body}
          </div>
          <div className={cn('flex items-center gap-2 px-1', isAgent ? 'flex-row-reverse' : 'flex-row')}>
            {time ? <span className="text-xs text-muted">{time}</span> : null}
            {status ? (
              <span className={cn('text-xs', status === 'failed' ? 'font-bold text-danger' : 'text-muted')}>
                {STATUS_TEXT[status]}
              </span>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
);
