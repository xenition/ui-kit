import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatTimeInTz } from './datetime';
import type { BookingSummaryProps } from './BookingSummary';

/** The row labels, all overridable — the base hard-coded five English words. */
export interface BookingSummaryLabels {
  resource?: string;
  date?: string;
  time?: string;
  duration?: string;
  timezone?: string;
  price?: string;
  /** Shown when neither a resource nor a slot has been chosen. */
  empty?: string;
}

export interface BookingSummaryV4Props extends BookingSummaryProps {
  /**
   * What the booking costs, already formatted (e.g. `'$48.00'`).
   *
   * The base listed who, when and how long, and never what it costs — which is
   * the line a confirmation screen exists to show, and the one a user checks
   * before pressing the button underneath it. Pre-formatted, not cents: the
   * currency and its rounding are the host's decision, and a component that
   * formats money itself will eventually disagree with the invoice.
   */
  price?: string;
  /** A caption under the price — `'Charged at the appointment'`, a tax note. */
  priceNote?: string;
  /** Override any row label. */
  labels?: BookingSummaryLabels;
  /** Render the duration. Default `(min) => `${min} min``. */
  formatDuration?: (minutes: number) => string;
}

const DEFAULT_LABELS: Required<BookingSummaryLabels> = {
  resource: 'With',
  date: 'Date',
  time: 'Time',
  duration: 'Duration',
  timezone: 'Timezone',
  price: 'Total',
  empty: 'Nothing selected yet.',
};

/**
 * A long date, in the booking's timezone. Identical to the base's default so a
 * caller that never passes `formatDate` sees no change.
 */
function defaultFormatDate(iso: string, timeZone?: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '';
  return new Intl.DateTimeFormat(undefined, {
    timeZone,
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

/**
 * **V4 booking summary** — the web twin of the native `BookingSummaryV4`, same
 * props as {@link BookingSummary} plus `price`, `priceNote`, `labels` and
 * `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **It can show the price.** See `price`. It is the last row, separated by
 *    a hairline and set a step up in the display face, because a total is the
 *    figure the eye goes to and the base had no way to say it at all.
 * 2. **Every label is a prop**, where six English constants used to live
 *    inside the component out of a localizing host's reach.
 * 3. **Labels take `muted-text`**, the slot with an actual contrast promise,
 *    rather than `muted`.
 * 4. **The card is the raised ground.** A summary sits on top of a booking
 *    flow; on a dark page `bg-surface` made it disappear into the page with
 *    only its border to separate it.
 *
 * The empty state — no resource, no slot — is a message, not a bordered blank.
 */
export const BookingSummaryV4 = React.forwardRef<HTMLDivElement, BookingSummaryV4Props>(
  function BookingSummaryV4(
    {
      resource,
      slot,
      timeZone,
      formatDate,
      formatTime,
      formatDuration,
      action,
      title = 'Your booking',
      price,
      priceNote,
      labels,
      className,
      ...rest
    },
    ref
  ) {
    const tz = timeZone ?? resource?.timezone;
    const fmtDate = formatDate ?? ((iso: string) => defaultFormatDate(iso, tz));
    const fmtTime = formatTime ?? ((iso: string) => formatTimeInTz(iso, tz));
    const fmtDuration = formatDuration ?? ((minutes: number) => `${minutes} min`);
    const copy = { ...DEFAULT_LABELS, ...labels };

    const line = (label: string, value: React.ReactNode, key: string): React.ReactElement => (
      <div key={key} className="flex items-baseline justify-between gap-md">
        <dt className="text-sm text-muted-text">{label}</dt>
        <dd className="shrink text-right text-sm text-on-card">{value}</dd>
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border bg-card p-lg text-on-card shadow-[var(--xen-elevation-card)]',
          className
        )}
        {...rest}
      >
        {title ? <h3 className="text-base font-semibold">{title}</h3> : null}

        <dl className="flex flex-col gap-sm">
          {resource ? line(copy.resource, resource.name, 'resource') : null}
          {slot ? line(copy.date, fmtDate(slot.startsAt), 'date') : null}
          {slot
            ? line(copy.time, `${fmtTime(slot.startsAt)} – ${fmtTime(slot.endsAt)}`, 'time')
            : null}
          {resource?.slotMinutes
            ? line(copy.duration, fmtDuration(resource.slotMinutes), 'duration')
            : null}
          {tz ? line(copy.timezone, tz, 'tz') : null}
          {!slot && !resource ? (
            <p className="text-sm text-muted-text">{copy.empty}</p>
          ) : null}
        </dl>

        {price ? (
          <div className="flex flex-col gap-xs border-t border-border pt-md">
            <div className="flex items-baseline justify-between gap-md">
              <span className="text-base font-semibold">{copy.price}</span>
              <span className="font-heading text-lg font-bold [font-variant-numeric:tabular-nums]">
                {price}
              </span>
            </div>
            {priceNote ? (
              <p className="text-right text-xs text-muted-text">{priceNote}</p>
            ) : null}
          </div>
        ) : null}

        {action ? <div>{action}</div> : null}
      </div>
    );
  }
);
