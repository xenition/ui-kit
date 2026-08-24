import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';

/** Emphasis of a {@link TicketStub}. */
export type TicketStubVariant = 'default' | 'compact';

export interface TicketStubField {
  /** Small uppercase caption, e.g. `SECTION`. */
  label: string;
  /** The value, e.g. `A`. */
  value: string;
}

export interface TicketStubProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Event name printed across the top of the stub. */
  eventTitle: string;
  /** Ticket holder name. */
  holderName?: string;
  /** Pre-formatted date/time line. */
  dateLabel?: string;
  /** Structured fields rendered in a row (section / row / seat / gate …). */
  fields?: TicketStubField[];
  /**
   * The ticket identifier. Its characters deterministically seed the widths of
   * the placeholder "barcode" bars — this ships NO scan/barcode dependency, it
   * is a purely visual token-drawn placeholder.
   */
  code: string;
  /** Short status/tier tag, e.g. `VIP`. */
  tier?: string;
  /** Density. `compact` hides the field row. */
  variant?: TicketStubVariant;
}

/**
 * A tear-off ticket stub. The lower band is a placeholder "barcode" — a row of
 * vertical bars whose widths are derived deterministically from the ticket
 * `code` characters and painted purely from theme tokens (`on-surface` /
 * `muted`). There is no barcode or scanning dependency; this is a visual
 * stand-in only. All colors come from the `--xen-*` tokens — no literal colors.
 */
export const TicketStub = React.forwardRef<HTMLDivElement, TicketStubProps>(function TicketStub(
  { eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', className, ...rest },
  ref
) {
  // Deterministic bar widths from the code characters (guarded, token-colored).
  const chars = code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: 28 }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 3) + 1; // 1..3
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`Ticket for ${eventTitle}, code ${code}`}
      className={cn('overflow-hidden rounded-lg border border-border bg-surface text-on-surface', className)}
      {...rest}
    >
      <div className="flex flex-col gap-sm p-lg">
        <div className="flex items-start justify-between gap-sm">
          <h3 className="flex-1 font-heading text-lg font-bold text-on-surface">{eventTitle}</h3>
          {tier ? <Badge tone="primary">{tier}</Badge> : null}
        </div>
        {holderName ? <p className="text-sm text-muted">{holderName}</p> : null}
        {dateLabel ? <p className="text-sm text-muted">{dateLabel}</p> : null}

        {variant !== 'compact' && fields.length > 0 ? (
          <div className="mt-xs flex flex-row flex-wrap gap-lg">
            {fields.map((f, i) => (
              <div key={`${f.label}-${i}`} className="flex flex-col gap-0.5">
                <span className="text-xs font-semibold tracking-wider text-muted">{f.label.toUpperCase()}</span>
                <span className="text-base font-semibold text-on-surface">{f.value}</span>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* Perforation-style divider + placeholder barcode band (decorative). */}
      <div className="h-px bg-border" />
      <div aria-hidden="true" className="flex h-10 items-end justify-center gap-0.5 bg-neutral-50 py-sm">
        {bars.map((b, i) => (
          <span
            key={i}
            className={cn('h-full', b.dark ? 'bg-on-surface' : 'bg-muted')}
            style={{ width: b.width }}
          />
        ))}
      </div>
      <p className="pb-sm text-center text-xs tracking-widest text-muted">{code}</p>
    </div>
  );
});
