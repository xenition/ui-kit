import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface TableColumn<T> {
    key: string;
    header: React.ReactNode;
    /** Custom cell renderer; falls back to `String(row[key])`. */
    render?: (row: T) => React.ReactNode;
}
export interface TableProps<T> {
    columns: TableColumn<T>[];
    rows: T[];
    getRowKey?: (row: T, index: number) => string;
    /** Rendered when `rows` is empty; defaults to a guiding two-line empty state. */
    empty?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
}
/**
 * Themed data table — the native mirror of the web `Table`. Row/column layout
 * built from View/Text (RN has no <table>); token-bound borders and text. No
 * literal colors.
 */
export declare function Table<T>({ columns, rows, getRowKey, empty, style, }: TableProps<T>): React.ReactElement;
//# sourceMappingURL=Table.d.ts.map