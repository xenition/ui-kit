import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import { IconV4 } from '../primitives/IconV4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_LEADING_CLASS,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
} from '../dashboard/internal/row-v4';
import { BADGE_V4, discGround, discInkClass, spokenLine, TABULAR_CLASS, type ToneV4 } from './internal/job-v4';
import { formatDuration, formatMoney } from './internal/format';
import type { TimeLogRowProps, TimeLogStatus } from './TimeLogRow';

export interface TimeLogRowV4Props extends TimeLogRowProps {
  /** The word on the billable chip. Default `'Billable'`. */
  billableLabel?: string;
}

const TIME_LOG_V4: Record<TimeLogStatus, { label: string; glyph: string; tone: ToneV4 }> = {
  running: { label: 'Running', glyph: '⏱', tone: 'primary' },
  stopped: { label: 'Logged', glyph: '■', tone: 'neutral' },
  approved: { label: 'Approved', glyph: '✓', tone: 'success' },
  rejected: { label: 'Rejected', glyph: '✕', tone: 'danger' },
};

/**
 * **V4 time-log row** — the web twin of the native `TimeLogRowV4`, same props
 * as {@link TimeLogRow} plus `billableLabel`.
 *
 * ## Four changes
 *
 * 1. **The money total and the billable flag are announced.** The row's name
 *    was `` `${label}, ${duration}, ${status}` `` — on a timesheet, which is
 *    read to find out what an hour is going to be billed at and whether it is
 *    billable at all.
 * 2. **The literal `$` is gone.** The chip read `$ Billable` while the total
 *    beside it was formatted by `currency`, so a EUR timesheet showed "€12.50"
 *    under a dollar sign. The chip is a word, and the word is a prop.
 * 3. **The stacked figures are tabular**, so a column of durations and totals
 *    aligns down a timesheet instead of shifting a digit at a time.
 * 4. **An interactive row is a real `<button>`** that clears 44 and answers
 *    with a state layer, and the status is announced once — the disc carried
 *    it as an accessible label and the pill carried it again.
 */
export const TimeLogRowV4 = React.forwardRef<HTMLDivElement, TimeLogRowV4Props>(
  function TimeLogRowV4(
    {
      label,
      minutes,
      status,
      // The base destructured this as `window`, shadowing the global inside a
      // browser component.
      window: clockWindow,
      billable = false,
      rateCentsPerHour,
      currency = 'USD',
      formatMoney: format = formatMoney,
      onClick,
      billableLabel = 'Billable',
      className,
      style,
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    const sd = TIME_LOG_V4[status] ?? TIME_LOG_V4.stopped;
    const safeMinutes = Number.isFinite(minutes) ? Math.max(0, Math.trunc(minutes)) : 0;
    const duration = formatDuration(safeMinutes);
    const totalCents =
      rateCentsPerHour != null && Number.isFinite(rateCentsPerHour)
        ? Math.round((safeMinutes / 60) * Math.max(0, rateCentsPerHour))
        : undefined;
    const total = totalCents != null ? format(totalCents, currency) : undefined;
    const rowClass = cn(ROW_V4_BASE_CLASS, rowHeightClass(true));

    const body = (
      <>
        <span
          aria-hidden
          className={cn(ROW_V4_LEADING_CLASS, 'rounded-[var(--xen-radius-full)]')}
          style={{ background: discGround(sd.tone) }}
        >
          <IconV4 glyph={sd.glyph} className={discInkClass(sd.tone)} />
        </span>
        <span className={ROW_V4_TEXT_CLASS}>
          <span className="truncate text-base font-semibold text-on-card">{label}</span>
          <span className="flex flex-wrap items-center gap-xs">
            {clockWindow != null ? (
              <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{clockWindow}</span>
            ) : null}
            <BadgeV4 tone={sd.tone} {...BADGE_V4}>
              {`${sd.glyph} ${sd.label}`}
            </BadgeV4>
            {billable ? (
              <BadgeV4 tone="primary" {...BADGE_V4}>
                {billableLabel}
              </BadgeV4>
            ) : null}
          </span>
        </span>
        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <span className={cn('text-base font-bold text-on-card', TABULAR_CLASS)}>{duration}</span>
          {total != null ? (
            <span className={cn('text-xs text-muted-text', TABULAR_CLASS)}>{total}</span>
          ) : null}
        </span>
      </>
    );

    if (onClick == null) {
      return (
        <div ref={ref} style={style} className={cn(rowClass, className)}>
          {body}
        </div>
      );
    }

    return (
      <div ref={ref} style={style} className={cn('w-full', className)}>
        <button
          type="button"
          onClick={onClick}
          aria-label={spokenLine([
            label,
            duration,
            sd.label,
            clockWindow,
            total,
            billable ? billableLabel : null,
          ])}
          data-xen-v4-state=""
          style={stateGroundVars('var(--xen-card)', 'var(--xen-on-card)') as React.CSSProperties}
          className={cn(rowClass, 'rounded-[var(--xen-radius-md)]')}
        >
          {body}
        </button>
      </div>
    );
  }
);
