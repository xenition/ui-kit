import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import { BADGE_V4, spokenLine } from './internal/crm-v4';
import type { EmailThreadRowProps } from './EmailThreadRow';

export interface EmailThreadRowV4Props extends EmailThreadRowProps {
  /** The word an unread thread carries. Default `'Unread'`. */
  unreadLabel?: string;
  /** How the message count is spoken. Default `` `${n} messages` ``. */
  formatMessageCount?: (count: number) => string;
}

/**
 * **V4 email thread row** — the web twin of the native `EmailThreadRowV4`,
 * same props as {@link EmailThreadRow} plus `unreadLabel` and
 * `formatMessageCount`.
 *
 * ## Five changes
 *
 * 1. **Unread bolds the subject.** Both docblocks always said "unread → bold
 *    subject"; both twins bolded the **sender**. The subject is the thing a
 *    user scans an inbox for, and it is what changes weight now.
 * 2. **The unread wash is one colour on both twins.** Web painted
 *    `bg-primary-50` — a ramp step, so a pale band on a dark page — while
 *    native mixed `primary` at 6%. `selected`/`on-selected` is the theme's own
 *    slot for a highlighted or unread row, and it ships with a guaranteed ink.
 * 3. **The message count carries a unit.** `4` on its own says nothing; the
 *    badge still shows the numeral and the reader hears "4 messages".
 * 4. **The row is a `button` only when it is interactive.** The base wrapped
 *    every row in the same activation, so on native a plain, non-tappable row
 *    announced as a **disabled button**.
 * 5. **One accessible name, and a press is a state layer** — the base's
 *    `Unread, Ada: Renewal` dropped the snippet, the timestamp and the count.
 */
export const EmailThreadRowV4 = React.forwardRef<HTMLDivElement, EmailThreadRowV4Props>(
  function EmailThreadRowV4(
    {
      subject,
      from,
      snippet,
      avatarUrl,
      timestamp,
      unread = false,
      messageCount,
      hasAttachment = false,
      unreadLabel = 'Unread',
      formatMessageCount,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    // A thread row with no subject is the blank frame the line rules out.
    if (!subject) return null;

    const count = messageCount != null && messageCount > 1 ? messageCount : undefined;
    const countText =
      count != null ? (formatMessageCount ?? ((n: number) => `${n} messages`))(count) : undefined;

    const label = spokenLine([
      unread ? unreadLabel : undefined,
      from,
      subject,
      snippet,
      timestamp,
      countText,
    ]);

    const body = (
      <>
        {/*
          Only when there is a dot to draw. The base kept a zero-height spacer
          `<span>` on every read row — an element in the tree with nothing in
          it, doing nothing, on the far more common path.
        */}
        {unread ? (
          <span
            aria-hidden="true"
            className="h-sm w-sm shrink-0 rounded-[var(--xen-radius-full)] bg-primary"
          />
        ) : null}

        <AvatarV4 size="sm" name={from} src={avatarUrl} alt="" />

        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="flex items-center justify-between gap-xs">
            <span className="min-w-0 flex-1 truncate text-sm font-semibold text-on-surface">
              {from}
            </span>
            {timestamp ? (
              <span className="shrink-0 text-xs text-muted-text">{timestamp}</span>
            ) : null}
          </span>
          {/* The SUBJECT is what goes bold on unread — see change 1. */}
          <span
            className={cn(
              'truncate text-sm',
              unread ? 'font-bold text-on-surface' : 'text-muted-text'
            )}
          >
            {subject}
          </span>
          {snippet ? <span className="truncate text-xs text-muted-text">{snippet}</span> : null}
        </span>

        <span className="flex shrink-0 flex-col items-end gap-xs">
          {hasAttachment ? (
            <span aria-hidden="true" className="text-sm text-muted-text">
              📎
            </span>
          ) : null}
          {count != null ? (
            <BadgeV4 {...BADGE_V4} tone="neutral" aria-hidden="true">
              {count}
            </BadgeV4>
          ) : null}
        </span>
      </>
    );

    return (
      <div ref={ref} className={cn('flex w-full', className)} {...rest}>
        {onClick ? (
          <button
            type="button"
            aria-label={label}
            onClick={onClick}
            data-xen-v4-state=""
            style={
              // The pair this row actually wears, so the layer is opaque and
              // the row's own contrast promise stays measurable.
              stateGroundVars(
                unread ? 'var(--xen-selected)' : 'var(--xen-surface)',
                unread ? 'var(--xen-on-selected)' : 'var(--xen-on-surface)'
              ) as React.CSSProperties
            }
            className={cn(
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
              'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] px-sm py-sm text-left',
              MIN_TAP_CLASS,
              unread ? 'bg-selected text-on-selected' : 'bg-surface'
            )}
          >
            {body}
          </button>
        ) : (
          <div
            className={cn(
              'flex w-full items-center gap-sm rounded-[var(--xen-radius-md)] px-sm py-sm',
              unread ? 'bg-selected text-on-selected' : 'bg-surface'
            )}
          >
            {/*
              No button to carry the name, so the two facts that are drawn
              rather than written go to the reader directly.
            */}
            {unread ? <span className="sr-only">{unreadLabel}</span> : null}
            {body}
            {countText ? <span className="sr-only">{countText}</span> : null}
          </div>
        )}
      </div>
    );
  }
);
