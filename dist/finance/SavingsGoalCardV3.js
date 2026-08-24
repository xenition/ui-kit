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
exports.SavingsGoalCardV3 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const MoneyAmount_1 = require("./MoneyAmount");
const money_1 = require("../commerce/money");
/** Quarter milestones notched into the track. */
const MILESTONES = [25, 50, 75];
const FILL_BG = {
    primary: 'bg-primary',
    accent: 'bg-accent',
    success: 'bg-success',
    warn: 'bg-warn',
    danger: 'bg-danger',
    muted: 'bg-muted',
};
const TRACK_BG = {
    primary: 'bg-primary/10',
    accent: 'bg-accent/20',
    success: 'bg-success/10',
    warn: 'bg-warn/10',
    danger: 'bg-danger/10',
    muted: 'bg-muted/10',
};
const FILL_TEXT = {
    primary: 'text-primary',
    accent: 'text-accent',
    success: 'text-success',
    warn: 'text-warn',
    danger: 'text-danger',
    muted: 'text-muted',
};
/**
 * SavingsGoalCard, redesigned (v3): a **thin milestone bar**. No ring — a slim
 * horizontal track (tinted with the goal color) fills to the saved percentage,
 * notched at the 25 / 50 / 75% milestones, with the title and percent on the
 * header row and the saved / target + "to go" caption beneath. A compact,
 * list-friendly form distinct at a glance from the base/v2 rings. Same props.
 */
exports.SavingsGoalCardV3 = React.forwardRef(function SavingsGoalCardV3({ title, savedCents, targetCents, currency = 'USD', deadline, color = 'success', formatMoney: format = money_1.formatMoney, className, ...rest }, ref) {
    const saved = Number.isFinite(savedCents) ? Math.max(Math.trunc(savedCents), 0) : 0;
    const target = Number.isFinite(targetCents) ? Math.trunc(targetCents) : 0;
    const pct = target > 0 ? Math.min(saved / target, 1) : 0;
    const remaining = Math.max(target - saved, 0);
    const pctInt = Math.round(pct * 100);
    return ((0, jsx_runtime_1.jsxs)("div", { ref: ref, className: (0, cn_1.cn)('flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface p-[var(--xen-space-md)]', className), ...rest, children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline justify-between gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("p", { className: "min-w-0 flex-1 truncate text-base font-bold text-on-surface", children: title }), (0, jsx_runtime_1.jsxs)("span", { className: (0, cn_1.cn)('text-sm font-bold', FILL_TEXT[color]), children: [pctInt, "%"] })] }), (0, jsx_runtime_1.jsxs)("div", { role: "progressbar", "aria-valuenow": pctInt, "aria-valuemin": 0, "aria-valuemax": 100, "aria-label": `${title}, ${pctInt}% saved`, className: (0, cn_1.cn)('relative h-2 overflow-hidden rounded-[var(--xen-radius-full)]', TRACK_BG[color]), children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('absolute inset-y-0 left-0 rounded-[var(--xen-radius-full)]', FILL_BG[color]), style: { width: `${pctInt}%` } }), MILESTONES.map((m) => ((0, jsx_runtime_1.jsx)("span", { "aria-hidden": true, className: "absolute inset-y-0 w-0.5 bg-surface", style: { left: `${m}%` } }, m)))] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-baseline gap-[var(--xen-space-xs)]", children: [(0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: saved, currency: currency, tone: "neutral", size: "sm" }), (0, jsx_runtime_1.jsxs)("span", { className: "min-w-0 flex-1 truncate text-xs text-muted", children: ["/ ", format(target, currency), " \u00B7 ", format(remaining, currency), " to go", deadline != null ? ` · by ${deadline}` : ''] })] })] }));
});
//# sourceMappingURL=SavingsGoalCardV3.js.map