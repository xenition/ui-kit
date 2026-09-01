"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpendCategoryRowV4 = SpendCategoryRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const appearance_1 = require("../primitives/internal/appearance");
const row_v4_1 = require("../dashboard/internal/row-v4");
const MiniBarV4_1 = require("../charts/MiniBarV4");
const money_1 = require("../commerce/money");
const MoneyAmountV4_1 = require("./MoneyAmountV4");
const ledger_v4_1 = require("./internal/ledger-v4");
/** Only the three status names are status. */
const BAR_TONE = {
    success: 'success',
    warn: 'warn',
    danger: 'danger',
};
/**
 * A non-status colour is **identity**, so it takes a categorical slot off the
 * chart palette rather than a semantic fill. A category is not good or bad.
 */
const BAR_SLOT = {
    primary: 0,
    accent: 1,
    muted: 2,
    success: 0,
    warn: 0,
    danger: 0,
};
/**
 * The glyph's **ink**, not its fill. A category mark is text-shaped, and
 * `success` / `primary` are fill slots the compiler measures nothing about as
 * text — one of them read as low as 1.32:1 in the audit that produced the
 * `*Text` pairs.
 */
const GLYPH_INK = {
    primary: 'primaryText',
    accent: 'accentText',
    success: 'successText',
    warn: 'warnText',
    danger: 'dangerText',
    muted: 'mutedText',
};
/** A share, through `Intl` (rule D). */
const PERCENT = new Intl.NumberFormat(undefined, {
    style: 'percent',
    maximumFractionDigits: 0,
});
/**
 * **V4 spend category row** — same props as {@link SpendCategoryRow}, with
 * `color` narrowed to the twins' shared union.
 *
 * ## Four changes
 *
 * 1. **The row says the amount.** `accessibilityLabel={category}` on an
 *    `accessible` `Pressable` pruned the share and the figure, so "Groceries,
 *    button" was the whole of it.
 * 2. **The share bar is a `progressbar` with a value**, and a sibling of the
 *    row's activation rather than a child — inside a `button` its value is
 *    presentational and is dropped, which is how a drawn proportion ends up
 *    exposed as nothing at all.
 * 3. **Press is a state layer**, not `opacity: 0.7`, which is the band M3
 *    spends on *disabled*.
 * 4. **The row joins the shared row family** — one height, one 44 leading
 *    slot, a caption in `mutedText` — so it clears 44 with or without its
 *    optional glyph, and the percentage goes through `Intl`.
 */
function SpendCategoryRowV4({ category, amountCents, currency = 'USD', share, icon, color = 'primary', onPress, appearance = 'classic', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const clampedShare = typeof share === 'number' && Number.isFinite(share) ? Math.min(Math.max(share, 0), 1) : undefined;
    const percentText = clampedShare != null ? PERCENT.format(clampedShare) : null;
    const now = clampedShare != null ? Math.round(clampedShare * 100) : 0;
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const name = (0, ledger_v4_1.spokenLine)([
        category,
        (0, money_1.formatMoney)(Number.isFinite(amountCents) ? Math.trunc(amountCents) : 0, currency),
    ]);
    const text = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }), flex: 1 },
        ], children: [icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowLeadingStyle)(theme), children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: icon, color: GLYPH_INK[color], size: "lg" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", numberOfLines: 1, children: category }) }), (0, jsx_runtime_1.jsx)(MoneyAmountV4_1.MoneyAmountV4, { cents: amountCents, currency: currency, tone: "neutral", size: "sm" })] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [surface, { gap: tokens.spacing.xs }, style], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => text(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: text(false) })), clampedShare != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "progressbar", accessibilityLabel: (0, ledger_v4_1.spokenLine)([category, `${percentText} of spend`]), accessibilityValue: { min: 0, max: 100, now }, style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flex: 1 }, children: (0, jsx_runtime_1.jsx)(MiniBarV4_1.MiniBarV4, { value: now, max: 100, slot: BAR_SLOT[color], tone: BAR_TONE[color] }) }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: percentText })] })) : null] }));
}
//# sourceMappingURL=SpendCategoryRowV4.js.map