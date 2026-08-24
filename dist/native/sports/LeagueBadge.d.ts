import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type LeagueBadgeSize = 'sm' | 'md' | 'lg';
export type LeagueBadgeVariant = 'solid' | 'soft' | 'outline';
export interface LeagueBadgeProps {
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A league / competition crest — a small token-styled emblem (crest glyph or
 * derived initials) with an optional name label. Purely presentational and
 * dependency-free; the crest tile is a styled `View`, never an image fetch.
 * `variant` recolors from the primary slot / ramp tints; all colors resolve
 * from the compiled theme — no literals.
 */
export declare function LeagueBadge({ name, crest, label, size, variant, style, }: LeagueBadgeProps): React.ReactElement;
//# sourceMappingURL=LeagueBadge.d.ts.map