import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { policyVariant, type PolicyVariant } from './internal/status';
import { pressableProps } from './internal/pressable';

export type { PolicyVariant };

/** Coverage lifecycle of the policy itself (distinct from a claim status). */
export type PolicyStatus = 'active' | 'pending' | 'lapsed' | 'cancelled';

const POLICY_STATUS: Record<PolicyStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

/** Premium billing cadence. */
export type PremiumCadence = 'monthly' | 'quarterly' | 'annual';

const CADENCE_SUFFIX: Record<PremiumCadence, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  annual: '/yr',
};

export interface PolicyCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Line of insurance — drives the leading glyph and label. */
  variant: PolicyVariant;
  /** Product / plan name (e.g. "Premier Auto"). */
  name: string;
  /** Policy identifier (e.g. "AUTO-4821-93"). */
  policyNumber: string;
  /** Total coverage / benefit amount in integer **cents**. */
  coverageCents: number;
  /** Recurring premium in integer **cents**. */
  premiumCents?: number;
  /** Premium billing cadence (default `monthly`). */
  cadence?: PremiumCadence;
  /** Policy lifecycle status (default `active`). */
  status?: PolicyStatus;
  /** Named insured / holder shown as a secondary line. */
  holder?: string;
  /** Localized renewal date string (already formatted by the caller). */
  renewalDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on card click; the card is only a button when supplied. */
  onClick?: () => void;
}

/**
 * A summary card for a single insurance policy. The `variant` (auto/home/life/
 * health) picks a tinted leading glyph disc; a status pill conveys the policy
 * lifecycle by **text + glyph + color** (never color alone). Coverage and
 * premium are integer cents funnelled through `formatMoney`, so printed values
 * never drift. Becomes a keyboard-operable button only when `onClick` is
 * supplied. Token-bound throughout — no literal colors. Web parity of the
 * native `PolicyCard`.
 */
export const PolicyCard = React.forwardRef<HTMLDivElement, PolicyCardProps>(function PolicyCard(
  {
    variant,
    name,
    policyNumber,
    coverageCents,
    premiumCents,
    cadence = 'monthly',
    status = 'active',
    holder,
    renewalDate,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const vd = policyVariant(variant);
  const sd = POLICY_STATUS[status] ?? POLICY_STATUS.active;
  const interactive = pressableProps(onClick);

  return (
    <Card
      ref={ref}
      aria-label={interactive ? `${name}, ${vd.label} policy, ${sd.label}` : undefined}
      className={cn(
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50">
          <Icon glyph={vd.glyph} size="xl" color="primary" aria-label={`${vd.label} policy`} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{name}</p>
          <p className="truncate text-sm text-muted">
            {vd.label} · {policyNumber}
          </p>
        </div>
        <Badge tone={sd.tone}>
          <span aria-hidden="true">{sd.glyph}</span> {sd.label}
        </Badge>
      </div>

      {holder != null ? (
        <p className="mt-[var(--xen-space-sm)] text-xs text-muted">Insured: {holder}</p>
      ) : null}

      <div className="mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs text-muted">Coverage</span>
          <span className="text-xl font-bold text-on-surface">
            {format(Math.max(0, Math.trunc(coverageCents || 0)), currency)}
          </span>
        </div>
        {premiumCents != null ? (
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-xs text-muted">Premium</span>
            <span className="flex items-baseline gap-[var(--xen-space-xs)]">
              <span className="text-base font-bold text-primary">
                {format(Math.max(0, Math.trunc(premiumCents)), currency)}
              </span>
              <span className="text-xs font-normal text-muted">{CADENCE_SUFFIX[cadence]}</span>
            </span>
          </div>
        ) : null}
      </div>

      {renewalDate != null ? (
        <p className="mt-[var(--xen-space-sm)] text-xs text-muted">Renews {renewalDate}</p>
      ) : null}
    </Card>
  );
});
