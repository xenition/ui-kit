import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { ButtonV4 } from '../primitives/ButtonV4';
import { V4_STATE_CSS, V4_STATE_STYLE_ID } from '../primitives/internal/v4-state';
import { formatMoney as defaultFormatMoney, type MoneyFormatter } from '../commerce/money';
import { StatusPillV4 } from './StatusPillV4';
import { isAdverse } from './workforce-v4';
import {
  cardStateVars,
  EXPENSE_CATEGORY_META_V4,
  FOCUS_RING_CLASS,
  metaLine,
  MIN_TAP_CLASS,
  spokenLine,
  TABULAR_CLASS,
} from './internal/tone-v4';
import { EXPENSE_STATUS_META } from './internal';
import type { ExpenseClaimProps } from './ExpenseClaim';

export interface ExpenseClaimV4Props extends ExpenseClaimProps {
  /**
   * Why the claim was rejected.
   *
   * A rejected $840 lodging claim rendered "✕ Rejected" directly above the
   * claimant's own memo, with no room anywhere for the approver's answer.
   */
  decisionReason?: string;
  /** Copy on the approve action. Default `'Approve'`. */
  approveLabel?: string;
  /** Copy on the reject action. Default `'Reject'`. */
  rejectLabel?: string;
  /** Render the amount. Defaults to the shared `formatMoney`. */
  formatMoney?: MoneyFormatter;
  /** Test hook. Every native `hr` component had one; no web one did. */
  testID?: string;
}

/**
 * **V4 expense claim** — the web twin of the native `ExpenseClaimV4`, same
 * props as {@link ExpenseClaim} plus `decisionReason`, `approveLabel`,
 * `rejectLabel`, `formatMoney` and `testID`.
 *
 * ## Six changes
 *
 * 1. **An approver can approve from the keyboard.** Approve and Reject were
 *    `<Button>`s inside a `<Card role="button">` with its own Enter/Space
 *    handler. Their clicks were guarded with `stopPropagation`, their keydowns
 *    were not, and the card's `preventDefault()` on the bubbled Enter cancels
 *    the button's own activation — Enter's default action on a button *is*
 *    that click. So Enter on Approve opened the claim and approved nothing.
 *    The card is a plain container now, the activation wraps only the merchant
 *    and the amount, and the decisions are its **siblings**.
 * 2. **A rejection can say why.** See `decisionReason`.
 * 3. **The card is one accessible name.** `Expense Hilton, $840.00, Rejected`
 *    dropped the category, the date and the missing receipt; all of them now
 *    join the name.
 * 4. **Expense category stops spending a status colour.** `software: success`
 *    made a laptop purchase read as good news and `meals: accent` competed
 *    with the status pill for the eye. The glyph carries the category.
 * 5. **Money is overridable and inked correctly.** `formatMoney`'s third
 *    `locale` argument was unreachable, so the amount rendered in the browser
 *    default whatever the app's locale was; and "⚠ No receipt" was drawn in
 *    `text-danger`, a fill token, rather than the `danger-text` ink slot.
 * 6. **Reject weighs the same on both twins**, an outline at `tone="danger"` —
 *    web filled it and native outlined it, so the destructive action was the
 *    loudest thing on the card on one platform and the quietest on the other.
 */
export const ExpenseClaimV4 = React.forwardRef<HTMLDivElement, ExpenseClaimV4Props>(
  function ExpenseClaimV4(
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
      decisionReason,
      approveLabel = 'Approve',
      rejectLabel = 'Reject',
      formatMoney = defaultFormatMoney,
      testID,
      className,
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    // A claim with no merchant is a bordered box around an amount nobody can
    // place.
    if (!merchant) return null;

    const compact = variant === 'compact';
    const catMeta = EXPENSE_CATEGORY_META_V4[category];
    const statusMeta = EXPENSE_STATUS_META[status];
    const showActions = actionable && status === 'submitted';
    const interactive = onClick != null;
    const amount = formatMoney(amountCents, currency);
    const receiptWord = hasReceipt == null ? undefined : hasReceipt ? 'Receipt attached' : 'No receipt';
    const adverseReason = isAdverse(status) ? decisionReason : undefined;

    const summary = (
      <>
        <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
          <span className="truncate text-base font-bold text-on-card">{merchant}</span>
          <span className="flex items-center gap-xs">
            <span aria-hidden="true" className="text-sm">
              {catMeta.glyph}
            </span>
            <span className="truncate text-xs text-muted-text">{metaLine([catMeta.label, date])}</span>
          </span>
        </span>
        <span className={cn('shrink-0 text-lg font-bold text-on-card', TABULAR_CLASS)}>{amount}</span>
      </>
    );

    return (
      <Card ref={ref} data-testid={testID} className={cn('flex flex-col gap-sm', className)}>
        <div className="flex items-start gap-sm">
          {interactive ? (
            <button
              type="button"
              aria-label={spokenLine([
                'Expense',
                merchant,
                amount,
                catMeta.label,
                date,
                statusMeta.label,
                receiptWord,
                adverseReason,
              ])}
              onClick={onClick}
              data-xen-v4-state=""
              style={cardStateVars()}
              className={cn(
                'flex min-w-0 flex-1 items-start gap-sm rounded-[var(--xen-radius-md)] text-left',
                MIN_TAP_CLASS,
                FOCUS_RING_CLASS
              )}
            >
              {summary}
            </button>
          ) : (
            <div className="flex min-w-0 flex-1 items-start gap-sm">{summary}</div>
          )}
          <StatusPillV4
            meta={statusMeta}
            variant="inline"
            size="sm"
            aria-hidden={interactive || undefined}
          />
        </div>

        {!compact && description ? (
          <p className="line-clamp-2 text-xs text-muted-text">{description}</p>
        ) : null}

        {receiptWord ? (
          <p
            className={cn(
              'text-xs font-semibold',
              hasReceipt ? 'text-muted-text' : 'text-danger-text'
            )}
            aria-hidden={interactive || undefined}
          >
            <span aria-hidden="true">{hasReceipt ? '📎 ' : '⚠ '}</span>
            {receiptWord}
          </p>
        ) : null}

        {adverseReason ? (
          <p className="text-xs font-semibold text-danger-text">{adverseReason}</p>
        ) : null}

        {/* Siblings of the card's activation, never descendants of it. */}
        {showActions ? (
          <div className="flex gap-xs">
            <ButtonV4
              size="sm"
              variant="primary"
              className={cn('flex-1', MIN_TAP_CLASS)}
              onClick={onApprove}
            >
              {approveLabel}
            </ButtonV4>
            <ButtonV4
              size="sm"
              variant="outline"
              tone="danger"
              className={cn('flex-1', MIN_TAP_CLASS)}
              onClick={onReject}
            >
              {rejectLabel}
            </ButtonV4>
          </div>
        ) : null}
      </Card>
    );
  }
);
