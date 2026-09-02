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
exports.AllowanceTrackerV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const ButtonV4_1 = require("../primitives/ButtonV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const SkeletonV4_1 = require("../primitives/SkeletonV4");
const family_v4_1 = require("./family-v4");
const tone_v4_1 = require("./internal/tone-v4");
/** Today's five strings, kept as the defaults. */
const DEFAULT_LABELS = {
    balance: 'Balance',
    earned: 'Earned',
    spent: 'Spent',
    add: 'Add',
    spend: 'Spend',
};
/**
 * **V4 allowance tracker** — same props as {@link AllowanceTracker} plus
 * `formatMoney`, `locale` and `labels`.
 *
 * ## Six changes
 *
 * 1. **`balance={-5}` no longer renders `$-5`.** Money was built by string
 *    concatenation — the symbol, then `toLocaleString` — so the sign landed on
 *    the wrong side of it and `5.5` printed as `$5.5` rather than `$5.50`. It
 *    goes through `commerce/money`'s `formatMoney` when the caller gives a real
 *    ISO code, and through a signed, two-decimal fallback when `currency` is
 *    still the base's `'$'` symbol prefix. A caller can replace the whole thing.
 * 2. **The savings meter is drawn from the clamped ratio it already
 *    computed.** The base worked out `goalPct`, used it *only as a truthiness
 *    gate*, and then handed the raw numbers to the bar — so a balance of −20
 *    against a $100 goal announced `aria-valuenow="-20"` against
 *    `aria-valuemin="0"`. `meterParts` clamps the drawing and keeps the
 *    reading, and `aria-valuetext` says the real amount in words.
 * 3. **A negative balance reads 0% on both twins.** The web V2/V3 lines
 *    dropped the lower clamp their native twins kept and printed "-20% saved".
 * 4. **A goal of nought is "no goal", not an empty bar.** `target={0}` drew a
 *    track under a real balance with nothing to measure it against.
 * 5. **Earned and spent stopped being drawn as good and bad news.** They were
 *    `text-success` and `text-danger` — a child buying something with their own
 *    money is not a system error, and money in is not a status. The `+` and `−`
 *    signs and the two words carry the split, which is what a colour-blind
 *    reader was relying on anyway; the ink is the card's own.
 * 6. **Tokens.** `font-extrabold` is off the kit's weight scale, the skeleton
 *    was `bg-neutral-200` (a ramp step that inverts under `[data-theme=dark]`),
 *    and the card painted `surface` where a raised card wants `card`.
 */
exports.AllowanceTrackerV4 = React.forwardRef(function AllowanceTrackerV4({ balance, currency = '$', earned, spent, goal, loading = false, emptyLabel = 'No allowance set up yet', onAdd, onWithdraw, formatMoney, locale, labels, className, ...rest }, ref) {
    const money = formatMoney ?? ((amount, code) => (0, tone_v4_1.allowanceMoney)(amount, code ?? currency, locale));
    const word = { ...DEFAULT_LABELS, ...labels };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-allowance-tracker": "", role: "status", "aria-live": "polite", "aria-label": word.balance, className: (0, cn_1.cn)('flex flex-col gap-sm', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS, className), children: [(0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-3 w-1/3" }), (0, jsx_runtime_1.jsx)(SkeletonV4_1.SkeletonV4, { className: "h-7 w-1/2" })] }));
    }
    const savings = (0, family_v4_1.meterParts)(balance, goal?.target);
    if (!savings.valid) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { ...rest, ref: ref, "data-xen-allowance-tracker": "", className: className, icon: (0, jsx_runtime_1.jsx)("span", { className: "text-3xl", children: "\uD83D\uDC37" }), title: "Allowance", description: emptyLabel }));
    }
    const balanceText = money(savings.value, currency);
    const targetText = goal ? money(goal.target, currency) : undefined;
    return ((0, jsx_runtime_1.jsxs)("div", { ...rest, ref: ref, "data-xen-allowance-tracker": "", className: (0, cn_1.cn)('flex flex-col gap-md', tone_v4_1.KIDS_CARD_CLASS, tone_v4_1.KIDS_CARD_GROUND_CLASS, className), children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: word.balance }), (0, jsx_runtime_1.jsx)("span", { className: "text-3xl font-bold text-on-card", children: balanceText })] }), typeof earned === 'number' || typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-lg", children: [typeof earned === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: word.earned }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: `+${money(Math.abs(earned), currency)}` })] })) : null, typeof spent === 'number' ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: word.spent }), (0, jsx_runtime_1.jsx)("span", { className: "text-base font-semibold text-on-card", children: `−${money(Math.abs(spent), currency)}` })] })) : null] })) : null, goal ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap items-baseline justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-sm font-semibold text-on-card", children: `🎯 ${goal.label}` }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: savings.hasLimit ? `${balanceText} / ${targetText}` : balanceText })] }), savings.hasLimit ? ((0, jsx_runtime_1.jsx)("div", { ...(0, tone_v4_1.meterAria)(savings, (0, tone_v4_1.spokenLine)([`${balanceText} of ${targetText}`, `${savings.percent}%`])), "aria-label": goal.label, className: (0, cn_1.cn)('h-2 w-full overflow-hidden rounded-full', tone_v4_1.TRACK_CLASS), children: (0, jsx_runtime_1.jsx)("div", { className: "h-full rounded-full bg-primary", style: { width: `${savings.percent ?? 0}%` } }) })) : null] })) : null, onAdd || onWithdraw ? ((0, jsx_runtime_1.jsxs)("div", { className: "flex flex-wrap gap-sm", children: [onAdd ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "primary", className: "flex-1", onClick: () => onAdd(), children: word.add })) : null, onWithdraw ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", variant: "outline", className: "flex-1", onClick: () => onWithdraw(), children: word.spend })) : null] })) : null] }));
});
//# sourceMappingURL=AllowanceTrackerV4.js.map