import * as React from 'react';
import { Animated, type StyleProp, type ViewStyle } from 'react-native';
import { type XenitionNativeTheme } from '../theme';
/** Everything a V4 chart needs from the theme, resolved for the active scheme. */
export interface ChartPaletteV4 {
    /** The five categorical slots, in assignment order. Never cycled. */
    series: string[];
    /**
     * Magnitude — one hue, light to dark, direction flipped in dark mode.
     * `t` is normalised into `[0, 1]`.
     */
    sequential: (t: number) => string;
    /**
     * Polarity — two arms meeting at a near-neutral midpoint.
     * `t` is in `[-1, 1]`; zero is not a category and gets no hue of its own.
     */
    diverging: (t: number) => string;
    /** Grid lines. Reference, not data — recessive by construction. */
    grid: string;
    /** The axis line — one step more present than the grid behind it. */
    axis: string;
    /**
     * The ring of page colour a mark carries when it can overlap another mark,
     * so two points on top of each other still read as two. One of the
     * secondary encodings the palette's CVD band obliges.
     */
    ring: string;
}
/**
 * The palette for the active scheme.
 *
 * Memoised on the brand hex and the scheme: the derivation is ten gamut
 * bisections, and a chart that recomputes it on every gesture frame is
 * spending that on nothing.
 */
export declare function useChartPaletteV4(): ChartPaletteV4;
/** {@link useChartPaletteV4} for a theme already in hand. */
export declare function useChartPaletteOf(theme: XenitionNativeTheme): ChartPaletteV4;
/**
 * The colour for a categorical slot.
 *
 * **Throws past the last slot rather than wrapping.** The base cycled with
 * `i % SERIES.length` and silently painted a sixth series the same colour as
 * the first — two different things in one colour, with a legend repeating the
 * swatch as though that were fine. A sixth series is a composition decision:
 * fold it into "Other", facet the chart, or drop it. It belongs to the caller,
 * not to a modulo.
 */
export declare function chartSlotColor(palette: ChartPaletteV4, index: number): string;
/**
 * The empty state every V4 chart falls back to — the native twin of the web
 * adapter's `ChartEmptyV4`.
 *
 * Not a bare `Text`: the bases render a `colors.muted` "No data" with no box at
 * all, so the plot collapses to a line of type and the screen reflows the
 * moment the request lands. That is the most common dashboard jank there is
 * and it is free to avoid — the footprint is kept and the label is centred in
 * it.
 *
 * `mutedText`, not `muted`. `muted` carries no contrast promise and is a fill;
 * an empty state rendered in it is the exact defect the shadcn token pass
 * closed and that the earlier review found still live in `Toast`.
 *
 * This arrived after the four build groups did — the module was closed to them
 * mid-pass — so five native components hand-rolled the same view. Folding them
 * back onto this is a move, not a rewrite.
 */
export declare function ChartEmptyV4({ label, width, height, minHeight, style, }: {
    label?: string;
    /**
     * Reserve a width too. Only a form whose footprint is square rather than
     * full-bleed needs this — a donut, a gauge, a radar, a ring — and without it
     * a radial chart in a row collapses horizontally while its data is in
     * flight, which is the same jank `height` exists to prevent on the other
     * axis. See `RadialEmptyV4` in `PieChartV4`.
     */
    width?: number;
    height?: number;
    /**
     * A floor rather than a fixed footprint, for the one member of this module
     * that is really a list (`ProgressBarsV4`): its plot has no height of its
     * own, so the placeholder reserves a row instead.
     */
    minHeight?: number;
    /**
     * Merged last, so a caller can override the centring. `LegendV4` does: its
     * rows are left-aligned, so a centred "No series" would be the only line in
     * the component that is not.
     */
    style?: StyleProp<ViewStyle>;
}): React.ReactElement;
/**
 * A value that **travels** to its target instead of jumping to it.
 *
 * `ChartRevealV4` and the per-file `useChartRevealV4` hooks are mount-time
 * entrances: they ramp a plot's opacity once, when it appears. Nothing in the
 * native charts line covered the other half — a mark already on screen whose
 * *number changed*. A progress row going 40% to 75% while the reader is
 * looking at it simply became 75%, which reads as a repaint rather than as a
 * measurement moving.
 *
 * The scale's `standard`, because a mark whose length is its value is a
 * control changing state, and `EASING_STANDARD`, because it starts and ends in
 * place. Both are the same numbers the web twin's `[data-xen-v4-chart-fill]`
 * rule carries, so the two platforms move identically.
 *
 * `useNativeDriver: false` on purpose, and it is not a compromise: the driven
 * properties here are a percentage `width` and an SVG `stroke-dashoffset`,
 * neither of which the native driver can own. Every one of them is a single
 * value on a single mark, so the JS-driven update is one number per frame.
 *
 * Under `useReducedMotion()` the value is set outright — §36.10 asks for the
 * end state, not a shorter journey.
 */
export declare function useChartValueV4(target: number): Animated.Value;
/**
 * The hover/press readout, with the fade its web twin gets for free.
 *
 * Every figure in this module renders its bubble as `{selected !== null ? … :
 * null}`, which without this is a panel that blinks into existence beside the
 * finger. The web line answers it with one CSS rule keyed off
 * `[data-xen-v4-chart-tip]`; this is that rule, as a component, so the five
 * native figures that draw a readout share one arc rather than five.
 *
 * `quick` and `EASING_STANDARD`, not the picker line's `popover` and
 * `EASING_ENTER`: a readout is feedback tied to a touch that is still
 * happening, at the place the reader is already looking. It is not a panel
 * arriving from somewhere.
 *
 * It **replaces** the bubble's own container rather than wrapping it — the
 * style passes straight through — so no figure gains a layout node for the
 * sake of an opacity.
 */
export declare function ChartTipV4({ children, style, ...rest }: {
    children?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
} & Omit<React.ComponentProps<typeof Animated.View>, 'style' | 'children'>): React.ReactElement;
//# sourceMappingURL=internal-v4.d.ts.map