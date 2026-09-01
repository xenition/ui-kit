import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { BadgeV4 } from '../primitives/BadgeV4';
import type { BadgeTone } from '../primitives/Badge';
import { MoneyAmount } from '../finance/MoneyAmount';
import { formatMoney } from '../commerce/money';
import {
  ROW_V4_BASE_CLASS,
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  ROW_V4_TEXT_CLASS,
  ROW_V4_TRAILING_CLASS,
  rowHeightClass,
  rowStateVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { BADGE_V4, spokenLine, TABULAR_CLASS, TONE_INK } from './internal/market-v4';
import { formatToken, truncateHash } from './internal/format';
import type { TxDirection, TxRowProps, TxStatus } from './TxRow';

export interface TxRowV4Props extends TxRowProps {
  /**
   * The unit printed when a row has no `symbol`. Default `''`, which is what
   * the base did — a send rendered as a bare "−0.5" with nothing saying of
   * what. Pass the chain's native ticker and every row carries a unit.
   */
  fallbackSymbol?: string;
}

const STATUS_META: Record<TxStatus, { label: string; glyph: string; tone: BadgeTone }> = {
  pending: { label: 'Pending', glyph: '◷', tone: 'warn' },
  confirmed: { label: 'Confirmed', glyph: '✓', tone: 'success' },
  failed: { label: 'Failed', glyph: '✕', tone: 'danger' },
};

/**
 * The amount's ink.
 *
 * A signed movement of money is the one place `success`/`danger` are *not*
 * being spent on identity — this is the same in/out reading `MoneyAmount`
 * gives every figure in the finance module. What changes here is that the ink
 * is the contrast-corrected `*Text` slot rather than the fill.
 */
const AMOUNT_INK: Record<TxDirection | 'none', string> = {
  send: 'text-danger-text',
  receive: 'text-success-text',
  none: 'text-on-card',
};

/**
 * **V4 transaction row** — the web twin of the native `TxRowV4`, same props as
 * {@link TxRow} plus `fallbackSymbol`.
 *
 * ## Four changes
 *
 * 1. **The row announces its amount.** `aria-label="Transaction 0x12…cdef,
 *    Confirmed"` sat on the interactive root and replaced the subtree, so the
 *    amount, the fiat value and the timestamp — everything a user scans a
 *    history for — were never spoken.
 * 2. **An amount always carries a unit.** `symbol` is optional and there was
 *    no fallback, so a send rendered as "−0.5" of an unnamed thing. See
 *    `fallbackSymbol`.
 * 3. **The status pill is inked, not filled.** `text-warn` / `text-success` /
 *    `text-danger` are fill slots; the pill is now the module's one badge
 *    shape, which native and web finally agree on.
 * 4. **A press is a state layer on the shared row body**, and the row is a
 *    real `<button>` rather than a `div` carrying `role="button"`, `tabIndex`
 *    and a hand-written Enter/Space handler — three approximations of what a
 *    button already does.
 */
export const TxRowV4 = React.forwardRef<HTMLDivElement, TxRowV4Props>(function TxRowV4(
  {
    hash,
    status = 'confirmed',
    direction,
    amount,
    symbol,
    decimals = 4,
    valueCents,
    currency = 'USD',
    timestamp,
    hashLead = 6,
    hashTail = 4,
    onClick,
    fallbackSymbol = '',
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

  const meta = STATUS_META[status];
  const short = truncateHash(hash, hashLead, hashTail);
  const unit = symbol ?? fallbackSymbol;

  const signedAmount =
    direction && amount != null
      ? direction === 'send'
        ? -Math.abs(amount)
        : Math.abs(amount)
      : amount;
  const amountPrefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';
  const amountText =
    signedAmount != null
      ? `${amountPrefix}${formatToken(Math.abs(signedAmount), {
          decimals,
          symbol: unit === '' ? undefined : unit,
        })}`
      : undefined;

  const label = spokenLine([
    `Transaction ${short}`,
    meta.label,
    amountText,
    valueCents != null ? formatMoney(valueCents, currency) : undefined,
    timestamp,
  ]);

  const rowClass = cn(
    ROW_V4_BASE_CLASS,
    rowHeightClass(timestamp != null),
    'rounded-[var(--xen-radius-md)]'
  );

  const body = (
    <>
      <BadgeV4 tone={meta.tone} {...BADGE_V4} className="shrink-0">
        <span aria-hidden="true">{meta.glyph}</span> {meta.label}
      </BadgeV4>

      <span className={ROW_V4_TEXT_CLASS}>
        <span className={cn('truncate text-sm font-semibold text-on-card', TABULAR_CLASS)}>
          {short}
        </span>
        {timestamp != null ? (
          <span className="text-xs text-muted-text">{timestamp}</span>
        ) : null}
      </span>

      {amountText != null ? (
        <span className={cn(ROW_V4_TRAILING_CLASS, 'flex-col items-end gap-xs')}>
          <span
            className={cn(
              'text-base font-bold',
              TABULAR_CLASS,
              AMOUNT_INK[direction ?? 'none']
            )}
          >
            {amountText}
          </span>
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="muted" size="sm" />
          ) : null}
        </span>
      ) : null}
    </>
  );

  return (
    <div ref={ref} className={className} {...rest}>
      {onClick ? (
        <button
          type="button"
          aria-label={label}
          onClick={onClick}
          data-xen-v4-row=""
          data-interactive="true"
          data-xen-v4-state=""
          style={rowStateVars()}
          className={cn(
            rowClass,
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {body}
        </button>
      ) : (
        <div className={rowClass}>{body}</div>
      )}
    </div>
  );
});
