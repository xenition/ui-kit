import * as React from 'react';
import { cn } from '../primitives/cn';
import { MoneyAmount } from './MoneyAmount';
import { formatMoney } from '../commerce/money';
import type { FinanceColor } from './internal/Meter';
import type { SavingsGoalCardProps } from './SavingsGoalCard';

/** Same public contract as {@link SavingsGoalCard} — a drop-in alternate design. */
export type SavingsGoalCardV3Props = SavingsGoalCardProps;

/** Quarter milestones notched into the track. */
const MILESTONES = [25, 50, 75] as const;

const FILL_BG: Record<FinanceColor, string> = {
  primary: 'bg-primary',
  accent: 'bg-accent',
  success: 'bg-success',
  warn: 'bg-warn',
  danger: 'bg-danger',
  muted: 'bg-muted',
};

const TRACK_BG: Record<FinanceColor, string> = {
  primary: 'bg-primary/10',
  accent: 'bg-accent/20',
  success: 'bg-success/10',
  warn: 'bg-warn/10',
  danger: 'bg-danger/10',
  muted: 'bg-muted/10',
};

const FILL_TEXT: Record<FinanceColor, string> = {
  primary: 'text-primary',
  accent: 'text-accent',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  muted: 'text-muted',
};

/**
 * SavingsGoalCard, redesigned (v3): a **thin milestone bar**. No ring — a slim
 * horizontal track (tinted with the goal color) fills to the saved percentage,
 * notched at the 25 / 50 / 75% milestones, with the title and percent on the
 * header row and the saved / target + "to go" caption beneath. A compact,
 * list-friendly form distinct at a glance from the base/v2 rings. Same props.
 */
export const SavingsGoalCardV3 = React.forwardRef<HTMLDivElement, SavingsGoalCardV3Props>(
  function SavingsGoalCardV3(
    { title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = formatMoney, className, ...rest },
    ref
  ) {
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);
    const pctInt = Math.round(pct * 100);

    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <div className="flex items-baseline justify-between gap-[var(--xen-space-sm)]">
          <p className="min-w-0 flex-1 truncate text-base font-bold text-on-surface">{title}</p>
          <span className={cn('text-sm font-bold', FILL_TEXT[color])}>{pctInt}%</span>
        </div>

        <div
          role="progressbar"
          aria-valuenow={pctInt}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`${title}, ${pctInt}% saved`}
          className={cn('relative h-2 overflow-hidden rounded-[var(--xen-radius-full)]', TRACK_BG[color])}
        >
          <div
            className={cn('absolute inset-y-0 left-0 rounded-[var(--xen-radius-full)]', FILL_BG[color])}
            style={{ width: `${pctInt}%` }}
          />
          {MILESTONES.map((m) => (
            <span
              key={m}
              aria-hidden
              className="absolute inset-y-0 w-0.5 bg-surface"
              style={{ left: `${m}%` }}
            />
          ))}
        </div>

        <div className="flex items-baseline gap-[var(--xen-space-xs)]">
          <MoneyAmount cents={saved} currency={currency} tone="neutral" size="sm" />
          <span className="min-w-0 flex-1 truncate text-xs text-muted">
            / {format(target, currency)} · {format(remaining, currency)} to go
            {deadline != null ? ` · by ${deadline}` : ''}
          </span>
        </div>
      </div>
    );
  }
);
