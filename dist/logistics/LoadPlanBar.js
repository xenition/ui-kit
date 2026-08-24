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
exports.LoadPlanBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * A stacked capacity/utilization bar for trailer or container load planning.
 * Either pass `segments` (each a token-ramp slice) or a single `utilization`
 * value; the bar fills proportionally and flips to a warn ramp past `warnAt`.
 * Utilization is announced via the `progressbar` role + `aria-valuenow` and
 * echoed in the caption, so fullness is never color-only. No literal colors —
 * every fill is a token ramp class. Web parity of the native `LoadPlanBar`.
 */
exports.LoadPlanBar = React.forwardRef(function LoadPlanBar({ segments, utilization, caption, warnAt = 90, loading = false, className, ...rest }, ref) {
    const list = Array.isArray(segments) ? segments : [];
    const total = list.length
        ? (0, internal_1.clampPct)(list.reduce((sum, s) => sum + (0, internal_1.clampPct)(s.pct), 0))
        : (0, internal_1.clampPct)(utilization);
    const over = total >= (0, internal_1.clampPct)(warnAt);
    const rampFor = (emphasis) => {
        if (over)
            return 'bg-accent-400';
        if (emphasis === 'soft')
            return 'bg-primary-200';
        if (emphasis === 'medium')
            return 'bg-primary-400';
        return 'bg-primary-500';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": loading ? undefined : 0, "aria-valuemax": loading ? undefined : 100, "aria-valuenow": loading ? undefined : total, "aria-busy": loading ? true : undefined, "aria-label": loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "flex h-3 overflow-hidden rounded-full bg-neutral-100", children: loading ? ((0, jsx_runtime_1.jsx)("div", { className: "h-full w-[35%] animate-pulse bg-neutral-200" })) : list.length ? (list.map((seg, i) => {
                    const w = (0, internal_1.clampPct)(seg.pct);
                    if (w <= 0)
                        return null;
                    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', rampFor(seg.emphasis), i < list.length - 1 && 'border-r border-surface'), style: { width: `${w}%` } }, seg.id));
                })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', rampFor('strong')), style: { width: `${total}%` } })) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: caption ?? '' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xs font-bold', over ? 'text-accent' : 'text-on-surface'), children: `${total}%${over ? ' · near capacity' : ''}` })] })] }));
});
//# sourceMappingURL=LoadPlanBar.js.map