import * as React from 'react';
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
export declare const StatementListV4: React.ForwardRefExoticComponent<StatementListV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatementListV4.d.ts.map