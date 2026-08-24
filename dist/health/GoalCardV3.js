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
exports.GoalCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * GoalCard — **thin value-first line** design (v3). The current value leads
 * large with its unit, the title sits quietly above, a trailing `NN%` reads the
 * completion, and a thin token bar underlines it all. Borderless and compact —
 * dense enough for a stacked list. Switches to the `success` tone when the
 * target is met. Guards `target <= 0`. Same props as {@link GoalCardProps};
 * token-only colors.
 */
exports.GoalCardV3 = React.forwardRef(function GoalCardV3({ title, value, target, unit, color = 'primary', icon, onPress, className, ...rest }, ref) {
    const hasTarget = target > 0;
    const clamped = hasTarget ? Math.min(Math.max(value, 0), target) : Math.max(value, 0);
    const met = hasTarget && value >= target;
    const pct = hasTarget ? Math.round((clamped / target) * 100) : 0;
    const barColor = met ? 'success' : color;
    const a11y = hasTarget
        ? `${title}: ${value} of ${target}${unit ? ` ${unit}` : ''}, ${pct}%${met ? ', goal met' : ''}`
        : `${title}: ${value}${unit ? ` ${unit}` : ''}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [icon ? (0, jsx_runtime_1.jsx)("span", { children: icon }) : null, (0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-xs font-semibold uppercase tracking-wide text-muted", children: title })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-extrabold', met ? 'text-success' : 'text-on-surface'), children: value }), unit ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: unit }) : null, hasTarget ? (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["/ ", target] }) : null] })] }), hasTarget ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-base font-extrabold', met ? 'text-success' : 'text-on-surface'), children: [pct, "%"] })) : null] }), hasTarget ? ((0, jsx_runtime_1.jsx)("div", { role: "progressbar", "aria-valuenow": clamped, "aria-valuemin": 0, "aria-valuemax": target, "aria-label": `${title} progress, ${pct}%`, className: "h-[5px] overflow-hidden rounded-full bg-border", children: (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full rounded-full transition-[width] duration-500 motion-reduce:transition-none', internal_1.BG_CLASS[barColor]), style: { width: `${pct}%` } }) })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "No target set" }))] }));
    const shell = 'flex flex-col gap-[var(--xen-space-xs)] border-l-2 border-border py-[var(--xen-space-sm)] pl-[var(--xen-space-md)] pr-[var(--xen-space-sm)]';
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, "aria-label": a11y, className: (0, cn_1.cn)(shell, className), ...rest, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, role: "button", "aria-label": a11y, tabIndex: 0, onClick: onPress, onKeyDown: (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onPress();
            }
        }, className: (0, cn_1.cn)(shell, 'cursor-pointer transition-colors hover:bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300', className), ...rest, children: body }));
});
//# sourceMappingURL=GoalCardV3.js.map