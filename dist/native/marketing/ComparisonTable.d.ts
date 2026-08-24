import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ComparisonColumn {
    /** Column (plan) name shown in the header. */
    name: string;
    /** Emphasize this column as the recommended choice. */
    highlight?: boolean;
}
export interface ComparisonRow {
    /** Feature label for the row (leading cell). */
    label: string;
    /** One value per column: `true` → check, `false` → dash, string → text. */
    values: (boolean | string)[];
}
export interface ComparisonTableProps {
    /** Plan columns compared across the top. */
    columns: ComparisonColumn[];
    /** Feature rows; each `values[i]` maps to `columns[i]`. */
    rows: ComparisonRow[];
    /** Label for the empty top-left corner cell. */
    featureLabel?: string;
    /** Badge text on the highlighted column header. */
    highlightLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Feature-comparison matrix — the native mirror of the web `ComparisonTable`.
 * Plan `columns` across the top × feature `rows` down the side, with
 * check/dash/text cells and an optional highlighted recommended column.
 *
 * Native layout choice: rather than the base `Table` primitive, this is a
 * hand-built token-styled matrix wrapped in a horizontal `ScrollView` so the
 * true grid survives on phones — the sticky-ish feature label column keeps a
 * fixed width while the plan columns scroll horizontally when they overflow.
 * Token-only.
 */
export declare function ComparisonTable({ columns, rows, featureLabel, highlightLabel, style, }: ComparisonTableProps): React.ReactElement;
//# sourceMappingURL=ComparisonTable.d.ts.map