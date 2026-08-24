import * as React from 'react';
import { type Align, type Justify, type SpaceKey } from './_tokens';
export interface ColumnProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Vertical space between children, from the spacing scale. */
    gap?: SpaceKey;
    align?: Exclude<Align, 'baseline'>;
    justify?: Justify;
}
/**
 * Vertical flex column with a token-bound `gap` plus `align`/`justify`
 * controls — the web vertical stack. Gap traces to the `--xen-space-*` tokens;
 * no literal colors.
 */
export declare const Column: React.ForwardRefExoticComponent<ColumnProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Column.d.ts.map