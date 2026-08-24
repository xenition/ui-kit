import * as React from 'react';
import { cn } from '../primitives/cn';
import { MoneyAmount } from '../finance/MoneyAmount';
import { EmptyState } from '../commerce/EmptyState';
import { formatToken, truncateHash } from './internal/format';
import { pressableProps } from './internal/pressable';

/** On-chain lifecycle state of a transaction. */
export type TxStatus = 'pending' | 'confirmed' | 'failed';

/** Send (out) vs receive (in) — drives the amount sign/tone. */
export type TxDirection = 'send' | 'receive';

export interface TxRowProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Transaction hash (truncated for display). */
  hash: string;
  /** Lifecycle state — rendered with a glyph AND label, never color alone. */
  status?: TxStatus;
  /** Send tints the amount `danger`, receive tints it `success`. */
  direction?: TxDirection;
  /** Amount in token units. */
  amount?: number;
  /** Token ticker for the amount. */
  symbol?: string;
  /** Fraction digits for the token amount (default `4`). */
  decimals?: number;
  /** Optional fiat value in integer **cents**. */
  valueCents?: number;
  /** ISO 4217 currency for the fiat value (default `USD`). */
  currency?: string;
  /** Right-aligned timestamp string (already localized by the caller). */
  timestamp?: string;
  /** Truncation lead/tail for the hash (default 6/4). */
  hashLead?: number;
  hashTail?: number;
  /** Fires on row click — makes the row a keyboard-operable button. */
  onClick?: () => void;
}

const STATUS: Record<TxStatus, { label: string; glyph: string; text: string }> = {
  pending: { label: 'Pending', glyph: '◷', text: 'text-warn' },
  confirmed: { label: 'Confirmed', glyph: '✓', text: 'text-success' },
  failed: { label: 'Failed', glyph: '✕', text: 'text-danger' },
};

const AMOUNT_TEXT: Record<'send' | 'receive' | 'none', string> = {
  send: 'text-danger',
  receive: 'text-success',
  none: 'text-on-surface',
};

/**
 * One transaction in a history feed: a status pill (glyph + label, so state is
 * never color-only), a truncated hash, an optional signed token amount + fiat
 * value, and a timestamp. Send reads `danger`, receive reads `success`. Amounts
 * are fixed-precision — no float drift. Becomes a keyboard-operable button when
 * `onClick` is set. Web parity of the native `TxRow`.
 */
export const TxRow = React.forwardRef<HTMLDivElement, TxRowProps>(function TxRow(
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
    className,
    ...rest
  },
  ref
) {
  const meta = STATUS[status];
  const short = truncateHash(hash, hashLead, hashTail);
  const interactive = pressableProps(onClick);

  const signedAmount =
    direction && amount != null ? (direction === 'send' ? -Math.abs(amount) : Math.abs(amount)) : amount;
  const amountText = AMOUNT_TEXT[direction ?? 'none'];
  const amountPrefix = direction === 'send' ? '−' : direction === 'receive' ? '+' : '';

  return (
    <div
      ref={ref}
      aria-label={interactive ? `Transaction ${short}, ${meta.label}` : undefined}
      className={cn(
        'flex items-center gap-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer rounded-[var(--xen-radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...interactive}
      {...rest}
    >
      <span
        className="inline-flex items-center gap-1 rounded-full bg-neutral-100 px-2 py-0.5"
        aria-label={meta.label}
      >
        <span aria-hidden="true" className={cn('text-xs', meta.text)}>
          {meta.glyph}
        </span>
        <span className={cn('text-xs font-semibold', meta.text)}>{meta.label}</span>
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-semibold tabular-nums text-on-surface">{short}</span>
        {timestamp != null ? <span className="text-xs text-muted">{timestamp}</span> : null}
      </div>

      {signedAmount != null ? (
        <div className="flex flex-col items-end gap-0.5">
          <span className={cn('text-base font-bold tabular-nums', amountText)}>
            {amountPrefix}
            {formatToken(Math.abs(signedAmount), { decimals, symbol })}
          </span>
          {valueCents != null ? (
            <MoneyAmount cents={valueCents} currency={currency} tone="muted" size="sm" />
          ) : null}
        </div>
      ) : null}
    </div>
  );
});

export interface TxListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Transactions to render, newest first. */
  items: TxRowProps[];
  /** Empty-state headline (default `No transactions`). */
  emptyTitle?: string;
  /** Empty-state supporting line. */
  emptyDescription?: string;
  /** Fires with the row (and index) on select. */
  onSelectItem?: (item: TxRowProps, index: number) => void;
}

/**
 * A token-divided list of {@link TxRow}s with an explicit empty state. Row keys
 * fall back to the index when a `hash` collides. Purely presentational. Web
 * parity of the native `TxList`.
 */
export const TxList = React.forwardRef<HTMLDivElement, TxListProps>(function TxList(
  { items, emptyTitle = 'No transactions', emptyDescription, onSelectItem, className, ...rest },
  ref
) {
  if (items.length === 0) {
    return (
      <div ref={ref} className={className} {...rest}>
        <EmptyState title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} {...rest}>
      {items.map((item, index) => (
        <div
          key={`${item.hash}-${index}`}
          className={index < items.length - 1 ? 'border-b border-border' : undefined}
        >
          <TxRow {...item} onClick={onSelectItem ? () => onSelectItem(item, index) : item.onClick} />
        </div>
      ))}
    </div>
  );
});
