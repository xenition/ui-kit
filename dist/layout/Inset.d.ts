import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface InsetProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Uniform padding on all sides, from the spacing scale. Defaults to `md`. */
    space?: SpaceKey;
    /** Override horizontal padding independently. */
    horizontal?: SpaceKey;
    /** Override vertical padding independently. */
    vertical?: SpaceKey;
}
/**
 * Pads its children inward by a token-bound amount — uniform via `space`, or
 * per-axis via `horizontal`/`vertical`. All padding traces to the `--xen-space-*`
 * tokens; no literal colors.
 */
export declare const Inset: React.ForwardRefExoticComponent<InsetProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Inset.d.ts.map