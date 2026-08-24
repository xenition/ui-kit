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
exports.CompatibilityMeterV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score) {
    if (score >= 80)
        return { word: 'Great match', text: 'text-success', fill: 'bg-success' };
    if (score >= 55)
        return { word: 'Good match', text: 'text-primary', fill: 'bg-primary' };
    if (score >= 30)
        return { word: 'Some overlap', text: 'text-accent', fill: 'bg-accent' };
    return { word: 'Low overlap', text: 'text-muted', fill: 'bg-muted' };
}
const SEGMENTS = 10;
const SEG_H = {
    sm: 'h-2',
    md: 'h-3',
    lg: 'h-4',
};
/**
 * CompatibilityMeter — design variant **V3**, a **segmented bar** (web parity of
 * the native V3). The score is quantised into ten discrete pips that fill in the
 * band tone up to the value — a chunky, glanceable read distinct from the base's
 * smooth progress bar — with the label, percentage, and a spelled-out band word on
 * a header row above. Same `CompatibilityMeterProps`; token classes only; clamped
 * and NaN-guarded; loading skeleton included.
 */
exports.CompatibilityMeterV3 = React.forwardRef(function CompatibilityMeterV3({ score, label = 'Compatibility', showValue = true, size = 'md', loading = false, className, ...rest }, ref) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const filled = Math.round((clamped / 100) * SEGMENTS);
    const a11y = `${label}: ${clamped} percent, ${band.word}`;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-label": `${label}: loading`, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3 w-1/2 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-xs", children: Array.from({ length: SEGMENTS }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex-1 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200', SEG_H[size]) }, i))) })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-xs', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-surface", children: label }), showValue ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-semibold', band.text), children: [clamped, "% \u00B7 ", band.word] })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: band.word }))] }), (0, jsx_runtime_1.jsx)("div", { className: "flex gap-xs", "aria-hidden": "true", children: Array.from({ length: SEGMENTS }).map((_, i) => ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex-1 rounded-[var(--xen-radius-sm)] transition-colors duration-200 motion-reduce:transition-none', SEG_H[size], i < filled ? band.fill : 'bg-neutral-200') }, i))) })] }));
});
//# sourceMappingURL=CompatibilityMeterV3.js.map