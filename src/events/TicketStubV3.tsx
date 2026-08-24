import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives/Badge';
import type { TicketStubProps } from './TicketStub';

/** Drop-in replacement for {@link TicketStub} — identical props. */
export type TicketStubV3Props = TicketStubProps;

/**
 * TicketStub — **minimal boarding-pass line** alternate design (web / React DOM).
 *
 * Everything sits on one horizontal strip: the event name + holder / date on
 * the left, structured fields inline through the middle, and a short vertical
 * token-bar strip with the code on the right, split off by a dashed rule. Flat
 * and hairline-bordered rather than the tall elevated stub. Same props as
 * {@link TicketStub} — a drop-in swap. Token-pure; the bars carry no scan
 * dependency.
 */
export const TicketStubV3 = React.forwardRef<HTMLDivElement, TicketStubV3Props>(function TicketStubV3(
  { eventTitle, holderName, dateLabel, fields = [], code, tier, variant = 'default', className, ...rest },
  ref
) {
  const chars = code.length > 0 ? code.split('') : ['0'];
  const bars = Array.from({ length: 16 }, (_, i) => {
    const ch = chars[i % chars.length] ?? '0';
    const magnitude = (ch.charCodeAt(0) % 3) + 1;
    const dark = ch.charCodeAt(0) % 2 === 0;
    return { width: magnitude, dark };
  });
  const subLine = [holderName, dateLabel].filter(Boolean).join(' · ');

  return (
    <div
      ref={ref}
      role="group"
      aria-label={`Ticket for ${eventTitle}, code ${code}`}
      className={cn('flex flex-row items-stretch overflow-hidden rounded-md border border-border bg-surface text-on-surface', className)}
      {...rest}
    >
      <div className="flex flex-1 flex-col justify-center gap-xs p-md">
        <div className="flex flex-row items-center gap-sm">
          <span className="flex-1 truncate text-base font-bold text-on-surface">{eventTitle}</span>
          {tier ? <Badge tone="primary" size="sm">{tier}</Badge> : null}
        </div>
        {subLine ? <p className="truncate text-xs text-muted">{subLine}</p> : null}
        {variant !== 'compact' && fields.length > 0 ? (
          <div className="mt-0.5 flex flex-row flex-wrap gap-md">
            {fields.map((f, i) => (
              <span key={`${f.label}-${i}`} className="text-xs text-on-surface">
                <span className="font-bold tracking-wide text-muted">{`${f.label.toUpperCase()} `}</span>
                <span className="font-bold">{f.value}</span>
              </span>
            ))}
          </div>
        ) : null}
      </div>

      {/* Dashed tear rule between body and the code stub. */}
      <div aria-hidden="true" className="flex flex-col items-center justify-between py-xs">
        {Array.from({ length: 8 }, (_, i) => (
          <span key={i} className="h-1 w-px bg-border" />
        ))}
      </div>

      <div className="flex flex-col items-center justify-center gap-xs bg-neutral-50 px-md">
        <span aria-hidden="true" className="flex h-8 flex-row items-end gap-0.5">
          {bars.map((b, i) => (
            <span key={i} className={cn('h-full', b.dark ? 'bg-on-surface' : 'bg-muted')} style={{ width: b.width }} />
          ))}
        </span>
        <span className="text-xs font-semibold tracking-wide text-muted">{code}</span>
      </div>
    </div>
  );
});
