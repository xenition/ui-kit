"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriceTagV4 = PriceTagV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const money_1 = require("./money");
/**
 * The price's own step, one up from the base at every size.
 *
 * A price is the number a shopper decides on, and the base topped out at
 * `base` (16px) for `md` — a caption size for the most important figure on a
 * product card. §6 puts hierarchy before styling: the fix is a bigger number,
 * not a decorated one.
 */
const PRICE = { sm: 'base', md: 'lg', lg: '2xl' };
/**
 * The struck "was" price, always one step under the price it is struck
 * against. The base pinned it at `sm` regardless, so beside a large price it
 * read as an orphan rather than as the same fact, demoted.
 */
const WAS = { sm: 'xs', md: 'sm', lg: 'base' };
/**
 * **V4 price tag** — same props as {@link PriceTag}, a different design line.
 *
 * The other component in the kit where a number is the hero. Every amount
 * still goes through {@link formatMoney} — integer cents in, a localized
 * currency string out, overridable per call — because a hand-written formatter
 * is how a kit ends up with `$1204.5` on one screen and `$1,204.50` on the
 * next.
 *
 * Four changes:
 *
 * 1. **Tabular figures.** A list of prices only reads as a list if the digits
 *    line up; with proportional figures `$9.99` and `$11.11` are different
 *    widths and the column has no edge to scan down (§33).
 * 2. **The display face, on both twins.** The web base already set
 *    `font-heading` on the price and the native base did not, so the same
 *    price was a different typeface on the two platforms. Both wear it now.
 * 3. **A price that reads as the decision.** One step up the scale at every
 *    size — `md` goes from `base` to `lg` — because the base was setting the
 *    most important figure on a product card at caption size (§6).
 * 4. **The "was" price is announced, not just struck through.** A screen
 *    reader given `$20.00 $14.00` reads two prices with no idea which is
 *    which; the compare-at now carries a `Was …` label. §46 puts that ahead of
 *    the design line.
 *
 * **A discounted price does not turn red.** §35.4 — semantic colours are not
 * brand colours, `danger` means danger, and a sale price painted in the error
 * tone teaches the reader to distrust the tone everywhere else in the app. The
 * discount is carried by the struck original beside it, which is what a
 * shopper already reads.
 *
 * **No badge, no container.** The percentage off is derivable from the two
 * props and deliberately not drawn: a price tag's job is the price, it is
 * composed inside cards and rows that have their own layout, and §7 gets the
 * last word on adding a second coloured element to a two-line component.
 */
function PriceTagV4({ cents, currency = 'USD', compareAtCents, formatMoney: format = money_1.formatMoney, size = 'md', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const hasCompare = typeof compareAtCents === 'number' && compareAtCents > cents;
    const was = hasCompare ? format(compareAtCents, currency) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontFamily: tokens.typography.fontHeading,
                    fontSize: tokens.typography.scale[PRICE[size]],
                    fontWeight: '700',
                    fontVariant: ['tabular-nums'],
                }, children: format(cents, currency) }), was !== null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text
            // "$20.00 $14.00" tells a screen reader nothing about which is which.
            , { 
                // "$20.00 $14.00" tells a screen reader nothing about which is which.
                accessibilityLabel: `Was ${was}`, style: {
                    color: colors.muted,
                    fontFamily: tokens.typography.fontBody,
                    fontSize: tokens.typography.scale[WAS[size]],
                    fontVariant: ['tabular-nums'],
                    textDecorationLine: 'line-through',
                }, children: was })) : null] }));
}
//# sourceMappingURL=PriceTagV4.js.map