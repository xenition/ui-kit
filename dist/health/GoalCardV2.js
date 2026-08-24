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
exports.GoalCardV2 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
const RING_R = 34;
const RING_C = 2 * Math.PI * RING_R;
/**
 * GoalCard — **ring hero** design (v2). A large SVG progress ring showing the
 * completion percentage anchors the card, with the title, `value / target`
 * readout, and (when reached) a `success` "Goal met" badge alongside. Elevated
 * surface that lifts on hover. Guards `target <= 0`. Same props as
 * {@link GoalCardProps}; token-only colors.
 */
exports.GoalCardV2 = React.forwardRef(function GoalCardV2({ title, value, target, unit, color = 'primary', icon, onPress, className, ...rest }, ref) {
    const hasTarget = target > 0;
    const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
    const met = hasTarget && value >= target;
    const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
    const ringColor = met ? 'success' : color;
    const a11y = hasTarget
        ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
        : `${title}: ${value}${unit ? ` ${unit}` : ''}`;
    const ring = hasTarget ? ((0, jsx_runtime_1.jsxs)("div", { role: "img", "aria-label": `${title} progress, ${pct}%`, className: "relative h-20 w-20 shrink-0", children: [(0, jsx_runtime_1.jsxs)("svg", { viewBox: "0 0 80 80", className: "h-20 w-20 -rotate-90", children: [(0, jsx_runtime_1.jsx)("circle", { cx: 40, cy: 40, r: RING_R, fill: "none", strokeWidth: 8, stroke: "currentColor", className: "text-border" }), (0, jsx_runtime_1.jsx)("circle", { cx: 40, cy: 40, r: RING_R, fill: "none", strokeWidth: 8, strokeLinecap: "round", stroke: "currentColor", strokeDasharray: RING_C, strokeDashoffset: RING_C - (RING_C * pct) / 100, className: (0, cn_1.cn)('transition-[stroke-dashoffset] duration-500 motion-reduce:transition-none', internal_1.TEXT_CLASS[ringColor]) })] }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('absolute inset-0 flex items-center justify-center text-base font-bold', internal_1.TEXT_CLASS[ringColor]), children: [pct, "%"] })] })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex h-20 w-20 shrink-0 items-center justify-center rounded-full border-2 border-border", children: (0, jsx_runtime_1.jsx)("span", { className: "text-center text-xs text-muted", children: "No target" }) }));
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [ring, (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [icon ? (0, jsx_runtime_1.jsx)("span", { children: icon }) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: title })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-3xl font-extrabold', met ? 'text-success' : 'text-on-surface'), children: value }), hasTarget ? ((0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["/ ", target, unit ? ` ${unit}` : ''] })) : unit ? ((0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: unit })) : null] }), met ? ((0, jsx_runtime_1.jsx)("span", { className: "w-fit rounded-full bg-success/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-success", children: "\u2713 Goal met" })) : null] })] }));
    const shell = 'flex items-center gap-[var(--xen-space-lg)] rounded-[var(--xen-radius-lg)] bg-surface p-[var(--xen-space-lg)] shadow-md';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-lg active:scale-[.99] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 motion-reduce:transition-none motion-reduce:hover:transform-none', className), ...rest, children: body }));
});
//# sourceMappingURL=GoalCardV2.js.map