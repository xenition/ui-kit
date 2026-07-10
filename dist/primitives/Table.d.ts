import * as React from 'react';
export interface TableColumn<T> {
    /** Stable key; also the default field read from the row when `render` is omitted. */
    key: string;
    header: React.ReactNode;
    /** Custom cell renderer; falls back to `String(row[key])`. */
    render?: (row: T) => React.ReactNode;
}
export interface TableProps<T> {
    columns: TableColumn<T>[];
    rows: T[];
    /** Stable row key; defaults to the row index. */
    getRowKey?: (row: T, index: number) => string;
    /** Rendered when `rows` is empty. */
    empty?: React.ReactNode;
    className?: string;
}
/** Themed data table — the control every list/CRM/support queue needs. Horizontally
 *  scrollable, token-bound, with a built-in empty state. */
export declare function Table<T>({ columns, rows, getRowKey, empty, className, }: TableProps<T>): React.ReactElement;
//# sourceMappingURL=Table.d.ts.map