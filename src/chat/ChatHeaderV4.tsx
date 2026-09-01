import * as React from 'react';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import type { ChatHeaderProps } from './ChatHeader';
import { PresenceDotV4 } from './PresenceDotV4';
import { PRESENCE_META } from './internal/thread-v4';

export interface ChatHeaderV4Props extends ChatHeaderProps {
  /** Copy on the back control. Default `'Back'`. */
  backLabel?: string;
  /** Build the typing line. Default `'Typing…'`. */
  typingLabel?: string;
}

/**
 * **V4 chat header** — the web twin of the native `ChatHeaderV4`, same props
 * as {@link ChatHeader} plus `backLabel` and `typingLabel`.
 *
 * ## Four changes
 *
 * 1. **Presence is a word.** A green dot beside a name is the whole status,
 *    and it said nothing to a screen reader and nothing to a colour-blind
 *    user. It now reads "Online" under the title.
 * 2. **Typing *replaces* the subtitle.** The base stacked a typing line under
 *    it, so the header grew a row and the messages below jumped — on a live
 *    signal that toggles every few seconds.
 * 3. **Every action has a name and clears 44.** `ChatHeaderAction` has always
 *    carried a `label`; the base never rendered it.
 * 4. **Back is a real control**, not a glyph with a tap handler.
 */
export const ChatHeaderV4 = React.forwardRef<HTMLElement, ChatHeaderV4Props>(function ChatHeaderV4(
  {
    title,
    subtitle,
    avatarUri,
    presence,
    typing = false,
    onBack,
    onPressTitle,
    actions,
    backLabel = 'Back',
    typingLabel = 'Typing…',
    className,
    ...rest
  },
  ref
) {
  if (!title) return null;

  // Typing replaces the subtitle rather than stacking under it, so the header
  // keeps one height while a live signal flickers.
  const presenceWord = presence ? PRESENCE_META[presence].label : undefined;
  const line = typing ? typingLabel : (subtitle ?? presenceWord);

  const identity = (
    <>
      <AvatarV4 size="sm" src={avatarUri} name={title} alt="" />
      <span className="flex min-w-0 flex-col text-left">
        <span className="truncate text-sm font-semibold text-on-surface">{title}</span>
        {line != null && (
          <span className="flex items-center gap-xs">
            {presence && !typing && <PresenceDotV4 status={presence} scale="sm" />}
            <span className="truncate text-xs text-muted-text">{line}</span>
          </span>
        )}
      </span>
    </>
  );

  return (
    <header
      ref={ref}
      data-xen-chat-header=""
      className={cn(
        'flex items-center gap-sm border-b border-border bg-surface px-md py-sm',
        className
      )}
      {...rest}
    >
      {onBack && (
        <button
          type="button"
          aria-label={backLabel}
          onClick={onBack}
          data-xen-v4-chrome="on-surface"
          className={cn(
            'inline-flex aspect-square shrink-0 items-center justify-center rounded-full text-lg text-on-surface',
            MIN_TAP_CLASS
          )}
        >
          ‹
        </button>
      )}

      {onPressTitle ? (
        <button
          type="button"
          onClick={onPressTitle}
          data-xen-v4-chrome="on-surface"
          className={cn(
            'flex min-w-0 flex-1 items-center gap-sm rounded-[var(--xen-radius-md)] px-xs',
            MIN_TAP_CLASS
          )}
        >
          {identity}
        </button>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-sm px-xs">{identity}</div>
      )}

      {actions && actions.length > 0 && (
        <div className="flex shrink-0 items-center gap-xs">
          {actions.map((action) => (
            <button
              key={action.id}
              type="button"
              // The `label` the type has always carried, finally rendered.
              aria-label={action.label}
              onClick={action.onClick}
              data-xen-v4-chrome="on-surface"
              className={cn(
                'inline-flex aspect-square items-center justify-center rounded-full text-base text-on-surface',
                MIN_TAP_CLASS
              )}
            >
              {action.glyph}
            </button>
          ))}
        </div>
      )}
    </header>
  );
});
