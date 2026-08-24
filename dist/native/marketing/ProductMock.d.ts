import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export type ProductMockVariant = 'analytics' | 'chat' | 'commerce' | 'calendar';
/** Chart drawn in the main pane; `scene` falls back to the variant's own vignette. */
export type ProductMockChart = 'bars' | 'sparkline' | 'rings' | 'scene';
export interface ProductMockKpi {
    label: string;
    /** Pre-formatted value string — the kit never invents numbers or locales. */
    value: string;
}
export interface ProductMockProps {
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
    /** Event feed lines in the side pane (defaults per variant; `[]` hides it). */
    feed?: string[];
    /** Badge text next to the status dot (default `LIVE`; `false` hides the badge). */
    live?: string | false;
    /** Footnote line under the feed (e.g. "9,214 events in the last 5s"). */
    footnote?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * A configurable fake-product panel — the native mirror of the web
 * `ProductMock`, the "product shot" of a landing hero.
 *
 * The web version is entirely CSS-animated (3D tilt entrance, looping
 * equalizer bars, self-drawing sparkline/rings, sliding feed rows) over glass
 * chrome with `backdrop-filter`. React Native has no keyframe engine,
 * `filter: blur()`, or SVG stroke-dash animation, so native renders a
 * **static, deterministic token visual** — no animation loop, reduced-motion
 * safe. The `variant`/`chart`/`kpis`/`feed` prop contract is preserved for
 * parity: bars/sparkline become stacked Views, rings become concentric
 * bordered circles, chat/calendar scenes become static bubble/grid layouts.
 * Token-only colors throughout; it is decorative scenery (`aria-hidden`).
 */
export declare function ProductMock({ variant, title, kpis, chart, feed, live, footnote, style, }: ProductMockProps): React.ReactElement;
//# sourceMappingURL=ProductMock.d.ts.map