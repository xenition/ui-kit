import * as React from 'react';
import type { SavedSearchRowProps } from './SavedSearchRow';
/** Drop-in for {@link SavedSearchRowProps} — same props, the V4 "listing" design. */
export type SavedSearchRowV4Props = SavedSearchRowProps;
/**
 * SavedSearchRow — **V4** "listing" design (web parity of the native V4). The
 * editorial take on a saved-searches row: an elevated, rounded card with the
 * query name, a one-line filter summary, a soft-primary "new matches" count
 * pill, and an alerts toggle. Same props/behavior as {@link SavedSearchRowProps};
 * the alert switch renders only when `onToggleAlerts` is provided and is kept out
 * of the row's press target so toggling never runs the search. The
 * row-activation callback stays `onRun` (not the DOM `onClick`). Colors come
 * from the `--xen-*` tokens — no literal colors.
 */
export declare const SavedSearchRowV4: React.ForwardRefExoticComponent<SavedSearchRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavedSearchRowV4.d.ts.map