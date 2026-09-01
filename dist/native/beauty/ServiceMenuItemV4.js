"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceMenuItemV4 = ServiceMenuItemV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const row_v4_1 = require("../dashboard/internal/row-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * Category → glyph and default word.
 *
 * A treatment category is **not** a status: it does not mean good or bad, so
 * §5 of the brief keeps the status colours away from it and the glyph carries
 * the identity instead. The base assigned each category a `keyof
 * SemanticColors`, which spent `success` and `warn` on "nails" and "waxing".
 */
const CATEGORY_META = {
    hair: { label: 'Hair', glyph: '💇' },
    nails: { label: 'Nails', glyph: '💅' },
    skin: { label: 'Skin', glyph: '🧴' },
    massage: { label: 'Massage', glyph: '💆' },
    makeup: { label: 'Makeup', glyph: '💄' },
    brows: { label: 'Brows', glyph: '👁' },
    waxing: { label: 'Waxing', glyph: '🕯' },
    spa: { label: 'Spa', glyph: '🧖' },
};
/**
 * **V4 service menu item** — same props as {@link ServiceMenuItem} plus
 * `categoryLabels`, `popularLabel`, `unavailableLabel`, `formatDuration` and
 * `last`.
 *
 * ## Four changes
 *
 * 1. **A category stops spending the status colours.** See
 *    {@link CATEGORY_META}: "nails" was `success` and "waxing" was `warn`, so
 *    a menu of eight services used up every tone that means something.
 * 2. **An unavailable service cannot be pressed**, and dims at M3's 0.38 —
 *    the base greyed it and kept it live.
 * 3. **It is a row from the shared row line**, with tabular prices.
 * 4. **Nine English strings become props.**
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function ServiceMenuItemV4({ name, priceCents, currency = 'USD', category, durationMin, description, popular = false, unavailable = false, pricePrefix, formatMoney = money_1.formatMoney, categoryLabels, popularLabel = 'Popular', unavailableLabel = 'Unavailable', formatDuration, last = false, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (!name)
        return null;
    const meta = category ? CATEGORY_META[category] : null;
    const categoryWord = category ? (categoryLabels?.[category] ?? meta.label) : null;
    const price = formatMoney(priceCents, currency);
    const duration = typeof durationMin === 'number'
        ? (formatDuration ?? ((m) => `${m} min`))(durationMin)
        : null;
    const caption = (0, salon_v4_1.metaLine)([categoryWord, duration, description]);
    const content = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            (0, row_v4_1.rowContainerStyle)(theme, { twoLine: Boolean(caption) }),
            { backgroundColor: (0, row_v4_1.rowGround)(theme, { pressed }) },
            !last ? (0, row_v4_1.rowEdgeStyle)(theme) : null,
            { opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, unavailable) },
            style,
        ], children: [meta ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "lg" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: (0, row_v4_1.rowTextStyle)(theme), children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: 1, style: { flexShrink: 1 }, children: name }), popular && !unavailable ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "accent", variant: "soft", size: "sm", children: popularLabel })) : null, unavailable ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: unavailableLabel })) : null] }), caption ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 2, children: caption })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [pricePrefix ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", children: pricePrefix })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: price })] })] }));
    const label = (0, salon_v4_1.metaLine)([name, caption, price, unavailable ? unavailableLabel : null]);
    if (!onPress || unavailable) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: label, accessibilityState: { disabled: unavailable }, children: content(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: { borderRadius: tokens.radius.md }, children: ({ pressed }) => content(pressed) }));
}
//# sourceMappingURL=ServiceMenuItemV4.js.map