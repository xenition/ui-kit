import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, goalPct } from './internal';

/** Layout of a {@link CampaignProgress}. */
export type CampaignProgressVariant = 'bar' | 'thermometer';
export type CampaignProgressTone = 'primary' | 'success' | 'accent';

export interface CampaignProgressProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'> {
  /** Amount raised so far, integer **cents**. */
  raisedCents: number;
  /** Fundraising goal, integer **cents**. A zero/negative goal is guarded. */
  goalCents: number;
  /** ISO 4217 currency for money formatting (default `USD`). */
  currency?: string;
  /** Optional donor count shown in the meta row. */
  donorCount?: number;
  /** Optional days-left figure shown in the meta row. */
  daysLeft?: number;
  /** `bar` (default) is a horizontal fill; `thermometer` is a vertical fill. */
  variant?: CampaignProgressVariant;
  /** Fill color slot (default `primary`). */
  tone?: CampaignProgressTone;
  /** Hide the raised/goal headline (keep only the meter). */
  hideAmounts?: boolean;
}

const FILL: Record<CampaignProgressTone, string> = {
  primary: 'bg-primary',
  success: 'bg-success',
  accent: 'bg-accent',
};

const PCT_TEXT: Record<CampaignProgressTone, string> = {
  primary: 'text-primary',
  success: 'text-success',
  accent: 'text-accent',
};

/**
 * Web parity of the native `CampaignProgress`: a goal-progress meter for a
 * campaign — a horizontal `bar` or a vertical `thermometer`. The fill is sized
 * to `raised/goal` with the divide-by-zero guarded (`goalPct`) and clamped to
 * [0, 100]. Progress is announced through `role="progressbar"` AND printed as a
 * percentage + raised/goal amounts, so state never rests on color alone. Money
 * is integer cents formatted via `formatMoney`. All colors come from the
 * `--xen-*` token classes — no literal colors.
 */
export const CampaignProgress = React.forwardRef<HTMLDivElement, CampaignProgressProps>(
  function CampaignProgress(
    {
      raisedCents,
      goalCents,
      currency = 'USD',
      donorCount,
      daysLeft,
      variant = 'bar',
      tone = 'primary',
      hideAmounts = false,
      className,
      ...rest
    },
    ref
  ) {
    const pct = goalPct(raisedCents, goalCents);
    const rounded = Math.round(pct);
    const pctLabel = `${rounded}%`;

    const meta = [
      typeof donorCount === 'number' ? `${donorCount} donors` : null,
      typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean);

    const a11y = {
      role: 'progressbar' as const,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuenow': rounded,
      'aria-label': `${pctLabel} of goal raised`,
    };

    if (variant === 'thermometer') {
      return (
        <div ref={ref} className={cn('flex items-end gap-md', className)} {...rest}>
          <div
            {...a11y}
            className="w-lg overflow-hidden rounded-full bg-border"
            style={{ height: 140 }}
          >
            <div
              className={cn('w-full rounded-full', FILL[tone])}
              style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
            />
          </div>
          <div className="flex flex-1 flex-col gap-xs">
            <span className="text-2xl font-extrabold text-on-surface">{pctLabel}</span>
            {!hideAmounts ? (
              <span className="text-sm text-muted">
                {`${formatMoney(raisedCents, currency)} of ${formatMoney(goalCents, currency)}`}
              </span>
            ) : null}
            {meta.length > 0 ? (
              <span className="text-sm text-muted">{meta.join(' · ')}</span>
            ) : null}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-xs', className)} {...rest}>
        {!hideAmounts ? (
          <div className="flex items-baseline justify-between">
            <span className="text-lg font-extrabold text-on-surface">
              {formatMoney(raisedCents, currency)}
            </span>
            <span className="text-sm text-muted">{`of ${formatMoney(goalCents, currency)}`}</span>
          </div>
        ) : null}
        <div {...a11y} className="h-3 w-full overflow-hidden rounded-full bg-border">
          <div className={cn('h-full rounded-full', FILL[tone])} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex justify-between">
          <span className={cn('text-sm font-bold', PCT_TEXT[tone])}>{pctLabel}</span>
          {meta.length > 0 ? (
            <span className="text-sm text-muted">{meta.join(' · ')}</span>
          ) : null}
        </div>
      </div>
    );
  }
);
