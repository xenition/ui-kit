import * as React from 'react';
import { type SpaceKey } from './_tokens';
export interface BleedProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Uniform negative margin on all sides, from the spacing scale. Defaults to `md`. */
    space?: SpaceKey;
    /** Bleed only horizontally. */
    horizontal?: SpaceKey;
    /** Bleed only vertically. */
    vertical?: SpaceKey;
}
/**
 * The inverse of `Inset`: applies token-bound *negative* margins so content can
 * break out of a padded parent (full-bleed images, edge-to-edge rows). Margins
 * trace to the `--xen-space-*` tokens; no literal colors.
 */
export declare const Bleed: React.ForwardRefExoticComponent<BleedProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=Bleed.d.ts.map