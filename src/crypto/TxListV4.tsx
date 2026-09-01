import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import {
  ROW_V4_CSS,
  ROW_V4_STYLE_ID,
  rowSeparatorClass,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../dashboard/internal/row-v4';
import { PLACEHOLDER_CLASS } from './internal/market-v4';
import type { TxListProps } from './TxRow';
import { TxRowV4 } from './TxRowV4';

export interface TxListV4Props extends TxListProps {
  /** Whether the feed is still fetching. Default `false`. */
  loading?: boolean;
  /** Announced while the skeleton is up. Default `'Loading transactions'`. */
  loadingLabel?: string;
}

/** How many placeholder rows a fetching feed draws. */
const SKELETON_ROWS = 4;

/**
 * **V4 transaction list** — the web twin of the native `TxListV4`, same props
 * as {@link TxList} plus `loading` and `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **A fetching feed no longer says the wallet is empty.** `TxList` had no
 *    loading state at all, so the moment before the first page arrived it
 *    rendered "No transactions" — indistinguishable from a wallet with no
 *    history, and the worst possible thing to tell someone who has just sent
 *    money. Loading now draws skeleton rows in the shape the feed is about to
 *    take.
 * 2. **`onSelectItem` no longer silently overrides a row's own handler.** The
 *    base wrote `onClick={onSelectItem ? () => onSelectItem(item, index) :
 *    item.onClick}`, so a list-level callback swallowed every per-row one. The
 *    row's own handler wins, and the list's is the fallback.
 * 3. **The list is a list**, with a count in its name and one shared hairline
 *    between rows rather than a border on a wrapper `div`.
 */
export const TxListV4 = React.forwardRef<HTMLDivElement, TxListV4Props>(function TxListV4(
  {
    items,
    emptyTitle = 'No transactions',
    emptyDescription,
    onSelectItem,
    loading = false,
    loadingLabel = 'Loading transactions',
    className,
    ...rest
  },
  ref
) {
  injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
  injectStyleOnce(ROW_V4_STYLE_ID, ROW_V4_CSS);

  const list = items ?? [];

  if (loading) {
    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-label={loadingLabel}
        className={cn('flex flex-col', className)}
        {...rest}
      >
        {Array.from({ length: SKELETON_ROWS }).map((_, index) => (
          <div key={index} className="flex items-center gap-md px-md py-sm">
            <div className={cn('h-lg w-[5rem] shrink-0', PLACEHOLDER_CLASS)} />
            <div className="flex min-w-0 flex-1 flex-col gap-xs">
              <div className={cn('h-sm w-2/5', PLACEHOLDER_CLASS)} />
              <div className={cn('h-sm w-1/4', PLACEHOLDER_CLASS)} />
            </div>
            <div className={cn('h-md w-[4rem] shrink-0', PLACEHOLDER_CLASS)} />
          </div>
        ))}
      </div>
    );
  }

  if (list.length === 0) {
    return (
      <div ref={ref} className={className} {...rest}>
        <EmptyStateV4 title={emptyTitle} description={emptyDescription} />
      </div>
    );
  }

  return (
    <div ref={ref} className={className} {...rest}>
      <ul
        aria-label={`${list.length} ${list.length === 1 ? 'transaction' : 'transactions'}`}
        className="flex flex-col"
      >
        {list.map((item, index) => (
          <li key={`${item.hash}-${index}`}>
            <TxRowV4
              {...item}
              // The row's own handler wins; the list's is the fallback, not
              // the override it used to be.
              onClick={
                item.onClick ?? (onSelectItem ? () => onSelectItem(item, index) : undefined)
              }
            />
            {index < list.length - 1 ? (
              <div aria-hidden="true" className={rowSeparatorClass(false)} />
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
});
