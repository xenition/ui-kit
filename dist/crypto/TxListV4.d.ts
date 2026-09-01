import * as React from 'react';
import type { TxListProps } from './TxRow';
export interface TxListV4Props extends TxListProps {
    /** Whether the feed is still fetching. Default `false`. */
    loading?: boolean;
    /** Announced while the skeleton is up. Default `'Loading transactions'`. */
    loadingLabel?: string;
}
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
export declare const TxListV4: React.ForwardRefExoticComponent<TxListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=TxListV4.d.ts.map