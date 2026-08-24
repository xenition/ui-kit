import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce/EmptyState';
import { TransactionRow, type TransactionDirection } from './TransactionRow';

/** One entry in a statement / transaction feed. */
export interface StatementEntry {
  /** Stable key for the row (falls back to the index when absent). */
  id?: string;
  title: string;
  subtitle?: string;
  amountCents: number;
  currency?: string;
  direction?: TransactionDirection;
  date?: string;
  icon?: string;
}

export interface StatementListProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The rows to render (each a {@link TransactionRow}). */
  items: StatementEntry[];
  /** Optional section grouping header rendered above the list. */
  header?: string;
  /** Fires with the entry (and index) when a row is clicked. */
  onSelectItem?: (entry: StatementEntry, index: number) => void;
  /** Show skeleton placeholder rows instead of content. */
  loading?: boolean;
  /** How many skeleton rows to draw while `loading` (default `4`). */
  loadingRows?: number;
  /** Empty-state headline (default `No transactions`). */
  emptyTitle?: React.ReactNode;
  /** Empty-state supporting line. */
  emptyDescription?: React.ReactNode;
}

/**
 * A statement feed: an optional section header over a token-divided list of
 * {@link TransactionRow}s. Handles the three list states explicitly —
 * `loading` renders skeleton rows, an empty `items` array renders an
 * {@link EmptyState}, and otherwise each entry becomes a clickable row (row
 * keys guard against a missing `id` by falling back to the index). No fetching;
 * purely presentational and token-bound. Web parity of the native
 * `StatementList`.
 */
export const StatementList = React.forwardRef<HTMLDivElement, StatementListProps>(
  function StatementList(
    {
      items,
      header,
      onSelectItem,
      loading = false,
      loadingRows = 4,
      emptyTitle = 'No transactions',
      emptyDescription,
      className,
      ...rest
    },
    ref
  ) {
    const headerNode =
      header != null ? (
        <p className="mb-[var(--xen-space-xs)] text-xs font-semibold uppercase tracking-wide text-muted">
          {header}
        </p>
      ) : null;

    if (loading) {
      return (
        <div ref={ref} className={className} {...rest}>
          {headerNode}
          {Array.from({ length: Math.max(1, loadingRows) }).map((_, index) => (
            <div
              key={index}
              aria-label="Loading transaction"
              className="my-[var(--xen-space-xs)] h-11 rounded-[var(--xen-radius-sm)] bg-border opacity-50"
            />
          ))}
        </div>
      );
    }

    if (items.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          {headerNode}
          <EmptyState title={emptyTitle} description={emptyDescription} />
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        {headerNode}
        {items.map((entry, index) => (
          <div
            key={entry.id ?? String(index)}
            className={index < items.length - 1 ? 'border-b border-border' : undefined}
          >
            <TransactionRow
              title={entry.title}
              subtitle={entry.subtitle}
              amountCents={entry.amountCents}
              currency={entry.currency}
              direction={entry.direction}
              date={entry.date}
              icon={entry.icon}
              onClick={onSelectItem ? () => onSelectItem(entry, index) : undefined}
            />
          </div>
        ))}
      </div>
    );
  }
);
