import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import { PresenceDot, type Presence } from './PresenceDot';

export interface ChatHeaderAction {
  /** Stable identifier. */
  id: string;
  /** Glyph/emoji rendered via `Icon`. */
  glyph: string;
  /** Accessible label (e.g. "Call", "Video"). */
  label: string;
  onClick?: () => void;
}

export interface ChatHeaderProps extends Omit<React.HTMLAttributes<HTMLElement>, 'title'> {
  /** Conversation title (contact / group name). */
  title: string;
  /** Secondary line (e.g. "last seen 09:41", "3 members"). */
  subtitle?: string;
  /** Avatar image URL. */
  avatarUri?: string;
  /** Presence badge on the avatar. */
  presence?: Presence;
  /** When true, the subtitle is replaced by a "typing…" caption. */
  typing?: boolean;
  /** Fires when the back affordance is clicked; hidden when omitted. */
  onBack?: () => void;
  /** Fires when the title/avatar block is clicked (open profile). */
  onPressTitle?: () => void;
  /** Trailing action buttons (call, video, info…). */
  actions?: ChatHeaderAction[];
}

/**
 * Top bar for a conversation screen — optional back button, clickable
 * avatar+title block with a presence badge and subtitle (or a "typing…"
 * caption), and trailing action buttons. Rendered as a `<header>` element. No
 * literal colors.
 */
export const ChatHeader = React.forwardRef<HTMLElement, ChatHeaderProps>(function ChatHeader(
  { title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, className, ...rest },
  ref
) {
  return (
    <header
      ref={ref}
      className={cn('flex items-center gap-2 border-b border-border bg-surface px-4 py-2', className)}
      {...rest}
    >
      {onBack ? (
        <button type="button" aria-label="Back" onClick={onBack} className="shrink-0">
          <Icon glyph="‹" color="primary" size="2xl" />
        </button>
      ) : null}

      <button
        type="button"
        aria-label={title}
        onClick={onPressTitle}
        disabled={!onPressTitle}
        className="flex min-w-0 flex-1 items-center gap-2 text-left disabled:pointer-events-none"
      >
        <span className="relative shrink-0">
          <Avatar size="md" src={avatarUri} name={title} />
          {presence ? (
            <span className="absolute -bottom-px -right-px">
              <PresenceDot status={presence} />
            </span>
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-base font-semibold text-on-surface">{title}</span>
          {typing ? (
            <span aria-live="polite" className="block truncate text-xs text-primary">
              typing…
            </span>
          ) : subtitle ? (
            <span className="block truncate text-xs text-muted">{subtitle}</span>
          ) : null}
        </span>
      </button>

      {actions?.map((action) => (
        <button
          key={action.id}
          type="button"
          aria-label={action.label}
          onClick={action.onClick}
          className="shrink-0 p-1"
        >
          <Icon glyph={action.glyph} color="primary" />
        </button>
      ))}
    </header>
  );
});
