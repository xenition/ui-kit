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
exports.TrialBannerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
/**
 * The tone's fill variable and its contrast-corrected ink.
 *
 * The base filled the whole strip with the saturated slot. Above a paywall
 * that is a second loud coloured block arguing with the CTA — and §5 gives the
 * CTA that job alone.
 */
const TONE = {
    info: { fill: 'var(--xen-accent)', ink: 'var(--xen-accent-text)' },
    warn: { fill: 'var(--xen-warn)', ink: 'var(--xen-warn-text)' },
    success: { fill: 'var(--xen-success)', ink: 'var(--xen-success-text)' },
};
/** How far the tinted ground travels from `surface` toward the tone. */
const GROUND_TINT = 12;
/** How solid the meter's unfilled track sits against that ground. */
const TRACK_TINT = 24;
/**
 * **V4 trial banner** — the web twin of the native `TrialBannerV4`, same props
 * as {@link TrialBanner} plus `daysTotal`, `formatDaysLeft`, `onDismiss` and
 * `dismissLabel`.
 *
 * ## Four changes
 *
 * 1. **Soft, not solid** (see {@link TONE}).
 * 2. **The subtitle is a tone, not an opacity.** `opacity: 0.9` on ink is a
 *    contrast reduction no measurement accounts for; `muted-text` is the slot
 *    that means "secondary" and carries a promise.
 * 3. **The countdown can show its position** — "2 days left" out of 3 and out
 *    of 30 are different facts and the base rendered them identically.
 * 4. **The copy is the host's** — `formatDaysLeft`, `dismissLabel`.
 *
 * **There is still no `TrialBannerV2`/`V3`** — a strip this small has one
 * correct shape. This V4 is that shape, corrected. Renders nothing without a
 * `title`.
 */
exports.TrialBannerV4 = React.forwardRef(function TrialBannerV4({ title, subtitle, daysLeft, daysTotal, tone = 'info', actionLabel, onAction, icon = '✨', formatDaysLeft, onDismiss, dismissLabel = 'Dismiss', className, style, ...rest }, ref) {
    if (!title)
        return null;
    const slot = TONE[tone];
    const ground = `color-mix(in srgb, ${slot.fill} ${GROUND_TINT}%, var(--xen-surface))`;
    const track = `color-mix(in srgb, ${slot.fill} ${TRACK_TINT}%, ${ground})`;
    const days = typeof daysLeft === 'number' ? Math.max(0, daysLeft) : null;
    const countdown = days === null
        ? null
        : (formatDaysLeft ?? ((n) => `${n} ${n === 1 ? 'day' : 'days'} left`))(days);
    // A meter only means something when both ends are known and the total is
    // real; `daysLeft` above `daysTotal` would draw an over-full bar.
    const total = typeof daysTotal === 'number' && daysTotal > 0 ? daysTotal : null;
    const fraction = days !== null && total !== null ? Math.min(1, days / total) : null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm rounded-[var(--xen-radius-md)] px-md py-md', className), style: { backgroundColor: ground, ...style }, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, size: "lg", style: { color: slot.ink } }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: subtitle })) : null] }), countdown ? ((0, jsx_runtime_1.jsx)("span", { className: "shrink-0 rounded-full bg-surface px-sm py-xs text-xs font-bold [font-variant-numeric:tabular-nums]", style: { color: slot.ink }, children: countdown })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onAction, className: "shrink-0 text-sm font-semibold underline", style: { color: slot.ink }, children: actionLabel })) : null, onDismiss ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": dismissLabel, onClick: onDismiss, "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('-my-sm -mr-sm flex w-11 shrink-0 items-center justify-center rounded-full text-muted-text', chrome_v4_1.MIN_TAP_CLASS), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "close", size: "base" }) })) : null] }), fraction !== null ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuemin": 0, "aria-valuemax": total, "aria-valuenow": days, className: "h-[var(--xen-space-xs)] w-full overflow-hidden rounded-full", style: { backgroundColor: track }, children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full", style: { width: `${fraction * 100}%`, backgroundColor: slot.fill } }) })) : null] }));
});
//# sourceMappingURL=TrialBannerV4.js.map