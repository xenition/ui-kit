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
exports.StakingCard = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const Button_1 = require("../primitives/Button");
const Badge_1 = require("../primitives/Badge");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const format_1 = require("./internal/format");
const STATUS_META = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
    inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};
/**
 * A staking position card: asset header with a status badge (glyph + label, so
 * state is not color-only), the staked amount + fiat value, a highlighted APY,
 * claimable rewards toned `success`, and Claim / Unstake actions. Claim is
 * disabled when there are no rewards. All token amounts are fixed-precision and
 * fiat is integer cents — no float drift. Web parity of the native
 * `StakingCard`.
 */
exports.StakingCard = React.forwardRef(function StakingCard({ symbol, name, stakedAmount, decimals = 4, stakedValueCents, currency = 'USD', apy, rewardsAmount, status = 'active', onClaim, onUnstake, loading = false, className, ...rest }, ref) {
    const meta = STATUS_META[status];
    const hasRewards = rewardsAmount != null && rewardsAmount > 0;
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-base font-bold text-on-surface", children: symbol }), name != null ? (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-muted", children: name }) : null] }), (0, jsx_runtime_1.jsxs)(Badge_1.Badge, { tone: meta.tone, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-[var(--xen-space-md)]", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "Staked" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold tabular-nums text-on-surface", children: (0, format_1.formatToken)(stakedAmount, { decimals, symbol }) }), stakedValueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: stakedValueCents, currency: currency, tone: "muted", size: "sm" })) : null] }), apy != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-0.5", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted", children: "APY" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xl font-bold tabular-nums text-success", children: (0, format_1.formatPct)(apy) })] })) : null] }), rewardsAmount != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-[var(--xen-space-sm)] border-t border-border pt-[var(--xen-space-sm)]", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted", children: "Rewards" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold tabular-nums', hasRewards ? 'text-success' : 'text-muted'), children: (0, format_1.formatToken)(rewardsAmount, { decimals, symbol }) })] })) : null, onClaim != null || onUnstake != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-[var(--xen-space-sm)]", children: [onClaim != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onClick: onClaim, disabled: !hasRewards || loading, className: "flex-1", children: "Claim" })) : null, onUnstake != null ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", onClick: onUnstake, disabled: loading, className: "flex-1", children: "Unstake" })) : null] })) : null] }) }));
});
//# sourceMappingURL=StakingCard.js.map