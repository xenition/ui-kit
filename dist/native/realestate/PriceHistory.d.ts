import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** One point in a listing's price timeline. */
export interface PricePoint {
    /** Short axis label (e.g. "Jan", "2023"). */
    label?: string;
    /** Price in integer minor units (cents). */
    cents: number;
}
export interface PriceHistoryProps {
    /** Chronological price points. Empty renders a muted note. */
    points: PricePoint[];
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Card heading. */
    title?: string;
    /** Sparkline height in px (default 48). */
    chartHeight?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * A listing's price-over-time card — the latest price, the net change from the
 * first point (tinted `success` up / `danger` down / `muted` flat), and a
 * token-bound {@link Sparkline} of the trend. Presentational: cents in, nothing
 * fetches. Guards empty input with a muted note and never indexes an empty
 * array. Token-only colors.
 */
export declare function PriceHistory({ points, currency, title, chartHeight, style, }: PriceHistoryProps): React.ReactElement;
//# sourceMappingURL=PriceHistory.d.ts.map