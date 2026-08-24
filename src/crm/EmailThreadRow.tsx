import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge } from '../primitives';
import { activate } from './internal';

export interface EmailThreadRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Thread subject. */
  subject: string;
  /** Sender / counterpart name. */
  from: string;
  /** Preview snippet of the latest message. */
  snippet?: string;
  /** Avatar image URL; initials fallback from `from`. */
  avatarUrl?: string;
  /** Pre-formatted time (e.g. "9:41 AM"). */
  timestamp?: string;
  /** Unread → bold subject, a leading dot and a tinted surface. */
  unread?: boolean;
  /** Number of messages in the thread (badge when > 1). */
  messageCount?: number;
  /** Show a 📎 attachment marker. */
  hasAttachment?: boolean;
  /** Click handler (renders as a keyboard-accessible button). */
  onClick?: () => void;
}

/**
 * Inbox-style row for an email thread tied to a contact / deal: sender avatar,
 * subject, snippet, timestamp and a message-count badge. Unread threads read as
 * a bold subject plus a leading primary dot **and** an "Unread" a11y hint (not
 * color alone) over a `bg-primary-50` token wash. Guards `messageCount` (badge
 * only when > 1). When `onClick` is set the row is a `role="button"` div. All
 * colors are `--xen-*` token classes.
 */
export const EmailThreadRow = React.forwardRef<HTMLDivElement, EmailThreadRowProps>(function EmailThreadRow(
  { subject, from, snippet, avatarUrl, timestamp, unread = false, messageCount, hasAttachment = false, onClick, className, ...rest },
  ref
) {
  const showCount = messageCount != null && messageCount > 1;
  const interactive = onClick ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={`${unread ? 'Unread, ' : ''}${from}: ${subject}`}
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] px-[var(--xen-space-sm)] py-[var(--xen-space-sm)]',
        unread ? 'bg-primary-50' : 'bg-surface',
        onClick && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {unread ? (
        <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-primary" />
      ) : (
        <span aria-hidden="true" className="w-2 shrink-0" />
      )}

      <Avatar size="sm" name={from} src={avatarUrl} />

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-[var(--xen-space-xs)]">
          <span className={cn('min-w-0 flex-1 truncate text-sm text-on-surface', unread ? 'font-bold' : 'font-semibold')}>{from}</span>
          {timestamp ? <span className="shrink-0 text-xs text-muted">{timestamp}</span> : null}
        </div>
        <p className={cn('truncate text-sm', unread ? 'font-semibold text-on-surface' : 'text-muted')}>{subject}</p>
        {snippet ? <p className="truncate text-xs text-muted">{snippet}</p> : null}
      </div>

      <div className="flex flex-col items-end gap-0.5">
        {hasAttachment ? (
          <span aria-hidden="true" className="text-sm text-muted">
            📎
          </span>
        ) : null}
        {showCount ? <Badge tone="neutral">{`${messageCount}`}</Badge> : null}
      </div>
    </div>
  );
});
