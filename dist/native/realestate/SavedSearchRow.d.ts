import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface SavedSearchRowProps {
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
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A row in a saved-searches list — name, filter summary, a "new matches" count
 * badge, and an optional alerts toggle. Data + callbacks only; nothing fetches.
 * The alert switch renders only when `onToggleAlerts` is provided and is kept
 * out of the row's press target so toggling never runs the search. Reuses the
 * shared `Badge`, `Switch`, and `Icon`; token-only colors; a11y-labelled.
 */
export declare function SavedSearchRow({ name, summary, newCount, alertsOn, onToggleAlerts, onPress, style, }: SavedSearchRowProps): React.ReactElement;
//# sourceMappingURL=SavedSearchRow.d.ts.map