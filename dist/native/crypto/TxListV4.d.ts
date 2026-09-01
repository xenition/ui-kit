import * as React from 'react';
import type { TxListProps } from './TxRow';
export interface TxListV4Props extends TxListProps {
    /** The feed is still fetching. Draws skeleton rows, not the empty state. */
    loading?: boolean;
    /** Announced while the feed loads. Default `'Loading transactions'`. */
    loadingLabel?: string;
}
/**
 * **V4 transaction list** — same props as {@link TxList} plus `loading` and
 * `loadingLabel`.
 *
 * ## Three changes
 *
 * 1. **A feed that is still fetching says so.** The base had no loading state
 *    at all, so a wallet whose history had not arrived yet rendered **"No
 *    transactions"** — indistinguishable from a wallet that has never
 *    transacted, and the more alarming of the two readings. `loading` draws
 *    skeleton rows in the shape the feed is about to take.
 * 2. **A row's own handler is not silently overridden.** The base wrote
 *    `onPress={onSelectItem ? () => onSelectItem(item, index) : item.onPress}`,
 *    so passing a list-level handler discarded every per-row one. The row's
 *    handler wins now and the list's is the fallback.
 * 3. **The empty state moves the user forward** — a headline and a next step
 *    through the V4 empty state, rather than the older dashed placeholder.
 */
export declare function TxListV4({ items, emptyTitle, emptyDescription, loading, loadingLabel, onSelectItem, style, }: TxListV4Props): React.ReactElement;
//# sourceMappingURL=TxListV4.d.ts.map