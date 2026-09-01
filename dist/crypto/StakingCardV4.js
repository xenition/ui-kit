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
exports.StakingCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const ButtonV4_1 = require("../primitives/ButtonV4");
const BadgeV4_1 = require("../primitives/BadgeV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
const STATUS_META = {
    active: { label: 'Active', glyph: '✓', tone: 'success' },
    unbonding: { label: 'Unbonding', glyph: '◷', tone: 'warn' },
    inactive: { label: 'Inactive', glyph: '•', tone: 'neutral' },
};
/**
 * A yield printed as a **level**, not a movement.
 *
 * `formatPct` prefixes `+` for any positive value — it exists to render a
 * *change* — so a 4.2% APY rendered as "+4.20%", which reads as the yield
 * having gone up by 4.2 points. `formatPrice` with an empty symbol is the same
 * fixed-precision `Intl` path with no sign applied.
 */
function formatApy(apy) {
    return `${(0, format_1.formatPrice)(apy, { symbol: '', decimals: 2 })}%`;
}
/**
 * **V4 staking card** — the web twin of the native `StakingCardV4`, same props
 * as {@link StakingCard} plus `apyLabel`.
 *
 * ## Four changes
 *
 * 1. **APY is printed without a change sign.** See {@link formatApy}: the base
 *    ran the yield through `formatPct`, so every position advertised a
 *    "+4.20%" that reads as a movement in the rate rather than the rate.
 * 2. **APY is not `success`.** It was coloured green unconditionally, and a
 *    yield is a level — the number is identical whether the position is up or
 *    down. Green here spends the gain slot on a constant, and leaves nothing
 *    to say when something actually gains.
 * 3. **The twins agree.** The staked figure took the `xl` step on the web and
 *    `lg` on the phone — it is the card's headline number, so both take `xl`.
 *    The card was `elevated` on the phone and `outlined` on the web. And Claim
 *    wore `tone="success"` on native only, a status colour spent on an action,
 *    which the line does not do. All three now match.
 * 4. **Ink is ink.** `text-muted` and `text-success` are fill slots; the
 *    captions, the rewards figure and the money now use the contrast-corrected
 *    `*Text` forms, and every stacked figure is tabular.
 */
exports.StakingCardV4 = React.forwardRef(function StakingCardV4({ symbol, name, stakedAmount, decimals = 4, stakedValueCents, currency = 'USD', apy, rewardsAmount, status = 'active', onClaim, onUnstake, loading = false, apyLabel = 'APY', className, ...rest }, ref) {
    const meta = STATUS_META[status];
    const hasRewards = rewardsAmount != null && rewardsAmount > 0;
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, variant: "elevated", className: className, ...rest, children: (0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "min-w-0 flex-1", children: [(0, jsx_runtime_1.jsx)("div", { className: "text-base font-bold text-on-card", children: symbol }), name != null ? (0, jsx_runtime_1.jsx)("div", { className: "text-xs text-muted-text", children: name }) : null] }), (0, jsx_runtime_1.jsxs)(BadgeV4_1.BadgeV4, { tone: meta.tone, ...market_v4_1.BADGE_V4, children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", children: meta.glyph }), " ", meta.label] })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex justify-between gap-md", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: "Staked" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-bold text-on-card', market_v4_1.TABULAR_CLASS), children: (0, format_1.formatToken)(stakedAmount, { decimals, symbol }) }), stakedValueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: stakedValueCents, currency: currency, tone: "muted", size: "sm" })) : null] }), apy != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col items-end gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: apyLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-xl font-bold text-on-card', market_v4_1.TABULAR_CLASS), children: formatApy(apy) })] })) : null] }), rewardsAmount != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between gap-sm border-t border-border pt-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm text-muted-text", children: "Rewards" }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-base font-bold', market_v4_1.TABULAR_CLASS, 
                            // A reward genuinely IS a gain, so the success slot is spent
                            // on a gain — but on the ink form, not the fill.
                            hasRewards ? 'text-success-text' : 'text-muted-text'), children: (0, format_1.formatToken)(rewardsAmount, { decimals, symbol }) })] })) : null, onClaim != null || onUnstake != null ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex gap-sm", children: [onClaim != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", onClick: onClaim, disabled: !hasRewards || loading, className: "flex-1", children: "Claim" })) : null, onUnstake != null ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "outline", onClick: onUnstake, disabled: loading, className: "flex-1", children: "Unstake" })) : null] })) : null] }) }));
});
//# sourceMappingURL=StakingCardV4.js.map