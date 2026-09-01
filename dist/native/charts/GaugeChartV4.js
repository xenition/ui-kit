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
exports.GaugeChartV4 = GaugeChartV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
const ProgressRingV4_1 = require("./ProgressRingV4");
/**
 * A point on the gauge's semicircle. `t` in `[0, 1]` walks 180° → 0°, i.e. left
 * to right across the top half, which is the direction every reviewed system
 * draws a gauge in.
 */
function gaugePoint(cx, cy, r, t) {
    return (0, PieChartV4_1.polarV4)(cx, cy, r, -Math.PI * (1 - t));
}
/**
 * `Path`, driven. Built once at module scope — `createAnimatedComponent`
 * returns a component class, and rebuilding it per render would remount the
 * arc on every frame.
 */
const AnimatedPath = react_native_1.Animated.createAnimatedComponent(react_native_svg_1.Path);
/**
 * The value arc, as its own component so its length can be an animated value.
 *
 * ## Why the arc is the whole track now
 *
 * The value used to live in the path `d`: a shorter arc ending at
 * `gaugePoint(t)`, with a large-arc flag that flipped at the halfway mark.
 * That draws the same picture, but a path string is not something a value can
 * travel along — and the flag flipping means even a renderer that interpolated
 * `d` could not interpolate this one. So a gauge whose number changed after
 * mount jumped from one arc to the next.
 *
 * The geometry is now the track's, revealed by a dash: one fixed path, with
 * the value as `strokeDashoffset`, which is a single number and therefore
 * something {@link useChartValueV4} can carry. It is also the spelling
 * `ProgressRingV4` uses, so the two radial members of this family measure
 * themselves the same way instead of drifting.
 *
 * A full gauge is `t === 1`, which lands the offset at exactly 0 — no
 * rounding, no seam, and never `NaN`, because `r` is floored at zero and `t`
 * is clamped into `[0, 1]`.
 */
function GaugeArcV4({ d, stroke, strokeWidth, arcLength, t, }) {
    const offset = (0, internal_v4_1.useChartValueV4)(arcLength * (1 - t));
    return ((0, jsx_runtime_1.jsx)(AnimatedPath, { d: d, fill: "none", stroke: stroke, strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: arcLength, strokeDashoffset: offset }));
}
/**
 * **V4 gauge** — a single value against a scale, so it is a figure with a
 * `summary` and **no legend**.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * That sentence is §5's whole direction for this component and it is
 * load-bearing rather than descriptive: a legend is the identity channel's
 * redundancy (§4.8) and exists "whenever there are two or more series". One
 * series has no identity to disambiguate, so a legend here would be a swatch
 * next to the only colour on screen. The redundancy obligation is discharged by
 * the visible number instead — the strongest secondary encoding the line has.
 *
 * Four changes against the base.
 *
 * 1. **The track is chrome.** `colors.border` was a hairline colour doing a
 *    track's job (§3, decision 3). It is `palette.grid` now — the derived
 *    neutral the whole line's grid takes.
 * 2. **`thickness={18}` became a derived thickness.** §5 asks for this by name;
 *    `radialThicknessV4` is the family's answer, shared with `ProgressRingV4`
 *    and `DonutChartV4` so the three cannot drift.
 * 3. **The needle is gone.** It encoded the value a second time — the arc's end
 *    already *is* the value — and it cost a `strokeWidth={2}` literal. Removing
 *    it also lets the well hold the number at the figure's own type step.
 * 4. **The fill is a palette slot or a `tone`.** The base's
 *    `color?: keyof SemanticColors` defaulted to `'primary'` and accepted
 *    `'danger'` as though the two were the same kind of choice. They are not:
 *    one is identity, one is state (§4.3).
 *
 * The empty state is a non-positive span. `min === max` is a gauge with no
 * scale; the web base papered over it with `max - min || 1`, a silent lie that
 * draws a full arc for every value.
 */
function GaugeChartV4({ value, min = 0, max = 100, size = 200, thickness, tone, title, summary, caption, showValue = true, loading = false, emptyLabel, animate = true, accessibilityLabel, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const arcWidth = thickness === undefined || !Number.isFinite(thickness)
        ? (0, ProgressRingV4_1.radialThicknessV4)(size)
        : Math.max(thickness, 0);
    // A half-disc plus half a stroke above and below the centre line, so the
    // block is never taller than it needs to be and the caller's row does not
    // move when the gauge appears.
    const height = size / 2 + arcWidth;
    const frame = (plot) => ((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartFigureV4, { title: title, caption: caption, style: style, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartLoadingV4, { width: size, height: height, circle: false }));
    const span = max - min;
    if (!Number.isFinite(span) || span <= 0) {
        return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.RadialEmptyV4, { label: emptyLabel, width: size, height: height }));
    }
    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, min), max) : min;
    const t = (clamped - min) / span;
    const cx = size / 2;
    const cy = size / 2;
    const r = Math.max(size / 2 - arcWidth / 2, 0);
    const [sx, sy] = gaugePoint(cx, cy, r, 0);
    const [ex, ey] = gaugePoint(cx, cy, r, 1);
    const track = `M${(0, PieChartV4_1.coordV4)(sx)} ${(0, PieChartV4_1.coordV4)(sy)} A${(0, PieChartV4_1.coordV4)(r)} ${(0, PieChartV4_1.coordV4)(r)} 0 0 1 ${(0, PieChartV4_1.coordV4)(ex)} ${(0, PieChartV4_1.coordV4)(ey)}`;
    // The arc is a semicircle, so its length is `π r` with no approximation.
    // See {@link GaugeArcV4} for why the value is a dash offset now.
    const arcLength = Math.PI * r;
    const stroke = tone === undefined ? (0, internal_v4_1.chartSlotColor)(palette, 0) : (0, PieChartV4_1.toneColorV4)(colors, tone);
    const centre = summary ?? String(clamped);
    return frame((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartRevealV4, { animate: animate, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Gauge, ${clamped} of ${max}`, style: { width: size, height, alignItems: 'center', justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: height, viewBox: `0 0 ${size} ${height}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Path, { d: track, fill: "none", stroke: palette.grid, strokeWidth: arcWidth, strokeLinecap: "round" }), t > 0 ? ((0, jsx_runtime_1.jsx)(GaugeArcV4, { d: track, stroke: stroke, strokeWidth: arcWidth, arcLength: arcLength, t: t })) : null] }) }), showValue ? (
                // Already spoken by the plot's own label, so the visible copy is
                // hidden rather than read out twice.
                (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { position: 'absolute', bottom: 0 }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: centre }) })) : null] }) }));
}
//# sourceMappingURL=GaugeChartV4.js.map