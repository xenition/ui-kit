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
exports.DealCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const Card_1 = require("../primitives/Card");
const AvatarV4_1 = require("../primitives/AvatarV4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const WinLossBadgeV4_1 = require("./WinLossBadgeV4");
const crm_v4_1 = require("./internal/crm-v4");
const internal_1 = require("./internal");
/**
 * **V4 deal card** — the web twin of the native `DealCardV4`, same props as
 * {@link DealCard} plus `probabilityLabel` and `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The probability meter has a name.** Both twins gave it `aria-valuenow`
 *    and nothing else, with the visible word "Probability" sitting in a
 *    detached sibling — so the meter announced a bare number with no idea what
 *    it was measuring. It is named now, and on an interactive card the figure
 *    also joins the card's own name, because a `button`'s label replaces
 *    everything under it.
 * 2. **One accessible name.** `Deal Acme` replaced the subtree, so the value,
 *    the stage, the probability, the owner and the close date were all silent —
 *    every fact the card draws is in the name, comma-joined.
 * 3. **`compact` actually densifies.** `padding` reached `Card` on native only,
 *    so the web card dropped its meter and its meta row and kept the full `lg`
 *    inset — less information in the same space.
 * 4. **Money is tabular**, so a column of deal values lines up on the decimal
 *    instead of drifting with the digit widths.
 * 5. **The skeleton is the shared placeholder.** The base painted
 *    `bg-neutral-100` — a ramp step, so a pale plate on a dark page — and sized
 *    one block off a **type-scale** token, which is a font size, not a height.
 * 6. **A press is a state layer on a real button**, in place of a
 *    `role="button"` div with a hand-written Enter/Space handler.
 */
exports.DealCardV4 = React.forwardRef(function DealCardV4({ name, company, valueCents, currency = 'USD', stage, probability, owner, closeDate, outcome = 'open', variant = 'default', loading = false, probabilityLabel = 'Probability', loadingLabel = 'Loading deal', onClick, className, ...rest }, ref) {
    (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
    // A deal with no name is the blank bordered box the line rules out.
    if (!name)
        return null;
    const compact = variant === 'compact';
    const highlighted = variant === 'highlighted';
    const clamped = (0, crm_v4_1.clampPercent)(probability);
    // `clampPercent` clamps but does not round; the meter prints a whole percent.
    const pct = clamped != null ? Math.round(clamped) : undefined;
    const showMeter = !compact && pct != null;
    const interactive = onClick != null && !loading;
    const money = (0, money_1.formatMoney)(valueCents, currency);
    const meterName = pct != null ? `${probabilityLabel}, ${pct}%` : undefined;
    const label = (0, crm_v4_1.spokenLine)([
        name,
        company,
        money,
        stage,
        showMeter ? meterName : undefined,
        internal_1.OUTCOME_META[outcome].label,
        !compact ? owner?.name : undefined,
        !compact ? closeDate : undefined,
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-start justify-between gap-sm", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate font-bold text-on-surface", children: name }), company ? (0, jsx_runtime_1.jsx)("span", { className: "truncate text-sm text-muted-text", children: company }) : null] }), (0, jsx_runtime_1.jsx)(WinLossBadgeV4_1.WinLossBadgeV4, { outcome: outcome, size: "sm" })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('text-lg font-bold text-on-surface', crm_v4_1.TABULAR_CLASS), children: money }), stage ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs font-semibold text-muted-text", children: stage })) : null] }), showMeter ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex justify-between text-xs text-muted-text", children: [(0, jsx_runtime_1.jsx)("span", { children: probabilityLabel }), (0, jsx_runtime_1.jsx)("span", { className: (0, cn_1.cn)('font-semibold', crm_v4_1.TABULAR_CLASS), children: `${pct}%` })] }), (0, jsx_runtime_1.jsx)("span", { role: "progressbar", "aria-label": meterName, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": pct, className: "block h-xs overflow-hidden rounded-[var(--xen-radius-full)] bg-selected", children: (0, jsx_runtime_1.jsx)("span", { className: "block h-full bg-primary", style: { width: `${pct}%` } }) })] })) : null, !compact && (owner || closeDate) ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex items-center justify-between gap-sm", children: [owner ? ((0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 items-center gap-xs", children: [(0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { size: "sm", name: owner.name, src: owner.avatarUrl, alt: "" }), owner.name ? ((0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: owner.name })) : null] })) : ((0, jsx_runtime_1.jsx)("span", {})), closeDate ? (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: closeDate }) : null] })) : null] }));
    return ((0, jsx_runtime_1.jsx)(Card_1.Card, { ref: ref, 
        // Both reach `Card` on this twin now, so `compact` is a real density
        // rather than only a content cut.
        variant: highlighted ? 'elevated' : 'outlined', padding: compact ? 'md' : undefined, 
        // `highlighted` is a **ring**, not a wash. The base tinted the ground
        // with `bg-primary-50` — a ramp step that inverts on a dark page — and
        // then drew `on-surface` text on it, a pair nobody measured. The card
        // keeps its own ground and says "this one" with its border.
        className: (0, cn_1.cn)('flex flex-col gap-sm', highlighted && 'border-primary', className), ...rest, children: loading ? ((0, jsx_runtime_1.jsxs)("div", { role: "status", "aria-live": "polite", "aria-label": loadingLabel, className: "flex flex-col gap-sm", children: [(0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-md w-[70%]', crm_v4_1.PLACEHOLDER_CLASS) }), (0, jsx_runtime_1.jsx)("div", { className: (0, cn_1.cn)('h-sm w-[40%]', crm_v4_1.PLACEHOLDER_CLASS) })] })) : interactive ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)'), className: "flex w-full flex-col gap-sm rounded-[var(--xen-radius-md)] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring", children: body })) : ((0, jsx_runtime_1.jsx)("div", { className: "flex w-full flex-col gap-sm", children: body })) }));
});
//# sourceMappingURL=DealCardV4.js.map