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
exports.AccountCardV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const inject_1 = require("../motion/internal/inject");
const cn_1 = require("../primitives/cn");
const CardV4_1 = require("../primitives/CardV4");
const Icon_1 = require("../primitives/Icon");
const card_ground_v4_1 = require("../primitives/internal/card-ground-v4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const v4_state_1 = require("../primitives/internal/v4-state");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
const mask_1 = require("./internal/mask");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
/**
 * The glyph and the default word per kind.
 *
 * The accent **border** is gone. `savings` took `border-success` and `credit`
 * took `border-accent`, so a status colour was spent on an identity — and the
 * green edge sat directly beside a `MoneyAmount` whose green means income, in
 * a component where a savings account is not "healthy" and a credit account is
 * not "flagged". The kind is carried by the glyph and by a word.
 */
const VARIANT_META = {
    checking: { glyph: '🏦', label: 'Checking' },
    savings: { glyph: '🐖', label: 'Savings' },
    credit: { glyph: '💳', label: 'Credit' },
};
/** The caption above the figure. Visible, and part of the card's name. */
const BALANCE_LABEL = 'Balance';
/**
 * **V4 account card** — the web twin of the native `AccountCardV4`, same props
 * as {@link AccountCard} plus `typeLabels`.
 *
 * ## Six changes
 *
 * 1. **The card's name contains the balance.** `aria-label={`${name},
 *    ${label} account`}` on a `role="button"` root prunes everything under it,
 *    and what it pruned was the balance — the only number the tile exists to
 *    show. The name is now the account, its kind, the masked number and the
 *    figure.
 * 2. **An account kind is an identity, not a status** — see
 *    {@link VARIANT_META}.
 * 3. **The account number no longer replaces the account kind.** The base
 *    printed the mask *instead of* the type word, so a tile with a number on
 *    it stopped saying whether it was a credit card or a current account. Both
 *    lines are there.
 * 4. **Press is a state layer.** `hover:opacity-90` fades the card's own
 *    content, which is the signal M3 spends 0.38 on to mean *disabled* — so a
 *    hovered card and a dead one were the same gesture at two strengths.
 * 5. **Focus is `ring-ring`**, not `ring-primary-300`: a ramp step keeps its
 *    light-mode orientation under `[data-theme="dark"]`, while `--xen-ring` is
 *    `primary` already corrected to 3:1 against the page.
 * 6. **The card is on `card`, its captions on `muted-text`.** The tile painted
 *    `surface` — the page colour — so it read flat in dark mode, and its two
 *    captions used `muted`, a ramp step with no contrast promise, as an ink.
 */
exports.AccountCardV4 = React.forwardRef(function AccountCardV4({ name, variant, balanceCents, currency = 'USD', accountNumber, icon, typeLabels, onClick, className, ...rest }, ref) {
    React.useEffect(() => {
        (0, inject_1.injectStyleOnce)(v4_state_1.V4_STATE_STYLE_ID, v4_state_1.V4_STATE_CSS);
        (0, inject_1.injectStyleOnce)(card_ground_v4_1.V4_CARD_GROUND_STYLE_ID, card_ground_v4_1.V4_CARD_GROUND_CSS);
    }, []);
    const meta = VARIANT_META[variant];
    const typeLabel = typeLabels?.[variant] ?? meta.label;
    const masked = accountNumber != null ? (0, mask_1.maskAccountNumber)(accountNumber) : undefined;
    const label = (0, ledger_v4_1.spokenLine)([
        name,
        typeLabel,
        masked,
        BALANCE_LABEL,
        (0, money_1.formatMoney)(Number.isFinite(balanceCents) ? Math.trunc(balanceCents) : 0, currency),
    ]);
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("span", { className: "flex items-center gap-sm", children: [(0, jsx_runtime_1.jsx)("span", { "aria-hidden": "true", className: "flex h-xl w-xl shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] border border-border bg-surface", children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: icon ?? meta.glyph, color: "onSurface", size: "lg" }) }), (0, jsx_runtime_1.jsxs)("span", { className: "flex min-w-0 flex-1 flex-col", children: [(0, jsx_runtime_1.jsx)("span", { className: "truncate text-base font-semibold text-on-card", children: name }), (0, jsx_runtime_1.jsx)("span", { className: "truncate text-xs text-muted-text", children: (0, tone_v4_1.metaLine)([typeLabel, masked]) })] })] }), (0, jsx_runtime_1.jsxs)("span", { className: "flex flex-col gap-xs", children: [(0, jsx_runtime_1.jsx)("span", { className: "text-xs text-muted-text", children: BALANCE_LABEL }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: balanceCents, currency: currency, tone: "neutral", size: "lg" })] })] }));
    return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { ref: ref, ...card_ground_v4_1.V4_CARD_GROUND_ATTR, variant: "outlined", radius: "lg", 
        // The padding moves inside so the state layer covers the whole tile
        // rather than a rectangle floating in the middle of it.
        padding: "none", className: (0, cn_1.cn)('overflow-hidden', className), ...rest, children: onClick ? ((0, jsx_runtime_1.jsx)("button", { type: "button", "aria-label": label, onClick: onClick, "data-xen-v4-state": "", style: (0, v4_state_1.stateGroundVars)('var(--xen-card)', 'var(--xen-on-card)'), className: (0, cn_1.cn)('flex w-full flex-col gap-md p-lg text-left', 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring', chrome_v4_1.MIN_TAP_CLASS), children: body })) : ((0, jsx_runtime_1.jsx)("span", { className: "flex flex-col gap-md p-lg", children: body })) }));
});
//# sourceMappingURL=AccountCardV4.js.map