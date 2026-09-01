import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { MailLabelChipV4 } from './MailLabelChipV4';
import { StarButtonV4 } from './StarButtonV4';
import { ROW_SELECTED_CLASS, spokenLine, TONE_INK } from './internal/mail-v4';
import type { MessageListRowProps } from './MessageListRow';

export interface MessageListRowV4Props extends MessageListRowProps {
  /** How the thread count is spoken. Default `` (n) => `${n} messages` ``. */
  formatThreadCount?: (count: number) => string;
  /** The word for the unread state. Default `'Unread'`. */
  unreadLabel?: string;
}

/** Above this the pill reads `99+` — three digits push the timestamp out. */
const COUNT_CAP = 99;

/** How long a touch has to be held to count as a long press, in ms. */
const LONG_PRESS_MS = 500;

/**
 * **V4 message list row** — same props as {@link MessageListRow} plus
 * `formatThreadCount` and `unreadLabel`.
 *
 * ## Six changes
 *
 * 1. **The row's content reaches a screen reader again.** `role="button"` on a
 *    `div` makes every child **presentational**: the preview, the thread count
 *    and every label chip were removed from the accessibility tree outright,
 *    and the row's hand-written six-item `aria-label` — which mentioned none of
 *    them — was all a reader ever got. The row is a real `<button>` carrying
 *    one deliberate spoken name built with `spokenLine`, and that name contains
 *    what the row shows.
 * 2. **Selected and hovered are different things.** Both resolved to
 *    `bg-neutral-100`, so in a split-view inbox the mouse repainted every row
 *    it passed over as "the open one" and the actual open one was
 *    indistinguishable from wherever the pointer happened to be. Selected is
 *    the `selected` container; hover is the M3 state layer over it.
 * 3. **The star is reachable.** It sat inside the row's own pressable, which
 *    on the native twin meant the only way to star a message was to open it.
 *    It is now a sibling of the row's button, not a child of it.
 * 4. **The thread count carries a unit and is drawn as the pill its own prop
 *    doc promises.** A bare "4" beside a sender says nothing; a reader now
 *    hears "4 messages".
 * 5. **Long press works with a finger.** `onLongPress` was wired to
 *    `onContextMenu` only, so on touch web — a tablet inbox — the multi-select
 *    gesture the prop exists for did not exist.
 * 6. **`unread` is inked with `primaryText`, not the `primary` fill**, and the
 *    row announces `selected` rather than reporting itself as a pressed toggle.
 */
