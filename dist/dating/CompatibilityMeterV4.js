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
exports.CompatibilityMeterV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const profile_v4_1 = require("./internal/profile-v4");
/**
 * Score bands. The band is always spelled out, so the reading never rests on
 * colour — and the bottom band is `neutral`, not `muted`: `muted` is a ramp
 * step with no contrast promise, and the base spent it as a **4px ring** and a
 * **status dot**, which is the one thing a decorative slot must never be.
 */
function bandFor(score) {
    if (score >= 80)
        return { word: 'Great match', tone: 'success' };
    if (score >= 55)
        return { word: 'Good match', tone: 'primary' };
    if (score >= 30)
        return { word: 'Some overlap', tone: 'accent' };
    return { word: 'Low overlap', tone: 'neutral' };
}
/** The ring's stroke colour. `neutral` takes the hairline, never `border-muted`. */
const BAND_RING = {
    neutral: 'border-border',
    muted: 'border-border',
    primary: 'border-primary',
    accent: 'border-accent',
    success: 'border-success',
    warn: 'border-warn',
    danger: 'border-danger',
};
/**
 * Ring diameters, composed from the spacing scale: **48 / 64 / 96**
 * (`2xl`, `2xl + md`, `2xl * 2`). The stroke is `xs` — 4 — at every size.
 *
 * Both numbers are here rather than at the call site because "the same ring on
 * both twins" is the requirement, and a ring that is 64 on one platform and 56
 * on the other is the same defect as a button that is 64 and 68.
 */
const RING_SIZE = {
    sm: 'h-2xl w-2xl text-base',
    md: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] text-lg',
    lg: 'h-[calc(var(--xen-space-2xl)_*_2)] w-[calc(var(--xen-space-2xl)_*_2)] text-2xl',
};
const RING_STROKE = 'border-[length:var(--xen-space-xs)]';
/** The track: the same quantity, unfilled — not a grey channel. */
const TRACK_CLASS = 'bg-[color-mix(in_srgb,var(--xen-on-surface)_10%,var(--xen-surface))]';
/**
 * **V4 compatibility meter** — the web twin of the native
 * `CompatibilityMeterV4`, same props as {@link CompatibilityMeter} plus
 * `formatValue`.
 *
 * ## Four changes
 *
 * 1. **`compact` is a meter.** It drew a percentage and a band word inside a
 *    pill and exposed **no role at all** on web, so a screen reader got a
 *    sentence fragment and no value; native downgraded the same variant to
 *    plain prose. All three variants now report `role="progressbar"` with the
 *    number on it, which is what the component exists to say.
 * 2. **The ring is one ring.** Same three diameters and the same 4 stroke on
 *    both twins, composed from the spacing scale — see {@link RING_SIZE}.
 * 3. **The band's colour reaches the bar's own value text**, as it already did
 *    on web and did not on native, and it is the contrast-corrected `*Text`
 *    slot rather than the fill: `text-success` is a *fill* token, and a fill
 *    has no contrast promise as ink.
 * 4. **The bar's fill is the band's own tone.** The base ran the ring, the dot
 *    and the value text through one table and the bar through a second, which
 *    mapped the `accent` band onto `warn` — so a middling match was drawn in
 *    the colour that means something has gone wrong, and the bar disagreed with
 *    the number printed above it. The bar is drawn here rather than delegated
 *    to `Progress` for exactly that reason: `ProgressTone` has no `accent` and
 *    no `neutral`, and inventing a mapping is how the two disagreed.
 *
 * The skeleton is the opaque shared mix, not `bg-neutral-200` — a ramp step
 * that is a near-white slab on a dark page.
 */
exports.CompatibilityMeterV4 = React.forwardRef(function CompatibilityMeterV4({ score, label = 'Compatibility', showValue = true, variant = 'bar', size = 'md', loading = false, formatValue, className, ...rest }, ref) {
    const clamped = Math.round((0, tone_v4_1.clampPercent)(score) ?? 0);
    const band = bandFor(clamped);
    const valueText = (formatValue ?? ((value) => `${value}%`))(clamped);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-busy": "true", "aria-label": label, "aria-valuemin": 0, "aria-valuemax": 100, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-1/2', profile_v4_1.SKELETON_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm rounded-full', profile_v4_1.SKELETON_CLASS) })] }));
    }
    const meter = {
        role: 'progressbar',
        'aria-label': label,
        'aria-valuenow': clamped,
        'aria-valuemin': 0,
        'aria-valuemax': 100,
        'aria-valuetext': `${valueText}, ${band.word}`,
    };
    if (variant === 'ring') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...meter, className: (0, cn_1.cn)('flex flex-col items-center gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('flex items-center justify-center rounded-full bg-surface font-bold', RING_STROKE, BAND_RING[band.tone], profile_v4_1.TONE_INK[band.tone], RING_SIZE[size]), children: showValue ? (0, jsx_runtime_1.jsx)("span", { children: valueText }) : null }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-xs text-muted-text", children: band.word })] }));
    }
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...meter, className: (0, cn_1.cn)('inline-flex items-center gap-xs self-start rounded-full px-sm py-xs', TRACK_CLASS, className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('text-sm font-semibold', profile_v4_1.TONE_INK[band.tone]), children: valueText }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "text-sm text-muted-text", children: band.word })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, ...meter, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { "aria-hidden": "true", className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: label }), showValue ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', profile_v4_1.TONE_INK[band.tone]), children: [valueText, " \u00B7 ", band.word] })) : null] }), (0, jsx_runtime_1.jsx)("div", { "aria-hidden": "true", className: (0, cn_1.cn)('w-full overflow-hidden rounded-full', size === 'sm' ? 'h-xs' : 'h-sm', TRACK_CLASS), children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full', tone_v4_1.TONE_BG[band.tone]), style: { width: `${clamped}%` } }) })] }));
});
//# sourceMappingURL=CompatibilityMeterV4.js.map