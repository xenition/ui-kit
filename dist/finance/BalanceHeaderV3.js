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
exports.BalanceHeaderV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
/**
 * BalanceHeader, redesigned (v3): a **left-aligned compact** row. The caption
 * sits small above, then the figure and an inline soft change chip share one
 * baseline-aligned row — no sparkline, no oversized type. Built to sit tight in
 * a card header or toolbar. Distinct at a glance from the base's stacked hero
 * and v2's centered hero. Same props, integer-cents money, token-pure.
 */
exports.BalanceHeaderV3 = React.forwardRef(function BalanceHeaderV3({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, trend: _trend, formatMoney: format = money_1.formatMoney, loading = false, className, ...rest }, ref) {
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    const chipClass = up ? 'text-success bg-success/10' : 'text-danger bg-danger/10';
    const arrow = up ? '▲' : '▼';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", className: (0, cn_1.cn)('flex flex-col gap-0.5', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: label }), (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-baseline gap-[var(--xen-space-sm)]", children: [loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading balance", className: "h-7 w-32 rounded-[var(--xen-radius-sm)] bg-border" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-2xl font-bold tabular-nums text-on-surface", children: format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency) })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-sm)] px-[var(--xen-space-xs)] py-px text-xs font-semibold', chipClass), children: [(0, jsx_runtime_1.jsx)("span", { children: arrow }), (0, jsx_runtime_1.jsx)("span", { children: typeof changePct === 'number'
                                    ? `${changePct > 0 ? '+' : ''}${changePct}%`
                                    : format(Math.abs(Math.trunc(changeCents)), currency) })] })) : null] })] }));
});
//# sourceMappingURL=BalanceHeaderV3.js.map