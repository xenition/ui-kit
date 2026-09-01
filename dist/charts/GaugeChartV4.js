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
exports.GaugeChartV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const TextV4_1 = require("../primitives/TextV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
const ProgressRingV4_1 = require("./ProgressRingV4");
/** Two decimals, and never `NaN` in a path `d`. */
const coord = (n) => (Number.isFinite(n) ? n.toFixed(2) : '0');
/**
 * A point on the gauge's semicircle. `t` in `[0, 1]` walks 180° → 0°, i.e.
 * left to right across the top half, which is the direction every reviewed
 * system draws a gauge in.
 */
function gaugePoint(cx, cy, r, t) {
    const a = Math.PI * (1 - t);
    const [x, y] = (0, PieChartV4_1.polarV4)(cx, cy, r, -a);
    return [x, y];
}
/**
 * **V4 gauge** — a single value against a scale, so it is a figure with a
 * `summary` and **no legend**.
 *
 * That sentence is brief §5's whole direction for this component, and it is
 * load-bearing rather than descriptive: a legend is the identity channel's
 * redundancy (§4.8) and exists "whenever there are two or more series". One
 * series has no identity to disambiguate, so a legend on a gauge would be a
 * swatch next to the only colour on screen. The redundancy obligation is
 * discharged by the visible number instead, which is the strongest secondary
 * encoding the line has.
 *
 * Four changes against the base.
 *
 * 1. **The track is chrome.** `var(--xen-border)` was a hairline colour doing a
 *    track's job (§3, decision 3). It is `CHART_GRID_VAR` now — the derived
 *    neutral the whole line's grid takes, which follows the scheme without a
 *    dark rule of its own.
 * 2. **`strokeWidth={10}` became a derived thickness.** §5 asks for this by
 *    name; `radialThicknessV4` is the family's answer and is shared with
 *    `ProgressRingV4` and `DonutChartV4` so the three cannot drift.
 * 3. **The needle is gone.** It encoded the value a second time — the arc's end
 *    already *is* the value — and it cost `strokeWidth={2}` and `r={4}`, both
 *    on §1 rule 1's list of literals this pass exists to remove. Removing it is
 *    also what lets the well hold a number at the figure's own type step
 *    instead of the base's `fontSize={size * 0.14}`, which was a font size
 *    computed from a pixel width and belonged to no scale at all.
 * 4. **The fill is a palette slot or a `tone`.** The base's `color?: ChartColor`
 *    defaulted to `'primary'` and accepted `'danger'` as though the two were
 *    the same kind of choice. They are not: one is identity, one is state
 *    (§4.3), and only `tone` reaches a status hue.
 *
 * The empty state is a non-positive span. `min === max` is a gauge with no
 * scale, which the base papered over with `max - min || 1` — a silent lie that
 * draws a full arc for every value.
 */
exports.GaugeChartV4 = React.forwardRef(function GaugeChartV4({ value, min = 0, max = 100, size = 200, thickness, tone, title, summary, caption, showValue = true, loading = false, emptyLabel, animate = true, className, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const arcWidth = thickness === undefined || !Number.isFinite(thickness)
        ? (0, ProgressRingV4_1.radialThicknessV4)(size)
        : Math.max(thickness, 0);
    // The arc is a half-disc plus half a stroke above and below the centre
    // line, so the block is never taller than it needs to be and the caller's
    // grid row does not move when the gauge appears.
    const height = size / 2 + arcWidth;
    const frame = (plot) => ((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartFigureV4, { ref: ref, title: title, caption: caption, className: className, ...rest, children: plot }));
    if (loading)
        return frame((0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { variant: "rect", width: size, height: height }));
    const span = max - min;
    if (!Number.isFinite(span) || span <= 0) {
        return frame((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: height }));
    }
    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, min), max) : min;
    const t = (clamped - min) / span;
    const cx = size / 2;
    const cy = size / 2;
    const r = Math.max(size / 2 - arcWidth / 2, 0);
    const [sx, sy] = gaugePoint(cx, cy, r, 0);
    const [ex, ey] = gaugePoint(cx, cy, r, 1);
    const track = `M${coord(sx)} ${coord(sy)} A${coord(r)} ${coord(r)} 0 0 1 ${coord(ex)} ${coord(ey)}`;
    /*
      The value arc is the TRACK's geometry, revealed by a dash.

      It used to be its own shorter arc, ending at `gaugePoint(t)` with a
      large-arc flag that flipped at the halfway mark. That draws the same
      picture, but its length lives in the path `d` — and `d` is not a property
      CSS can interpolate across a changing arc flag, so a gauge whose value
      moved after mount jumped from one arc to the next.

      `stroke-dashoffset` is a number on one fixed path, which is exactly what
      a transition can carry, and it is the spelling `ProgressRingV4` already
      uses — the two radial members of this family now measure themselves the
      same way instead of drifting.

      The arc is a semicircle, so its length is `π r` with no approximation.
    */
    const arcLength = Math.PI * r;
    const stroke = tone === undefined ? (0, internal_v4_1.chartVar)(0) : (0, PieChartV4_1.toneVarV4)(tone);
    const centre = summary ?? String(clamped);
    return frame((0, jsx_runtime_1.jsxs)("div", { className: "relative inline-block", style: { width: size, height }, children: [(0, jsx_runtime_1.jsxs)("svg", { ...chart.rootProps, viewBox: `0 0 ${size} ${height}`, width: size, height: height, role: "img", "aria-label": `Gauge, ${clamped} of ${max}`, children: [(0, jsx_runtime_1.jsx)("path", { d: track, fill: "none", stroke: internal_v4_1.CHART_GRID_VAR, strokeWidth: arcWidth, strokeLinecap: "round" }), t > 0 ? ((0, jsx_runtime_1.jsx)("path", { "data-xen-v4-chart-fill": "", d: track, fill: "none", stroke: stroke, strokeWidth: arcWidth, strokeLinecap: "round", strokeDasharray: arcLength, 
                        // A full gauge is `t === 1`, which lands the offset at exactly 0
                        // — no rounding, no seam, and never `NaN`, because `r` is
                        // floored at zero and `t` is clamped into `[0, 1]`.
                        strokeDashoffset: arcLength * (1 - t) })) : null] }), showValue ? (
            // Already spoken by the `<svg>`'s label, so the visible copy is
            // hidden rather than announced twice.
            (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-gauge-value": "", className: "pointer-events-none absolute inset-x-0 bottom-0 flex justify-center", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", children: centre }) })) : null] }));
});
//# sourceMappingURL=GaugeChartV4.js.map