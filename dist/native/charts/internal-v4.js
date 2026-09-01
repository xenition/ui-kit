"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.useChartPaletteV4 = useChartPaletteV4;
exports.useChartPaletteOf = useChartPaletteOf;
exports.chartSlotColor = chartSlotColor;
exports.ChartEmptyV4 = ChartEmptyV4;
exports.useChartValueV4 = useChartValueV4;
exports.ChartTipV4 = ChartTipV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const react_native_1 = require("react-native");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_v4_1 = require("../primitives/internal/motion-v4");
const useReducedMotion_1 = require("../primitives/internal/useReducedMotion");
/**
 * The native half of the V4 charts line.
 *
 * The palette, the validator run behind it and the rules about how many series
 * a form may carry live in `primitives/internal/v4-chart.ts`, which both twins
 * share. This file is the **native spelling**, and it is much shorter than the
 * web one for a single reason: `useXenitionTheme()` has already resolved the
 * colour scheme, so a hex derived here is simply correct. There is no
 * `[data-theme]` to follow and no reason to carry both palettes.
 *
 * That asymmetry is worth stating rather than discovering: the web twin emits
 * ten custom properties and lets CSS pick; native derives five hexes and hands
 * them over. Same numbers, same order, same module — different plumbing,
 * because the platforms cannot say the same thing.
 */
/**
 * The brand hue's source of truth.
 *
 * `tokens.ramps.primary[500]`, not `colors.primary`. The ramp carries ONE
 * orientation in both schemes; the semantic slot is scheme-resolved and would
 * hand back a different hue in dark, rotating every series slot with the
 * theme. A series must not change colour family when the reader flips the
 * theme, so the hue comes from the thing that does not move.
 */
const BRAND_STEP = 500;
/**
 * The palette for the active scheme.
 *
 * Memoised on the brand hex and the scheme: the derivation is ten gamut
 * bisections, and a chart that recomputes it on every gesture frame is
 * spending that on nothing.
 */
function useChartPaletteV4() {
    const theme = (0, theme_1.useXenitionTheme)();
    return useChartPaletteOf(theme);
}
/** {@link useChartPaletteV4} for a theme already in hand. */
function useChartPaletteOf(theme) {
    const brand = theme.tokens.ramps.primary[BRAND_STEP];
    const { scheme, colors } = theme;
    return React.useMemo(() => ({
        series: (0, v4_chart_1.chartSeries)(brand, scheme),
        sequential: (t) => (0, v4_chart_1.chartSequential)(brand, t, scheme),
        diverging: (t) => (0, v4_chart_1.chartDiverging)(brand, t, scheme),
        // Mixed from onSurface into the page rather than taken from
        // `tokens.ramps.neutral`, which carries the LIGHT orientation in both
        // schemes and would paint a near-white grid across a dark chart.
        grid: (0, color_1.withAlpha)(colors.onSurface, v4_chart_1.CHART_GRID_MIX),
        axis: (0, color_1.withAlpha)(colors.onSurface, v4_chart_1.CHART_AXIS_MIX),
        ring: colors.surface,
    }), [brand, scheme, colors.onSurface, colors.surface]);
}
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
function chartSlotColor(palette, index) {
    if (!Number.isInteger(index) || index < 0 || index >= v4_chart_1.CHART_SERIES_COUNT) {
        throw new RangeError(`@xenition/ui charts: series ${index} is outside the ${v4_chart_1.CHART_SERIES_COUNT}-slot palette. ` +
            'The palette is never cycled — fold the extra series into "Other", or facet the chart.');
    }
    return palette.series[index];
}
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
function ChartEmptyV4({ label = 'No data', width, height, minHeight, style, }) {
    // Kept as a bare object when nothing overrides it, rather than always an
    // array: `style` is part of what a caller reads back off the rendered tree,
    // and wrapping every one of them in a one-element array to serve the single
    // caller that overrides would be a change to all of them.
    const base = {
        width,
        height,
        minHeight,
        alignItems: 'center',
        justifyContent: 'center',
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: label, style: style === undefined ? base : [base, style], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: label }) }));
}
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
function useChartValueV4(target) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const value = React.useRef(new react_native_1.Animated.Value(target)).current;
    // The first render must not animate: there is no previous value to travel
    // from, and a mark that eases up from its own initial number is a second
    // entrance fighting the one `ChartRevealV4` already runs.
    const mounted = React.useRef(false);
    React.useEffect(() => {
        if (!mounted.current) {
            mounted.current = true;
            value.setValue(target);
            return undefined;
        }
        if (reduced) {
            value.setValue(target);
            return undefined;
        }
        const anim = react_native_1.Animated.timing(value, {
            toValue: target,
            duration: motion_v4_1.V4_MOTION.standard,
            easing: motion_v4_1.EASING_STANDARD,
            useNativeDriver: false,
        });
        anim.start();
        return () => anim.stop();
    }, [reduced, target, value]);
    return value;
}
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
function ChartTipV4({ children, style, ...rest }) {
    const reduced = (0, useReducedMotion_1.useReducedMotion)();
    const fade = React.useRef(new react_native_1.Animated.Value(reduced ? 1 : 0)).current;
    React.useEffect(() => {
        if (reduced) {
            fade.setValue(1);
            return undefined;
        }
        const anim = react_native_1.Animated.timing(fade, {
            toValue: 1,
            duration: motion_v4_1.V4_MOTION.quick,
            easing: motion_v4_1.EASING_STANDARD,
            useNativeDriver: true,
        });
        anim.start();
        return () => anim.stop();
    }, [fade, reduced]);
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { ...rest, style: [style, { opacity: fade }], children: children }));
}
//# sourceMappingURL=internal-v4.js.map