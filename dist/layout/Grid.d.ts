import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Number of equal-width columns. Defaults to 2. */
    columns?: number;
    /** Gutter between cells, from the spacing scale. Defaults to `md`. */
    gap?: SpaceKey;
}
/**
 * Fixed-column CSS grid: children flow into `columns` equal-width tracks with a
 * token-bound `gap`. Column count is a numeric layout literal; the gap traces to
 * the `--xen-space-*` tokens (no literal colors).
 */
export declare const Grid: React.ForwardRefExoticComponent<GridProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Grid.d.ts.map