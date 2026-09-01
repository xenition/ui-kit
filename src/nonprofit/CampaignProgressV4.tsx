import * as React from 'react';
import { cn } from '../primitives/cn';
import { formatMoney, goalPct } from './internal';
import type { CampaignProgressProps, CampaignProgressTone } from './CampaignProgress';

/** Drop-in for {@link CampaignProgressProps} — same props, the V4 "rally" design. */
export type CampaignProgressV4Props = CampaignProgressProps;

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
 * CampaignProgress — **V4** "rally" design (web parity of the native V4). The
 * warm, mission-driven take on a goal meter: a bold raised numeral, a thick
 * rounded track on a soft-primary well, and the percent + donor/days meta as
 * soft chips; when the goal is met it celebrates with a labelled success note
 * (never color alone). Honors both `variant`s (`bar` / `thermometer`) and every
 * `tone`, identical props/behavior to {@link CampaignProgressProps}. Progress is
 * announced via `role="progressbar"` and printed as a percentage + amounts. All
 * colors from `--xen-*` token classes (no literals).
 */
export const CampaignProgressV4 = React.forwardRef<HTMLDivElement, CampaignProgressV4Props>(
  function CampaignProgressV4(
    { raisedCents, goalCents, currency = 'USD', donorCount, daysLeft, variant = 'bar', tone = 'primary', hideAmounts = false, className, ...rest },
    ref
  ) {
    const pct = goalPct(raisedCents, goalCents);
    const rounded = Math.round(pct);
    const pctLabel = `${rounded}%`;
    const met = pct >= 100;

    const meta = [
      typeof donorCount === 'number' ? `${donorCount} donors` : null,
      typeof daysLeft === 'number' ? `${daysLeft} days left` : null,
    ].filter(Boolean) as string[];

    const a11y = {
      role: 'progressbar' as const,
      'aria-valuemin': 0,
      'aria-valuemax': 100,
      'aria-valuenow': rounded,
      'aria-label': `${pctLabel} of goal raised`,
    };

    const metaChips =
      meta.length > 0 ? (
        <div className="flex flex-wrap gap-xs">
          {meta.map((m) => (
            <span key={m} className="inline-flex items-center rounded-full bg-primary/10 px-sm py-0.5 text-xs font-semibold text-on-surface">
              {m}
            </span>
          ))}
        </div>
      ) : null;

    if (variant === 'thermometer') {
      return (
        <div ref={ref} className={cn('flex items-end gap-md', className)} {...rest}>
          <div {...a11y} className="w-lg overflow-hidden rounded-full bg-primary/15" style={{ height: 140 }}>
            <div className={cn('w-full rounded-full', FILL[tone])} style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }} />
          </div>
          <div className="flex flex-1 flex-col gap-xs">
            <span className="text-3xl font-extrabold text-on-surface">{pctLabel}</span>
            {!hideAmounts ? (
              <span className="text-sm text-muted">{`${formatMoney(raisedCents, currency)} of ${formatMoney(goalCents, currency)}`}</span>
            ) : null}
            {met ? <span className="text-sm font-bold text-success">🎉 Goal reached</span> : null}
            {metaChips}
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        {!hideAmounts ? (
          <div className="flex items-baseline justify-between gap-sm">
            <span className="text-2xl font-extrabold text-on-surface">{formatMoney(raisedCents, currency)}</span>
            <span className="text-sm text-muted">{`of ${formatMoney(goalCents, currency)}`}</span>
          </div>
        ) : null}
        <div {...a11y} className="h-3.5 w-full overflow-hidden rounded-full bg-primary/15">
          <div className={cn('h-full rounded-full', FILL[tone])} style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between gap-sm">
          <span className={cn('text-sm font-bold', met ? 'text-success' : PCT_TEXT[tone])}>
            {met ? `🎉 ${pctLabel} — goal reached` : pctLabel}
          </span>
          {metaChips}
        </div>
      </div>
    );
  }
);
