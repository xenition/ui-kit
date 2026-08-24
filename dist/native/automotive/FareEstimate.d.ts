import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Presentation for a {@link FareEstimate}. */
export type FareEstimateVariant = 'detailed' | 'summary';
/** A single line in the fare breakdown. */
export interface FareLineItem {
    /** Line label, e.g. `'Base fare'`. */
    label: string;
    /** Amount in integer minor units (cents); negatives render as discounts. */
    cents: number;
}
export interface FareEstimateProps {
    /** Line items making up the fare. */
    items?: FareLineItem[];
    /**
     * Explicit total in cents. When omitted the total is summed from `items`
     * (after applying `surgeMultiplier` to the summed subtotal).
     */
    totalCents?: number;
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Surge multiplier applied to the subtotal (e.g. `1.5`). */
    surgeMultiplier?: number;
    /** Estimated distance, pre-formatted (e.g. `'8.4 mi'`). */
    distanceLabel?: string;
    /** Estimated duration, pre-formatted (e.g. `'22 min'`). */
    durationLabel?: string;
    /** Presentation variant. `summary` hides the line-item breakdown. */
    variant?: FareEstimateVariant;
    /** Loading skeleton. */
    loading?: boolean;
    style?: StyleProp<ViewStyle>;
}
/**
 * A ride fare estimate — an optional itemised breakdown (base, distance, time,
 * discounts) with an optional surge multiplier, plus distance/duration context
 * and a bold total. The total is either supplied or summed from the items (with
 * surge applied to the subtotal); a surge is spelled out in a badge, not colour
 * alone. Presentational: shaped data only, nothing fetches. Colors come from
 * semantic tokens and `withAlpha` tints — no literal colors. `variant="summary"`
 * collapses to the total. Item indexing is guarded against a missing array.
 */
export declare function FareEstimate({ items, totalCents, currency, surgeMultiplier, distanceLabel, durationLabel, variant, loading, style, }: FareEstimateProps): React.ReactElement;
//# sourceMappingURL=FareEstimate.d.ts.map