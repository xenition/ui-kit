import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { BadgeV4 } from '../primitives/BadgeV4';
import { cn } from '../primitives/cn';
import { V4_DISABLED_CLASS, V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import type { InterviewSlotProps } from './InterviewSlot';
import type { InterviewMode } from './types';
import { formatShortDate, formatTime as formatClockTime } from './format';
import { isAdverse } from './hiring-v4';
import {
  cardStateVars,
  FOCUS_RING_CLASS,
  MIN_TAP_CLASS,
  spokenLine,
  type ToneV4,
} from './internal/tone-v4';

/**
 * What has happened to a scheduled interview.
 *
 * New in V4, and the reason it is new: `Interview` has no status field at all,
 * so an interview the employer cancelled could only be expressed by passing
 * `disabled` — which draws a dimmed, unpressable card with no word anywhere
 * saying why. "Dimmed" is not "cancelled", and a candidate looking at their
 * calendar cannot tell the difference between a slot that is gone and a slot
 * that was never bookable.
 *
 * Declared identically in `src/native/jobs/InterviewSlotV4.tsx`. It is not in
 * `hiring-v4.ts` because that module is the two twins' shared *arithmetic* and
 * this is a display union with no maths behind it.
 */
export type InterviewSlotStatus = 'scheduled' | 'confirmed' | 'cancelled' | 'rescheduled';

export interface InterviewSlotV4Props extends InterviewSlotProps {
  /** What has happened to the interview. Omitted renders exactly as the base. */
  status?: InterviewSlotStatus;
  /** Why it was cancelled. Rendered whenever the status is an adverse one. */
  statusReason?: string;
  /** Override any mode's word. An unlisted mode keeps the built-in one. */
  modeLabels?: Partial<Record<InterviewMode, string>>;
  /** Render the date. Default `'Jun 15'`. */
  formatDate?: (iso: string) => string;
  /** Render one clock time. Default `'2:30 PM'`. */
  formatTime?: (iso: string) => string;
}

/** Mode → [glyph, word]. Both, so the channel is never colour or glyph alone. */
const MODE: Record<InterviewMode, [string, string]> = {
  onsite: ['📍', 'On-site'],
  video: ['🎥', 'Video'],
  phone: ['📞', 'Phone'],
};

/** Status → [word, tone]. These are genuine statuses and keep status colour. */
const STATUS: Record<InterviewSlotStatus, [string, ToneV4]> = {
  scheduled: ['Scheduled', 'neutral'],
  confirmed: ['Confirmed', 'success'],
  cancelled: ['Cancelled', 'danger'],
  rescheduled: ['Rescheduled', 'warn'],
};

/**
 * **V4 interview slot** — same props as {@link InterviewSlot} plus `status`,
 * `statusReason`, `modeLabels`, `formatDate` and `formatTime`.
 *
 * ## Six changes
 *
 * 1. **An unparseable instant no longer renders a blank card.** `formatTime`
 *    and `formatShortDate` both return `''` on bad input, and the base
 *    interpolated them anyway — so a slot with a malformed `startsAt` drew an
 *    empty date, an empty time, and an accessible name that was literally
 *    `" , Video"`. A slot with no time is not a slot: it returns `null`.
 * 2. **An unknown mode stops claiming to be a video call.** `MODE[mode] ??
 *    MODE.video` announced "Video" for anything it did not recognise, so a
 *    candidate could be told to expect a video interview for something that is
 *    not one. An unrecognised mode now contributes no glyph and no word rather
 *    than a confident wrong one.
 * 3. **A display-only slot is no longer drawn as disabled.** `disabled={
 *    disabled || !onSelect}` meant that any slot rendered without a handler —
 *    a confirmed interview on a candidate's schedule, the common case — was
 *    dimmed and announced as unavailable, which reads as cancelled. Without
 *    `onSelect` it is now a plain, full-contrast, non-interactive card.
 * 4. **A cancelled interview says so, in a word and with a reason.** See
 *    `status` and `statusReason`. `disabled` no longer has to stand in for
 *    four different things.
 * 5. **The slot is a real tap target and its focus ring is the kit's.** It had
 *    no minimum height and rang itself in `ring-primary`, the raw brand
 *    colour, rather than `ring-ring`, which is that colour already corrected
 *    to 3:1 against the page.
 * 6. **Disabled is M3's 0.38 band and press is a state layer.** The base used
 *    `disabled:opacity-50` — a round number, not a measured one — and
 *    `hover:opacity-95`, which fades the card's own content.
 */
export const InterviewSlotV4 = React.forwardRef<HTMLButtonElement, InterviewSlotV4Props>(
  function InterviewSlotV4(
    {
      interview,
      selected = false,
      disabled = false,
      onSelect,
      status,
      statusReason,
      modeLabels,
      formatDate,
      formatTime,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const date = formatDate ? formatDate(interview.startsAt) : formatShortDate(interview.startsAt);
    const start = formatTime
      ? formatTime(interview.startsAt)
      : formatClockTime(interview.startsAt);

    // A frame around nothing is worse than nothing: the base drew one, named
    // it " , Video", and put it in the tab order.
    if (!date && !start) return null;

    const end = interview.endsAt
      ? formatTime
        ? formatTime(interview.endsAt)
        : formatClockTime(interview.endsAt)
      : '';
    const timeRange = end ? `${start} – ${end}` : start;

    const known = MODE[interview.mode] as [string, string] | undefined;
    const glyph = known?.[0];
    const modeLabel = modeLabels?.[interview.mode] ?? known?.[1];

    const statusMeta = status ? STATUS[status] : undefined;
    const reason = status && isAdverse(status) ? statusReason : undefined;
    // A cancelled slot really is unavailable — and now there is a word on the
    // card saying which kind of unavailable it is.
    const unavailable = disabled || status === 'cancelled';

    const name = spokenLine([
      date,
      timeRange,
      modeLabel,
      interview.interviewer ? `with ${interview.interviewer}` : undefined,
      statusMeta?.[0],
      reason,
    ]);

    const body = (
      <>
        <span className="flex items-center gap-xs">
          {glyph ? (
            <span aria-hidden="true" className="text-sm">
              {glyph}
            </span>
          ) : null}
          <span
            className={cn(
              'text-xs font-semibold',
              selected ? 'text-on-primary' : 'text-muted-text'
            )}
          >
            {date}
            {modeLabel ? ` · ${modeLabel}` : ''}
          </span>
        </span>
        <span
          className={cn('text-base font-semibold', selected ? 'text-on-primary' : 'text-on-card')}
        >
          {timeRange}
        </span>
        {interview.interviewer ? (
          <span
            className={cn('truncate text-xs', selected ? 'text-on-primary' : 'text-muted-text')}
          >
            {interview.interviewer}
          </span>
        ) : null}
        {statusMeta ? (
          <BadgeV4 tone={statusMeta[1]} size="sm" className="self-start">
            {statusMeta[0]}
          </BadgeV4>
        ) : null}
        {reason ? (
          <span
            className={cn('text-xs font-semibold', selected ? 'text-on-primary' : 'text-danger-text')}
          >
            {reason}
          </span>
        ) : null}
      </>
    );

    const skin = cn(
      'flex flex-col gap-xs rounded-[var(--xen-radius-md)] p-md text-left',
      selected
        ? 'border-2 border-primary bg-primary text-on-primary'
        : 'border border-border bg-card text-on-card',
      className
    );

    // No handler means this is a record of an interview, not an offer of one.
    // It is not a control, so it is not focusable and not announced as
    // disabled — its words are simply read.
    if (!onSelect) {
      return (
        <div
          ref={ref as unknown as React.Ref<HTMLDivElement>}
          data-xen-v4-interview-slot="static"
          className={skin}
          {...(rest as unknown as React.HTMLAttributes<HTMLDivElement>)}
        >
          {body}
        </div>
      );
    }

    return (
      <button
        ref={ref}
        type="button"
        data-xen-v4-interview-slot=""
        data-xen-v4-state=""
        aria-label={name}
        aria-pressed={selected}
        disabled={unavailable}
        onClick={() => onSelect(interview)}
        style={cardStateVars(
          selected ? 'var(--xen-primary)' : 'var(--xen-card)',
          selected ? 'var(--xen-on-primary)' : 'var(--xen-on-card)'
        )}
        className={cn(skin, MIN_TAP_CLASS, FOCUS_RING_CLASS, V4_DISABLED_CLASS)}
        {...rest}
      >
        {body}
      </button>
    );
  }
);
