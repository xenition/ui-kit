import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { TONE_BG } from '../primitives/internal/tone-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { ScheduleRowProps, ScheduleStatus } from './ScheduleRow';
import { TABULAR_CLASS, TONE_INK, spokenLine, type ToneV4 } from './internal/event-v4';

export interface ScheduleRowV4Props extends ScheduleRowProps {
  /** The word each status carries. `scheduled` is deliberately silent. */
  statusLabels?: Partial<Record<ScheduleStatus, string>>;
  /** Join a start and an end into the range the gutter prints. Default `start–end`. */
  formatRange?: (start: string, end: string) => string;
  /**
   * The tone the track's rail and caption take, so a track can carry identity.
   *
   * `neutral` by default, and this is the one added prop whose default
   * deliberately changes today's look: the rail was `primary` for *every*
   * track, which is the defect. A schedule that wants its tracks told apart
   * passes a tone per track.
   */
  trackTone?: ToneV4;
}

const DEFAULT_STATUS_LABELS: Record<ScheduleStatus, string> = {
  scheduled: '',
  live: 'Live now',
  ended: 'Ended',
  cancelled: 'Cancelled',
};

/** Only `live` and `cancelled` are statuses; the other two are plain captions. */
const STATUS_TONE: Record<ScheduleStatus, ToneV4> = {
  scheduled: 'neutral',
  live: 'success',
  ended: 'neutral',
  cancelled: 'danger',
};

const ROW_STATE = stateGroundVars(
  'var(--xen-surface)',
  'var(--xen-on-surface)'
) as React.CSSProperties;

/**
 * **V4 schedule row** — the web twin of the native `ScheduleRowV4`, same props
 * as {@link ScheduleRow} plus `statusLabels`, `formatRange` and `trackTone`.
 *
 * ## Five changes
 *
 * 1. **`endTime` renders as the range its own prop doc has always promised.**
 *    The base stacked two bare times with no separator, so a row reading
 *    "10:30" over "11:15" looked like two *start* times — the reader had to
 *    guess which one the session began at. Default `` `${start}–${end}` ``,
 *    overridable for a locale that joins a range differently.
 * 2. **A cancelled slot does not announce identically to a live one.** The
 *    strike-through was a visual-only cue and the row's name was
 *    `` `${time} ${title}` `` — so a screen-reader user was told about a
 *    session that had been called off exactly what they were told about one
 *    that was running.
 * 3. **A track can carry identity.** The rail was `primary` for *every* track,
 *    so the colour said "there is a track" and nothing more, and the no-track
 *    rail was filled with `border` — a hairline token with no promise of being
 *    visible as a solid 3px bar. `trackTone` colours rail and caption together,
 *    and a row with no track draws no rail while keeping its width.
 * 4. **The status caption takes the contrast-corrected ink.** `text-success`
 *    and `text-danger` are *fill* slots; at 12px they are the least legible
 *    text on the row. `TONE_INK` is the slot the compiler corrects for text.
 * 5. **The row is a real `<button>` when it is clickable**, not a `div` with
 *    `role="button"` and a hand-written key handler; the gutter is tabular so
 *    a column of times lines up; and press is a state layer, not
 *    `hover:opacity-80` — which is how a row looks *disabled*.
 */
export const ScheduleRowV4 = React.forwardRef<HTMLDivElement, ScheduleRowV4Props>(
  function ScheduleRowV4(
    {
      time,
      endTime,
      title,
      room,
      track,
      status = 'scheduled',
      statusLabels,
      formatRange,
      trackTone = 'neutral',
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const statusLabel = statusLabels?.[status] ?? DEFAULT_STATUS_LABELS[status];
    const isCancelled = status === 'cancelled';
    const interactive = typeof onClick === 'function';

    // The base types `onClick` against the row's `div`; the activation is a
    // real `<button>` now, and the two element types are unrelated.
    const activate = onClick as unknown as React.MouseEventHandler<HTMLButtonElement> | undefined;

    const range = endTime
      ? (formatRange ?? ((a: string, b: string) => `${a}–${b}`))(time, endTime)
      : time;

    const body = (
      <>
        <span
          className={cn(
            'flex w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] shrink-0 items-start text-sm font-bold text-on-surface',
            TABULAR_CLASS
          )}
        >
          {range}
        </span>
        {/*
          The rail is identity, not status, so it takes `trackTone`. A row with
          no track draws no rail at all — the base filled that slot with the
          `border` token, a hairline colour with no promise of reading as a
          solid 3px bar — but it keeps the slot's width, so a mixed list stays
          on one vertical line.
        */}
        <span
          aria-hidden="true"
          className={cn(
            'w-xs shrink-0 self-stretch rounded-full',
            track ? TONE_BG[trackTone] : undefined
          )}
        />
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span
            className={cn(
              'text-base font-semibold text-on-surface',
              isCancelled && 'line-through'
            )}
          >
            {title}
          </span>
          <span className="flex flex-row flex-wrap items-center gap-sm">
            {track ? (
              <span className={cn('text-xs font-semibold', TONE_INK[trackTone])}>{track}</span>
            ) : null}
            {room ? <span className="text-xs text-muted-text">{room}</span> : null}
            {statusLabel ? (
              <span className={cn('text-xs font-bold', TONE_INK[STATUS_TONE[status]])}>
                {statusLabel}
              </span>
            ) : null}
          </span>
        </span>
      </>
    );

    if (!interactive) {
      return (
        <div
          ref={ref}
          className={cn('flex flex-row items-stretch gap-md py-sm', className)}
          {...rest}
        >
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        <button
          type="button"
          onClick={activate}
          aria-label={spokenLine([range, title, track, room, statusLabel])}
          data-xen-v4-state=""
          style={ROW_STATE}
          className={cn(
            'flex w-full flex-row items-stretch gap-md rounded-[var(--xen-radius-md)] px-xs py-sm text-left',
            MIN_TAP_CLASS,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {body}
        </button>
      </div>
    );
  }
);
