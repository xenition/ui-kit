import * as React from 'react';
/** One point in a listing's price timeline. */
export interface PricePoint {
    /** Short axis label (e.g. "Jan", "2023"). */
    label?: string;
    /** Price in integer minor units (cents). */
    cents: number;
}
export interface PriceHistoryProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Chronological price points. Empty renders a muted note. */
    points: PricePoint[];
    /** ISO 4217 currency (default `USD`). */
    currency?: string;
    /** Card heading. */
    title?: string;
    /** Sparkline height in px (default 48). */
    chartHeight?: number;
}
/**
 * Web parity of the native `PriceHistory`: a listing's price-over-time card —
 * the latest price, the net change from the first point (tinted `success` up /
 * `danger` down / `muted` flat), and a token-bound {@link Sparkline} of the
 * trend. Presentational: cents in, nothing fetches. Guards empty input with a
 * muted note and never indexes an empty array. All colors come from the `--xen-*`
 * tokens — no literal colors.
 */
export declare const PriceHistory: React.ForwardRefExoticComponent<PriceHistoryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PriceHistory.d.ts.map