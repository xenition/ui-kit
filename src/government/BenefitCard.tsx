import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Icon } from '../primitives/Icon';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { formatMoney, type MoneyFormatter } from './internal/format';
import { pressableProps } from './internal/pressable';

/** Type of public benefit / assistance program. */
export type BenefitType =
  | 'food'
  | 'unemployment'
  | 'housing'
  | 'medical'
  | 'disability'
  | 'family'
  | 'other';

const BENEFIT_TYPE: Record<BenefitType, { label: string; glyph: string }> = {
  food: { label: 'Food assistance', glyph: '🥫' },
  unemployment: { label: 'Unemployment', glyph: '💼' },
  housing: { label: 'Housing', glyph: '🏘️' },
  medical: { label: 'Medical', glyph: '⚕️' },
  disability: { label: 'Disability', glyph: '♿' },
  family: { label: 'Family support', glyph: '👪' },
  other: { label: 'Benefit', glyph: '🤝' },
};

/** Enrolment status of a benefit case. */
export type BenefitStatus = 'active' | 'pending' | 'expiring' | 'expired' | 'denied' | 'suspended';

const STATUS: Record<BenefitStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  active: { label: 'Active', glyph: '✓', tone: 'success' },
  pending: { label: 'Pending', glyph: '⋯', tone: 'warn' },
  expiring: { label: 'Expiring soon', glyph: '⚠️', tone: 'warn' },
  expired: { label: 'Expired', glyph: '✕', tone: 'neutral' },
  denied: { label: 'Denied', glyph: '✕', tone: 'danger' },
  suspended: { label: 'Suspended', glyph: '!', tone: 'danger' },
};

export interface BenefitCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Program title (e.g. "SNAP", "Section 8 Housing"). */
  name: string;
  /** Benefit type — drives the leading glyph + default sub-label. */
  benefitType: BenefitType;
  /** Enrolment status (default `active`) — text + glyph + color, never alone. */
  status?: BenefitStatus;
  /** Recurring benefit amount in integer **cents** (e.g. monthly). */
  amountCents?: number;
  /** Cadence suffix for the amount (default `/mo`). */
  cadence?: string;
  /** Case / reference number. */
  caseNumber?: string;
  /** Localized date of the next payment / renewal. */
  nextDate?: string;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Override the cents → string formatter (locale control). */
  formatMoney?: MoneyFormatter;
  /** Fires on card click (open case detail); button only when supplied. */
  onClick?: () => void;
}

/**
 * A public-benefit / assistance case card: a tinted program glyph, an enrolment
 * status pill conveyed by **text + glyph + color** (never color alone), an
 * optional recurring amount as integer cents through `formatMoney`, and case /
 * next-payment metadata. Becomes a keyboard-operable button only when `onClick`
 * is supplied. Token-bound throughout — no literal colors. Web parity of the
 * native `BenefitCard`.
 */
export const BenefitCard = React.forwardRef<HTMLDivElement, BenefitCardProps>(function BenefitCard(
  {
    name,
    benefitType,
    status = 'active',
    amountCents,
    cadence = '/mo',
    caseNumber,
    nextDate,
    currency = 'USD',
    formatMoney: format = formatMoney,
    onClick,
    className,
    ...rest
  },
  ref
) {
  const bt = BENEFIT_TYPE[benefitType] ?? BENEFIT_TYPE.other;
  const sd = STATUS[status] ?? STATUS.active;
  const interactive = pressableProps(onClick);

  return (
    <Card
      ref={ref}
      aria-label={interactive ? `${name}, ${bt.label}, ${sd.label}` : undefined}
      className={cn(
        interactive &&
          'cursor-pointer transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-primary-50">
          <Icon glyph={bt.glyph} size="xl" color="primary" aria-label={bt.label} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-on-surface">{name}</p>
          <p className="truncate text-sm text-muted">
            {bt.label}
            {caseNumber != null ? ` · ${caseNumber}` : ''}
          </p>
        </div>
        <Badge tone={sd.tone}>
          <span aria-hidden="true">{sd.glyph}</span> {sd.label}
        </Badge>
      </div>

      {amountCents != null || nextDate != null ? (
        <div className="mt-[var(--xen-space-md)] flex items-end justify-between border-t border-border pt-[var(--xen-space-md)]">
          {amountCents != null ? (
            <span className="flex items-baseline gap-[var(--xen-space-xs)]">
              <span className="text-xl font-bold text-primary">
                {format(Math.max(0, Math.trunc(amountCents)), currency)}
              </span>
              <span className="text-xs text-muted">{cadence}</span>
            </span>
          ) : (
            <span />
          )}
          {nextDate != null ? (
            <span className="text-xs text-muted">Next: {nextDate}</span>
          ) : null}
        </div>
      ) : null}
    </Card>
  );
});
