import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, goalPct } from './internal';
import type { CampaignProgressProps, CampaignProgressTone } from './CampaignProgress';

/** Same public contract as {@link CampaignProgress} — a drop-in alternate design. */
export type CampaignProgressV2Props = CampaignProgressProps;

const FILL: Record<CampaignProgressTone, string> = { primary: 'bg-primary', success: 'bg-success', accent: 'bg-accent' };
const TEXT: Record<CampaignProgressTone, string> = { primary: 'text-primary', success: 'text-success', accent: 'text-accent' };

/**
 * CampaignProgress, redesigned (v2): a **stat-hero meter**. The percentage is the
 * headline (large, tone-colored), with raised-of-goal beneath, a thick rounded
 * bar with quarter ticks, and donor/days meta chips. Distinct from v1's inline
 * bar/thermometer. Same props, token-only.
 */
export const CampaignProgressV2 = React.forwardRef<HTMLDivElement, CampaignProgressV2Props>(
  function CampaignProgressV2(
    { raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant, tone = 'primary', hideAmounts = false, className, ...rest },
    ref
  ) {
    void variant;
    const pct = Math.round(goalPct(raisedCents, goalCents));

    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)} {...rest}>
        <div className="flex items-end justify-between">
          <span className={cn('text-3xl font-bold', TEXT[tone])}>{pct}%</span>
          {!hideAmounts ? (
            <span className="text-xs text-muted">
              {formatMoney(raisedCents, currency)} of {formatMoney(goalCents, currency)}
            </span>
          ) : null}
        </div>
        <div
          className="relative h-3 w-full overflow-hidden rounded-full bg-neutral-100"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={cn('h-full rounded-full', FILL[tone])} style={{ width: `${pct}%` }} />
          {[25, 50, 75].map((t) => (
            <span key={t} className="absolute top-0 h-full w-px bg-surface" style={{ left: `${t}%` }} aria-hidden />
          ))}
        </div>
        {(typeof donorCount === 'number' || typeof daysLeft === 'number') ? (
          <div className="flex gap-2">
            {typeof donorCount === 'number' ? (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{donorCount} donors</span>
            ) : null}
            {typeof daysLeft === 'number' ? (
              <span className="rounded-full bg-neutral-100 px-2 py-0.5 text-xs text-on-surface">{daysLeft} days left</span>
            ) : null}
          </div>
        ) : null}
      </div>
    );
  }
);
