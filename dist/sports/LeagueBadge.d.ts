import * as React from 'react';
export type LeagueBadgeSize = 'sm' | 'md' | 'lg';
export type LeagueBadgeVariant = 'solid' | 'soft' | 'outline';
export interface LeagueBadgeProps extends React.HTMLAttributes<HTMLDivElement> {
    /** League / competition name (e.g. `Premier League`). */
    name: string;
    /** Crest glyph or emoji; falls back to derived initials. */
    crest?: string;
    /** Short label shown beside the crest (defaults to `name`). Set `''` to hide. */
    label?: string;
    /** Size scale. Default `md`. */
    size?: LeagueBadgeSize;
    /** Fill treatment. Default `soft`. */
    variant?: LeagueBadgeVariant;
}
/**
 * A league / competition crest — a small token-styled emblem (crest glyph or
 * derived initials) with an optional name label. Purely presentational and
 * dependency-free; the crest tile is a styled `div`, never an image fetch.
 * `variant` recolors from the primary slot / ramp tints; all colors resolve
 * from `--xen-*` token classes — no literals.
 */
export declare const LeagueBadge: React.ForwardRefExoticComponent<LeagueBadgeProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LeagueBadge.d.ts.map