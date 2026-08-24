import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney } from '../commerce';
import { activate, clampPct, OUTCOME_META, toneFillClass, type DealOutcome } from './internal';
import type { DealCardProps } from './DealCard';

/** V3 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV3Props = DealCardProps;

function valueTextClass(outcome: DealOutcome): string {
  return outcome === 'won' ? 'text-success' : outcome === 'lost' ? 'text-danger' : 'text-on-surface';
}

/**
 * DealCard **design V3** — a *minimal single line*: a small outcome dot, the deal
 * name + account stacked, and the value pushed hard to the right. No card chrome,
 * no meter — a scannable roster row for long deal lists. The dot is paired with
 * an outcome word in the row's `aria-label`, so meaning never rests on color
 * alone. Same props / integer-cents money as {@link DealCard}. Token-pure.
 */
export const DealCardV3 = React.forwardRef<HTMLDivElement, DealCardV3Props>(function DealCardV3(
  { name, company, valueCents, currency = 'USD', stage, probability, outcome = 'open', loading = false, onClick, className, ...rest },
  ref
) {
  const meta = OUTCOME_META[outcome];
  // The filled-chip helper yields a token `bg-*`; take just the background for the dot.
  const dotBg = toneFillClass(meta.tone).split(' ')[0] ?? 'bg-primary';
  const interactive = onClick && !loading ? activate(onClick) : {};

  return (
    <div
      ref={ref}
      aria-label={onClick && !loading ? `Deal ${name}${company ? `, ${company}` : ''}, ${meta.label}` : undefined}
      className={cn(
        'flex items-center gap-sm px-xs py-sm transition duration-200 motion-reduce:transition-none',
        onClick && !loading && 'cursor-pointer hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading deal" className="flex flex-1 items-center gap-sm">
          <div className="h-2.5 w-2.5 rounded-full bg-neutral-100" />
          <div className="h-3 flex-1 rounded-sm bg-neutral-100" />
          <div className="h-3 w-16 rounded-sm bg-neutral-100" />
        </div>
      ) : (
        <>
          <span aria-hidden="true" className={cn('h-2.5 w-2.5 shrink-0 rounded-full', dotBg)} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
            {company || stage ? (
              <p className="truncate text-xs text-muted">{[company, stage].filter(Boolean).join(' · ')}</p>
            ) : null}
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className={cn('text-sm font-bold', valueTextClass(outcome))}>{formatMoney(valueCents, currency)}</span>
            {probability != null ? <span className="text-xs text-muted">{clampPct(probability)}%</span> : null}
          </div>
        </>
      )}
    </div>
  );
});
