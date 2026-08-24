import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  BENEFIT_STATUS_META,
  BENEFIT_TYPE_META,
  type BenefitStatus,
  type BenefitType,
} from './internal';

export type BenefitsEnrollmentVariant = 'default' | 'compact';

export interface BenefitsEnrollmentProps {
  /** Plan display name (e.g. "PPO Gold"). */
  planName: string;
  /** Kind of benefit — glyph + word chip. */
  type: BenefitType;
  /** Enrollment state — glyph + word pill. */
  status: BenefitStatus;
  /** Coverage tier / description (e.g. "Employee + Family"). */
  coverage?: string;
  /** Employee's per-period cost in integer **cents**. */
  costCents?: number;
  /** Cost period label (default "/mo"). */
  costPeriod?: string;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Open-enrollment deadline, pre-formatted. */
  enrollBy?: string;
  /** Show the enroll / change action (meaningful when `eligible`/`pending`). */
  actionable?: boolean;
  /** Density. */
  variant?: BenefitsEnrollmentVariant;
  onEnroll?: () => void;
  /** Click handler for the whole card (web parity of native `onPress`). */
  onClick?: () => void;
  className?: string;
}

/**
 * A benefits-plan enrollment card: plan name, benefit type, coverage tier, and
 * per-period cost (integer **cents** via `formatMoney`). Enrollment status is a
 * glyph + word pill (enrolled → success, eligible → primary, never color alone).
 * When `actionable` and not already enrolled, an enroll / change `<button>`
 * renders. `compact` drops coverage + deadline. All colors are `--xen-*` token
 * classes — no literals. `forwardRef` to the root `<div>`.
 */
export const BenefitsEnrollment = React.forwardRef<HTMLDivElement, BenefitsEnrollmentProps>(
  function BenefitsEnrollment(
    {
      planName,
      type,
      status,
      coverage,
      costCents,
      costPeriod = '/mo',
      currency = 'USD',
      enrollBy,
      actionable = false,
      variant = 'default',
      onEnroll,
      onClick,
      className,
    },
    ref
  ) {
    const compact = variant === 'compact';
    const typeMeta = BENEFIT_TYPE_META[type];
    const showAction = actionable && (status === 'eligible' || status === 'pending');
    const enrolled = status === 'enrolled';
    const interactive = onClick != null;

    return (
      <Card
        ref={ref}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `Benefit ${planName}, ${BENEFIT_STATUS_META[status].label}` : undefined}
        onClick={interactive ? onClick : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex flex-col gap-3',
          interactive && 'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
          className
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 flex-1">
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true" className="text-base">
                {typeMeta.glyph}
              </span>
              <span className="truncate text-base font-bold text-on-surface">{planName}</span>
            </span>
            <p className="text-xs font-semibold text-muted">{typeMeta.label}</p>
          </div>
          <StatusPill meta={BENEFIT_STATUS_META[status]} size="sm" />
        </div>

        {!compact && coverage ? <p className="text-sm text-muted">{coverage}</p> : null}

        <div className="flex items-end justify-between gap-3">
          {costCents != null ? (
            <span className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-on-surface">{formatMoney(costCents, currency)}</span>
              <span className="text-xs text-muted">{costPeriod}</span>
            </span>
          ) : (
            <span />
          )}
          {!compact && enrollBy && !enrolled ? (
            <span className="text-xs text-muted">Enroll by {enrollBy}</span>
          ) : null}
        </div>

        {showAction ? (
          <Button
            size="sm"
            variant="secondary"
            onClick={(e) => {
              e.stopPropagation();
              onEnroll?.();
            }}
          >
            {status === 'pending' ? 'Complete enrollment' : 'Enroll'}
          </Button>
        ) : null}
      </Card>
    );
  }
);
