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
exports.PortfolioSummaryV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
/** Same cycled palette the DonutChart uses, so the bar segments match a donut view. */
const PALETTE = ['primary', 'accent', 'success', 'warn', 'danger'];
/** Static `bg-*` token class per chart color slot (literal classes for JIT). */
const SWATCH_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-neutral-400',
};
/**
 * PortfolioSummary, redesigned (v3): a **minimal, total-first** block. The total
 * leads big through {@link MoneyAmount} (integer cents — no drift) with an inline
 * ▲/▼ change, then a single compact **stacked allocation bar** replaces the donut,
 * with a small dot legend beneath. No card, no chart deps — a lean header.
 * Distinct at a glance from the base's donut card and v2's hero band. Same props;
 * an empty or all-zero allocation simply hides the bar.
 */
exports.PortfolioSummaryV3 = React.forwardRef(function PortfolioSummaryV3({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, className, ...rest }, ref) {
    const delta = changePct ?? changeCents ?? 0;
    const toneKey = (0, format_1.changeToneKey)(delta);
    const changeMoneyTone = toneKey === 'muted' ? 'neutral' : toneKey === 'success' ? 'income' : 'expense';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)]', className), ...rest, children: (0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading portfolio", className: "h-14 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" }) }));
    }
    const allocTotal = allocations.reduce((sum, a) => sum + Math.max(a.value, 0), 0);
    const hasChange = changeCents != null || changePct != null;
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: "Total balance" }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-baseline gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: totalCents, currency: currency, tone: "neutral", size: "xl" }), hasChange ? ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, format_1.changeToneClass)(toneKey), children: (0, format_1.changeGlyph)(delta) }), changeCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: changeCents, currency: currency, tone: changeMoneyTone, size: "sm", signDisplay: "always" })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": `${changePct >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, className: (0, cn_1.cn)('text-sm font-semibold tabular-nums', (0, format_1.changeToneClass)(toneKey)), children: (0, format_1.formatPct)(changePct) })) : null] })) : null] })] }), allocations.length > 0 && allocTotal > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("div", { role: "img", "aria-label": `Allocation across ${allocations.length} assets`, className: "flex h-2.5 overflow-hidden rounded-[var(--xen-radius-full)] bg-neutral-100", children: allocations.map((a, i) => {
                            const swatch = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                            const share = Math.max(a.value, 0) / allocTotal;
                            if (share <= 0)
                                return null;
                            return ((0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('block h-full', SWATCH_BG[swatch]), style: { flexBasis: 0, flexGrow: share } }, `${a.label}-${i}`));
                        }) }), (0, jsx_runtime_1.jsx)("div", { className: "flex flex-wrap gap-[var(--xen-space-md)]", children: allocations.map((a, i) => {
                            const swatch = a.color ?? PALETTE[i % PALETTE.length] ?? 'primary';
                            return ((0, jsx_runtime_1.jsxs)("span", { className: "inline-flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: (0, cn_1.cn)('h-2 w-2 rounded-[var(--xen-radius-full)]', SWATCH_BG[swatch]) }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: a.label })] }, `${a.label}-${i}`));
                        }) })] })) : null] }));
});
//# sourceMappingURL=PortfolioSummaryV3.js.map