import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, type BadgeTone } from '../primitives/Badge';

/** Flight lifecycle state — drives the banner tint, glyph and pill tone. */
export type FlightStatus = 'on-time' | 'boarding' | 'delayed' | 'cancelled' | 'landed';

export interface FlightStatusBannerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Flight lifecycle state — colors the banner via semantic tokens (never color alone). */
  status: FlightStatus;
  /** Flight number / identifier (e.g. "XN 482"). */
  flightNumber: string;
  /** Departure gate (shown as a small field when set). */
  gate?: string;
  /** Assigned seat (shown as a small field when set). */
  seat?: string;
  /** Localized boarding time string (shown as a small field when set). */
  boardingTime?: string;
  /** Longer status remark (e.g. "New departure 4:15 PM"). */
  remark?: string;
}

interface StatusMeta {
  /** Human-readable status label. */
  label: string;
  /** Leading status glyph. */
  glyph: string;
  /** Semantic `Badge`/tint tone for this status. */
  tone: BadgeTone;
  /** When true the banner rides the brand gradient (the boarding "peak" moment). */
  peak?: boolean;
}

const STATUS: Record<FlightStatus, StatusMeta> = {
  'on-time': { label: 'On time', glyph: '✓', tone: 'success' },
  boarding: { label: 'Boarding', glyph: '🛫', tone: 'primary', peak: true },
  delayed: { label: 'Delayed', glyph: '⏳', tone: 'warn' },
  cancelled: { label: 'Cancelled', glyph: '⛔', tone: 'danger' },
  landed: { label: 'Landed', glyph: '🛬', tone: 'success' },
};

/** Soft-tinted banner surface per non-peak tone (surface bg + colored ring/ink). */
const TINT: Record<Exclude<BadgeTone, 'neutral' | 'muted' | 'accent' | 'primary'>, string> = {
  success: 'border-success/40 bg-success/10',
  warn: 'border-warn/40 bg-warn/10',
  danger: 'border-danger/40 bg-danger/10',
};

/**
 * FlightStatusBanner — a **V4** "journey" status strip (web parity of the native
 * twin). Announces where a flight is in its lifecycle: on-time / landed read as a
 * success tint, delayed as warn, cancelled as danger, and boarding rides the
 * brand gradient (the boarding "peak" moment) in near-white ink. Severity is
 * always carried by **glyph + label + a tint that traces to a semantic token
 * slot**, never color alone; the state is pilled with a `Badge`. Gate / seat /
 * boarding surface as small fields. All colors from `--xen-*` token classes and
 * gradient utilities — no literals; dark-mode safe.
 */
export const FlightStatusBanner = React.forwardRef<HTMLDivElement, FlightStatusBannerProps>(
  function FlightStatusBanner(
    { status, flightNumber, gate, seat, boardingTime, remark, className, ...rest },
    ref
  ) {
    const meta = STATUS[status];
    const peak = meta.peak === true;

    const fields: Array<{ label: string; value: string }> = [
      gate ? { label: 'Gate', value: gate } : null,
      seat ? { label: 'Seat', value: seat } : null,
      boardingTime ? { label: 'Boarding', value: boardingTime } : null,
    ].filter((f): f is { label: string; value: string } => f != null);

    const Field = ({ label, value }: { label: string; value: string }) =>
      peak ? (
        <div className="flex min-w-[64px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)]">
          <span className="text-xs text-primary-100">{label}</span>
          <span className="text-sm font-bold text-primary-50">{value}</span>
        </div>
      ) : (
        <div className="flex min-w-[64px] flex-1 flex-col gap-[2px] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-xs)]">
          <span className="text-xs text-muted">{label}</span>
          <span className="text-sm font-bold text-on-surface">{value}</span>
        </div>
      );

    return (
      <div
        ref={ref}
        data-xen-flight-status-banner=""
        role="status"
        aria-label={`Flight ${flightNumber} ${meta.label}${remark ? `, ${remark}` : ''}`}
        className={cn(
          'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border p-[var(--xen-space-lg)]',
          peak
            ? 'border-transparent bg-gradient-to-br from-primary-500 to-primary-700'
            : TINT[meta.tone as 'success' | 'warn' | 'danger'],
          className
        )}
        {...rest}
      >
        <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
          <div className="flex min-w-0 items-start gap-[var(--xen-space-md)]">
            <span aria-hidden="true" className="text-2xl leading-none">
              {meta.glyph}
            </span>
            <div className="flex min-w-0 flex-col gap-[2px]">
              <span className={cn('text-base font-extrabold', peak ? 'text-primary-50' : 'text-on-surface')}>
                {meta.label}
              </span>
              <span className={cn('text-sm font-semibold', peak ? 'text-primary-100' : 'text-muted')}>
                {flightNumber}
              </span>
              {remark ? (
                <span className={cn('mt-0.5 text-sm', peak ? 'text-primary-100' : 'text-on-surface')}>{remark}</span>
              ) : null}
            </div>
          </div>
          {peak ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary-50/15 px-2 py-0.5 text-xs font-semibold text-primary-50">
              {meta.label}
            </span>
          ) : (
            <Badge tone={meta.tone} variant="soft" dot>
              {meta.label}
            </Badge>
          )}
        </div>

        {fields.length > 0 ? (
          <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
            {fields.map((f) => (
              <Field key={f.label} label={f.label} value={f.value} />
            ))}
          </div>
        ) : null}
      </div>
    );
  }
);
