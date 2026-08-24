import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon, Badge } from '../primitives';
import { StarButton } from './StarButton';
import { MailLabelChip } from './MailLabelChip';
import type { MessageListRowProps } from './MessageListRow';

/** Same public contract as {@link MessageListRow} — a drop-in alternate design. */
export type MessageListRowV2Props = MessageListRowProps;

/**
 * MessageListRow — design **V2**. A tappable **card row**: a large sender avatar
 * carrying a corner unread dot, a two-line preview, a trailing timestamp, and a
 * "New" pill for the unread state (alongside bold text + the dot, so state is
 * never color-alone). Floats on a soft shadow and lifts / press-scales on
 * interaction. The `selected` state adds a primary ring + tint. Same props as
 * `MessageListRow`. No literal colors.
 */
export const MessageListRowV2 = React.forwardRef<HTMLDivElement, MessageListRowV2Props>(
  function MessageListRowV2(
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
          'flex w-full cursor-pointer items-start gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] m-[var(--xen-space-sm)] p-[var(--xen-space-md)] text-left shadow-sm transition duration-200',
          'hover:-translate-y-0.5 hover:shadow-md active:scale-[.99]',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          'motion-reduce:transition-none motion-reduce:hover:transform-none',
          selected ? 'border border-primary bg-primary/10' : 'bg-surface',
          className
        )}
      >
        <span className="relative shrink-0">
          <Avatar size="lg" src={avatarUri} name={sender} />
          {unread ? (
            <span
              aria-hidden="true"
              className="absolute -right-0.5 -top-0.5 h-3 w-3 rounded-full border-2 border-surface bg-primary"
            />
          ) : null}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]">
          <span className="flex items-center gap-[var(--xen-space-xs)]">
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-base text-on-surface',
                unread ? 'font-bold' : 'font-semibold'
              )}
            >
              {sender}
            </span>
            {timestamp ? (
              <span className={cn('text-xs', unread ? 'font-bold text-primary' : 'font-normal text-muted')}>
                {timestamp}
              </span>
            ) : null}
          </span>

          <span className="flex items-center gap-[var(--xen-space-xs)]">
            {hasAttachments ? <Icon glyph="📎" size="xs" color="muted" aria-label="Has attachment" /> : null}
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-sm text-on-surface',
                unread ? 'font-bold' : 'font-medium'
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

          {preview ? <span className="line-clamp-2 text-sm text-muted">{preview}</span> : null}

          <span className="flex flex-wrap items-center gap-[var(--xen-space-xs)]">
            {unread ? (
              <Badge tone="primary" variant="soft" size="sm">
                New
              </Badge>
            ) : null}
            {count > 0 ? (
              <Badge tone="neutral" variant="outline" size="sm">
                {count > 99 ? '99+' : String(count)}
              </Badge>
            ) : null}
            {safeLabels.map((l) => (
              <MailLabelChip key={l.id} label={l.label} tone={l.tone ?? 'neutral'} />
            ))}
          </span>
        </span>
      </div>
    );
  }
);
