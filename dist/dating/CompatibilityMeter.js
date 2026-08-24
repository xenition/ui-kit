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
exports.CompatibilityMeter = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
/** Score bands → semantic tone. The band is always spelled out in words, never color-alone. */
function bandFor(score) {
    if (score >= 80)
        return { word: 'Great match', text: 'text-success', border: 'border-success', dot: 'bg-success', progress: 'success' };
    if (score >= 55)
        return { word: 'Good match', text: 'text-primary', border: 'border-primary', dot: 'bg-primary', progress: 'primary' };
    if (score >= 30)
        return { word: 'Some overlap', text: 'text-accent', border: 'border-accent', dot: 'bg-accent', progress: 'warn' };
    return { word: 'Low overlap', text: 'text-muted', border: 'border-muted', dot: 'bg-muted', progress: 'primary' };
}
const RING_SIZE = {
    sm: 'h-12 w-12 text-base',
    md: 'h-16 w-16 text-lg',
    lg: 'h-24 w-24 text-2xl',
};
/**
 * Compatibility score meter — the web parity of the native meter. Visualises a
 * 0–100 match score as a token-styled bar, ring dial, or compact pill. The tone
 * shifts across score bands, but the band is always spelled out in words ("Great
 * match") and the a11y label states the number, so meaning never rests on color.
 * Token classes only — no literal colors. Guarded against out-of-range / NaN input.
 */
exports.CompatibilityMeter = React.forwardRef(function CompatibilityMeter({ score, label = 'Compatibility', showValue = true, variant = 'bar', size = 'md', loading = false, className, ...rest }, ref) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const a11y = `${label}: ${clamped} percent, ${band.word}`;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-label": `${label}: loading`, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/2 rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "h-2.5 rounded-full bg-neutral-200" })] }));
    }
    if (variant === 'ring') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col items-center gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center rounded-full border-4 bg-surface font-bold text-on-surface', band.border, RING_SIZE[size]), children: showValue ? (0, jsx_runtime_1.jsxs)("span", { children: [clamped, "%"] }) : null }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: band.word })] }));
    }
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)('inline-flex items-center gap-xs self-start rounded-full bg-neutral-100 px-sm py-0.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('h-2 w-2 rounded-full', band.dot), "aria-hidden": "true" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm font-semibold text-on-surface", children: [clamped, "% \u00B7 ", band.word] })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: label }), showValue ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', band.text), children: [clamped, "% \u00B7 ", band.word] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: clamped, max: 100, tone: band.progress, size: size === 'sm' ? 'sm' : 'md' })] }));
});
//# sourceMappingURL=CompatibilityMeter.js.map