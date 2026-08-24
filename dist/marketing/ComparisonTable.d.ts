import * as React from 'react';
export interface ComparisonColumn {
    /** Column (plan) name shown in the header. */
    name: React.ReactNode;
    /** Emphasize this column as the recommended choice. */
    highlight?: boolean;
}
export interface ComparisonRow {
    /** Feature label for the row (leading cell). */
    label: React.ReactNode;
    /** One value per column: `true` → check, `false` → dash, string → text. */
    values: (boolean | string)[];
}
export interface ComparisonTableProps extends Omit<React.HTMLAttributes<HTMLTableElement>, 'children'> {
    /** Plan columns compared across the top. */
    columns: ComparisonColumn[];
    /** Feature rows; each `values[i]` maps to `columns[i]`. */
    rows: ComparisonRow[];
    /** Label for the empty top-left corner cell. */
    featureLabel?: React.ReactNode;
    /** Badge text on the highlighted column header. */
    highlightLabel?: React.ReactNode;
}
/**
 * Feature-comparison grid: plan `columns` across the top × feature `rows`
 * down the side, with check/dash/text cells and an optional highlighted
 * recommended column.
 */
export declare const ComparisonTable: React.ForwardRefExoticComponent<ComparisonTableProps & React.RefAttributes<HTMLTableElement>>;
//# sourceMappingURL=ComparisonTable.d.ts.map