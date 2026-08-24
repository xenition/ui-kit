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
exports.PortfolioSummary = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const DonutChart_1 = require("../charts/DonutChart");
const Legend_1 = require("../charts/Legend");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
/**
 * The top-of-portfolio hero: a big total ({@link MoneyAmount}), a token-toned
 * 24h change (gain = `success`, loss = `danger`, with a ▲/▼ glyph + accessible
 * up/down label so it is never color-only), and a reused {@link DonutChart} of
 * the allocation breakdown with a {@link Legend}. All amounts are integer cents
 * — no float drift. Empty `allocations` simply hides the chart. Web parity of
 * the native `PortfolioSummary`.
 */
exports.PortfolioSummary = React.forwardRef(function PortfolioSummary({ totalCents, currency = 'USD', changeCents, changePct, allocations = [], loading = false, className, ...rest }, ref) {
    const toneKey = (0, format_1.changeToneKey)(changePct ?? changeCents ?? 0);
    const changeMoneyTone = toneKey === 'muted' ? 'neutral' : toneKey === 'success' ? 'income' : 'expense';
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading portfolio", className: "h-32 animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-100" }) }));
    }
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-1", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-muted", children: "Total balance" }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: totalCents, currency: currency, tone: "neutral", size: "xl" }), changeCents != null || changePct != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: (0, format_1.changeToneClass)(toneKey), children: (0, format_1.changeGlyph)(changePct ?? changeCents ?? 0) }), changeCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: changeCents, currency: currency, tone: changeMoneyTone, size: "sm", signDisplay: "always" })) : null, changePct != null ? ((0, jsx_runtime_1.jsx)("span", { "aria-label": `${changePct >= 0 ? 'up' : 'down'} ${(0, format_1.formatPct)(Math.abs(changePct))}`, className: `text-sm font-semibold tabular-nums ${(0, format_1.changeToneClass)(toneKey)}`, children: (0, format_1.formatPct)(changePct) })) : null] })) : null] }), allocations.length > 0 ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)(DonutChart_1.DonutChart, { data: allocations.map((a) => ({ label: a.label, value: a.value, color: a.color })), size: 180, "aria-label": `Allocation across ${allocations.length} assets` }), (0, jsx_runtime_1.jsx)(Legend_1.Legend, { items: allocations.map((a) => ({ label: a.label, color: a.color })) })] })) : null] }) }));
});
//# sourceMappingURL=PortfolioSummary.js.map