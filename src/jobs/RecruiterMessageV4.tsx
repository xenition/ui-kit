import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { AvatarV4 } from '../primitives/AvatarV4';
import { ButtonV4 } from '../primitives/ButtonV4';
import { cn } from '../primitives/cn';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  rowEdgeClass,
  rowHeightClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import type { RecruiterMessageProps } from './RecruiterMessage';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  relativeLabel,
  spokenLine,
} from './internal/tone-v4';

export interface RecruiterMessageV4Props extends RecruiterMessageProps {
  /** Copy on the reply action. Default `'Reply'`. */
  replyLabel?: string;
  /** Render the sent age. Default `'3d ago'`, floored. */
  formatRelative?: (iso: string) => string;
  /** The last row in a list — drops the separator that would hang off the end. */
  last?: boolean;
}

/** Said before everything else when a message has not been read. */
const UNREAD_WORD = 'Unread';

/**
 * **V4 recruiter message** — same props as {@link RecruiterMessage} plus
 * `replyLabel`, `formatRelative` and `last`.
 *
 * ## Five changes
 *
 * 1. **Reply works from the keyboard.** It was a `<button>` inside a
 *    `<div role="button">` that ran `preventDefault(); onClick()` on the
 *    bubbled keydown — cancelling Reply's own activation and opening the
 *    thread instead. Tab to Reply, press Enter, and you are reading the
 *    message you meant to answer. The row is a plain container now and Reply
 *    is a **sibling** of the activation.
 * 2. **The message is announced.** The base's `aria-label` sat on a bare
 *    `<div>`, which ARIA forbids naming, so on Chrome and Firefox the sender,
 *    the company and the unread state reached nobody — and the preview, the
 *    part that decides whether the message is worth opening, was never in the
 *    label at all. It is now one sentence: unread, sender, company, preview,
 *    age.
 * 3. **Reply is a real tap target.** It was a bare `text-xs` word — roughly 16
 *    CSS pixels tall — and it is one of two controls on the row.
 * 4. **The sent age stops rounding up.** A message sent 90 minutes ago read
 *    "2h ago", which is a different afternoon.
 * 5. **It joins the shared row family**, and the preview and meta lines take
 *    `muted-text` rather than `muted` — a fill slot with no contrast promise —
 *    with press as a state layer rather than `hover:opacity-95`.
 */
export const RecruiterMessageV4 = React.forwardRef<HTMLDivElement, RecruiterMessageV4Props>(
  function RecruiterMessageV4(
    { message, onClick, onReply, replyLabel = 'Reply', formatRelative, last = false, className, ...rest },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
      injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);
    }, []);

    const sent = relativeLabel(message.sentAt, formatRelative);
    const unread = !!message.unread;

    const name = spokenLine([
      unread ? UNREAD_WORD : undefined,
      message.senderName,
      message.company,
      message.preview,
      sent,
    ]);

    const summary = (
      <>
        <span className={cn(ROW_V4_LEADING_CLASS, 'relative')}>
          <AvatarV4 src={message.senderAvatarUrl} name={message.senderName} size="md" alt="" />
          {/*
            A dot is never the only signal: the weight below changes too, and
            the word "Unread" opens the row's name.
          */}
          {unread ? (
            <span
              aria-hidden="true"
              data-xen-v4-unread-dot=""
              className={cn(
                'absolute right-0 top-0 h-sm w-sm rounded-[var(--xen-radius-full)]',
                'border border-card bg-primary'
              )}
            />
          ) : null}
        </span>

        <span className={ROW_V4_TEXT_CLASS}>
          <span className="flex items-baseline justify-between gap-sm">
            <span
              className={cn(
                'min-w-0 flex-1 truncate text-sm text-on-card',
                unread ? 'font-bold' : 'font-semibold'
              )}
            >
              {message.senderName}
              {message.company ? (
                <span className="font-normal text-muted-text">{` · ${message.company}`}</span>
              ) : null}
            </span>
            {sent ? <span className="shrink-0 text-xs text-muted-text">{sent}</span> : null}
          </span>
          <span
            className={cn(
              'line-clamp-2 text-sm',
              unread ? 'font-medium text-on-card' : 'font-normal text-muted-text'
            )}
          >
            {message.preview}
          </span>
        </span>
      </>
    );

    return (
      <div
        ref={ref}
        data-xen-v4-recruiter-message=""
        data-xen-v4-row=""
        className={cn(
          ROW_V4_BASE_CLASS,
          'items-start',
          rowHeightClass(true),
          !last && rowEdgeClass(),
          className
        )}
        {...rest}
      >
        {onClick ? (
          <button
            type="button"
            aria-label={name}
            onClick={() => onClick(message)}
            data-xen-v4-state=""
            style={cardStateVars()}
            className={cn(
              'flex min-w-0 flex-1 items-start gap-md rounded-[var(--xen-radius-md)] text-left',
              MIN_TAP_CLASS,
              FOCUS_RING_CLASS
            )}
          >
            {summary}
          </button>
        ) : (
          <div className="flex min-w-0 flex-1 items-start gap-md">{summary}</div>
        )}

        {/* A sibling of the row's activation, never a descendant of it. */}
        {onReply ? (
          <ButtonV4
            variant="ghost"
            size="sm"
            onClick={() => onReply(message)}
            aria-label={spokenLine([replyLabel, message.senderName])}
            className={cn('shrink-0 self-start', MIN_TAP_CLASS)}
          >
            {replyLabel}
          </ButtonV4>
        ) : null}
      </div>
    );
  }
);
