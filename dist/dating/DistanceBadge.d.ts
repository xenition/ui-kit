import * as React from 'react';
import type { BadgeTone } from '../primitives';
export type DistanceUnit = 'km' | 'mi';
export type DistanceBadgeVariant = 'solid' | 'soft' | 'outline';
export interface DistanceBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Distance value in the given `unit`. When omitted, renders the `nearbyLabel`. */
    distance?: number;
    /** Distance unit. Defaults to `km`. */
    unit?: DistanceUnit;
    /** Below this value the badge reads as "Nearby" instead of a number. */
    nearbyThreshold?: number;
    /** Copy shown for very-near / unknown distances. */
    nearbyLabel?: string;
    /**
     * Visual-weight parity with the native badge. The web {@link Badge} renders a
     * single soft tone, so this is retained for API parity but does not restyle.
     */
    variant?: DistanceBadgeVariant;
    /** Tone slot. Defaults to `neutral`. */
    tone?: BadgeTone;
    /** Leading pin glyph (set to '' to hide). */
    glyph?: string;
}
/**
 * Compact "how far away" pill for a dating profile — the web parity of the native
 * distance badge. Formats a numeric `distance`+`unit` (rounding to one decimal
 * under 10), and collapses anything under `nearbyThreshold` to a friendly
 * `nearbyLabel` so a person's exact location is never implied. Token-bound via the
 * {@link Badge} primitive — no literal colors. The full distance is announced as a
 * single a11y label, never resting on color.
 */
export declare const DistanceBadge: React.ForwardRefExoticComponent<DistanceBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=DistanceBadge.d.ts.map