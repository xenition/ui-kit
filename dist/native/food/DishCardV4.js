"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishCardV4 = DishCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const ButtonV4_1 = require("../primitives/ButtonV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const commerce_1 = require("../commerce");
const menu_v4_1 = require("./internal/menu-v4");
/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;
/**
 * **V4 dish card** — same props as {@link DishCard} plus `loadingLabel`.
 *
 * ## Six changes
 *
 * 1. **The card says what is in the food.** The base put
 *    `accessibilityLabel={name}` on a `Pressable`, which is `accessible` by
 *    default and therefore a leaf on iOS — so a screen-reader user browsing a
 *    menu heard exactly one thing per dish: its name. Not the price, not the
 *    rating, and **not the allergen and dietary badges** the component's own
 *    prop doc exists to carry. Someone with a coeliac or a nut allergy got a
 *    bare list of dish names beside a sighted view showing every marker. The
 *    name now carries the price, the rating and the sold-out state through
 *    `spokenLine`, and the **badges are lifted out of the activation** so each
 *    one's own text is read. `badges` is an opaque `ReactNode` — there is no
 *    honest way to turn an arbitrary element into a string, and a consumer's
 *    own halal chip must not be the one marker that goes missing.
 * 2. **The Add button and the badges are siblings of the card's activation**,
 *    not descendants of it. Nested inside the `accessible` `Pressable` they
 *    did not exist for VoiceOver at all: the dish could be opened and never
 *    added, and the markers were suppressed wholesale.
 * 3. **`soldOut` actually blocks the card.** The base set
 *    `accessibilityState={{ disabled: true }}` and passed `onPress` through
 *    unguarded, so the same user who could not hear that a dish contains
 *    gluten could also add a sold-out one to their cart.
 * 4. **The sold-out dimming and the press treatment stop fighting.** Both were
 *    `opacity` on the same node, so a pressed sold-out card got *brighter*.
 *    Press is a state layer now; the dim is M3's disabled band and it is spent
 *    on the photo, leaving the "Sold out" word at full strength — dimming the
 *    explanation of why a dish is unavailable is the one thing it must not do.
 * 5. **The skeleton survives dark mode.** It was `tokens.ramps.neutral[200]`,
 *    and the native ramps keep their light orientation in both schemes, so a
 *    loading dish was two near-white slabs on a dark page.
 * 6. **Badges are identity, not status** — see `NutritionBadgeV4`.
 *
 * **Renders nothing without a `name`.**
 */
function DishCardV4({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, variant = 'list', soldOut = false, loading = false, onPress, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', loadingLabel = 'Loading dish', formatMoney = commerce_1.formatMoney, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const horizontal = variant === 'list';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const mediaSize = horizontal ? tokens.spacing['2xl'] * 2 : undefined;
    const mediaHeight = mediaSize ?? (variant === 'featured' ? tokens.spacing['2xl'] * 4 : tokens.spacing['2xl'] * 3);
    const pad = tokens.spacing.md;
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: loadingLabel, style: [containerStyle, { padding: pad, gap: tokens.spacing.sm }], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: mediaSize ?? '100%',
                        height: mediaHeight,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
                    } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.base,
                                width: '60%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                height: tokens.typography.scale.sm,
                                width: '90%',
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
                            } })] })] }));
    }
    if (!name)
        return null;
    const priceText = typeof priceCents === 'number' ? formatMoney(priceCents, currency) : null;
    const clamped = typeof rating === 'number' && Number.isFinite(rating)
        ? Math.max(0, Math.min(RATING_MAX, rating))
        : null;
    const stars = clamped != null ? (0, tone_v4_1.ratingParts)({ value: clamped, max: RATING_MAX }) : null;
    // Change 1: everything a sighted user can read off the card that a string
    // can honestly carry. The badges cannot, so they are rendered outside the
    // activation instead — see the footer below.
    const spoken = (0, menu_v4_1.spokenLine)([
        name,
        description,
        priceText,
        stars?.text != null ? stars.label : null,
        soldOut ? soldOutLabel : null,
    ]);
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: mediaSize ?? '100%',
            height: mediaHeight,
            borderRadius: horizontal ? tokens.radius.md : 0,
            overflow: 'hidden',
            // The photo carries the sold-out dim on its own, so nothing else has to
            // and nothing compounds.
            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, soldOut),
            backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numberOfLines: horizontal ? 1 : 2, children: name }), description ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 2, children: description })) : null, clamped != null && stars != null ? ((0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: clamped, size: "sm", showValue: true, label: stars.label })) : null, priceText != null ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "semibold", tone: "onCard", numeric: "tabular", style: { marginTop: tokens.spacing.xs }, children: priceText })) : null] }));
    const summary = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: horizontal ? 'row' : 'column',
            gap: tokens.spacing.md,
            padding: horizontal ? pad : 0,
            paddingBottom: horizontal ? tokens.spacing.sm : 0,
            // Press is a state layer on the container, never an opacity on the
            // content — 0.38 is M3's *disabled* band.
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [media, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0, padding: horizontal ? 0 : pad, paddingBottom: 0 }, children: body })] }));
    // Change 3: sold out means the handler does not fire, not just that a state
    // flag says so.
    const activation = onPress && !soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, children: ({ pressed }) => summary(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, accessibilityState: { disabled: soldOut }, children: summary(false) }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [activation, badges || soldOut || onAdd ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                    minHeight: tap,
                    paddingHorizontal: pad,
                    paddingBottom: pad,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            alignItems: 'center',
                            minWidth: 0,
                            gap: tokens.spacing.xs,
                        }, children: badges }), soldOut ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: (0, menu_v4_1.toneInk)(theme, 'danger') }, children: soldOutLabel })) : onAdd ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { size: "sm", onPress: onAdd, 
                        // A bare "Add" in a list of twenty dishes names nothing.
                        accessibilityLabel: (0, menu_v4_1.spokenLine)([addLabel, name]), style: { minHeight: tap, flexShrink: 0 }, children: addLabel })) : null] })) : null] }));
}
//# sourceMappingURL=DishCardV4.js.map