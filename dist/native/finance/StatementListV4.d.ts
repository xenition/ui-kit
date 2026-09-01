import * as React from 'react';
import type { StatementListProps } from './StatementList';
export interface StatementListV4Props extends StatementListProps {
    /** Announced once while the feed loads. Default `'Loading transactions'`. */
    loadingLabel?: string;
}
/**
 * **V4 statement list** — same props as {@link StatementList} plus
 * `loadingLabel`.
 *
 * ## Five changes
 *
 * 1. **The loading state is the shape of the list.** Four flat bars at
 *    `colors.border` — the *hairline* colour, at `opacity: 0.5`, so a
 *    different colour on every ground — became four ghost rows with a leading
 *    slot, two text lines and an amount, drawn in the shared opaque skeleton.
 * 2. **`loadingRows={0}` draws no skeletons.** `Math.max(1, loadingRows)`
 *    made zero mean one, so a caller who asked for a quiet load got a row
 *    anyway.
 * 3. **The load is announced once.** Every placeholder carried
 *    `accessibilityLabel="Loading transaction"`, so a reader heard it four
 *    times and learned nothing the first time did not say.
 * 4. **An entry with no `currency` does not silently become USD.** It inherits
 *    the currency the list is already stating — the first entry that declares
 *    one — instead of falling through to a dollar sign on a euro statement.
 * 5. **The separator is a real rule between rows**, so the last row no longer
 *    trails a hairline off the end of the list, and it is inset to clear the
 *    leading slot.
 */
export declare function StatementListV4({ items, header, onSelectItem, loading, loadingRows, emptyTitle, emptyDescription, loadingLabel, appearance, style, }: StatementListV4Props): React.ReactElement;
//# sourceMappingURL=StatementListV4.d.ts.map