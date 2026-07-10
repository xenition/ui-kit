import * as React from 'react';
export interface DataTableColumn<T> {
    key: string;
    header: React.ReactNode;
    /** Custom cell renderer; falls back to `String(accessor(row))`. */
    render?: (row: T) => React.ReactNode;
    /** Enable click-to-sort on this column. */
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
    onRowClick?: (row: T) => void;
    empty?: React.ReactNode;
    className?: string;
}
/**
 * Sortable, searchable, paginated data table — the control every list/CRM/admin
 * screen needs. Client-side; bound to the theme tokens. For a full
 * create/edit/delete screen use {@link CrudTable}.
 */
export declare function DataTable<T>({ columns, rows, pageSize, searchable, getRowKey, onRowClick, empty, className, }: DataTableProps<T>): React.ReactElement;
//# sourceMappingURL=DataTable.d.ts.map