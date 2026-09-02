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
exports.ScreenTimeBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const family_v4_1 = require("./family-v4");
const tone_v4_2 = require("./internal/tone-v4");
/** The share of the limit at which the reading starts calling itself close. */
const NEAR_RATIO = 0.8;
/**
 * The default duration formatter.
 *
 * The base wrote `if (unit !== 'min') return ${mins} ${unit}` — so the hour and
 * minute split was gated on the literal English string `'min'`, and a caller
 * who passed `unit="Min."`, `unit="minutos"` or anything else got a bare
 * `245 minutos` where an English caller got `4h 5m`. The split is a property of
 * *time*, not of the word for it, so it always happens; the caller's unit is
 * the word used below an hour, where it is the only word there is.
 */
function splitDuration(minutes, unit) {
    const sign = minutes < 0 ? '−' : '';
    const total = Math.round(Math.abs(minutes));
    if (total < 60)
        return `${sign}${total} ${unit}`;
    const hours = Math.floor(total / 60);
    const rest = total % 60;
    return rest === 0 ? `${sign}${hours}h` : `${sign}${hours}h ${rest}m`;
}
/**
 * **V4 screen-time bar** — same props as {@link ScreenTimeBar} plus
 * `noLimitLabel`, `overLabel`, `remainingLabel` and `formatDuration`.
 *
 * ## Six changes
 *
 * 1. **`limit={0}` no longer throws the reading away.** The base rendered the
 *    shared empty state — the parent was told "No screen-time limit set" and
 *    never told the child had been on the device for four hours. That is the
 *    one screen where the number matters most. The reading is now always drawn;
 *    "no limit set" becomes a note beside it rather than a replacement for it.
 * 2. **A broken reading is reported, not laundered.** `used={-30}` rendered
 *    "0 min / 2h — 2h left" as though the sync were sound, and `used={NaN}`
 *    reached the screen as "NaNh NaNm" with a CSS width of the string `NaN%`.
 *    `meterParts` keeps `valid` separate from nought: an unusable measurement
 *    draws an empty state instead of a confident zero, and a negative one
 *    still reports what it was handed.
 * 3. **The meter's range is valid.** `used={180} limit={120}` announced
 *    `aria-valuenow="180"` against `aria-valuemax="120"`, which a reader says
 *    out loud as "180 of 120". The clamp belongs to the bar's width; the real
 *    number goes into `aria-valuetext`, in words.
 * 4. **The unit is no longer hard-coded.** See {@link splitDuration} — the
 *    hour/minute split was gated on the literal `'min'`, so every translated
 *    unit lost its formatting entirely.
 * 5. **Over the limit is `warn`, never `danger`.** A child past their screen
 *    time is a measurement outside its band, not a system failure — the same
 *    reading `health` settled on for a vital outside range. The two states are
 *    told apart by their words, which is what a colour-blind parent reads
 *    anyway.
 * 6. **Loading draws the shape it is about to be**, and the card sits on
 *    `card`/`on-card` so it still reads as raised in dark mode.
 */
exports.ScreenTimeBarV4 = React.forwardRef(function ScreenTimeBarV4({ used, limit, unit = 'min', label = 'Screen time', loading = false, emptyLabel = 'No screen-time limit set', noLimitLabel, overLabel = 'over by', remainingLabel = 'left', formatDuration, className, ...rest }, ref) {
    const show = formatDuration ?? ((minutes) => splitDuration(minutes, unit));
    const parts = (0, family_v4_1.meterParts)(used, limit);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-screen-time-bar": "", role: "status", "aria-live": "polite", "aria-label": label, className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.KIDS_CARD_CLASS, tone_v4_2.KIDS_CARD_GROUND_CLASS, className), children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-2/5" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-2 w-full rounded-full" })] }));
    }
    // `valid: false` means the caller handed us NaN. A confident "0 min" would
    // be a claim about a child's day that nothing supports.
    if (!parts.valid) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...rest, ref: ref, "data-xen-screen-time-bar": "", className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\u23F1\uFE0F" }), title: label, description: emptyLabel }));
    }
    const ratio = parts.ratio ?? 0;
    const near = parts.hasLimit && ratio >= NEAR_RATIO;
    const tone = near ? 'warn' : 'primary';
    const note = !parts.hasLimit
        ? (noLimitLabel ?? emptyLabel)
        : parts.over > 0
            ? `${overLabel} ${show(parts.over)}`
            : `${show(parts.remaining)} ${remainingLabel}`;
    const readout = parts.hasLimit ? `${show(parts.value)} / ${show(parts.limit ?? 0)}` : show(parts.value);
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-screen-time-bar": "", className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_2.KIDS_CARD_CLASS, tone_v4_2.KIDS_CARD_GROUND_CLASS, className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm font-bold', near ? tone_v4_1.TONE_INK.warn : 'text-on-card'), children: readout })] }), parts.hasLimit ? ((0, jsx_runtime_1.jsx)("div", { ...(0, tone_v4_2.meterAria)(parts, (0, tone_v4_2.spokenLine)([`${show(parts.value)} of ${show(parts.limit ?? 0)}`, `${parts.percent}%`, note])), "aria-label": label, className: (0, cn_1.cn)('h-2 w-full overflow-hidden rounded-full', tone_v4_2.TRACK_CLASS), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', tone_v4_1.TONE_BG[tone]), style: { width: `${parts.percent ?? 0}%` } }) })) : null, (0, jsx_runtime_1.jsx)("p", { className: (0, cn_1.cn)('text-xs', parts.over > 0 ? (0, cn_1.cn)('font-semibold', tone_v4_1.TONE_INK.warn) : 'text-muted-text'), children: parts.over > 0 ? `⚠️ ${note}` : note })] }));
});
//# sourceMappingURL=ScreenTimeBarV4.js.map