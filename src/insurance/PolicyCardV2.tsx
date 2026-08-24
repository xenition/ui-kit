import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { formatMoney } from './internal/format';
import { policyVariant } from './internal/status';
import { pressableProps } from './internal/pressable';
import type { PolicyCardProps, PolicyStatus, PremiumCadence } from './PolicyCard';

/** Same public contract as {@link PolicyCard} — a drop-in alternate design. */
export type PolicyCardV2Props = PolicyCardProps;

const POLICY_STATUS: Record<PolicyStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  lapsed: { label: 'Lapsed', glyph: '!', tone: 'danger' },
  cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};

const CADENCE_SUFFIX: Record<PremiumCadence, string> = {
  monthly: '/mo',
  quarterly: '/qtr',
  annual: '/yr',
};

/**
 * PolicyCard, redesigned (**V2**) — an **elevated hero card**. A large tinted
 * glyph tile anchors the top row beside the plan name and a status pill; a
 * full-width tinted **coverage band** makes the benefit amount the visual
 * anchor, with the premium and renewal as a quiet footer. Status is conveyed by
 * glyph + text + color (never color-alone); coverage/premium stay integer cents
 * via `formatMoney`. Becomes a keyboard-operable button only when `onClick` is
 * set. Same `PolicyCardProps`; drops in for `PolicyCard`. Token-pure.
 */
export const PolicyCardV2 = React.forwardRef<HTMLDivElement, PolicyCardV2Props>(function PolicyCardV2(
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
  const coverage = format(Math.max(0, Math.trunc(coverageCents || 0)), currency);

  return (
    <Card
      ref={ref}
      variant="elevated"
      padding="lg"
      radius="lg"
      aria-label={interactive ? `${name}, ${vd.label} policy, ${sd.label}` : undefined}
      className={cn(
        'flex flex-col gap-[var(--xen-space-md)]',
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-lg)] bg-primary/10 shadow-sm">
          <Icon glyph={vd.glyph} size="3xl" color="primary" aria-label={`${vd.label} policy`} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-xl font-extrabold text-on-surface">{name}</p>
          <p className="truncate text-sm text-muted">
            {vd.label} · {policyNumber}
          </p>
          {holder != null ? (
            <p className="truncate text-xs text-muted">Insured: {holder}</p>
          ) : null}
        </div>
        <Badge tone={sd.tone} variant="soft">
          <span aria-hidden="true">{sd.glyph}</span> {sd.label}
        </Badge>
      </div>

      <div className="flex flex-col gap-0.5 rounded-[var(--xen-radius-md)] bg-primary/10 px-[var(--xen-space-md)] py-[var(--xen-space-md)]">
        <span className="text-xs font-semibold text-muted">Total coverage</span>
        <span aria-label={`Coverage ${coverage}`} className="text-2xl font-extrabold text-on-surface">
          {coverage}
        </span>
      </div>

      {premiumCents != null || renewalDate != null ? (
        <div className="flex items-center justify-between gap-[var(--xen-space-md)]">
          {premiumCents != null ? (
            <span className="flex items-baseline gap-[var(--xen-space-xs)]">
              <span className="text-lg font-bold text-primary">
                {format(Math.max(0, Math.trunc(premiumCents)), currency)}
              </span>
              <span className="text-xs text-muted">{CADENCE_SUFFIX[cadence]}</span>
            </span>
          ) : (
            <span />
          )}
          {renewalDate != null ? (
            <span className="text-xs text-muted">Renews {renewalDate}</span>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
});
