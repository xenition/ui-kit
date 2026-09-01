"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRecommendationV4 = ProductRecommendationV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/** The thumbnail's proportion. Fixed, so a shelf of tiles has one baseline. */
const THUMB_ASPECT = 1;
/**
 * **V4 product recommendation** — same props as {@link ProductRecommendation}
 * plus `addedLabel`, `soldOutLabel` and `reasonLabel`.
 *
 * ## Four changes
 *
 * 1. **The rating carries its number** — `RatingV4 showValue`. Five glyphs is
 *    not a number, and this is a shelf where a shopper compares two products.
 * 2. **Sold out disables the button rather than only greying it.** The base
 *    dimmed the CTA and left it pressable.
 * 3. **The reason is labelled.** "Because you booked a keratin treatment" read
 *    as a second description; it is the whole point of a recommendation and
 *    now says what it is.
 * 4. **The thumbnail's ground is `colors.muted` at a fixed ratio**, so a shelf
 *    does not reflow as images arrive.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function ProductRecommendationV4({ name, priceCents, currency = 'USD', brand, rating, imageUrl, reason, added = false, soldOut = false, formatMoney = money_1.formatMoney, addLabel = 'Add', addedLabel = 'Added', soldOutLabel = 'Sold out', reasonLabel = 'Why this', onAdd, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const price = formatMoney(priceCents, currency);
    const cta = soldOut ? soldOutLabel : added ? addedLabel : addLabel;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing['2xl'] * 1.5,
                            aspectRatio: THUMB_ASPECT,
                            borderRadius: tokens.radius.md,
                            overflow: 'hidden',
                            backgroundColor: colors.muted,
                        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: false, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [brand ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: brand })) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 2, children: name }), typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: rating, size: "sm", showValue: true }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: price })] }), soldOut ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: soldOutLabel })) : null] }), reason ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs / 2, marginTop: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "semibold", tone: "mutedText", children: reasonLabel }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", children: reason })] })) : null, onAdd ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: added ? 'secondary' : 'primary', size: "sm", 
                // Sold out DISABLES the control. The base dimmed it and left it live.
                disabled: soldOut, onPress: onAdd, accessibilityLabel: `${cta}, ${name}`, style: { alignSelf: 'stretch', marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [added ? (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { name: "check", size: "sm" }) : null, (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: added ? 'primaryText' : 'onPrimary', children: cta })] }) })) : null] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [{ opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, soldOut) }, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, salon_v4_1.metaLine)([brand, name, price, soldOut ? soldOutLabel : null]), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: [{ opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, soldOut) }, style], children: body }) }));
}
//# sourceMappingURL=ProductRecommendationV4.js.map