import * as React from 'react';
export interface SavedSearchRowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Search name (e.g. "2BR under $600k, Brooklyn"). */
    name: string;
    /** One-line summary of the filters. */
    summary?: string;
    /** Count of new matches since last viewed; shows a primary badge when > 0. */
    newCount?: number;
    /** Whether alert notifications are on. Renders a toggle when `onToggleAlerts` is set. */
    alertsOn?: boolean;
    /** Fires when the alerts toggle changes. */
    onToggleAlerts?: (on: boolean) => void;
    /** Fires when the row body is pressed (e.g. run the search). */
    onRun?: () => void;
}
/**
 * Web parity of the native `SavedSearchRow`: a row in a saved-searches list —
 * name, filter summary, a "new matches" count badge, and an optional alerts
 * toggle. Data + callbacks only; nothing fetches. The alert switch renders only
 * when `onToggleAlerts` is provided and is kept out of the row's press target so
 * toggling never runs the search. Reuses the shared `Badge`, `Switch`, and
 * `Icon`; all colors come from the `--xen-*` tokens — no literal colors.
 *
 * The row-activation callback is `onRun` (not `onClick`) to avoid colliding with
 * the DOM `onClick` handler.
 */
export declare const SavedSearchRow: React.ForwardRefExoticComponent<SavedSearchRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SavedSearchRow.d.ts.map