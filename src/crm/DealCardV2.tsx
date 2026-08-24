import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar } from '../primitives';
import { formatMoney } from '../commerce';
import { activate, clampPct, OUTCOME_META, type DealOutcome } from './internal';
import type { DealCardProps } from './DealCard';

/** V2 accepts the exact same props as {@link DealCard} — a drop-in replacement. */
export type DealCardV2Props = DealCardProps;

/** Value/meter color by outcome — won reads success, lost reads danger. */
function valueTextClass(outcome: DealOutcome): string {
  return outcome === 'won' ? 'text-success' : outcome === 'lost' ? 'text-danger' : 'text-on-surface';
}
function meterFillClass(outcome: DealOutcome): string {
  return outcome === 'won' ? 'bg-success' : outcome === 'lost' ? 'bg-danger' : 'bg-primary';
}
const OUTCOME_PILL_TINT: Record<DealOutcome, string> = {
  open: 'bg-primary/10 text-primary',
  won: 'bg-success/10 text-success',
  lost: 'bg-danger/10 text-danger',
  pending: 'bg-warn/10 text-warn',
};

/**
 * DealCard **design V2** — an *elevated* deal card led by a big money figure,
 * with a full-width stage progress bar and an owner-avatar footer. Where the base
 * is a flat outlined summary, V2 floats on a token `shadow-md`, promotes the value
 * to a hero number colored by outcome, and turns win-probability into the card's
 * primary visual. Outcome sits in a tinted pill (glyph + word) so it never leans
 * on color. Same props / integer-cents money as {@link DealCard}. Token-pure.
 */
export const DealCardV2 = React.forwardRef<HTMLDivElement, DealCardV2Props>(function DealCardV2(
  {
    name,
    company,
    valueCents,
    currency = 'USD',
    stage,
    probability,
    owner,
    closeDate,
    outcome = 'open',
    variant = 'default',
    loading = false,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const compact = variant === 'compact';
  const pct = clampPct(probability);
  const showMeter = probability != null;
  const meta = OUTCOME_META[outcome];
  const interactive = onClick && !loading ? activate(onClick) : {};

  return (
    <Card
      ref={ref}
      aria-label={onClick && !loading ? `Deal ${name}${company ? `, ${company}` : ''}` : undefined}
      className={cn(
        'flex flex-col gap-md rounded-lg shadow-md transition duration-200 motion-reduce:transition-none',
        compact && 'gap-sm',
        onClick && !loading && 'cursor-pointer hover:-translate-y-0.5 hover:shadow-lg motion-reduce:hover:transform-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
        className
      )}
      {...interactive}
      {...rest}
    >
      {loading ? (
        <div aria-label="Loading deal" className="flex flex-col gap-sm">
          <div className="h-3 w-[40%] rounded-sm bg-neutral-100" />
          <div className="h-7 w-[60%] rounded-sm bg-neutral-100" />
          <div className="h-2 w-full rounded-full bg-neutral-100" />
        </div>
      ) : (
        <>
          <div className="flex items-start justify-between gap-sm">
            <div className="min-w-0 flex-1">
              <p className="truncate font-bold text-on-surface">{name}</p>
              {company ? <p className="truncate text-sm text-muted">{company}</p> : null}
            </div>
            <span
              className={cn('flex shrink-0 items-center gap-0.5 rounded-full px-sm py-0.5 text-xs font-bold', OUTCOME_PILL_TINT[outcome])}
            >
              <span aria-hidden="true">{meta.glyph}</span>
              <span>{meta.label}</span>
            </span>
          </div>

          <span className={cn('text-2xl font-extrabold', valueTextClass(outcome))}>{formatMoney(valueCents, currency)}</span>

          {showMeter ? (
            <div className="flex flex-col gap-1">
              <div className="flex justify-between text-xs text-muted">
                <span className="truncate font-semibold">{stage ?? 'Progress'}</span>
                <span className="font-bold">{pct}%</span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={pct}
                className="h-2 overflow-hidden rounded-full bg-neutral-100"
              >
                <div className={cn('h-full rounded-full', meterFillClass(outcome))} style={{ width: `${pct}%` }} />
              </div>
            </div>
          ) : stage ? (
            <span className="truncate text-xs font-semibold text-muted">{stage}</span>
          ) : null}

          {owner || closeDate ? (
            <div className="flex items-center justify-between gap-sm">
              {owner ? (
                <div className="flex min-w-0 items-center gap-xs">
                  <Avatar size="sm" name={owner.name} src={owner.avatarUrl} />
                  {owner.name ? <span className="truncate text-xs text-muted">{owner.name}</span> : null}
                </div>
              ) : (
                <span />
              )}
              {closeDate ? <span className="text-xs text-muted">{closeDate}</span> : null}
            </div>
          ) : null}
        </>
      )}
    </Card>
  );
});
