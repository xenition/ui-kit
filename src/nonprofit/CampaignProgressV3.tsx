import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, goalPct } from './internal';
import type { CampaignProgressProps, CampaignProgressTone } from './CampaignProgress';

/** Same public contract as {@link CampaignProgress} — a drop-in alternate design. */
export type CampaignProgressV3Props = CampaignProgressProps;

const FILL: Record<CampaignProgressTone, string> = { primary: 'bg-primary', success: 'bg-success', accent: 'bg-accent' };

/**
 * CampaignProgress, redesigned (v3): a **minimal inline meter**. One thin bar with
 * a single caption line — "raised / goal · N%" — no headline, no ticks. For
 * embedding under a list item. The opposite of v2's stat hero. Same props,
 * token-only.
 */
export const CampaignProgressV3 = React.forwardRef<HTMLDivElement, CampaignProgressV3Props>(
  function CampaignProgressV3(
    { raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant, tone = 'primary', hideAmounts = false, className, ...rest },
    ref
  ) {
    void variant;
    const pct = Math.round(goalPct(raisedCents, goalCents));
    const meta = [
      typeof donorCount === 'number' ? `${donorCount} donors` : null,
      typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter((s): s is string => !!s);

    return (
      <div ref={ref} className={cn('flex flex-col gap-1', className)} {...rest}>
        <div
          className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-100"
          role="progressbar"
          aria-valuenow={pct}
          aria-valuemin={0}
          aria-valuemax={100}
        >
          <div className={cn('h-full rounded-full', FILL[tone])} style={{ width: `${pct}%` }} />
        </div>
        {!hideAmounts ? (
          <p className="text-xs text-muted">
            <span className="font-semibold text-on-surface">{formatMoney(raisedCents, currency)}</span> / {formatMoney(goalCents, currency)} · {pct}%
            {meta.length > 0 ? ` · ${meta.join(' · ')}` : ''}
          </p>
        ) : null}
      </div>
    );
  }
);
