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
exports.BeforeAfterV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const IconV4_1 = require("../primitives/IconV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const clamp = (n) => Math.max(0, Math.min(100, Number.isFinite(n) ? n : 50));
/**
 * **V4 before / after** — the web twin of the native `BeforeAfterV4`, same
 * props as {@link BeforeAfter} plus five copy and behaviour hooks.
 *
 * ## The change this component exists for
 *
 * **The base could not be slid.** It drew a divider at `position` and offered
 * two −/+ buttons that stepped 10% at a time. V4 overlays a real
 * `<input type="range">`, which is the correct web answer and brings the whole
 * keyboard model with it for free: arrow keys, Home/End, PageUp/PageDown, a
 * spoken value, and pointer drag on desktop and touch alike. No custom
 * pointer-event handling, because the platform already has this control.
 *
 * The **nudge buttons stay**: they are a coarse, forgiving target for anyone
 * who finds a thin slider hard to hit, and adding a drag is not a reason to
 * take them away.
 *
 * ## Two more
 *
 * 1. **The placeholder is `bg-muted`**, not a translucent wash of it that
 *    borrows whatever is behind the panel.
 * 2. **The tag chips are built from the elevation colour**, which is dark in
 *    both schemes — the base mixed `on-surface`, which inverts, so on a dark
 *    page the labels became dark text on a near-white chip over a photo.
 */
exports.BeforeAfterV4 = React.forwardRef(function BeforeAfterV4({ beforeUrl, afterUrl, position = 50, variant = 'split', height = 220, beforeLabel = 'Before', afterLabel = 'After', draggable = true, step = 10, lessLabel = 'Show less after', moreLabel = 'Show more after', sliderLabel = 'Comparison position', placeholderLabel, onPositionChange, className, style, ...rest }, ref) {
    const [showAfter, setShowAfter] = React.useState(false);
    const pos = clamp(position);
    const placeholder = (label) => ((0, jsx_runtime_1.jsx)("div", { className: "flex h-full w-full items-center justify-center bg-muted", children: (0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: placeholderLabel ?? label }) }));
    const tag = (label, side) => ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('pointer-events-none absolute bottom-sm rounded-[var(--xen-radius-sm)] px-sm py-0.5', 'text-xs font-bold text-neutral-50', 
        // The elevation colour does not invert with the scheme.
        'bg-[color-mix(in_srgb,var(--xen-elevation-color)_60%,transparent)]', side === 'left' ? 'left-sm' : 'right-sm'), children: label }));
    if (variant === 'toggle') {
        const label = showAfter ? afterLabel : beforeLabel;
        const url = showAfter ? afterUrl : beforeUrl;
        return ((0, jsx_runtime_1.jsxs)("button", { type: "button", "aria-label": `Showing ${label}. Activate to compare.`, onClick: () => setShowAfter((v) => !v), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('relative block w-full overflow-hidden rounded-[var(--xen-radius-lg)] border border-border', className), style: { height, ...style }, children: [url ? ((0, jsx_runtime_1.jsx)("img", { src: url, alt: label, className: "h-full w-full object-cover" })) : (placeholder(label)), tag(label, 'left')] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-sm', className), style: style, ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "relative overflow-hidden rounded-[var(--xen-radius-lg)] border border-border", style: { height }, children: [beforeUrl ? ((0, jsx_runtime_1.jsx)("img", { src: beforeUrl, alt: beforeLabel, className: "absolute inset-0 h-full w-full object-cover" })) : ((0, jsx_runtime_1.jsx)("div", { className: "absolute inset-0", children: placeholder(beforeLabel) })), (0, jsx_runtime_1.jsx)("div", { className: "absolute inset-y-0 left-0 overflow-hidden", style: { width: `${pos}%` }, children: afterUrl ? ((0, jsx_runtime_1.jsx)("img", { src: afterUrl, alt: afterLabel, className: "h-full object-cover", style: { width: `${(100 / Math.max(pos, 1)) * 100}%`, maxWidth: 'none' } })) : (placeholder(afterLabel)) }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "pointer-events-none absolute inset-y-0 w-px -translate-x-1/2 bg-surface", style: { left: `${pos}%` } }), (0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "pointer-events-none absolute top-1/2 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface text-on-surface", style: { left: `${pos}%` }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "sort", size: "xs" }) }), draggable && onPositionChange ? ((0, jsx_runtime_1.jsx)("input", { type: "range", min: 0, max: 100, step: 1, value: Math.round(pos), "aria-label": sliderLabel, "aria-valuetext": `${Math.round(pos)}% ${afterLabel}`, onChange: (e) => onPositionChange(clamp(Number(e.currentTarget.value))), className: "absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0" })) : null, tag(beforeLabel, 'right'), tag(afterLabel, 'left')] }), onPositionChange ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-center gap-sm", children: [
                    { label: lessLabel, glyph: '−', to: clamp(pos - step) },
                    { label: moreLabel, glyph: '+', to: clamp(pos + step) },
                ].map((b) => ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": b.label, onClick: () => onPositionChange(b.to), "data-xen-v4-chrome": "on-surface", className: (0, cn_1.cn)('flex w-11 items-center justify-center rounded-full border border-border bg-card text-base font-bold text-on-card', chrome_v4_1.MIN_TAP_CLASS), children: b.glyph }, b.label))) })) : null] }));
});
//# sourceMappingURL=BeforeAfterV4.js.map