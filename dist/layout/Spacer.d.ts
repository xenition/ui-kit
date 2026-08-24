import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface SpacerProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * Fixed size from the spacing scale, or `'flex'` to grow and absorb free
     * space (pushing siblings apart). Defaults to `md`.
     */
    size?: SpaceKey | 'flex';
}
/**
 * Inert spacing element: either a fixed square from the token spacing scale or
 * a flexible `'flex'` gap that expands to fill remaining space along the
 * parent's main axis. Sizes trace to the `--xen-space-*` tokens; no literal
 * colors. Hidden from assistive tech.
 */
export declare const Spacer: React.ForwardRefExoticComponent<SpacerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Spacer.d.ts.map