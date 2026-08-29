import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { DateRange, DateRangePickerProps } from './DateRangePicker';
import {
  monthGrid,
  outOfRange,
  rangePosition,
  startOfMonth,
  toDate,
  toKey,
  weekdayLabels,
} from './internal/date-v4';
import { FIELD_CLASS, PICKER_V4_CSS, useDepth } from './internal/picker-v4';
import { useDismiss } from './useDismiss';

export type { DateRangePickerProps as DateRangePickerV4Props, DateRange };

/** Which end of the range the next click will set. */
type Editing = 'start' | 'end';

/**
 * **V4 date range** — the web twin of `DateRangePickerV4`, the same props as
 * {@link DateRangePicker}, a different design line.
 *
 * ## One range, one calendar
 *
 * The base composes two independent `DatePicker`s and keeps them from crossing.
 * That is correct and it is not a range: the user picks a date, closes a
 * calendar, opens a second calendar, and has to hold the first date in their
 * head while doing it — §32's "recognition over recall", failed twice over.
 * Worse, at no point do they ever see the span they are choosing.
 *
 * V4 is the pattern every booking flow has settled on, which is exactly why
 * §31 points at it: **one field with two segments, one calendar, click start
 * then click end.** The span fills in as you go, so the thing being chosen is
 * the thing on screen. A caption under the grid says which end the next click
 * sets, so the mode is never a guess (§37 — make system status visible).
 *
 * ## The span has to survive dark mode
 *
 * The two ends are filled `primary` discs with `on-primary` ink — the pair the
 * compiler contrast-checks. The days between them get the shared range fill, a
 * `color-mix` of the brand into `--xen-surface`.
 *
 * That is deliberate and not decoration. `bg-primary-50` — the obvious "lighter
 * primary" — is a ramp step, and the ramps carry the light orientation in BOTH
 * schemes, so under `[data-theme="dark"]` the band is near-white and the range
 * reads as a hole punched through the calendar. Mixing against the panel's own
 * surface is right in both.
 *
 * The band is drawn as a full-bleed layer behind the day, half-width under each
 * cap, so the span is one continuous shape rather than seven separate chips.
 *
 * ## Everything else
 *
 * The field wears `InputV4`'s treatment and focus ring, day cells sit at the
 * `--xen-space-2xl` tap-target floor, and the popover floats on
 * `--xen-elevation-card` — glass only when the seed asked for it, motion
 * dropped under `prefers-reduced-motion`.
 */
