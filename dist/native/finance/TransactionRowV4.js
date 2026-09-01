"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionRowV4 = TransactionRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
const ledger_v4_1 = require("./internal/ledger-v4");
/**
 * **V4 transaction row** — same props as {@link TransactionRow}.
 *
 * ## Four changes
 *
 * 1. **The row says what it cost.** `accessibilityLabel={title}` on an
 *    `accessible` `Pressable` flattens the row to one leaf, so a reader heard
 *    "Whole Foods, button" and never −$84.12 — the number the row exists to
 *    show. It now carries one name holding the merchant, the category, the
 *    date and the signed amount.
 * 2. **Press is a state layer.** `opacity: pressed ? 0.7 : 1` dims the row's
 *    own content, which is the signal M3 spends 0.38 on to mean *disabled*, so
 *    a pressed row and a dead one looked alike. It takes the shared row press
 *    fill.
 * 3. **It is a row from the shared row family**, so a transaction, a settings
 *    row and a notification are one height, one gutter and one 44 leading
 *    slot — and the row clears 44 whether or not the optional category glyph
 *    is there, which the base's bare `paddingVertical` did not.
 * 4. **The caption is `mutedText`.** The subtitle and the date were drawn in
 *    `colors.muted`, a ramp step carrying no contrast promise.
 */
function TransactionRowV4({ title, subtitle, amountCents, currency = 'USD', direction, date, icon, iconColor = 'primary', onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const signedCents = direction
        ? direction === 'expense'
            ? -Math.abs(amountCents)
            : Math.abs(amountCents)
        : amountCents;
    // Appearance surface goes FIRST; the row family's layout stays AFTER.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const money = (0, ledger_v4_1.signParts)(signedCents, direction);
    const name = (0, ledger_v4_1.spokenLine)([
        title,
        subtitle,
        date,
        money.word,
        (0, money_1.formatMoney)(Math.abs(Math.trunc(signedCents)), currency),
    ]);
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            surface,
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: subtitle != null }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            style,
        ], children: [icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, color: iconColor, size: "lg", badge: "soft" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: title }), subtitle != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: subtitle })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [(0, row_v4_1.rowTrailingStyle)(theme), { flexDirection: 'column', alignItems: 'flex-end' }], children: [(0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: signedCents, currency: currency, tone: direction ?? 'auto', size: "md", signDisplay: "always" }), date != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: date })) : null] })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => body(pressed) }));
}
//# sourceMappingURL=TransactionRowV4.js.map