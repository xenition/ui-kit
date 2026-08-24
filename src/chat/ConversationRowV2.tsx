import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import { PresenceDot } from './PresenceDot';
import { TypingIndicator } from './TypingIndicator';
import type { ConversationRowProps } from './ConversationRow';

/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV2Props = ConversationRowProps;

/**
 * ConversationRow — **card** variant. A rounded, elevated card (margins +
 * shadow, lifts on hover) with a large `xl` avatar, the name and timestamp on
 * the top line, a bold two-line last-message preview, and a filled **unread
 * pill** in the trailing gutter. Reads as a spacious stacked-card inbox rather
 * than the flat v1 list row. Same props as `ConversationRow`. No literal colors.
 */
export const ConversationRowV2 = React.forwardRef<HTMLButtonElement, ConversationRowV2Props>(
  function ConversationRowV2(
    {
      name,
      lastMessage,
      timestamp,
      avatarUri,
      presence,
      unreadCount = 0,
      muted = false,
      typing = false,
      selected = false,
      onClick,
      onLongPress,
      className,
      ...rest
    },
    ref
  ) {
    const unread = unreadCount > 0;

    const a11yLabel = [
      name,
      typing ? 'typing' : lastMessage,
      unread ? `${unreadCount} unread` : undefined,
      muted ? 'muted' : undefined,
    ]
      .filter(Boolean)
      .join(', ');

    return (
      <button
        ref={ref}
        type="button"
        aria-label={a11yLabel}
        aria-selected={selected}
        onClick={onClick}
        onContextMenu={
          onLongPress
            ? (e) => {
                e.preventDefault();
                onLongPress();
              }
            : undefined
        }
        className={cn(
          'flex w-full items-center gap-3 rounded-lg bg-surface p-4 text-left shadow-sm',
          'mx-4 my-1 transition hover:-translate-y-0.5 hover:shadow-md active:scale-[.99]',
          'motion-reduce:transition-none motion-reduce:hover:transform-none',
          selected && 'border-2 border-primary',
          muted && !unread && 'opacity-70',
          className
        )}
        {...rest}
      >
        <span className="relative shrink-0">
          <Avatar size="xl" src={avatarUri} name={name} />
          {presence ? (
            <span className="absolute bottom-0.5 right-0.5">
              <PresenceDot status={presence} />
            </span>
          ) : null}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-1">
          <span className="flex items-center gap-1">
            <span className="min-w-0 flex-1 truncate text-lg font-bold text-on-surface">{name}</span>
            {muted ? <Icon glyph="🔇" size="sm" color="muted" aria-label="Muted" /> : null}
            {timestamp ? (
              <span
                className={cn('shrink-0 text-xs', unread ? 'font-bold text-primary' : 'text-muted')}
              >
                {timestamp}
              </span>
            ) : null}
          </span>

          <span className="flex items-center gap-2">
            {typing ? (
              <TypingIndicator name="typing…" bubble={false} />
            ) : (
              <span
                className={cn(
                  'line-clamp-2 min-w-0 flex-1 text-sm',
                  unread ? 'font-semibold text-on-surface' : 'text-muted'
                )}
              >
                {lastMessage ?? ''}
              </span>
            )}
            {unread ? (
              <span
                aria-hidden="true"
                className={cn(
                  'inline-flex min-w-6 shrink-0 items-center justify-center rounded-full bg-primary',
                  'px-2 py-0.5 text-xs font-bold text-on-primary'
                )}
              >
                {unreadCount > 99 ? '99+' : String(unreadCount)}
              </span>
            ) : null}
          </span>
        </span>
      </button>
    );
  }
);
