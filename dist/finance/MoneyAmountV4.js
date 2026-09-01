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
exports.MoneyAmountV4 = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const React = __importStar(require("react"));
const cn_1 = require("../primitives/cn");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
/** The type step each visual size sits on — the base's own mapping. */
const SIZE_CLASS = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-xl',
    xl: 'text-3xl',
};
/**
 * **V4 money amount** — the web twin of the native `MoneyAmountV4`, same props
 * as {@link MoneyAmount} plus `directionLabels`.
 *
 * Every figure in this module funnels through here, so its defects were
 * thirteen components' defects.
 *
 * ## Three changes
 *
 * 1. **Money is drawn in the contrast-corrected ink.** The base painted
 *    amounts `text-success` / `text-danger`, which are **fill** tokens — a
 *    rendered audit measured them at 1.32:1 as text — and `tone="muted"` in
 *    `text-muted`, a ramp step with no contrast promise at all, which is what
 *    `BudgetBar` draws a real remaining balance in. The native twin migrated
 *    to the `*Text` slots and carries a comment saying why; the web twin
 *    missed the migration wholesale.
 * 2. **A red amount is no longer announced as a credit.** The colour came from
 *    `tone` and the announced direction came from the *sign*, so a caller
 *    passing an unsigned magnitude with `tone="expense"` — which is exactly
 *    what that prop is for — got a danger-coloured figure a reader called
 *    "credit $12.00". `signParts()` resolves both from one place, and `tone`
 *    wins when it is given.
 * 3. **The glyph and the word agree.** With `signDisplay="never"` the string
 *    for −$50.00 was identical to +$50.00, leaving hue as the only difference
 *    — invisible in greyscale and to a red-green viewer. The sign now follows
 *    the resolved direction rather than the sign of `cents`, so `tone` moves
 *    the glyph too, and the name carries the direction as a word whether or
 *    not the glyph is drawn.
 *
 * Zero keeps `on-surface` rather than becoming muted: a balance of exactly
 * zero is a value, not an absence.
 */
exports.MoneyAmountV4 = React.forwardRef(function MoneyAmountV4({ cents, currency = 'USD', tone = 'auto', size = 'md', signDisplay = 'auto', formatMoney: format = money_1.formatMoney, directionLabels, className, 'aria-label': ariaLabel, ...rest }, ref) {
    const safeCents = Number.isFinite(cents) ? Math.trunc(cents) : 0;
    const magnitude = format(Math.abs(safeCents), currency);
    // `auto` is the absence of a declared direction, so it is the one value
    // that falls through to the sign.
    const parts = (0, ledger_v4_1.signParts)(safeCents, tone === 'auto' ? undefined : tone, directionLabels);
    const ink = tone === 'muted'
        ? (0, ledger_v4_1.moneyInkClass)('muted')
        : tone === 'neutral' || parts.direction === 'zero'
            ? 'text-on-surface'
            : (0, ledger_v4_1.moneyInkClass)(parts.tone);
    // The glyph follows the resolved direction, not the sign of `cents`, so
    // the thing the eye sees and the thing the reader says cannot disagree.
    const sign = signDisplay === 'never'
        ? ''
        : parts.direction === 'debit' || (parts.direction === 'credit' && signDisplay === 'always')
            ? parts.sign
            : '';
    return ((0, jsx_runtime_1.jsx)("span", { ref: ref, "aria-label": ariaLabel ?? (0, ledger_v4_1.spokenLine)([parts.word, magnitude]), className: (0, cn_1.cn)('font-bold', ledger_v4_1.TABULAR_CLASS, ink, SIZE_CLASS[size], className), ...rest, children: `${sign}${magnitude}` }));
});
//# sourceMappingURL=MoneyAmountV4.js.map