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
exports.HealthRangeBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const goal_v4_1 = require("./goal-v4");
const tone_v4_2 = require("./internal/tone-v4");
/** How far past the band the scale runs, as a fraction of the band's width. */
const SCALE_MARGIN = 0.5;
/**
 * The scale the bar is drawn on.
 *
 * Derived from the band rather than from the reading, so the same metric draws
 * the same picture from one day to the next — a scale that rescaled itself
 * around today's number would make every reading look equally central. It is
 * then widened, if it has to be, to keep an out-of-range reading on the bar
 * instead of pinned silently to an end.
 */
function scaleFor(value, range, min, max) {
    const { low, high } = range;
    let start;
    let end;
    if (low !== undefined && high !== undefined) {
        const span = Math.max(high - low, Number.EPSILON);
        start = low - span * SCALE_MARGIN;
        end = high + span * SCALE_MARGIN;
    }
    else if (high !== undefined) {
        start = Math.min(0, high);
        end = high * (1 + SCALE_MARGIN);
    }
    else {
        const bound = low ?? 0;
        start = Math.min(0, bound);
        end = bound * (1 + SCALE_MARGIN);
    }
    start = min ?? Math.min(start, value);
    end = max ?? Math.max(end, value);
    return end > start ? { start, end } : { start, end: start + 1 };
}
/**
 * **V4 health range bar** — a reading plotted against its normal band: the band
 * drawn as a region, the reading as a marker, the verdict as a word.
 *
 * There is no base component. This is the piece the `health` line kept needing
 * and did not have.
 *
 * ## Why it exists
 *
 * 1. **The module could not say "out of range".** `VitalStat` fixed its tone by
 *    `variant`, so a fasting glucose of 260 mg/dL rendered identically to 95
 *    and a dangerous 190 bpm drew in the same permanent red as a resting 58.
 *    `VitalStatV4` and `BodyMetricCardV4` can now take a `range` — and this is
 *    the component that *shows* one, rather than reducing it to a tinted
 *    numeral.
 * 2. **A number is not a position.** "95 mg/dL" tells a reader nothing unless
 *    they already know the band. Drawing the band is the whole point.
 * 3. **The verdict is a word as well as a colour**, so nothing here depends on
 *    telling amber from red — and the bar is a real `progressbar` rather than a
 *    picture of one, so the position is available to a reader who cannot see it
 *    at all.
 */
exports.HealthRangeBarV4 = React.forwardRef(function HealthRangeBarV4({ label, value, range, unit, min, max, rangeLabels, formatValue, emptyLabel = 'No range set', appearance = 'classic', className, ...rest }, ref) {
    // A frame around nothing is worse than nothing: with no name to say or no
    // reading to place, there is no bar to draw. A missing *band* is different
    // — that is the `emptyLabel` state below, because the reading is still real
    // and still worth showing. The native twin guards identically.
    if (!label || !Number.isFinite(value))
        return null;
    const show = formatValue ?? ((amount, suffix) => `${amount}${suffix ? ` ${suffix}` : ''}`);
    const verdict = (0, goal_v4_1.rangeVerdict)(value, range);
    const shell = (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.HEALTH_TILE_CLASS, (0, tone_v4_2.appearanceClass)(appearance), className);
    if (!verdict || !range) {
        // "We do not know" stays distinct from "in range" and borrows no colour.
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", "aria-label": (0, tone_v4_2.spokenLine)([label, show(value, unit), emptyLabel]), className: shell, ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-card", children: show(value, unit) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: emptyLabel })] }));
    }
    const word = rangeLabels?.[verdict] ?? tone_v4_2.VERDICT_LABEL[verdict];
    const tone = tone_v4_2.VERDICT_TONE[verdict];
    const { start, end } = scaleFor(value, range, min, max);
    const span = end - start;
    const at = (point) => Math.min(Math.max((point - start) / span, 0), 1) * 100;
    const bandStart = at(range.low ?? start);
    const bandEnd = at(range.high ?? end);
    // Numerals and mathematical signs rather than words, so the band's caption
    // needs no translation and no prop of its own.
    const bandText = range.low !== undefined && range.high !== undefined
        ? `${show(range.low, undefined)} – ${show(range.high, unit)}`
        : range.high !== undefined
            ? `≤ ${show(range.high, unit)}`
            : range.low !== undefined
                ? `≥ ${show(range.low, unit)}`
                : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: shell, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 truncate text-xs text-muted-text", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-semibold', tone_v4_1.TONE_INK[tone]), children: word })] }), (0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold text-on-card", children: show(value, unit) }), (0, jsx_runtime_1.jsxs)("div", { role: "progressbar", "aria-label": label, "aria-valuenow": value, "aria-valuemin": start, "aria-valuemax": end, "aria-valuetext": (0, tone_v4_2.spokenLine)([show(value, unit), word]), className: (0, cn_1.cn)('relative h-2 w-full overflow-hidden rounded-full', tone_v4_2.TRACK_CLASS), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute inset-y-0 bg-[color-mix(in_srgb,var(--xen-success)_28%,var(--xen-card))]", style: { left: `${bandStart}%`, width: `${Math.max(bandEnd - bandStart, 0)}%` } }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('absolute inset-y-0 w-1 -translate-x-1/2 rounded-full', tone_v4_1.TONE_BG[tone]), style: { left: `${at(value)}%` } })] }), bandText ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: bandText })) : null] }));
});
//# sourceMappingURL=HealthRangeBarV4.js.map