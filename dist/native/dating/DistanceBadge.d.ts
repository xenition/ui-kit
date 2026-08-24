import * as React from 'react';
import { type BadgeTone } from '../primitives';
export type DistanceUnit = 'km' | 'mi';
export type DistanceBadgeVariant = 'solid' | 'soft' | 'outline';
export interface DistanceBadgeProps {
    /** Distance value in the given `unit`. When omitted, renders the `nearbyLabel`. */
    distance?: number;
    /** Distance unit. Defaults to `km`. */
    unit?: DistanceUnit;
    /** Below this value the badge reads as "Nearby" instead of a number. */
    nearbyThreshold?: number;
    /** Copy shown for very-near / unknown distances. */
    nearbyLabel?: string;
    /** Visual weight. Defaults to `soft`. */
    variant?: DistanceBadgeVariant;
    /** Tone slot. Defaults to `neutral`. */
    tone?: BadgeTone;
    /** Leading pin glyph (set to '' to hide). */
    glyph?: string;
}
/**
 * Compact "how far away" pill for a dating profile — the native distance badge.
 * Formats a numeric `distance`+`unit` (rounding to one decimal under 10), and
 * collapses anything under `nearbyThreshold` to a friendly `nearbyLabel` so a
 * person's exact location is never implied. Token-bound via the `Badge`
 * primitive — no literal colors. The full distance is announced as one a11y
 * node, never relying on color alone.
 */
export declare function DistanceBadge({ distance, unit, nearbyThreshold, nearbyLabel, variant, tone, glyph, }: DistanceBadgeProps): React.ReactElement;
//# sourceMappingURL=DistanceBadge.d.ts.map