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
exports.SavingsGoalCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const Card_1 = require("../primitives/Card");
const ProgressRing_1 = require("../charts/ProgressRing");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/**
 * A savings-goal tile: a {@link ProgressRing} showing percent-to-target beside
 * a saved / target breakdown and an optional deadline. Progress is
 * `savedCents / targetCents` (guarded against a non-positive target), amounts
 * are integer cents through {@link MoneyAmount}, and the "to go" figure is the
 * remaining cents. Token-bound throughout. Web parity of the native
 * `SavingsGoalCard`.
 */
exports.SavingsGoalCard = React.forwardRef(function SavingsGoalCard({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-lg)]", children: [(0, jsx_runtime_1.jsx)(ProgressRing_1.ProgressRing, { value: pct * 100, max: 100, size: 84, thickness: 9, color: color, "aria-label": `${title}, ${Math.round(pct * 100)}% saved` }), (0, jsx_runtime_1.jsxs)("div", { className: "flex min-w-0 flex-1 flex-col gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "truncate text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: saved, currency: currency, tone: "neutral", size: "md" }), (0, jsx_runtime_1.jsxs)("span", { className: "text-sm text-muted", children: ["/ ", format(target, currency)] })] }), (0, jsx_runtime_1.jsxs)("p", { className: "text-xs text-muted", children: [format(remaining, currency), " to go", deadline != null ? ` · by ${deadline}` : ''] })] })] }) }));
});
//# sourceMappingURL=SavingsGoalCard.js.map