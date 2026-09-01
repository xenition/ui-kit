import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { PLACEHOLDER_CLASS } from './internal/ledger-v4';
import { TransactionRowV4 } from './TransactionRowV4';
import type { StatementListProps } from './StatementList';

export interface StatementListV4Props extends StatementListProps {
  /** What the loading region announces. Default `'Loading transactions'`. */
  loadingLabel?: string;
}

/**
 * **V4 statement list** — the web twin of the native `StatementListV4`, same
 * props as {@link StatementList} plus `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **`loadingRows={0}` draws no skeletons.** `Math.max(1, loadingRows)`
 *    meant zero was silently one, so the one caller who wanted the header and
 *    nothing else got a placeholder bar it could not turn off.
 * 2. **The loading region is announced.** Each placeholder carried
 *    `aria-label="Loading transaction"` on a bare `div`, which has no role to
 *    hang a name on, so nothing reached a reader at all — and four of them
 *    would have been four announcements of the same fact. One live region says
 *    it once.
 * 3. **Skeletons take the shared placeholder ground**, not `bg-border` at
 *    `opacity-50` — the hairline colour, stretched into a surface and then
 *    made translucent, so it was a different colour on every ground it was
 *    dropped onto.
 * 4. **An entry with no `currency` inherits the list's.** Each row fell
 *    through to its own `'USD'` default, so one euro statement with a single
 *    entry missing its code printed that row in dollars, at the same
 *    magnitude. The list resolves one currency from the entries that declare
 *    one and hands it to those that do not.
 * 5. **It is a real list, and empty is a real empty state.** The rows were
 *    sibling `div`s with no list semantics and no count; the empty case drew
 *    the v0 dashed box rather than the V4 one.
 */
export const StatementListV4 = React.forwardRef<HTMLDivElement, StatementListV4Props>(
  function StatementListV4(
    {
      items,
      header,
      onSelectItem,
      loading = false,
      loadingRows = 4,
      emptyTitle = 'No transactions',
      emptyDescription,
      loadingLabel = 'Loading transactions',
      className,
      ...rest
    },
    ref
  ) {
    const list = items ?? [];

    const headerNode =
      header != null ? (
        <p className="mb-xs text-xs font-semibold uppercase tracking-wide text-muted-text">
          {header}
        </p>
      ) : null;

    if (loading) {
      const rows = Math.max(0, Math.trunc(loadingRows));
      return (
        <div ref={ref} className={className} {...rest}>
          {headerNode}
          <div role="status" aria-live="polite" aria-label={loadingLabel} className="flex flex-col">
            {/* The shape the feed is about to be, not a bar of the hairline colour. */}
            {Array.from({ length: rows }).map((_, index) => (
              <div key={index} className="flex items-center gap-md px-md py-sm">
                <div
                  className={cn(
                    'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] shrink-0 rounded-full',
                    PLACEHOLDER_CLASS
                  )}
                />
                <div className="flex min-w-0 flex-1 flex-col gap-xs">
                  <div className={cn('h-sm w-1/3', PLACEHOLDER_CLASS)} />
                  <div className={cn('h-sm w-2/3', PLACEHOLDER_CLASS)} />
                </div>
                <div className={cn('h-sm w-xl shrink-0', PLACEHOLDER_CLASS)} />
              </div>
            ))}
          </div>
        </div>
      );
    }

    if (list.length === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          {headerNode}
          <EmptyStateV4 title={emptyTitle} description={emptyDescription} />
        </div>
      );
    }

    // One statement is one currency in every product that has ever shipped
    // one; an entry that omits the code means "the same as the rest", not
    // "dollars".
    const listCurrency = list.find((entry) => entry.currency != null)?.currency;

    return (
      <div ref={ref} className={className} {...rest}>
        {headerNode}
        <ul aria-label={header} className="flex flex-col">
          {list.map((entry, index) => (
            <li
              key={entry.id ?? String(index)}
              className={index < list.length - 1 ? 'border-b border-border' : undefined}
            >
              <TransactionRowV4
                title={entry.title}
                subtitle={entry.subtitle}
                amountCents={entry.amountCents}
                currency={entry.currency ?? listCurrency}
                direction={entry.direction}
                date={entry.date}
                icon={entry.icon}
                onClick={onSelectItem ? () => onSelectItem(entry, index) : undefined}
              />
            </li>
          ))}
        </ul>
      </div>
    );
  }
);
