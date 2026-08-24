import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import { StarButton } from './StarButton';
import { MailLabelChip, type MailLabelTone } from './MailLabelChip';

export interface MailLabelRef {
  id: string;
  label: string;
  tone?: MailLabelTone;
}

export interface MessageListRowProps {
  /** Sender display name (or "me" for sent items). */
  sender: string;
  /** Subject line. */
  subject: string;
  /** Snippet / preview of the body. */
  preview?: string;
  /** Timestamp label (e.g. "09:41", "Tue"). */
  timestamp?: string;
  /** Sender avatar image URL. */
  avatarUri?: string;
  /** Unread → bold sender/subject + a leading unread dot (announced, not color-alone). */
  unread?: boolean;
  /** Starred state (renders a trailing star toggle). */
  starred?: boolean;
  /** Toggle star; also enables the star affordance. */
  onToggleStar?: (starred: boolean) => void;
  /** Show a paperclip when the message has attachments. */
  hasAttachments?: boolean;
  /** Number of messages in the thread; > 1 shows a count pill. */
  threadCount?: number;
  /** Labels applied to the message. */
  labels?: MailLabelRef[];
  /** Selected/active state (split view / multi-select). */
  selected?: boolean;
  /** Open the message. */
  onClick?: () => void;
  /** Context / long-press affordance (enter selection / context menu). */
  onLongPress?: () => void;
  className?: string;
}

/**
 * One row in a mail list — avatar, sender, subject, preview snippet, timestamp,
 * plus star / attachment / thread-count / label affordances. The row is an
 * interactive `role="button"` element (keyboard-operable via Enter/Space); the
 * star lives in its own real `<button>` and stops propagation. The `unread`
 * variant bolds the sender+subject, shows a leading accent dot, and spells out
 * "unread" in the accessible label so the state is never color-alone. Data +
 * callbacks only; every color from token classes. No literal colors.
 */
export const MessageListRow = React.forwardRef<HTMLDivElement, MessageListRowProps>(
  function MessageListRow(
    {
      sender,
      subject,
      preview,
      timestamp,
      avatarUri,
      unread = false,
      starred = false,
      onToggleStar,
      hasAttachments = false,
      threadCount = 1,
      labels,
      selected = false,
      onClick,
      onLongPress,
      className,
    },
    ref
  ) {
    const safeLabels = labels ?? [];
    const count = threadCount > 1 ? threadCount : 0;

    const a11yLabel = [
      unread ? 'Unread' : 'Read',
      `from ${sender}`,
      subject,
      hasAttachments ? 'has attachment' : undefined,
      starred ? 'starred' : undefined,
      timestamp,
    ]
      .filter(Boolean)
      .join(', ');

    const activate = (): void => onClick?.();
    const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate();
      }
    };

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={a11yLabel}
        aria-pressed={selected}
        onClick={activate}
        onKeyDown={onKeyDown}
        onContextMenu={
          onLongPress
            ? (e) => {
                e.preventDefault();
                onLongPress();
              }
            : undefined
        }
        className={cn(
          'flex w-full cursor-pointer items-start gap-[var(--xen-space-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-left transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          selected ? 'bg-neutral-100' : 'bg-surface hover:bg-neutral-100',
          className
        )}
      >
        {/* Leading unread indicator (dot). */}
        <span
          aria-hidden="true"
          className={cn(
            'mt-[var(--xen-space-sm)] inline-block h-2 w-2 shrink-0 rounded-full',
            unread ? 'bg-primary' : 'bg-transparent'
          )}
        />
        <Avatar size="md" src={avatarUri} name={sender} />

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-base text-on-surface',
                unread ? 'font-bold' : 'font-medium'
              )}
            >
              {sender}
            </span>
            {count > 0 ? (
              <span className="text-xs font-semibold text-muted">
                {count > 99 ? '99+' : String(count)}
              </span>
            ) : null}
            {timestamp ? (
              <span
                className={cn(
                  'text-xs',
                  unread ? 'font-bold text-primary' : 'font-normal text-muted'
                )}
              >
                {timestamp}
              </span>
            ) : null}
          </span>

          <span className="flex items-center gap-[var(--xen-space-xs)]">
            {hasAttachments ? <Icon glyph="📎" size="xs" color="muted" aria-label="Has attachment" /> : null}
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-sm text-on-surface',
                unread ? 'font-semibold' : 'font-normal'
              )}
            >
              {subject}
            </span>
            {onToggleStar ? (
              <span
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="inline-flex"
              >
                <StarButton starred={starred} onToggle={onToggleStar} size="base" />
              </span>
            ) : starred ? (
              <Icon glyph="★" size="base" color="warn" aria-label="Starred" />
            ) : null}
          </span>

          {preview ? <span className="truncate text-sm text-muted">{preview}</span> : null}

          {safeLabels.length > 0 ? (
            <span className="mt-0.5 flex flex-wrap gap-[var(--xen-space-xs)]">
              {safeLabels.map((l) => (
                <MailLabelChip key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
              ))}
            </span>
          ) : null}
        </span>
      </div>
    );
  }
);
