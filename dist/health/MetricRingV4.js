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
exports.MetricRingV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/** Ring thickness as a fraction of the diameter, so a small ring stays a ring. */
const THICKNESS_RATIO = 0.1;
/**
 * **V4 metric ring** — same props as {@link MetricRing} plus `noGoalLabel`,
 * `formatValue` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **The ring is a meter, and says so.** It delegated to `ProgressRing`,
 *    which hard-codes `accessibilityRole="image"` — so the one number the
 *    component exists to show was a picture with a caption, and a reader had no
 *    way to ask for the value. It is now a `role="progressbar"` with a real
 *    `aria-valuenow`, drawn here rather than inherited.
 * 2. **540 kcal against a goal of 0 no longer reads as 0%.** The base's guard
 *    caught `goal <= 0` for the ring but the same expression elsewhere in the
 *    module returned a percentage of nought; `goalParts` makes "no goal" a
 *    distinct answer from "nought per cent" everywhere at once.
 * 3. **An exceeded goal keeps its measurement.** `Math.min(value, goal)` was
 *    applied to the *number on screen*, so 12,400 steps against 10,000 printed
 *    "10000 / 10000". The arc still stops at full; the caption does not.
 * 4. **The track is not a hairline.** `--xen-border` is the colour of a 1px
 *    rule; at a tenth of a 120px ring it reads as an outline around a hole
 *    rather than as the unfilled part of the measure.
 * 5. **The no-goal branch keeps `className` and `appearance`.** It used to
 *    return an unstyled node, dropping whatever the caller had laid out — the
 *    same bug the native twin has in `ActivityRings` and `WaterTracker`.
 */
exports.MetricRingV4 = React.forwardRef(function MetricRingV4({ label, value, goal, unit, color = 'primary', size = 120, centerLabel, noGoalLabel = 'No goal set', formatValue, appearance = 'classic', className, ...rest }, ref) {
    const parts = (0, goal_v4_1.goalParts)(value, goal);
    const show = formatValue ??
        ((amount, suffix) => `${amount}${suffix ? ` ${suffix}` : ''}`);
    const shell = (0, cn_1.cn)('flex flex-col items-center gap-xs', (0, tone_v4_2.frameClass)(appearance), className);
    if (!parts.hasGoal) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: noGoalLabel })] }));
    }
    const stroke = Math.max(size * THICKNESS_RATIO, 1);
    const radius = size / 2 - stroke / 2;
    const circumference = 2 * Math.PI * radius;
    const dash = circumference * (parts.ratio ?? 0);
    const caption = (0, tone_v4_2.spokenLine)([
        `${show(parts.value, unit)} of ${show(parts.target ?? 0, unit)}`,
        `${parts.percent}%`,
        parts.over > 0 ? `+${show(parts.over, unit)}` : undefined,
    ]);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { role: "progressbar", "aria-valuenow": parts.percent, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuetext": caption, "aria-label": label, className: "relative flex items-center justify-center", style: { width: size, height: size }, children: [(0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, "aria-hidden": true, focusable: "false", children: (0, jsx_runtime_1.jsxs)("g", { transform: `rotate(-90 ${size / 2} ${size / 2})`, children: [(0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: tone_v4_2.TRACK_VAR, strokeWidth: stroke }), (0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: tone_v4_1.TONE_VAR[color], strokeWidth: stroke, strokeLinecap: "round", strokeDasharray: `${dash} ${circumference}` })] }) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute inset-0 flex items-center justify-center text-lg font-semibold text-on-card", children: centerLabel ?? `${parts.percent}%` })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: `${show(parts.value, undefined)} / ${show(parts.target ?? 0, unit)}` })] }));
});
//# sourceMappingURL=MetricRingV4.js.map