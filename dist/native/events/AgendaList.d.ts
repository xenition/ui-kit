import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Status of an agenda entry — drives a small leading dot + label. */
export type AgendaItemStatus = 'upcoming' | 'live' | 'done';
export interface AgendaItem {
    /** Stable key. */
    id: string;
    /** Pre-formatted start time, e.g. `09:00`. */
    time: string;
    /** Entry title. */
    title: string;
    /** Optional room / track subtitle. */
    subtitle?: string;
    /** Optional status marker. */
    status?: AgendaItemStatus;
}
export interface AgendaListProps {
    /** Ordered agenda entries. */
    items: AgendaItem[];
    /** Fires when an entry is tapped. */
    onSelectItem?: (item: AgendaItem) => void;
    /** Message shown when `items` is empty. */
    emptyLabel?: string;
    /** Render placeholder rows instead of content. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A vertical, time-anchored agenda. Each row shows a time gutter, a status dot
 * (whose meaning is also spelled out for `live` entries), the title and an
 * optional subtitle. Renders a skeleton when `loading` and a centered empty
 * message when there are no items. Colors come from the compiled theme tokens;
 * no literal colors.
 */
export declare function AgendaList({ items, onSelectItem, emptyLabel, loading, style, }: AgendaListProps): React.ReactElement;
//# sourceMappingURL=AgendaList.d.ts.map