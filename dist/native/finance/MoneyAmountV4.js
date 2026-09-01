"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoneyAmountV4 = MoneyAmountV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const money_1 = require("../commerce/money");
const ledger_v4_1 = require("./internal/ledger-v4");
/** The type step each visual size sits on — the base's own mapping. */
const SIZE_STEP = {
    sm: 'sm',
    md: 'base',
    lg: 'xl',
    xl: '3xl',
};
/**
 * **V4 money amount** — same props as {@link MoneyAmount} plus
 * `directionLabels`.
 *
 * Every figure in this module funnels through here, so its two defects were
 * thirteen components' defects.
 *
 * ## Three changes
 *
 * 1. **A red amount is no longer announced as a credit.** The colour came from
 *    `tone` and the announced direction came from the *sign*, so a caller
 *    passing an unsigned magnitude with `tone="expense"` — which is exactly
 *    what that prop is for — got a danger-coloured figure a reader called
 *    "credit $12.00". `signParts()` resolves both from one place, and `tone`
 *    wins when it is given.
 * 2. **The glyph and the word agree.** With `signDisplay="never"` the string
 *    for −$50.00 was identical to +$50.00, leaving hue as the only difference
 *    — invisible in greyscale and to a red-green viewer. The sign now follows
 *    the resolved direction rather than the sign of `cents`, so `tone` moves
 *    the glyph too, and the spoken name carries the direction as a word
 *    whether or not the glyph is drawn.
 * 3. **`tone="muted"` is readable.** It drew in `colors.muted`, a ramp step
 *    with no contrast promise, in a component whose whole job is text —
 *    `BudgetBar` draws a real remaining balance in it. It takes `mutedText`,
 *    the slot the theme added for this.
 *
 * Zero keeps `onSurface` rather than becoming muted: a balance of exactly zero
 * is a value, not an absence.
 */
function MoneyAmountV4({ cents, currency = 'USD', tone = 'auto', size = 'md', signDisplay = 'auto', formatMoney: format = money_1.formatMoney, directionLabels, accessibilityLabel, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const safeCents = Number.isFinite(cents) ? Math.trunc(cents) : 0;
    const magnitude = format(Math.abs(safeCents), currency);
    // `auto` is the absence of a declared direction, so it is the one value that
    // falls through to the sign.
    const parts = (0, ledger_v4_1.signParts)(safeCents, tone === 'auto' ? undefined : tone, directionLabels);
    const ink = tone === 'muted'
        ? theme.colors.mutedText
        : tone === 'neutral' || parts.direction === 'zero'
            ? theme.colors.onSurface
            : (0, ledger_v4_1.moneyInk)(theme, parts.tone);
    // The glyph follows the resolved direction, not the sign of `cents`, so the
    // thing the eye sees and the thing the reader says cannot disagree.
    const sign = signDisplay === 'never'
        ? ''
        : parts.direction === 'debit' || (parts.direction === 'credit' && signDisplay === 'always')
            ? parts.sign
            : '';
    return ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityLabel: accessibilityLabel ?? (0, ledger_v4_1.spokenLine)([parts.word, magnitude]), size: SIZE_STEP[size], weight: "bold", numeric: "tabular", style: [{ color: ink }, style], children: `${sign}${magnitude}` }));
}
//# sourceMappingURL=MoneyAmountV4.js.map