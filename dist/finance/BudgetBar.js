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
exports.BudgetBar = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Meter_1 = require("./internal/Meter");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/**
 * A labelled budget progress bar: spent-of-limit with a {@link Meter} fill
 * whose tone shifts as the budget is consumed — `success` under 75%, `warn`
 * from 75–100%, `danger` once over. Amounts are integer cents (two-decimal, no
 * drift) and the "remaining / over" line is a signed {@link MoneyAmount}.
 * `limitCents <= 0` is guarded (ratio pinned, no divide-by-zero). Token-bound
 * throughout. Web parity of the native `BudgetBar`.
 */
exports.BudgetBar = React.forwardRef(function BudgetBar({ label, spentCents, limitCents, currency = 'USD', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const spent = Number.isFinite(spentCents) ? Math.max(Math.trunc(spentCents), 0) : 0;
    const limit = Number.isFinite(limitCents) ? Math.trunc(limitCents) : 0;
    const ratio = limit > 0 ? spent / limit : spent > 0 ? 1 : 0;
    const remaining = limit - spent; // positive = left, negative = over
    const fillColor = ratio > 1 ? 'danger' : ratio >= 0.75 ? 'warn' : 'success';
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-xs)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between", children: [(0, jsx_runtime_1.jsx)("span", { className: "min-w-0 flex-1 truncate text-sm font-semibold text-on-surface", children: label }), (0, jsx_runtime_1.jsxs)("span", { className: "text-xs text-muted", children: [format(spent, currency), " / ", format(limit, currency)] })] }), (0, jsx_runtime_1.jsx)(Meter_1.Meter, { value: ratio * 100, color: fillColor, "aria-label": `${label}, ${Math.round(ratio * 100)}% of budget used` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: remaining >= 0 ? 'Remaining' : 'Over budget' }), (0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: remaining, currency: currency, tone: remaining >= 0 ? 'muted' : 'expense', size: "sm", signDisplay: "never", className: "text-xs font-semibold" })] })] }));
});
//# sourceMappingURL=BudgetBar.js.map