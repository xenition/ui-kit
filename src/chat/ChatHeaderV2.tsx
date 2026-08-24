import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Icon } from '../primitives';
import { PresenceDot } from './PresenceDot';
import type { ChatHeaderProps } from './ChatHeader';

/** Drop-in alternate design for {@link ChatHeader} — identical props. */
export type ChatHeaderV2Props = ChatHeaderProps;

/**
 * ChatHeader — **prominent** variant. A taller, elevated bar (drop shadow
 * instead of a divider) with a large `lg` avatar, a big extra-bold title, and
 * the presence/subtitle rendered as a colored status line — success-tinted when
 * online. Trailing actions read as real filled circular buttons in a
 * primary-tinted well rather than bare glyphs. Same props as `ChatHeader`. No
 * literal colors.
 */
export const ChatHeaderV2 = React.forwardRef<HTMLElement, ChatHeaderV2Props>(function ChatHeaderV2(
  { title, subtitle, avatarUri, presence, typing = false, onBack, onPressTitle, actions, className, ...rest },
  ref
) {
  const online = presence === 'online';

  return (
    <header
      ref={ref}
      className={cn('flex items-center gap-3 bg-surface px-4 py-3 shadow-md', className)}
      {...rest}
    >
      {onBack ? (
        <button type="button" aria-label="Back" onClick={onBack} className="shrink-0">
          <Icon glyph="‹" color="primary" size="3xl" />
        </button>
      ) : null}

      <button
        type="button"
        aria-label={title}
        onClick={onPressTitle}
        disabled={!onPressTitle}
        className="flex min-w-0 flex-1 items-center gap-3 text-left disabled:pointer-events-none"
      >
        <span className="relative shrink-0">
          <Avatar size="lg" src={avatarUri} name={title} />
          {presence ? (
            <span className="absolute bottom-0 right-0">
              <PresenceDot status={presence} />
            </span>
          ) : null}
        </span>
        <span className="min-w-0 flex-1">
          <span className="block truncate text-xl font-extrabold text-on-surface">{title}</span>
          {typing ? (
            <span aria-live="polite" className="block truncate text-sm font-semibold text-primary">
              typing…
            </span>
          ) : subtitle ? (
            <span
              className={cn(
                'block truncate text-sm',
                online ? 'font-semibold text-success' : 'text-muted'
              )}
            >
              {subtitle}
            </span>
          ) : null}
        </span>
      </button>

      {actions?.map((action) => (
        <button
          key={action.id}
          type="button"
          aria-label={action.label}
          onClick={action.onClick}
          className={cn(
            'flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10',
            'transition-colors hover:bg-primary/20 active:bg-primary/20',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300'
          )}
        >
          <Icon glyph={action.glyph} color="primary" />
        </button>
      ))}
    </header>
  );
});
