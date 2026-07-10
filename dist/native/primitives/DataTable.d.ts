import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface DataTableColumn<T> {
    key: string;
    header: React.ReactNode;
    /** Custom cell renderer; falls back to `String(accessor(row))`. */
    render?: (row: T) => React.ReactNode;
    /** Enable tap-to-sort on this column header. */
    sortable?: boolean;
    /** Value used for sort + search (defaults to `row[key]`). */
    accessor?: (row: T) => string | number;
}
export interface DataTableProps<T> {
    columns: DataTableColumn<T>[];
    rows: T[];
    /** Rows per page (default 10). */
    pageSize?: number;
    /** Show a search box that filters across accessors. */
    searchable?: boolean;
    getRowKey?: (row: T, index: number) => string;
    /** Fires when a row is tapped (native mirror of the web `onRowClick`). */
    onRowClick?: (row: T) => void;
    empty?: React.ReactNode;
    /** Wrapper style override (native mirror of the web `className`). */
    style?: StyleProp<ViewStyle>;
}
/**
 * Sortable, searchable, paginated data table — the native mirror of the web
 * `DataTable`. RN has no `<table>`, so the layout is View/Text rows with
 * `flex: 1` columns (as the native `Table`); tap a `sortable` header to toggle
 * asc → desc → none, the search box filters across accessors, and it composes
 * the native `Pagination`. Client-side, token-bound, no literal colors. For a
 * full create/edit/delete screen use `CrudTable`.
 */
export declare function DataTable<T>({ columns, rows, pageSize, searchable, getRowKey, onRowClick, empty, style, }: DataTableProps<T>): React.ReactElement;
//# sourceMappingURL=DataTable.d.ts.map