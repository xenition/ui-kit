import * as React from 'react';
import { type TransactionDirection } from './TransactionRow';
/** One entry in a statement / transaction feed. */
export interface StatementEntry {
    /** Stable key for the row (falls back to the index when absent). */
    id?: string;
    title: string;
    subtitle?: string;
    amountCents: number;
    currency?: string;
    direction?: TransactionDirection;
    date?: string;
    icon?: string;
}
export interface StatementListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The rows to render (each a {@link TransactionRow}). */
    items: StatementEntry[];
    /** Optional section grouping header rendered above the list. */
    header?: string;
    /** Fires with the entry (and index) when a row is clicked. */
    onSelectItem?: (entry: StatementEntry, index: number) => void;
    /** Show skeleton placeholder rows instead of content. */
    loading?: boolean;
    /** How many skeleton rows to draw while `loading` (default `4`). */
    loadingRows?: number;
    /** Empty-state headline (default `No transactions`). */
    emptyTitle?: React.ReactNode;
    /** Empty-state supporting line. */
    emptyDescription?: React.ReactNode;
}
/**
 * A statement feed: an optional section header over a token-divided list of
 * {@link TransactionRow}s. Handles the three list states explicitly —
 * `loading` renders skeleton rows, an empty `items` array renders an
 * {@link EmptyState}, and otherwise each entry becomes a clickable row (row
 * keys guard against a missing `id` by falling back to the index). No fetching;
 * purely presentational and token-bound. Web parity of the native
 * `StatementList`.
 */
export declare const StatementList: React.ForwardRefExoticComponent<StatementListProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=StatementList.d.ts.map