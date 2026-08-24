import * as React from 'react';
import { type Align, type Justify, type SpaceKey } from './_tokens';
export interface ClusterProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space between children, from the spacing scale. Defaults to `sm`. */
    gap?: SpaceKey;
    align?: Align;
    justify?: Justify;
    /** Wrap onto new lines when the row overflows. Defaults to `true`. */
    wrap?: boolean;
}
/**
 * A wrapping inline group — tags, chips, button rows — that flows children left
 * to right and wraps by default, with a token-bound `gap`. Gap traces to the
 * `--xen-space-*` tokens; no literal colors.
 */
export declare const Cluster: React.ForwardRefExoticComponent<ClusterProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Cluster.d.ts.map