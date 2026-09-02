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
exports.ActivityRingsV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
const DEFAULT_COLORS = ['danger', 'success', 'primary', 'accent'];
/**
 * **V4 activity rings** — same props as {@link ActivityRings} plus
 * `emptyLabel`, `noGoalLabel`, `formatRing` and `appearance`.
 *
 * ## Five changes
 *
 * 1. **A ring that does not fit is no longer announced as if it were there.**
 *    The base dropped any ring whose radius came out `<= 0` — pass five rings
 *    at the default size and the fifth silently vanishes — while still counting
 *    it in the summary and listing it in the legend. The component now works
 *    out how many rings the geometry can actually carry, draws that many, and
 *    reports the same number: what is claimed and what is drawn are one list.
 * 2. **540 kcal against a goal of nought announced "Move 0%".** `goal <= 0` was
 *    read as *nought per cent* rather than as *no goal*, which is a different
 *    fact and now says so.
 * 3. **Each ring is a meter.** The whole figure was one `role="img"` with a
 *    summary sentence, so a reader could hear the rings but never query one.
 *    The drawing is now `aria-hidden` and every ring is a `progressbar` in a
 *    list beside it — the legend when there is one, a screen-reader-only list
 *    when `showLegend` is false, so the meters exist either way.
 * 4. **The legend prints the measurement, not the clamp.** `Math.min(value,
 *    goal)` was applied to the number on screen, so an exceeded ring read
 *    "600 / 600" for 720 burned calories.
 * 5. **The track is not a hairline.** `--xen-border` is a 1px rule's colour; at
 *    a 14px stroke it reads as an outline around a hole.
 */
exports.ActivityRingsV4 = React.forwardRef(function ActivityRingsV4({ rings, size = 140, strokeWidth = 14, gap = 4, showLegend = false, emptyLabel = 'No data', noGoalLabel = 'No goal set', formatRing, appearance = 'classic', 'aria-label': ariaLabel, className, ...rest }, ref) {
    if (rings.length === 0) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('text-sm text-muted-text', (0, tone_v4_2.frameClass)(appearance), className), ...rest, children: emptyLabel }));
    }
    // How many concentric rings the geometry can carry before the innermost
    // radius goes non-positive. Claiming more than this is what the base did.
    const radiusOf = (index) => size / 2 - strokeWidth / 2 - index * (strokeWidth + gap);
    const drawn = rings.filter((_, index) => radiusOf(index) > 0);
    const measured = drawn.map((ring, index) => {
        const parts = (0, goal_v4_1.goalParts)(ring.value, ring.goal);
        const tone = ring.color ?? DEFAULT_COLORS[index % DEFAULT_COLORS.length] ?? 'primary';
        const line = formatRing?.(ring, parts) ??
            (0, tone_v4_2.spokenLine)([
                ring.label,
                parts.hasGoal
                    ? `${parts.value} of ${parts.target}${ring.unit ? ` ${ring.unit}` : ''}`
                    : `${parts.value}${ring.unit ? ` ${ring.unit}` : ''}`,
                parts.hasGoal ? `${parts.percent}%` : noGoalLabel,
            ]);
        return { ring, parts, tone, line };
    });
    const figure = (
    // The drawing says nothing the list below does not, and an SVG that
    // repeats it makes every ring two stops instead of one.
    (0, jsx_runtime_1.jsx)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, "aria-hidden": true, focusable: "false", children: (0, jsx_runtime_1.jsx)("g", { transform: `rotate(-90 ${size / 2} ${size / 2})`, children: measured.map(({ parts, tone }, index) => {
                const r = radiusOf(index);
                const circumference = 2 * Math.PI * r;
                return ((0, jsx_runtime_1.jsxs)("g", { children: [(0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: tone_v4_2.TRACK_VAR, strokeWidth: strokeWidth }), (0, jsx_runtime_1.jsx)("circle", { cx: size / 2, cy: size / 2, r: r, fill: "none", stroke: tone_v4_1.TONE_VAR[tone], strokeWidth: strokeWidth, strokeLinecap: "round", strokeDasharray: `${circumference * (parts.ratio ?? 0)} ${circumference}` })] }, index));
            }) }) }));
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)(showLegend ? 'flex items-center gap-lg' : 'inline-flex', (0, tone_v4_2.frameClass)(appearance), className), ...rest, children: [figure, (0, jsx_runtime_1.jsx)("ul", { "aria-label": ariaLabel, className: (0, cn_1.cn)(showLegend ? 'flex flex-col gap-sm' : 'sr-only'), children: measured.map(({ ring, parts, tone, line }, index) => ((0, jsx_runtime_1.jsx)("li", { children: (0, jsx_runtime_1.jsxs)("div", { role: "progressbar", "aria-label": ring.label, "aria-valuenow": parts.hasGoal ? parts.percent : undefined, "aria-valuemin": parts.hasGoal ? 0 : undefined, "aria-valuemax": parts.hasGoal ? 100 : undefined, "aria-valuetext": line, className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2.5 w-2.5 shrink-0 rounded-full', tone_v4_1.TONE_BG[tone]) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-card", children: ring.label }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: parts.hasGoal
                                    ? `${parts.value} / ${parts.target}${ring.unit ? ` ${ring.unit}` : ''}`
                                    : noGoalLabel })] }) }, index))) })] }));
});
//# sourceMappingURL=ActivityRingsV4.js.map