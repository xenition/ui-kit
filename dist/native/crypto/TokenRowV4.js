"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenRowV4 = TokenRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const MoneyAmount_1 = require("../finance/MoneyAmount");
const v4_depth_1 = require("../../primitives/internal/v4-depth");
const color_1 = require("../../theme/color");
const compile_1 = require("../../theme/compile");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../../commerce/money");
const market_v4_1 = require("./internal/market-v4");
const format_1 = require("./internal/format");
/**
 * How much of the token's own colour the disc carries — `BadgeV4`'s and
 * `IconV4`'s 14%, so a token disc and a soft badge beside it are one wash
 * rather than two neighbouring shades of nearly the same.
 */
const DISC_MIX = 0.14;
/**
 * **V4 holding row** — same props as {@link TokenRow} plus `directionLabels`.
 *
 * ## Four changes
 *
 * 1. **A loss is announced as a loss.** The base built the change's spoken
 *    label as `` `${pct >= 0 ? 'up' : 'down'} ${formatPct(Math.abs(pct))}` ``
 *    — and `formatPct` re-applies the sign, so a fall announced as **"down
 *    +3.20%"**. `>= 0` also sent a flat `0` down the "up" branch while the
 *    glyph drawn beside it was `•`.
 * 2. **The row announces the holding.** `"ETH holding"` was the whole name,
 *    and it replaced everything under it — so the quantity, the fiat value and
 *    the change, which is all the row is for, were never spoken.
 * 3. **`iconColor` is drawn on a ground it is paired with.** The base painted
 *    `colors[iconColor]` — `on-primary` by default — onto a neutral ramp step
 *    and hoped. The disc now composites its own ground from that colour and
 *    re-measures the mark against it, so a token's accent is legible whatever
 *    the seed. The mark also stops being a silent `slice(0, 3)`: the full
 *    ticker is set in the disc and ellipsised if it does not fit, and the
 *    row's title carries it whole.
 * 4. **The change reads as text**, not as `colors[changeToneKey(pct)]` — a
 *    fill slot with no contrast promise — and press is a state layer on the
 *    shared row recipe rather than `opacity: 0.7`.
 */
function TokenRowV4({ symbol, name, amount, decimals = 4, valueCents, currency = 'USD', changePct, icon, iconColor = 'primary', directionLabels, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!symbol)
        return null;
    const hasChange = changePct != null;
    const change = (0, market_v4_1.changeParts)(changePct, directionLabels);
    const ink = (0, market_v4_1.changeInk)(theme, change.tone);
    const amountText = (0, format_1.formatToken)(amount, { decimals, symbol });
    const pctText = hasChange ? (0, format_1.formatPct)(changePct) : null;
    // The disc owns its ground, so the accent can be measured against it. Both
    // are derived from the one colour the caller named.
    const discGround = (0, v4_depth_1.mixToken)(colors.surface, colors[iconColor], DISC_MIX);
    const discInk = (0, color_1.ensureContrast)(colors[iconColor], discGround, compile_1.MIN_CONTRAST);
    const mark = icon ?? symbol.toUpperCase();
    const spoken = (0, market_v4_1.spokenLine)([
        symbol,
        name,
        amountText,
        valueCents != null ? (0, money_1.formatMoney)(valueCents, currency) : null,
        hasChange ? change.word : null,
        pctText,
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: name != null }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: [
                    (0, row_v4_1.rowLeadingStyle)(theme),
                    {
                        borderRadius: tokens.radius.full,
                        backgroundColor: discGround,
                        paddingHorizontal: tokens.spacing.xs,
                    },
                ], children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: icon != null ? 'lg' : 'xs', weight: "bold", numberOfLines: 1, style: { color: discInk }, children: mark }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: symbol }), name != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: name })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numeric: "tabular", children: amountText }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [valueCents != null ? ((0, jsx_runtime_1.jsx)(MoneyAmount_1.MoneyAmount, { cents: valueCents, currency: currency, tone: "neutral", size: "sm" })) : null, hasChange ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", style: { color: ink }, accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", children: change.glyph }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", numeric: "tabular", style: { color: ink }, children: pctText })] })) : null] })] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=TokenRowV4.js.map