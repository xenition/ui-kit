import * as React from 'react';
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
export interface KanbanProps extends React.HTMLAttributes<HTMLDivElement> {
    columns: KanbanColumn[];
    /** Fires when a card is clicked. */
    onCardPress?: (card: KanbanCard, column: KanbanColumn) => void;
    /** Width of each column in px (default 260). */
    columnWidth?: number;
}
/**
 * Web parity of the native `Kanban`: a horizontally scrolling board of titled
 * columns, each a vertical stack of cards with a count chip. Non-drag (click a
 * card via `onCardPress`); wire your own DnD layer for reordering. Empty columns
 * show a muted placeholder. All colors/spacing come from the `--xen-*` tokens via
 * Tailwind classes — no literal colors.
 */
export declare const Kanban: React.ForwardRefExoticComponent<KanbanProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Kanban.d.ts.map