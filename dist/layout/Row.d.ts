import * as React from 'react';
import { type Align, type Justify, type SpaceKey } from './_tokens';
export interface RowProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space between children, from the spacing scale. */
    gap?: SpaceKey;
    align?: Align;
    justify?: Justify;
    wrap?: boolean;
}
/**
 * Horizontal flex row with a token-bound `gap` plus `align`/`justify`/`wrap`
 * controls — the web horizontal stack. Gap traces to the `--xen-space-*`
 * tokens; no literal colors.
 */
export declare const Row: React.ForwardRefExoticComponent<RowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Row.d.ts.map