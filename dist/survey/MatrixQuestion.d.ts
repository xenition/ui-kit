import * as React from 'react';
import type { MatrixRow, SurveyChoice } from './types';
export interface MatrixQuestionProps {
    /** The statement rows. Empty (rows or columns) renders the empty state. */
    rows: MatrixRow[];
    /** The shared column choices applied to every row. */
    columns: SurveyChoice[];
    /** Controlled answers keyed by row id → selected column id. */
    value: Record<string, string>;
    /** Fires with the row and the column just chosen for it. */
    onChange: (rowId: string, columnId: string) => void;
    /** Accessible name for the matrix. Default `'Rating matrix'`. */
    'aria-label'?: string;
    disabled?: boolean;
    className?: string;
}
/**
 * A matrix / grid question — one `radiogroup` per statement row, each sharing
 * the same column choices, laid out as a header row plus one selectable cell per
 * column. The chosen cell in a row fills with the primary token and is announced
 * via `aria-checked` (state is never color-only). An empty `rows` or `columns`
 * list renders a muted {@link EmptyState}. No literal colors.
 */
export declare const MatrixQuestion: React.ForwardRefExoticComponent<MatrixQuestionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=MatrixQuestion.d.ts.map