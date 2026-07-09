import * as React from 'react';
export type ProductMockVariant = 'analytics' | 'chat' | 'commerce' | 'calendar';
/** Chart drawn in the main pane; `scene` falls back to the variant's own vignette. */
export type ProductMockChart = 'bars' | 'sparkline' | 'rings' | 'scene';
export interface ProductMockKpi {
    label: string;
    /** Pre-formatted value string — the kit never invents numbers or locales. */
    value: string;
}
export interface ProductMockProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
    /** Which fake product the panel impersonates (default `analytics`). */
    variant?: ProductMockVariant;
    /** Chrome-bar label (defaults per variant, e.g. `analytics / production`). */
    title?: string;
    /** KPI tiles across the top (defaults per variant; `[]` hides the row). */
    kpis?: ProductMockKpi[];
    /**
     * Main-pane visual. Defaults per variant: analytics `bars`, commerce
     * `sparkline`, chat and calendar their own `scene` (message thread /
     * month grid). `rings` works everywhere.
     */
    chart?: ProductMockChart;
    /** Live event feed lines in the side pane (defaults per variant; `[]` hides it). */
    feed?: string[];
    /** Badge text next to the pulsing dot (default `LIVE`; `false` hides the badge). */
    live?: string | false;
    /** 3D entrance: rise + un-tilt on mount (default true; reduced motion skips it). */
    tilt?: boolean;
    /** Footnote line under the feed (e.g. "9,214 events in the last 5s"). */
    footnote?: string;
}
/**
 * A configurable fake-product panel — the "product shot" of a landing hero,
 * generalized from the SaaS template's dashboard mock. Glass chrome bar with
 * a pulsing LIVE badge, KPI tiles, an animated main pane (equalizer bars,
 * self-drawing sparkline, progress rings, chat thread, or month grid), and a
 * sliding event feed. Entirely CSS-animated (no library), token-only colors,
 * deterministic layout, and `aria-hidden` throughout: it is scenery — real
 * copy belongs outside it.
 *
 * ```tsx
 * <ProductMock variant="commerce" kpis={[{ label: 'Revenue', value: '$9,120' }]} />
 * ```
 */
export declare const ProductMock: React.ForwardRefExoticComponent<ProductMockProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ProductMock.d.ts.map