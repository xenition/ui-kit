"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TreatmentCardV4 = TreatmentCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const CardV4_1 = require("../primitives/CardV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const state_v4_1 = require("../primitives/internal/state-v4");
const money_1 = require("../commerce/money");
const salon_v4_1 = require("./internal/salon-v4");
/**
 * Treatment → glyph and default word.
 *
 * As with `ServiceMenuItemV4`: a treatment kind is **not** a status, so it
 * does not get a status colour. The base gave each one a `keyof
 * SemanticColors`, which spent `success` and `danger` on categories.
 */
const TREATMENT_META = {
    facial: { label: 'Facial', glyph: '🧖' },
    massage: { label: 'Massage', glyph: '💆' },
    body: { label: 'Body', glyph: '🌿' },
    nails: { label: 'Nails', glyph: '💅' },
    hair: { label: 'Hair', glyph: '💇' },
    wellness: { label: 'Wellness', glyph: '🧘' },
};
/** The media box's proportion. Fixed, so a grid of treatments has one baseline. */
const MEDIA_ASPECT = 16 / 9;
/**
 * **V4 treatment card** — same props as {@link TreatmentCard} plus
 * `variantLabels` and `formatDuration`.
 *
 * ## Four changes
 *
 * 1. **The category stops spending a status colour** — see
 *    {@link TREATMENT_META}.
 * 2. **The media box has a fixed ratio and a `muted` ground**, so a grid does
 *    not reflow as images arrive and a missing image is not a pale rectangle
 *    on a dark page.
 * 3. **The price is in the display face and tabular**, because it is the
 *    figure the decision turns on.
 * 4. **Press is a state layer** over the card's own fill, and the whole card
 *    has one accessible name.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
function TreatmentCardV4({ name, priceCents, currency = 'USD', variant = 'facial', durationMin, description, imageUrl, formatMoney = money_1.formatMoney, bookLabel = 'Book', variantLabels, formatDuration, onBook, onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const meta = TREATMENT_META[variant] ?? TREATMENT_META.facial;
    const word = variantLabels?.[variant] ?? meta.label;
    const price = formatMoney(priceCents, currency);
    const duration = typeof durationMin === 'number'
        ? (formatDuration ?? ((m) => `${m} min`))(durationMin)
        : null;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: '100%',
                    aspectRatio: MEDIA_ASPECT,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: colors.muted,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: false, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: meta.glyph, size: "3xl" })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), duration ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: duration })) : null] }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: "neutral", variant: "soft", size: "sm", children: word })] }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 2, style: { marginTop: tokens.spacing.xs }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    marginTop: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { face: "heading", size: "lg", weight: "bold", tone: "onCard", numeric: "tabular", children: price }), onBook ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: "primary", size: "sm", onPress: onBook, accessibilityLabel: `${bookLabel}, ${name}`, children: bookLabel })) : null] })] }));
    if (!onPress)
        return (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, salon_v4_1.metaLine)([name, word, duration, price]), onPress: onPress, style: ({ pressed }) => ({
            borderRadius: tokens.radius.lg,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }), children: (0, jsx_runtime_1.jsx)(CardV4_1.CardV4, { style: style, children: body }) }));
}
//# sourceMappingURL=TreatmentCardV4.js.map