export function DateRangePickerV4({
  value = { start: null, end: null },
  onChange,
  min,
  max,
  startLabel = 'Start',
  endLabel = 'End',
  invalid = false,
  disabled = false,
  className,
}: DateRangePickerProps): React.ReactElement {
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  const glass = useDepth() === 'glass';
  const [open, setOpen] = React.useState(false);
  const [editing, setEditing] = React.useState<Editing>('start');
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));

  const startDate = toDate(value.start);
  const endDate = toDate(value.end);

  const [viewDate, setViewDate] = React.useState<Date>(() =>
    startOfMonth(startDate ?? new Date())
  );
  const shiftMonth = (months: number): void =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + months, 1));

  const weeks = monthGrid(viewDate);
  const labels = React.useMemo(() => weekdayLabels(), []);
  const monthLabel = new Intl.DateTimeFormat(undefined, {
    month: 'long',
    year: 'numeric',
  }).format(viewDate);
  const longDate = new Intl.DateTimeFormat(undefined, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
  const shortDate = new Intl.DateTimeFormat(undefined, { month: 'short', day: 'numeric' });

  const openAt = (which: Editing): void => {
    setEditing(which);
    setViewDate(startOfMonth((which === 'end' ? endDate : startDate) ?? new Date()));
    setOpen(true);
  };

  /**
   * Click-to-click range building. Starting over is always allowed and never
   * an error: a click before the current start, or a click when the range is
   * already complete, begins a new range rather than refusing (§24 — make
   * experimentation safe). The only thing that can never happen is a crossed
   * range.
   */
  const pick = (key: string): void => {
    if (editing === 'start' || !value.start || value.end || key < value.start) {
      onChange?.({ start: key, end: null });
      setEditing('end');
      return;
    }
    onChange?.({ start: value.start, end: key });
    setEditing('start');
    setOpen(false);
  };

  const segment = (label: string, date: Date | null, which: Editing): React.ReactElement => (
    <button
      type="button"
      aria-label={label}
      aria-haspopup="dialog"
      aria-expanded={open && editing === which}
      disabled={disabled}
      onClick={() => openAt(which)}
      className="flex min-h-[var(--xen-space-2xl)] flex-1 flex-col justify-center text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
    >
      <span className="text-xs font-semibold text-muted-text">{label}</span>
      <span className={cn('truncate text-base', date ? 'text-on-surface' : 'text-muted-text')}>
        {date ? shortDate.format(date) : 'Add date'}
      </span>
    </button>
  );

  const chevron = (label: string, glyph: string, delta: number): React.ReactElement => (
    <button
      type="button"
      aria-label={label}
      onClick={() => shiftMonth(delta)}
      data-xen-v4-hover=""
      className={cn(
        'flex items-center justify-center rounded-[var(--xen-radius-full)] text-xl text-on-surface',
        'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
      )}
    >
      {glyph}
    </button>
  );

  return (
    <div ref={ref} className={cn('relative w-full', className)}>
      <div
        data-xen-v4-field={invalid ? 'invalid' : ''}
        data-open={open ? 'true' : undefined}
        className={cn(FIELD_CLASS, disabled && 'pointer-events-none opacity-[0.38]')}
        style={
          {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
          } as React.CSSProperties
        }
      >
        {segment(startLabel, startDate, 'start')}
        <span aria-hidden="true" className="text-base text-muted-text">
          →
        </span>
        {segment(endLabel, endDate, 'end')}
      </div>

      {open ? (
        <div
          role="dialog"
          aria-label={`Choose a date range — ${monthLabel}`}
          data-xen-v4-pop="card"
          data-glass={glass ? 'true' : undefined}
          className="absolute z-50 mt-xs p-md text-on-surface"
        >
          <div className="flex items-center justify-between">
            {chevron('Previous month', '‹', -1)}
            <span className="font-heading text-lg font-semibold text-on-surface">{monthLabel}</span>
            {chevron('Next month', '›', 1)}
          </div>

          <div role="grid" aria-label={monthLabel}>
            <div role="row" className="flex">
              {labels.map((label) => (
                <div
                  key={label}
                  role="columnheader"
                  className="flex w-[var(--xen-space-2xl)] items-center justify-center py-xs text-xs font-semibold text-muted-text"
                >
                  {label}
                </div>
              ))}
            </div>

            {weeks.map((row, wi) => (
              <div role="row" key={wi} className="flex">
                {row.map((date) => {
                  const key = toKey(date);
                  const inMonth = date.getMonth() === viewDate.getMonth();
                  const blocked = outOfRange(key, min, max);
                  const pos = rangePosition(key, value.start, value.end);
                  const capped = pos === 'start' || pos === 'end' || pos === 'only';
                  const banded = pos === 'middle' || pos === 'start' || pos === 'end';

                  return (
                    <div role="gridcell" key={key}>
                      <button
                        type="button"
                        aria-label={longDate.format(date)}
                        aria-pressed={pos !== 'none'}
                        disabled={blocked}
                        onClick={() => pick(key)}
                        className={cn(
                          'relative flex items-center justify-center',
                          'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          'disabled:pointer-events-none'
                        )}
                      >
                        {/*
                          The span, drawn behind the day as one continuous
                          shape: full-bleed in the middle, half-width under each
                          cap, so seven days read as one band and not as seven
                          chips.
                        */}
                        {banded ? (
                          <span
                            aria-hidden="true"
                            data-xen-v4-band=""
                            className="absolute inset-y-xs"
                            style={{
                              left: pos === 'start' ? '50%' : 0,
                              right: pos === 'end' ? '50%' : 0,
                            }}
                          />
                        ) : null}
                        <span
                          data-xen-v4-hover={capped || blocked ? undefined : ''}
                          className={cn(
                            'relative flex items-center justify-center rounded-[var(--xen-radius-full)] text-base',
                            'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
                            'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
                            capped
                              ? 'bg-primary font-bold text-on-primary'
                              : !inMonth || blocked
                                ? 'text-muted-text'
                                : 'text-on-surface'
                          )}
                        >
                          {date.getDate()}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/*
            Which end the next click sets. A two-click control with no visible
            mode is a control the user has to keep score in their head for.
          */}
          <p aria-live="polite" className="pt-xs text-sm text-muted-text">
            {editing === 'start' || !value.start
              ? `Choose the ${startLabel.toLowerCase()} date`
              : `Choose the ${endLabel.toLowerCase()} date`}
          </p>
        </div>
      ) : null}
    </div>
  );
}
