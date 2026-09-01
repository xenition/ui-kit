import * as React from 'react';
import type { SavedSearchRowProps } from './SavedSearchRow';
/** Drop-in for {@link SavedSearchRowProps} — same props, the V4 "listing" design. */
export type SavedSearchRowV4Props = SavedSearchRowProps;
/**
 * SavedSearchRow — **V4** "listing" design. The editorial take on a
 * saved-searches row: an elevated, rounded card with the query name, a one-line
 * filter summary, a soft-primary "new matches" count pill, and an alerts toggle.
 * Same props/behavior as {@link SavedSearchRowProps}; the alert switch renders
 * only when `onToggleAlerts` is provided and is kept out of the row's press
 * target so toggling never runs the search. Token-only colors via
 * `useXenitionTheme()` + `withAlpha`; a11y-labelled.
 */
export declare function SavedSearchRowV4({ name, summary, newCount, alertsOn, onToggleAlerts, onPress, style, }: SavedSearchRowV4Props): React.ReactElement;
//# sourceMappingURL=SavedSearchRowV4.d.ts.map