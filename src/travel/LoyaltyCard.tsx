import * as React from 'react';
import { cn } from '../primitives/cn';

export interface LoyaltyCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Loyalty program name (e.g. "SkyMiles"). */
  program: string;
  /** Member's display name. */
  memberName: string;
  /** Membership tier label (e.g. "Gold"). */
  tier: string;
  /** Current miles / points balance (formatted with `toLocaleString()`). */
  points: number;
  /** Optional membership / account id shown in the card footer. */
  memberId?: string;
  /**
   * Points required to reach the next tier. When set (and above `points`), a
   * token-driven progress bar toward the next tier is shown.
   */
  nextTierPoints?: number;
  /** Word for the balance unit (default "points"). */
  unitLabel?: string;
}

/**
 * LoyaltyCard — a **V4** "journey" loyalty card (web parity of the native twin).
 * A miles / points membership card on the brand gradient: the program name and a
 * frosted tier chip up top, the balance (formatted via `toLocaleString()`) in
 * near-white ink, an optional token-driven progress bar toward the next tier, and
 * the member name / id as a frosted footer row. All colors from `--xen-*` token
 * classes and gradient utilities — no literals; dark-mode safe.
 */
export const LoyaltyCard = React.forwardRef<HTMLDivElement, LoyaltyCardProps>(function LoyaltyCard(
  { program, memberName, tier, points, memberId, nextTierPoints, unitLabel = 'points', className, ...rest },
  ref
) {
  const balance = Math.max(0, Math.trunc(points || 0));
  const hasNext = typeof nextTierPoints === 'number' && nextTierPoints > balance;
  const remaining = hasNext ? nextTierPoints! - balance : 0;
  const pct = hasNext ? Math.min(100, Math.max(0, Math.round((balance / nextTierPoints!) * 100))) : 0;

  return (
    <div
      ref={ref}
      data-xen-loyalty-card=""
      aria-label={`${program} loyalty card, ${tier}, ${balance.toLocaleString()} ${unitLabel}`}
      className={cn(
        'flex flex-col gap-[var(--xen-space-lg)] overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 p-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      <div className="flex items-start justify-between gap-[var(--xen-space-md)]">
        <div className="flex min-w-0 items-center gap-[var(--xen-space-sm)]">
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 text-sm leading-none text-primary-50"
          >
            ✦
          </span>
          <span className="min-w-0 truncate text-base font-extrabold text-primary-50">{program}</span>
        </div>
        <span className="inline-flex items-center rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-xs font-bold uppercase tracking-wide text-primary-50">
          {tier}
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-semibold text-primary-100">Balance</span>
        <span className="text-3xl font-extrabold tracking-tight text-primary-50">
          {balance.toLocaleString()}
          <span className="ml-1.5 text-base font-semibold text-primary-100">{unitLabel}</span>
        </span>
      </div>

      {hasNext ? (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
            aria-label={`${remaining.toLocaleString()} ${unitLabel} to next tier`}
            className="h-2 w-full overflow-hidden rounded-full bg-primary-50/20"
          >
            <div className="h-full rounded-full bg-on-primary" style={{ width: `${pct}%` }} />
          </div>
          <span className="text-xs text-primary-100">
            {remaining.toLocaleString()} {unitLabel} to next tier
          </span>
        </div>
      ) : null}

      <div className="flex items-end justify-between gap-[var(--xen-space-md)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-col gap-[2px]">
          <span className="text-xs text-primary-100">Member</span>
          <span className="min-w-0 truncate text-sm font-bold text-primary-50">{memberName}</span>
        </div>
        {memberId ? (
          <div className="flex flex-col items-end gap-[2px]">
            <span className="text-xs text-primary-100">Member ID</span>
            <span className="text-sm font-bold tracking-wide text-primary-50">{memberId}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
});
