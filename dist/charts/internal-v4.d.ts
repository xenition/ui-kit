import * as React from 'react';
import { CHART_RAMP_STEPS } from '../primitives/internal/v4-chart';
/**
 * The web half of the V4 charts line.
 *
 * The palette itself, the validator run behind it and every rule about how
 * many series a form may carry live in `primitives/internal/v4-chart.ts`,
 * which both twins share. This file is the **web spelling**: how five derived
 * hexes reach an SVG fill without freezing the colour scheme.
 *
 * ## Why the palette is emitted as custom properties and not as fills
 *
 * The base charts write `fill="var(--xen-primary)"`, which follows
 * `[data-theme="dark"]` for free because the compiler re-emits every semantic
 * slot under that selector. A derived palette has no such luck: it is computed
 * in JavaScript from the seed's brand hue, and JavaScript does not know which
 * scheme is active — `useXenitionCompiledTheme()` hands back *both*.
 *
 * Resolving the scheme in JS would mean reading `document.documentElement`,
 * subscribing to attribute mutations, and re-rendering every chart on a theme
 * flip. Instead the element carries both palettes as plain hex custom
 * properties, and one static rule picks between them:
 *
 * ```css
 * [data-xen-v4-chart] { --xen-chart-1: var(--xen-chart-1-l); }
 * [data-theme="dark"] [data-xen-v4-chart] { --xen-chart-1: var(--xen-chart-1-d); }
 * ```
 *
 * The theme flip is then a pure CSS cascade — no listener, no re-render, no
 * flash — and the values that go inline are plain hexes, which survive the
 * jsdom CSSOM that drops a `color-mix()` from an inline `style` outright.
 *
 * ## Why sequential and diverging are emitted as steps
 *
 * A magnitude ramp is continuous, and a continuous value cannot be a custom
 * property picked by a selector. It is quantised to nine buckets instead —
 * which is what Carbon does too (ten discrete steps, not a gradient), and
 * which is honest about what a reader can actually distinguish: nobody reads
 * the difference between the 41st and 42nd percentile off a fill.
 */
/**
 * How many buckets a sequential or diverging ramp is quantised into.
 *
 * Re-exported from the shared palette module rather than redeclared: the
 * native twin buckets from the same binding, and the whole point of the number
 * is that both twins land on the same nine bands.
 */
export { CHART_RAMP_STEPS };
/** The one `<style>` id the whole V4 charts line injects from. Idempotent. */
export declare const CHART_V4_STYLE_ID = "xen-v4-chart-styles";
/**
 * The static sheet: scheme selection, chrome colour, and the one motion rule.
 *
 * Every declaration here is theme-independent — it maps one custom property
 * onto another, or mixes the two scheme-resolved neutral slots — so a single
 * fixed id is correct and a second `XenitionUIProvider` on the page does not
 * fight it.
 */
export declare const CHART_V4_CSS: string;
/**
 * Everything a V4 chart element needs: the attribute that opts it into the
 * sheet, and both schemes' palettes as inline custom properties.
 *
 * Spread onto the outermost element of the chart:
 *
 * ```tsx
 * const chart = useChartV4();
 * return <svg {...chart.rootProps}><rect fill={chartVar(0)} /></svg>;
 * ```
 */
export interface ChartV4 {
    /** Spread onto the chart's root element. */
    rootProps: {
        'data-xen-v4-chart': '';
        style: React.CSSProperties;
    };
    /** The active-scheme series colour references, in assignment order. */
    series: string[];
}
/**
 * Derive the palette once per brand colour and hand back both the inline
 * custom properties and the `var()` references that read them.
 *
 * Memoised on the brand hex alone: the derivation is ten gamut bisections plus
 * eighteen ramp steps, and a chart that recomputes that on every pointer move
 * is spending it on nothing.
 */
export declare function useChartV4(animate?: boolean): ChartV4;
/**
 * The `var()` for a categorical slot.
 *
 * **Throws past the last slot rather than wrapping.** The base cycled with
 * `i % SERIES.length` and silently painted a sixth series the same colour as
 * the first; two different things in one colour, with a legend that repeats
 * the swatch as though that were fine. A sixth series is a composition
 * decision — fold it into "Other", facet the chart, or drop it — and it
 * belongs to the caller, not to a modulo.
 */
export declare function chartVar(index: number): string;
/** The `var()` for a sequential bucket — magnitude, one hue, light to dark. */
export declare function chartSeqVar(t: number): string;
/** The `var()` for a diverging bucket — polarity, two arms, neutral middle. */
export declare function chartDivVar(t: number): string;
/** Grid lines — reference, not data. Recessive by construction. */
export declare const CHART_GRID_VAR = "var(--xen-chart-grid)";
/** The axis line — one step more present than the grid behind it. */
export declare const CHART_AXIS_VAR = "var(--xen-chart-axis)";
/**
 * The empty state every V4 chart falls back to.
 *
 * Not a bare string: a chart that renders nothing where a chart was promised
 * reads as a broken chart, and the caller cannot tell "no data yet" from "the
 * request failed". The plot keeps its footprint so the page does not reflow
 * when data arrives — the single most common dashboard jank, and free to
 * avoid here.
 */
export declare function ChartEmptyV4({ label, height, }: {
    label?: string;
    height?: number;
}): React.ReactElement;
//# sourceMappingURL=internal-v4.d.ts.map