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
exports.FareEstimate = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const primitives_1 = require("../primitives");
const commerce_1 = require("../commerce");
/**
 * A ride fare estimate — an optional itemised breakdown (base, distance, time,
 * discounts) with an optional surge multiplier, plus distance/duration context
 * and a bold total. The total is either supplied or summed from the items (with
 * surge applied to the subtotal); a surge is spelled out in a badge, not color
 * alone. Presentational: shaped data only, nothing fetches. Colors come from
 * `--xen-*` token classes — no literal colors. `variant="summary"` collapses to
 * the total. Item indexing is guarded against a missing array. Web parity of the
 * native `FareEstimate`.
 */
exports.FareEstimate = React.forwardRef(function FareEstimate({ items, totalCents, currency = 'USD', surgeMultiplier, distanceLabel, durationLabel, variant = 'detailed', loading = false, className, ...rest }, ref) {
    const list = Array.isArray(items) ? items : [];
    const hasSurge = typeof surgeMultiplier === 'number' && surgeMultiplier > 1;
    const subtotal = list.reduce((sum, it) => sum + (Number.isFinite(it.cents) ? it.cents : 0), 0);
    const computed = hasSurge ? Math.round(subtotal * surgeMultiplier) : subtotal;
    const total = typeof totalCents === 'number' ? totalCents : computed;
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fare-estimate": "", "aria-busy": "true", "aria-label": "Loading fare estimate", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("div", { className: "h-3.5 w-3/5 animate-pulse rounded bg-neutral-100" }), (0, jsx_runtime_1.jsx)("div", { className: "h-5 w-2/5 animate-pulse rounded bg-neutral-200" })] }));
    }
    const showBreakdown = variant === 'detailed' && list.length > 0;
    const a11y = `Estimated fare ${(0, commerce_1.formatMoney)(total, currency)}${hasSurge ? `, ${surgeMultiplier}x surge` : ''}`;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, "data-xen-fare-estimate": "", "aria-label": a11y, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-lg)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs font-bold uppercase tracking-wide text-muted", children: "Fare estimate" }), hasSurge ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "warn", children: `${surgeMultiplier}x surge` }) : null] }), distanceLabel || durationLabel ? ((0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: [distanceLabel, durationLabel].filter(Boolean).join(' · ') })) : null, showBreakdown ? ((0, jsx_runtime_1.jsxs)("div", { className: "mt-[var(--xen-space-xs)] flex flex-col gap-[var(--xen-space-xs)]", children: [list.map((it, i) => {
                        const discount = it.cents < 0;
                        return ((0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-on-surface", children: it.label }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-sm', discount ? 'font-bold text-success' : 'font-medium text-on-surface'), children: (0, commerce_1.formatMoney)(it.cents, currency) })] }, `${it.label}-${i}`));
                    }), hasSurge ? ((0, jsx_runtime_1.jsx)("div", { className: "flex justify-between", children: (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: ["Surge \u00D7", surgeMultiplier] }) })) : null] })) : null, (0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center justify-between', showBreakdown && 'border-t border-border pt-[var(--xen-space-sm)]'), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-base font-bold text-on-surface", children: "Total" }), (0, jsx_runtime_1.jsx)("span", { "data-xen-fare-total": "", className: "text-2xl font-extrabold text-on-surface", children: (0, commerce_1.formatMoney)(total, currency) })] })] }));
});
//# sourceMappingURL=FareEstimate.js.map