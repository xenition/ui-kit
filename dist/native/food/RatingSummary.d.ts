import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type RatingSummaryVariant = 'compact' | 'detailed';
export interface RatingSummaryProps {
    /** Average rating (0–5). */
    average: number;
    /** Total number of ratings. */
    count: number;
    /**
     * Optional star-bucket counts, highest star first: `[5★, 4★, 3★, 2★, 1★]`.
     * When provided and `variant` is `detailed`, a distribution bar chart shows.
     */
    distribution?: number[];
    /** Presentation (default `compact`). */
    variant?: RatingSummaryVariant;
    /** Copy shown when `count` is 0 (default `No ratings yet`). */
    emptyLabel?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Aggregate rating block — a large average, a `Rating` star row, and the total
 * count. In `detailed` mode with a `distribution` it also draws a five-row bar
 * chart (5★→1★) using token-tinted fills. When `count` is 0 it shows a muted
 * empty label instead. Bar widths are guarded against a zero denominator.
 * Token-only.
 */
export declare function RatingSummary({ average, count, distribution, variant, emptyLabel, style, }: RatingSummaryProps): React.ReactElement;
//# sourceMappingURL=RatingSummary.d.ts.map