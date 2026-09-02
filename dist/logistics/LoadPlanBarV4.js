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
exports.LoadPlanBarV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const internal_1 = require("./internal");
/**
 * LoadPlanBar — **V4** "dispatch" design (web parity of the native V4). The
 * confident, operations-desk take on a trailer/container load plan: an elevated
 * rounded card with a soft shadow holding a caption row with a big legible
 * **tabular-nums** utilization figure, and a thick stacked capacity bar. Pass
 * `segments` (each a token-ramp slice) or a single `utilization`; the bar fills
 * proportionally and flips to a warn ramp past `warnAt`. Utilization is announced
 * via the `progressbar` role + `aria-valuenow` and echoed in the figure, so
 * fullness is never color-only. Identical props/behavior to
 * {@link LoadPlanBarProps}. Every fill is a token ramp class — no literals.
 */
exports.LoadPlanBarV4 = React.forwardRef(function LoadPlanBarV4({ segments, utilization, caption, warnAt = 90, loading = false, className, ...rest }, ref) {
    const list = Array.isArray(segments) ? segments : [];
    const total = list.length
        ? (0, internal_1.clampPct)(list.reduce((sum, s) => sum + (0, internal_1.clampPct)(s.pct), 0))
        : (0, internal_1.clampPct)(utilization);
    const over = total >= (0, internal_1.clampPct)(warnAt);
    const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';
    const rampFor = (emphasis) => {
        if (over)
            return 'bg-accent-400';
        if (emphasis === 'soft')
            return 'bg-primary-200';
        if (emphasis === 'medium')
            return 'bg-primary-400';
        return 'bg-primary-500';
    };
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "progressbar", "aria-valuemin": loading ? undefined : 0, "aria-valuemax": loading ? undefined : 100, "aria-valuenow": loading ? undefined : total, "aria-busy": loading ? true : undefined, "aria-label": loading ? 'Load plan computing' : `Load ${total}% full${over ? ', near capacity' : ''}`, "data-xen-load-plan-bar": "", className: (0, cn_1.cn)(shell, 'flex flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-end justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-muted", children: caption ?? 'Load plan' }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-2xl font-bold tabular-nums', over ? 'text-accent' : 'text-on-surface'), children: `${total}%` })] }), (0, jsx_runtime_1.jsx)("div", { className: "flex h-4 overflow-hidden rounded-full bg-neutral-100", children: loading ? ((0, jsx_runtime_1.jsx)("div", { className: "h-full w-[35%] animate-pulse bg-neutral-200" })) : list.length ? (list.map((seg, i) => {
                    const w = (0, internal_1.clampPct)(seg.pct);
                    if (w <= 0)
                        return null;
                    return ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', rampFor(seg.emphasis), i < list.length - 1 && 'border-r border-surface'), style: { width: `${w}%` } }, seg.id));
                })) : ((0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-full', rampFor('strong')), style: { width: `${total}%` } })) }), over ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex w-fit items-center gap-[var(--xen-space-xs)] rounded-full bg-accent/10 px-[var(--xen-space-sm)] py-[var(--xen-space-xs)] text-xs font-bold text-accent", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: "\u26A0" }), " Near capacity"] })) : null] }));
});
//# sourceMappingURL=LoadPlanBarV4.js.map