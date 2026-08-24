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
exports.BalanceHeader = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Sparkline_1 = require("../charts/Sparkline");
const money_1 = require("../commerce/money");
/**
 * The hero balance block for an account/wallet screen: a muted label, a large
 * token-scaled figure, an optional up/down change (colored `text-success` /
 * `text-danger`), and an optional {@link Sparkline}. The balance is integer
 * cents (formatted to two decimals, no drift); the change tone derives from its
 * sign. All colors trace to tokens. Web parity of the native `BalanceHeader`.
 */
exports.BalanceHeader = React.forwardRef(function BalanceHeader({ label = 'Total balance', balanceCents, currency = 'USD', changeCents, changePct, trend, formatMoney: format = money_1.formatMoney, loading = false, className, ...rest }, ref) {
    const hasChange = typeof changeCents === 'number' && Number.isFinite(changeCents);
    const up = (changeCents ?? 0) >= 0;
    const changeClass = up ? 'text-success' : 'text-danger';
    const arrow = up ? '▲' : '▼';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, role: "group", className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: label }), loading ? ((0, jsx_runtime_1.jsx)("div", { "aria-label": "Loading balance", className: "h-9 w-40 rounded-[var(--xen-radius-sm)] bg-border" })) : ((0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold tabular-nums text-on-surface", children: format(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency) })), hasChange && !loading ? ((0, jsx_runtime_1.jsxs)("div", { className: (0, cn_1.cn)('flex items-center gap-[var(--xen-space-xs)] text-sm font-semibold', changeClass), children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs", children: arrow }), (0, jsx_runtime_1.jsxs)("span", { children: [format(Math.abs(Math.trunc(changeCents)), currency), typeof changePct === 'number' ? ` (${changePct > 0 ? '+' : ''}${changePct}%)` : ''] })] })) : null, trend != null && trend.length > 0 && !loading ? ((0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: trend, color: up ? 'success' : 'danger', className: "mt-[var(--xen-space-xs)]" })) : null] }));
});
//# sourceMappingURL=BalanceHeader.js.map