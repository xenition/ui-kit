import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import { PresenceDot } from './PresenceDot';
import { TypingIndicator } from './TypingIndicator';
import type { ConversationRowProps } from './ConversationRow';

/** Drop-in alternate design for {@link ConversationRow} — identical props. */
export type ConversationRowV3Props = ConversationRowProps;

/**
 * ConversationRow — **dense minimal** variant. A single tight line: a small
 * leading unread dot, a tiny `xs` avatar, the name and message preview flowing
 * inline (name bold, preview muted), and the timestamp pinned far-right. Rows
 * are hairline-separated for high-density inboxes (many on screen) — the
 * opposite of the spacious v2 card. Same props as `ConversationRow`. No literal
 * colors.
 */
export const ConversationRowV3 = React.forwardRef<HTMLButtonElement, ConversationRowV3Props>(
  function ConversationRowV3(
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
          'flex w-full items-center gap-2 border-b border-border px-4 py-1 text-left transition-colors',
          selected ? 'bg-primary/10' : 'bg-surface hover:bg-neutral-100',
          muted && !unread && 'opacity-60',
          className
        )}
        {...rest}
      >
        {/* Leading unread dot keeps the line single-height without a wide badge. */}
        <span
          aria-hidden="true"
          className={cn('h-1.5 w-1.5 shrink-0 rounded-full', unread ? 'bg-primary' : 'bg-transparent')}
        />

        <span className="relative shrink-0">
          <Avatar size="xs" src={avatarUri} name={name} />
          {presence ? (
            <span className="absolute -bottom-0.5 -right-0.5">
              <PresenceDot status={presence} />
            </span>
          ) : null}
        </span>

        <span
          className={cn(
            'max-w-[45%] shrink-0 truncate text-sm text-on-surface',
            unread ? 'font-bold' : 'font-semibold'
          )}
        >
          {name}
        </span>

        {typing ? (
          <span className="min-w-0 flex-1">
            <TypingIndicator name="typing…" bubble={false} />
          </span>
        ) : (
          <span
            className={cn(
              'min-w-0 flex-1 truncate text-sm',
              unread ? 'font-medium text-on-surface' : 'text-muted'
            )}
          >
            {lastMessage ?? ''}
          </span>
        )}

        {muted ? <Icon glyph="🔇" size="sm" color="muted" aria-label="Muted" /> : null}
        {timestamp ? (
          <span className={cn('shrink-0 text-xs', unread ? 'font-semibold text-primary' : 'text-muted')}>
            {timestamp}
          </span>
        ) : null}
      </button>
    );
  }
);
