import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { StarButton } from './StarButton';
import { MailLabelChip } from './MailLabelChip';
import type { MessageListRowProps } from './MessageListRow';

/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV3Props = MessageListRowProps;

/**
 * MessageListRow — design **V3**. A **dense, Gmail-style line**: a leading unread
 * dot, the sender and subject stacked tight with the subject and preview joined
 * on one line, and the timestamp pinned to the far right. No avatar, minimal
 * padding, hairline-divided — built for long, scannable lists. Unread is bold +
 * dot + announced (never color-alone). The row is a keyboard-operable
 * `role="button"`. Same props as `MessageListRow`. No literal colors.
 */
export const MessageListRowV3 = React.forwardRef<HTMLDivElement, MessageListRowV3Props>(
  function MessageListRowV3(
    {
      sender,
      subject,
      preview,
      timestamp,
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

    return (
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={a11yLabel}
        aria-pressed={selected}
        onClick={activate}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            activate();
          }
        }}
        onContextMenu={
          onLongPress
            ? (e) => {
                e.preventDefault();
                onLongPress();
              }
            : undefined
        }
        className={cn(
          'flex w-full cursor-pointer items-center gap-[var(--xen-space-sm)] border-b border-border px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-left transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          selected ? 'bg-neutral-100' : 'bg-surface hover:bg-neutral-100',
          className
        )}
      >
        <span
          aria-hidden="true"
          className={cn('inline-block h-2 w-2 shrink-0 rounded-full', unread ? 'bg-primary' : 'bg-transparent')}
        />

        <span className="flex min-w-0 flex-1 flex-col">
          <span className="flex items-baseline gap-[var(--xen-space-xs)]">
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-sm text-on-surface',
                unread ? 'font-bold' : 'font-medium'
              )}
            >
              {sender}
            </span>
            {count > 0 ? (
              <span className="text-xs font-semibold text-muted">{count > 99 ? '99+' : String(count)}</span>
            ) : null}
            {timestamp ? (
              <span className={cn('text-xs', unread ? 'font-bold text-primary' : 'font-normal text-muted')}>
                {timestamp}
              </span>
            ) : null}
          </span>

          <span className="flex items-center gap-[var(--xen-space-xs)]">
            {hasAttachments ? <Icon glyph="📎" size="xs" color="muted" aria-label="Has attachment" /> : null}
            <span className="min-w-0 flex-1 truncate text-xs">
              <span className={cn('text-on-surface', unread ? 'font-bold' : 'font-medium')}>{subject}</span>
              {preview ? <span className="text-muted">{`  —  ${preview}`}</span> : null}
            </span>
            {onToggleStar ? (
              <span
                onClick={(e) => e.stopPropagation()}
                onKeyDown={(e) => e.stopPropagation()}
                className="inline-flex"
              >
                <StarButton starred={starred} onToggle={onToggleStar} size="sm" />
              </span>
            ) : starred ? (
              <Icon glyph="★" size="sm" color="warn" aria-label="Starred" />
            ) : null}
          </span>

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
