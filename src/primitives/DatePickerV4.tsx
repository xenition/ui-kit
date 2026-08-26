import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from './cn';
import type { DatePickerProps } from './DatePicker';
import {
  monthGrid,
  outOfRange,
  startOfMonth,
  toDate,
  toKey,
  weekdayLabels,
} from './internal/date-v4';
import { FIELD_CLASS, PICKER_V4_CSS, useDepth } from './internal/picker-v4';
import { useDismiss } from './useDismiss';

export type { DatePickerProps as DatePickerV4Props };

/**
 * **V4 date field** — the same props as {@link DatePicker}, a different design
 * line.
 *
 * ## Why this stops being `<input type="date">`
 *
 * §31 says prefer familiar interactions, and the browser's own date input is
 * about as familiar as it gets — but it is a different control in every
 * browser, it cannot be themed past its border, and its calendar is the one
 * piece a design system has no reach into. A kit whose date field looks
 * nothing like the same field on iOS is not a kit. So V4 draws the same month
 * grid its native twin draws, from the same `internal/date-v4` arithmetic,
 * behind the same `--xen-*` tokens, and the two are the same control on both
 * platforms. The metaphor is untouched: seven columns, chevrons to page.
 *
 * ## The field belongs in the form
 *
 * The base is `rounded-[var(--xen-radius-sm)]` with `px-3 py-2` — visibly a
 * different control from the `InputV4` above it in the same form. This one
 * takes `InputV4`'s treatment exactly: the same `--xen-space-2xl` minimum
 * height (which is also the tap-target floor), the same `md` radius, and the
 * same brand halo drawn with `box-shadow`, so focusing costs no layout
 * (§36.11). While the calendar is open the field stays ringed — the popover
 * belongs to it and should look like it does.
 *
 * ## The grid
 *
 *   - **Day cells at the tap-target floor.** `--xen-space-2xl` in both axes,
 *     with the visible disc inside it, so the target is larger than the thing
 *     you are aiming at.
 *   - **A selection that survives dark mode.** A filled `primary` disc with
 *     `on-primary` ink, both of which follow `[data-theme]`. `bg-primary-50`
 *     would keep the light orientation in both schemes and paint a near-white
 *     hole in a dark grid.
 *   - **Today, ringed** in `primary`, so "where am I" is answerable before
 *     anything is selected (§32 — recognition over recall).
 *   - **Blocked days that say so.** A day outside `min`/`max` is muted and
 *     genuinely `disabled`, not merely faded.
 *
 * The popover floats on `--xen-elevation-card` with its hairline kept, takes
 * glass only when the seed asked for `depth: 'glass'`, and its entrance is
 * dropped entirely under `prefers-reduced-motion` (§36.10).
 */
export function DatePickerV4({
  value,
  onChange,
  min,
  max,
  disabled,
  invalid,
  className,
}: DatePickerProps): React.ReactElement {
  injectStyleOnce('xen-v4-picker-styles', PICKER_V4_CSS);
  const glass = useDepth() === 'glass';
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  const gridId = React.useId();

  const selected = toDate(value);
  const selectedKey = selected ? toKey(selected) : null;

  const [viewDate, setViewDate] = React.useState<Date>(() =>
    startOfMonth(selected ?? new Date())
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
  const todayKey = toKey(new Date());

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
      <button
        type="button"
        data-xen-v4-field={invalid ? 'invalid' : ''}
        data-open={open ? 'true' : undefined}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-invalid={invalid || undefined}
        disabled={disabled}
        onClick={() => {
          setViewDate(startOfMonth(selected ?? new Date()));
          setOpen((o) => !o);
        }}
        className={cn(
          FIELD_CLASS,
          'justify-between text-left disabled:pointer-events-none disabled:opacity-[0.38]'
        )}
        style={
          {
            '--xen-v4-ring-color': invalid ? 'var(--xen-danger)' : 'var(--xen-ring)',
          } as React.CSSProperties
        }
      >
        <span className={cn('truncate', selected ? 'text-on-surface' : 'text-muted-text')}>
          {selected ? longDate.format(selected) : 'Select a date'}
        </span>
        <span aria-hidden="true" className="text-base text-muted-text">
          ▾
        </span>
      </button>

      {open ? (
        <div
          role="dialog"
          aria-label={`Choose a date — ${monthLabel}`}
          data-xen-v4-pop="card"
          data-glass={glass ? 'true' : undefined}
          className="absolute z-50 mt-xs p-md text-on-surface"
        >
          <div className="flex items-center justify-between">
            {chevron('Previous month', '‹', -1)}
            <span className="font-heading text-lg font-semibold text-on-surface">{monthLabel}</span>
            {chevron('Next month', '›', 1)}
          </div>

          <div role="grid" id={gridId} aria-label={monthLabel}>
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
                  const isSelected = selectedKey === key;
                  const isToday = key === todayKey;
                  const blocked = outOfRange(key, min, max);

                  return (
                    <div role="gridcell" key={key}>
                      <button
                        type="button"
                        aria-label={longDate.format(date)}
                        aria-pressed={isSelected}
                        aria-current={isToday ? 'date' : undefined}
                        disabled={blocked}
                        onClick={() => {
                          onChange(key);
                          setOpen(false);
                        }}
                        className={cn(
                          'flex items-center justify-center rounded-[var(--xen-radius-full)]',
                          'h-[var(--xen-space-2xl)] w-[var(--xen-space-2xl)]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                          'disabled:pointer-events-none'
                        )}
                      >
                        <span
                          data-xen-v4-hover={isSelected || blocked ? undefined : ''}
                          className={cn(
                            'flex items-center justify-center rounded-[var(--xen-radius-full)] text-base',
                            'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
                            'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
                            isSelected
                              ? 'bg-primary font-bold text-on-primary'
                              : !inMonth || blocked
                                ? 'text-muted-text'
                                : 'text-on-surface',
                            isToday && !isSelected && 'border border-primary font-bold'
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
        </div>
      ) : null}
    </div>
  );
}
