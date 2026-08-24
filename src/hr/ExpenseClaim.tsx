import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Button } from '../primitives';
import { StatusPill } from './StatusPill';
import {
  formatMoney,
  EXPENSE_STATUS_META,
  EXPENSE_CATEGORY_META,
  type ExpenseStatus,
  type ExpenseCategory,
} from './internal';

export type ExpenseClaimVariant = 'default' | 'compact';

export interface ExpenseClaimProps {
  /** Merchant / vendor name. */
  merchant: string;
  /** Expense category — glyph + word chip. */
  category: ExpenseCategory;
  /** Claim amount in integer **cents**. */
  amountCents: number;
  /** ISO 4217 currency (default USD). */
  currency?: string;
  /** Pre-formatted transaction date. */
  date?: string;
  /** Claim lifecycle status — glyph + word pill. */
  status: ExpenseStatus;
  /** Free-text description / memo. */
  description?: string;
  /** Whether a receipt is attached — flagged by word + glyph. */
  hasReceipt?: boolean;
  /** Show approve/reject actions (meaningful while `submitted`). */
  actionable?: boolean;
  /** Density. */
  variant?: ExpenseClaimVariant;
  onApprove?: () => void;
  onReject?: () => void;
  /** Click handler for the whole card (web parity of native `onPress`). */
  onClick?: () => void;
  className?: string;
}

/**
 * An expense-claim card: merchant, category, amount (integer **cents** via
 * `formatMoney`), date, and lifecycle status. Status is a glyph + word pill
 * (approved → success, rejected → danger, never color alone) and a missing
 * receipt is flagged by a glyph + word. When `actionable` and still `submitted`,
 * approve / reject `<button>`s render for an approver. `compact` drops the memo.
 * All colors are `--xen-*` token classes — no literals. `forwardRef` to the
 * root `<div>`.
 */
export const ExpenseClaim = React.forwardRef<HTMLDivElement, ExpenseClaimProps>(function ExpenseClaim(
  {
    merchant,
    category,
    amountCents,
    currency = 'USD',
    date,
    status,
    description,
    hasReceipt,
    actionable = false,
    variant = 'default',
    onApprove,
    onReject,
    onClick,
    className,
  },
  ref
) {
  const compact = variant === 'compact';
  const catMeta = EXPENSE_CATEGORY_META[category];
  const showActions = actionable && status === 'submitted';
  const interactive = onClick != null;

  return (
    <Card
      ref={ref}
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={
        interactive
          ? `Expense ${merchant}, ${formatMoney(amountCents, currency)}, ${EXPENSE_STATUS_META[status].label}`
          : undefined
      }
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
          <p className="truncate text-base font-bold text-on-surface">{merchant}</p>
          <span className="flex items-center gap-1.5">
            <span aria-hidden="true" className="text-sm">
              {catMeta.glyph}
            </span>
            <span className="text-xs text-muted">
              {catMeta.label}
              {date ? ` · ${date}` : ''}
            </span>
          </span>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="text-lg font-bold text-on-surface">{formatMoney(amountCents, currency)}</span>
          <StatusPill meta={EXPENSE_STATUS_META[status]} variant="inline" size="sm" />
        </div>
      </div>

      {!compact && description ? <p className="line-clamp-2 text-xs text-muted">{description}</p> : null}

      {hasReceipt != null ? (
        <p className={cn('text-xs font-semibold', hasReceipt ? 'text-muted' : 'text-danger')}>
          {hasReceipt ? '📎 Receipt attached' : '⚠ No receipt'}
        </p>
      ) : null}

      {showActions ? (
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="primary"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onApprove?.();
            }}
          >
            Approve
          </Button>
          <Button
            size="sm"
            variant="danger"
            className="flex-1"
            onClick={(e) => {
              e.stopPropagation();
              onReject?.();
            }}
          >
            Reject
          </Button>
        </div>
      ) : null}
    </Card>
  );
});
