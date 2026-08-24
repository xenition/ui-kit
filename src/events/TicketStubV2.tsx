import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import type { TicketStubProps } from './TicketStub';

/** Drop-in replacement for {@link TicketStub} — identical props. */
export type TicketStubV2Props = TicketStubProps;

/**
 * TicketStub — **elevated ticket** alternate design (web / React DOM).
 *
 * Leans into the physical stub metaphor: a soft primary-tinted header band with
 * the event name set large, a punched perforation line (edge notches + a dotted
 * tear) instead of a plain divider, and a taller token-bar "barcode" band. Drop
 * shadow, no border. Same props as {@link TicketStub} — a drop-in swap.
 * Token-pure — the barcode bars ship no scan dependency; their widths seed from
 * `code`.
 */
export const TicketStubV2 = React.forwardRef<HTMLDivElement, TicketStubV2Props>(function TicketStubV2(
  { eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', className, ...rest },
  ref
) {
  const chars = code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: 34 }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 4) + 1; // 1..4
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });
  const perforationDots = Array.from({ length: 22 }, (_, i) => i);

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`Ticket for ${eventTitle}, code ${code}`}
      className={cn('overflow-hidden rounded-lg bg-surface text-on-surface shadow-lg', className)}
      {...rest}
    >
      {/* Tinted header band with the big event name. */}
      <div className="flex flex-col gap-sm bg-primary/10 p-lg">
        <div className="flex items-start justify-between gap-sm">
          <h3 className="line-clamp-2 flex-1 font-heading text-2xl font-extrabold text-on-surface">{eventTitle}</h3>
          {tier ? <Badge tone="primary">{tier}</Badge> : null}
        </div>
        {holderName ? <p className="text-base font-semibold text-primary">{holderName}</p> : null}
        {dateLabel ? <p className="text-sm text-muted">{dateLabel}</p> : null}
      </div>

      {variant !== 'compact' && fields.length > 0 ? (
        <div className="flex flex-row flex-wrap gap-lg px-lg pb-md">
          {fields.map((f, i) => (
            <div key={`${f.label}-${i}`} className="flex flex-col gap-0.5">
              <span className="text-xs font-bold tracking-wider text-muted">{f.label.toUpperCase()}</span>
              <span className="text-lg font-bold text-on-surface">{f.value}</span>
            </div>
          ))}
        </div>
      ) : null}

      {/* Punched perforation: edge notches + a dotted tear line. */}
      <div aria-hidden="true" className="flex h-6 flex-row items-center">
        <span className="-ml-2 h-4 w-4 rounded-full bg-neutral-100" />
        <div className="flex flex-1 flex-row items-center justify-between px-sm">
          {perforationDots.map((d) => (
            <span key={d} className="h-1 w-1 rounded-full bg-border" />
          ))}
        </div>
        <span className="-mr-2 h-4 w-4 rounded-full bg-neutral-100" />
      </div>

      {/* Taller token-bar barcode band + code. */}
      <div aria-hidden="true" className="flex h-14 items-end justify-center gap-0.5 px-lg pt-sm">
        {bars.map((b, i) => (
          <span key={i} className={cn('h-full', b.dark ? 'bg-on-surface' : 'bg-on-surface/35')} style={{ width: b.width }} />
        ))}
      </div>
      <p className="py-md text-center text-sm font-bold tracking-[0.2em] text-muted">{code}</p>
    </div>
  );
});
