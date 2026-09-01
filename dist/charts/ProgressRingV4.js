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
exports.ProgressRingV4 = exports.RADIAL_THICKNESS_RATIO = void 0;
exports.radialThicknessV4 = radialThicknessV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const TextV4_1 = require("../primitives/TextV4");
const v4_chart_1 = require("../primitives/internal/v4-chart");
const internal_v4_1 = require("./internal-v4");
const PieChartV4_1 = require("./PieChartV4");
/**
 * Ring thickness as a fraction of the diameter.
 *
 * A geometric ratio, which is the one category of bare number brief §1 rule 1
 * allows, and it is a **ratio** on purpose: the base wrote `strokeWidth={10}`
 * and `thickness = 10`, which is a third of a 30px ring and a twentieth of a
 * 200px one. §5 asks for exactly this — "the `strokeWidth={10}` becomes a
 * derived thickness" — so the ring's weight follows its size and a small ring
 * reads as a small version of the same component rather than as a different
 * one.
 *
 * The value reproduces the base's own proportion at its default size (a 120
 * ring at `thickness = 12`), so nothing that looked right stops looking right.
 */
exports.RADIAL_THICKNESS_RATIO = 0.1;
/**
 * The radial family's one ring thickness, shared by `ProgressRingV4`,
 * `GaugeChartV4` and `DonutChartV4`.
 *
 * Floored at `CHART_MARK.dotSize`, because a track thinner than the smallest
 * mark the line will paint has stopped being a track: it reads as a hairline
 * border and the reader loses the "this is a proportion" cue entirely.
 */
function radialThicknessV4(size) {
    const derived = Number.isFinite(size) ? size * exports.RADIAL_THICKNESS_RATIO : 0;
    return Math.max(derived, v4_chart_1.CHART_MARK.dotSize);
}
/**
 * **V4 progress ring** — a *mark*, not a figure, and the one component of the
 * radial family that deliberately takes none of §4.2's frame.
 *
 * Brief §4.2 names it in the exception: "Marks-only components (`Sparkline`,
 * `MiniBar`, `ProgressRing` at small sizes) take none of this: they are a mark
 * inside someone else's figure." It is what goes in a table cell, a list row or
 * a `StatCard`, so a title and a legend attached to it would be a second figure
 * frame inside the caller's own. It still states its value in words — rule 6 is
 * not waived for a mark — through the `aria-label` on its `<svg>`.
 *
 * Three fixes against the base.
 *
 * 1. **The track is chrome, not a border.** The base painted it
 *    `var(--xen-border)`, which is a *hairline* colour doing a track's job —
 *    §3's third decision names that exact substitution as the bug. `CHART_GRID_VAR`
 *    is the derived chrome neutral, mixed from `onSurface` so it follows the
 *    theme with no dark rule of its own; `--xen-border` is a single flat value
 *    and reads as a drawn edge around a hole rather than as the unfilled part
 *    of a measure.
 * 2. **The progress arc is a palette slot, not a semantic token.** `chartVar(0)`
 *    is the brand hue and is the same colour a `SparklineV4` in the same card
 *    takes, which is the point of slot 1 sitting at `+0` rotation. `tone` is
 *    the opt-in for a ring that genuinely means good or bad, and it is the only
 *    path to a status hue (§4.3).
 * 3. **The thickness is derived.** See {@link RADIAL_THICKNESS_RATIO}: a fixed
 *    `10` is a third of a small ring and a rounding error on a large one.
 *
 * The empty state is `max <= 0` — a ring with no scale cannot be drawn without
 * dividing by zero, and the base returned a bare string for it, which §4.5
 * rules out ("never a bare string, never `null`") because the caller cannot
 * tell "no data yet" from "the request failed".
 */
exports.ProgressRingV4 = React.forwardRef(function ProgressRingV4({ value, max = 100, size = 120, thickness, tone, label, showValue = true, loading = false, emptyLabel, animate = true, className, ...rest }, ref) {
    const chart = (0, internal_v4_1.useChartV4)(animate);
    const shell = (body) => ((0, jsx_runtime_1.jsx)("div", { ref: ref, "data-xen-v4-progress-ring": "", className: (0, cn_1.cn)('relative inline-flex items-center justify-center', className), style: { width: size, height: size }, ...rest, children: body }));
    if (loading)
        return shell((0, jsx_runtime_1.jsx)(PieChartV4_1.ChartLoadingV4, { size: size }));
    if (!Number.isFinite(max) || max <= 0) {
        return shell((0, jsx_runtime_1.jsx)(internal_v4_1.ChartEmptyV4, { label: emptyLabel, height: size }));
    }
    const clamped = Number.isFinite(value) ? Math.min(Math.max(value, 0), max) : 0;
    const ratio = clamped / max;
    const percent = Math.round(ratio * 100);
    const ringWidth = thickness === undefined || !Number.isFinite(thickness)
        ? radialThicknessV4(size)
        : Math.max(thickness, 0);
    // The stroke straddles the path, so the radius is inset by half of it or
    // the ring paints outside its own footprint.
    const r = Math.max((size - ringWidth) / 2, 0);
    const c = 2 * Math.PI * r;
    const cx = size / 2;
    const stroke = tone === undefined ? (0, internal_v4_1.chartVar)(0) : (0, PieChartV4_1.toneVarV4)(tone);
    const centre = label ?? (showValue ? `${percent}%` : undefined);
    return shell((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("svg", { ...chart.rootProps, viewBox: `0 0 ${size} ${size}`, width: size, height: size, role: "img", "aria-label": `Progress ring, ${percent}%`, children: [(0, jsx_runtime_1.jsx)("circle", { cx: cx, cy: cx, r: r, fill: "none", stroke: internal_v4_1.CHART_GRID_VAR, strokeWidth: ringWidth }), ratio > 0 ? ((0, jsx_runtime_1.jsx)("circle", { "data-xen-v4-chart-fill": "", cx: cx, cy: cx, r: r, fill: "none", stroke: stroke, strokeWidth: ringWidth, strokeLinecap: "round", strokeDasharray: c, 
                        // A full ring is `ratio === 1`, which lands the offset at exactly
                        // 0 — no rounding, no seam, no `NaN`, because `c` is finite for
                        // every finite `size` and `r` is floored at zero.
                        strokeDashoffset: c * (1 - ratio), transform: `rotate(-90 ${cx} ${cx})` })) : null] }), centre === undefined ? null : ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", "data-xen-v4-ring-center": "", className: "pointer-events-none absolute inset-0 flex items-center justify-center", children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "lg", weight: "semibold", numeric: "tabular", children: centre }) }))] }));
});
//# sourceMappingURL=ProgressRingV4.js.map