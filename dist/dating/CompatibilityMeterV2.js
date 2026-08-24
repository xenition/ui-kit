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
exports.CompatibilityMeterV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
/** Score bands → tone + spelled-out word (meaning never rests on color). */
function bandFor(score) {
    if (score >= 80)
        return { word: 'Great match', text: 'text-success', border: 'border-success', dot: 'bg-success', tint: 'bg-success/10' };
    if (score >= 55)
        return { word: 'Good match', text: 'text-primary', border: 'border-primary', dot: 'bg-primary', tint: 'bg-primary/10' };
    if (score >= 30)
        return { word: 'Some overlap', text: 'text-accent', border: 'border-accent', dot: 'bg-accent', tint: 'bg-accent/10' };
    return { word: 'Low overlap', text: 'text-muted', border: 'border-muted', dot: 'bg-muted', tint: 'bg-neutral-100' };
}
const DIAL = {
    sm: 'h-16 w-16 text-lg',
    md: 'h-24 w-24 text-2xl',
    lg: 'h-32 w-32 text-3xl',
};
/**
 * CompatibilityMeter — design variant **V2**, a bold **score dial** (web parity of
 * the native V2). A large, tone-tinted disc makes the numeric percentage the hero,
 * with the label caption above and the spelled-out band word in a pill beneath — a
 * stat-tile feel, distinct from the base's slim inline bar/ring. Same
 * `CompatibilityMeterProps`; token classes only; input is clamped and NaN-guarded;
 * a loading skeleton is included and meaning never rests on color.
 */
exports.CompatibilityMeterV2 = React.forwardRef(function CompatibilityMeterV2({ score, label = 'Compatibility', showValue = true, size = 'md', loading = false, className, ...rest }, ref) {
    const clamped = Math.max(0, Math.min(100, Math.round(Number.isFinite(score) ? score : 0)));
    const band = bandFor(clamped);
    const a11y = `${label}: ${clamped} percent, ${band.word}`;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-label": `${label}: loading`, className: (0, cn_1.cn)('flex flex-col items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('animate-pulse rounded-full bg-neutral-200', DIAL[size]) }), (0, jsx_runtime_1.jsx)("div", { className: "h-3 w-24 animate-pulse rounded-full bg-neutral-200" })] }));
    }
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col items-center gap-sm', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: label }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('flex items-center justify-center rounded-full border-[6px] font-extrabold text-on-surface transition-transform duration-200 hover:scale-[1.03] motion-reduce:transition-none motion-reduce:hover:transform-none', band.border, band.tint, DIAL[size]), children: showValue ? ((0, jsx_runtime_1.jsxs)("span", { children: [clamped, (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold", children: "%" })] })) : null }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-xs rounded-full px-sm py-xs', band.tint), children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, cn_1.cn)('h-2 w-2 rounded-full', band.dot) }), (0, jsx_runtime_1.jsx)("span", { className: "text-sm font-bold text-on-surface", children: band.word })] })] }));
});
//# sourceMappingURL=CompatibilityMeterV2.js.map