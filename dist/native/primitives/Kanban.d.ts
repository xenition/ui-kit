import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface KanbanCard {
    id: string;
    title: React.ReactNode;
    description?: React.ReactNode;
    /** Optional trailing slot (e.g. a Badge or Avatar). */
    trailing?: React.ReactNode;
}
export interface KanbanColumn {
    key: string;
    title: React.ReactNode;
    cards: KanbanCard[];
}
export interface KanbanProps {
    columns: KanbanColumn[];
    /** Fires when a card is tapped. */
    onCardPress?: (card: KanbanCard, column: KanbanColumn) => void;
    /** Width of each column in px (default derived from spacing). */
    columnWidth?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontally scrolling board of titled columns, each a vertical stack of
 * cards with a count chip in its header — the display half of a Kanban. This is
 * a **non-drag** version (tap a card via `onCardPress`); wire your own gesture
 * layer for reordering. Empty columns render a muted placeholder. All colors and
 * spacing come from the compiled theme tokens via `useXenitionTheme()` — no
 * literal colors.
 */
export declare function Kanban({ columns, onCardPress, columnWidth, style, }: KanbanProps): React.ReactElement;
//# sourceMappingURL=Kanban.d.ts.map