export const MessageListRowV4 = React.forwardRef<HTMLDivElement, MessageListRowV4Props>(
  function MessageListRowV4(
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
      formatThreadCount = (value: number) => `${value} messages`,
      unreadLabel = 'Unread',
      className,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const timer = React.useRef<ReturnType<typeof setTimeout> | null>(null);
    const fired = React.useRef(false);

    React.useEffect(
      () => () => {
        if (timer.current != null) clearTimeout(timer.current);
      },
      []
    );

    const safeLabels = labels ?? [];
    const count = threadCount > 1 ? threadCount : 0;
    const countText = count > COUNT_CAP ? `${COUNT_CAP}+` : String(count);

    // One name, and it contains what the row draws — the parts `role="button"`
    // was silently deleting.
    const label = spokenLine([
      unread ? unreadLabel : undefined,
      `from ${sender}`,
      subject,
      preview,
      count > 0 ? formatThreadCount(count) : undefined,
      ...safeLabels.map((one) => one.label),
      hasAttachments ? 'has attachment' : undefined,
      starred ? 'starred' : undefined,
      timestamp,
    ]);

    const cancelHold = (): void => {
      if (timer.current != null) {
        clearTimeout(timer.current);
        timer.current = null;
      }
    };

    return (
      <div
        ref={ref}
        className={cn(
          'flex w-full items-start gap-xs',
          selected ? ROW_SELECTED_CLASS : 'bg-surface',
          className
        )}
      >
        <button
          type="button"
          aria-label={label}
          aria-current={selected ? 'true' : undefined}
          onClick={() => {
            // A long press already did the work; the release must not open it.
            if (fired.current) {
              fired.current = false;
              return;
            }
            onClick?.();
          }}
          onPointerDown={
            onLongPress
              ? () => {
                  fired.current = false;
                  timer.current = setTimeout(() => {
                    fired.current = true;
                    onLongPress();
                  }, LONG_PRESS_MS);
                }
              : undefined
          }
          onPointerUp={onLongPress ? cancelHold : undefined}
          onPointerLeave={onLongPress ? cancelHold : undefined}
          onPointerCancel={onLongPress ? cancelHold : undefined}
          onContextMenu={
            onLongPress
              ? (e) => {
                  e.preventDefault();
                  onLongPress();
                }
              : undefined
          }
          data-xen-v4-state=""
          style={
            stateGroundVars(
              selected ? 'var(--xen-selected)' : 'var(--xen-surface)',
              selected ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'
            ) as React.CSSProperties
          }
          className={cn(
            'flex min-w-0 flex-1 items-start gap-md px-md py-sm text-left',
            MIN_TAP_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {/* The dot is reinforcement — `unreadLabel` is in the row's name. */}
          <span
            aria-hidden="true"
            className={cn(
              'mt-sm inline-block h-xs w-xs shrink-0 rounded-full',
              unread ? 'bg-primary' : 'bg-transparent'
            )}
          />
          <AvatarV4 size="md" src={avatarUri} name={sender} alt="" />

          <span className="flex min-w-0 flex-1 flex-col gap-xs">
            <span className="flex items-center gap-xs">
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-base',
                  unread ? 'font-bold' : 'font-medium'
                )}
              >
                {sender}
              </span>
              {count > 0 ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    'inline-flex shrink-0 items-center justify-center rounded-full px-xs text-xs font-bold',
                    'min-w-[calc(var(--xen-space-md)_+_var(--xen-space-xs))]',
                    'bg-muted text-on-surface'
                  )}
                >
                  {countText}
                </span>
              ) : null}
              {timestamp ? (
                <span
                  className={cn(
                    'shrink-0 text-xs',
                    unread ? cn('font-bold', TONE_INK.primary) : cn('font-normal', TONE_INK.muted)
                  )}
                >
                  {timestamp}
                </span>
              ) : null}
            </span>

            <span className="flex items-center gap-xs">
              {hasAttachments ? (
                <span aria-hidden="true" className={cn('shrink-0 text-xs leading-none', TONE_INK.muted)}>
                  📎
                </span>
              ) : null}
              <span
                className={cn(
                  'min-w-0 flex-1 truncate text-sm',
                  unread ? 'font-semibold' : 'font-normal'
                )}
              >
                {subject}
              </span>
            </span>

            {preview ? (
              <span className={cn('truncate text-sm', TONE_INK.muted)}>{preview}</span>
            ) : null}

            {safeLabels.length > 0 ? (
              <span aria-hidden="true" className="flex flex-wrap gap-xs">
                {safeLabels.map((one) => (
                  <MailLabelChipV4 key={one.id} label={one.label} tone={one.tone ?? 'neutral'} />
                ))}
              </span>
            ) : null}
          </span>
        </button>

        {/*
          A sibling of the row's button, not a child of it: nesting a control
          inside a control is what made the star unreachable on the twin.
        */}
        {onToggleStar ? (
          <StarButtonV4
            starred={starred}
            onToggle={onToggleStar}
            size="base"
            className="mt-sm mr-xs shrink-0"
          />
        ) : starred ? (
          // Decorative: "starred" is already in the row's one spoken name.
          <span
            aria-hidden="true"
            className={cn('mt-md mr-md shrink-0 text-base leading-none', TONE_INK.warn)}
          >
            ★
          </span>
        ) : null}
      </div>
    );
  }
);
