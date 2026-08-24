import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Icon } from '../primitives';
import { PresenceDot, type Presence } from './PresenceDot';
import { TypingIndicator } from './TypingIndicator';

export interface ConversationRowProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'onClick'> {
  /** Contact / group name. */
  name: string;
  /** Preview of the most recent message. */
  lastMessage?: string;
  /** Timestamp label (e.g. "09:41", "Tue"). */
  timestamp?: string;
  /** Avatar image URL. */
  avatarUri?: string;
  /** Presence badge on the avatar. */
  presence?: Presence;
  /** Unread count; > 0 renders a badge and bolds the row. */
  unreadCount?: number;
  /** Muted conversations dim and show a mute glyph. */
  muted?: boolean;
  /** When true the preview is replaced by a live "typing…" indicator. */
  typing?: boolean;
  /** Selected/active state (e.g. tablet split view). */
  selected?: boolean;
  /** Click handler (open the conversation). */
  onClick?: () => void;
  /** Context-menu (long-press analog) handler. */
  onLongPress?: () => void;
}

/**
 * A single row in a conversation/inbox list — avatar with presence, name,
 * message preview, timestamp, and unread badge. Supports `unread` (bold +
 * count badge), `muted` (dimmed + mute glyph), and `typing` (live indicator
 * replaces the preview) states. No literal colors.
 */
export const ConversationRow = React.forwardRef<HTMLButtonElement, ConversationRowProps>(
  function ConversationRow(
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
          'flex w-full items-center gap-3 px-4 py-2 text-left transition-colors',
          selected ? 'bg-neutral-100' : 'bg-surface hover:bg-neutral-100',
          muted && !unread && 'opacity-70',
          className
        )}
        {...rest}
      >
        <span className="relative shrink-0">
          <Avatar size="lg" src={avatarUri} name={name} />
          {presence ? (
            <span className="absolute bottom-0 right-0">
              <PresenceDot status={presence} />
            </span>
          ) : null}
        </span>

        <span className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="flex items-center gap-1">
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-base text-on-surface',
                unread ? 'font-bold' : 'font-medium'
              )}
            >
              {name}
            </span>
            {muted ? <Icon glyph="🔇" size="sm" color="muted" aria-label="Muted" /> : null}
            {timestamp ? (
              <span
                className={cn(
                  'shrink-0 text-xs',
                  unread ? 'font-semibold text-primary' : 'text-muted'
                )}
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
                  'min-w-0 flex-1 truncate text-sm',
                  unread ? 'font-medium text-on-surface' : 'text-muted'
                )}
              >
                {lastMessage ?? ''}
              </span>
            )}
            {unread ? (
              <Badge tone="primary">{unreadCount > 99 ? '99+' : String(unreadCount)}</Badge>
            ) : null}
          </span>
        </span>
      </button>
    );
  }
);
