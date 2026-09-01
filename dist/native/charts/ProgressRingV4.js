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
exports.RADIAL_THICKNESS_RATIO = void 0;
exports.radialThicknessV4 = radialThicknessV4;
exports.ProgressRingV4 = ProgressRingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_svg_1 = __importStar(require("react-native-svg"));
const v4_chart_1 = require("../../primitives/internal/v4-chart");
const TextV4_1 = require("../primitives/TextV4");
const theme_1 = require("../theme");
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
/**
 * Ring thickness as a fraction of the diameter.
 *
 * A geometric ratio, which is the one category of bare number §1 rule 1 allows,
 * and a **ratio** on purpose: the base wrote `strokeWidth={12}` here and
 * `thickness={18}` on the gauge, which are a fifth of a small ring and a
 * twentieth of a large one. §5 asks for exactly this — "the `strokeWidth={10}`
 * becomes a derived thickness" — so the ring's weight follows its size and a
 * small ring reads as a small version of the same component rather than as a
 * different one.
 *
 * The value reproduces the base's own proportion at its default size (a 120
 * ring at `strokeWidth = 12`), so nothing that looked right stops looking
 * right. Keep in step with the web twin.
 */
exports.RADIAL_THICKNESS_RATIO = 0.1;
/**
 * The radial family's one ring thickness, shared by `ProgressRingV4`,
 * `GaugeChartV4` and `DonutChartV4`.
 *
 * Floored at `CHART_MARK.dotSize`, because a track thinner than the smallest
 * mark the line will paint has stopped being a track: it reads as a border and
 * the "this is a proportion" cue is gone.
 */
function radialThicknessV4(size) {
    const derived = Number.isFinite(size) ? size * exports.RADIAL_THICKNESS_RATIO : 0;
    return Math.max(derived, v4_chart_1.CHART_MARK.dotSize);
}
/**
 * `Circle`, driven.
 *
 * `Animated.createAnimatedComponent` at module scope rather than inside the
 * component: it builds a class, and building it per render would remount the
 * arc on every frame.
 */
const AnimatedCircle = react_native_1.Animated.createAnimatedComponent(react_native_svg_1.Circle);
/**
 * The value arc, as its own component so its length can be an animated value.
 *
 * ## Why the dash is a length and an offset now
 *
 * It used to be `strokeDasharray={`${circumference * ratio} ${circumference}`}`
 * — the value lived inside a two-number *string*, which nothing can
 * interpolate, so a ring whose number changed after mount snapped to its new
 * length. The dash array is now the constant circumference and the value is
 * the **offset**, which is one number and therefore something
 * {@link useChartValueV4} can carry. It is also exactly the spelling the web
 * twin uses, so the two rings measure themselves the same way.
 *
 * A full ring is `ratio === 1`, which lands the offset at exactly 0 — no
 * rounding, no seam, no `NaN`, because `circumference` is finite for every
 * finite size and `r` is floored at zero.
 */
function RingArcV4({ cx, r, stroke, strokeWidth, circumference, ratio, }) {
    const offset = (0, internal_v4_1.useChartValueV4)(circumference * (1 - ratio));
    return ((0, jsx_runtime_1.jsx)(AnimatedCircle, { cx: cx, cy: cx, r: r, fill: "none", stroke: stroke, strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: circumference, strokeDashoffset: offset }));
}
/**
 * **V4 progress ring** — a *mark*, not a figure, and the one component of the
 * radial family that deliberately takes none of §4.2's frame.
 *
 * Requires `react-native-svg` (§7 open question 6).
 *
 * §4.2 names it in the exception: "Marks-only components (`Sparkline`,
 * `MiniBar`, `ProgressRing` at small sizes) take none of this: they are a mark
 * inside someone else's figure." It goes in a row, a tile or a `StatCardV4`, so
 * a title and a legend hung off it would be a second figure frame inside the
 * caller's own. It still states its value in words — rule 6 is not waived for a
 * mark — through `accessibilityLabel`.
 *
 * Three fixes against the base.
 *
 * 1. **The track is chrome, not a border.** The base painted it `colors.border`
 *    — a hairline colour doing a track's job, which §3's third decision names
 *    as the bug. `palette.grid` is the derived chrome neutral, mixed from
 *    `onSurface` so it follows the scheme; `colors.border` is a single flat
 *    value and reads as a drawn edge around a hole rather than as the unfilled
 *    part of a measure.
 * 2. **The arc is a palette slot, not a semantic token.** `palette.series[0]`
 *    is the brand hue and the same colour a `SparklineV4` in the same card
 *    takes, which is the point of slot 1 sitting at `+0` rotation. `tone` is
 *    the only path to a status hue (§4.3), and it exists for a ring that
 *    genuinely means good or bad.
 * 3. **The thickness is derived.** See {@link RADIAL_THICKNESS_RATIO}.
 *
 * The empty state is `max <= 0`. The base returned a bare `<Text>` for it,
 * which §4.5 rules out — "never a bare string, never `null`" — and which
 * collapsed the layout the moment data was late.
 */
function ProgressRingV4({ value, max = 100, size = 120, thickness, tone, label, showValue = true, loading = false, emptyLabel, animate = true, accessibilityLabel, style, }) {
    const { colors } = (0, theme_1.useXenitionTheme)();
    const palette = (0, internal_v4_1.useChartPaletteV4)();
    const shell = (body) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }, style], children: body }));
    if (loading)
        return shell((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartLoadingV4, { width: size, height: size }));
    if (!Number.isFinite(max) || max <= 0) {
        return shell((0, jsx_runtime_1.jsx)(PieChartV4_1.RadialEmptyV4, { label: emptyLabel, width: size, height: size }));
    }
    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0;
    const ratio = clamped / max;
    const percent = Math.round(ratio * 100);
    const ringWidth = thickness === undefined || !Number.isFinite(thickness)
        ? radialThicknessV4(size)
        : Math.max(thickness, 0);
    // The stroke straddles the path, so the radius is inset by half of it or the
    // ring paints outside its own footprint.
    const r = Math.max((size - ringWidth) / 2, 0);
    const circumference = 2 * Math.PI * r;
    const stroke = tone === undefined ? (0, internal_v4_1.chartSlotColor)(palette, 0) : (0, PieChartV4_1.toneColorV4)(colors, tone);
    const centre = label ?? (showValue ? `${percent}%` : undefined);
    return shell((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartRevealV4, { animate: animate, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Progress ring, ${percent}%`, style: { width: size, height: size, alignItems: 'center', justifyContent: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.default, { width: size, height: size, viewBox: `0 0 ${size} ${size}`, children: (0, jsx_runtime_1.jsxs)(react_native_svg_1.G, { rotation: -90, origin: `${size / 2}, ${size / 2}`, children: [(0, jsx_runtime_1.jsx)(react_native_svg_1.Circle, { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: palette.grid, strokeWidth: ringWidth }), ratio > 0 ? ((0, jsx_runtime_1.jsx)(RingArcV4, { cx: size / 2, r: r, stroke: stroke, strokeWidth: ringWidth, circumference: circumference, ratio: ratio })) : null] }) }), centre === undefined ? null : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { position: 'absolute' }, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", numeric: "tabular", children: centre }) }))] }) }));
}
//# sourceMappingURL=ProgressRingV4.js.map