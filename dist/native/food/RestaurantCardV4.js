"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantCardV4 = RestaurantCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const menu_v4_1 = require("./internal/menu-v4");
/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;
/** The steps `priceLevel` is documented to take. */
const PRICE_LEVELS = 4;
const OPEN_LABEL = {
    open: 'Open',
    closed: 'Closed',
    busy: 'Busy',
};
/**
 * Availability is a genuine status, so it takes a status tone — but `busy` is
 * a caution rather than a neutral, which is what the base drew it as.
 */
const OPEN_TONE = {
    open: 'success',
    closed: 'neutral',
    busy: 'warn',
};
/**
 * **V4 restaurant card** — same props as {@link RestaurantCard} plus
 * `openLabels` and `formatPriceLevel`.
 *
 * ## Five changes
 *
 * 1. **The card announces what it shows.** `accessibilityLabel` carried the
 *    name, the cuisine and the open state, and the `Pressable` around it is
 *    `accessible` — so the rating, the rating count, the price level, the ETA
 *    and the delivery fee were all removed from the tree. Every one of those
 *    is what a person is actually choosing between.
 * 2. **`$$$` gets words.** Three currency symbols announce as three currency
 *    symbols; `formatPriceLevel` gives the chip a text equivalent while the
 *    eye keeps the glyphs.
 * 3. **One dim, on one element.** The base put `0.75` on the container *and*
 *    `0.7` on the photo inside it, landing a closed restaurant's picture at
 *    0.525 — and then brightened the whole card to `0.9` on press, so a closed
 *    card lit up when touched. The photo carries M3's disabled band and
 *    nothing else does; press is a state layer.
 * 4. **The card reads as raised.** It was `surface` — the page's own colour —
 *    with a hairline, so on a dark page a list of restaurants was a flat
 *    field. `card`/`onCard` is the pair that exists for this.
 * 5. **The photo placeholder survives dark mode**, where it was
 *    `tokens.ramps.neutral[100]`: a near-white slab behind every unloaded
 *    thumbnail on a dark page.
 *
 * **Renders nothing without a `name`.**
 */
function RestaurantCardV4({ name, cuisine, rating, ratingCount, priceLevel, etaText, feeText, imageUrl, openState = 'open', openLabels, formatPriceLevel, variant = 'list', onPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const horizontal = variant === 'list';
    const dimmed = openState !== 'open';
    const openWord = openLabels?.[openState] ?? OPEN_LABEL[openState];
    const level = typeof priceLevel === 'number'
        ? Math.min(PRICE_LEVELS, Math.max(1, Math.round(priceLevel)))
        : null;
    const priceGlyphs = level != null ? '$'.repeat(level) : null;
    // Change 2: the glyphs stay on screen; the words go to the reader.
    const priceWords = level != null
        ? (formatPriceLevel ?? ((l) => `Price level ${l} of ${PRICE_LEVELS}`))(level)
        : null;
    const clamped = typeof rating === 'number' && Number.isFinite(rating)
        ? Math.max(0, Math.min(RATING_MAX, rating))
        : null;
    const stars = clamped != null
        ? (0, tone_v4_1.ratingParts)({ value: clamped, max: RATING_MAX, count: ratingCount })
        : null;
    const metaBits = (0, tone_v4_1.metaLine)([priceGlyphs, cuisine]);
    const deliveryLine = (0, tone_v4_1.metaLine)([etaText, feeText]);
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
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: horizontal ? tokens.spacing['2xl'] * 2 + tokens.spacing.sm : '100%',
            height: horizontal
                ? tokens.spacing['2xl'] * 2 + tokens.spacing.sm
                : variant === 'hero'
                    ? tokens.spacing['2xl'] * 4
                    : tokens.spacing['2xl'] * 2 + tokens.spacing.xl,
            borderRadius: horizontal ? tokens.radius.md : 0,
            overflow: 'hidden',
            // Change 3: the ONE dim in this component, and press is not an opacity,
            // so a closed card can no longer brighten under a finger.
            opacity: (0, chrome_v4_1.disabledOpacity)(theme.state, dimmed),
            backgroundColor: (0, menu_v4_1.placeholderGround)(theme),
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, style: { flex: 1 }, children: name }), (0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { tone: OPEN_TONE[openState], variant: menu_v4_1.BADGE_V4.variant, size: menu_v4_1.BADGE_V4.size, children: openWord })] }), metaBits ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, children: metaBits })) : null, clamped != null && stars != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: clamped, size: "sm", showValue: true, label: stars.label }), typeof ratingCount === 'number' ? ((0, jsx_runtime_1.jsxs)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", style: menu_v4_1.TABULAR, children: ["(", ratingCount, ")"] })) : null] })) : null, deliveryLine ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "onCard", style: menu_v4_1.TABULAR, children: deliveryLine })) : null] }));
    // Change 1: everything the eye can see about this restaurant, in one name.
    const spoken = (0, menu_v4_1.spokenLine)([
        name,
        cuisine,
        priceWords,
        stars?.label,
        etaText,
        feeText,
        openWord,
    ]);
    const inner = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: horizontal ? 'row' : 'column',
            gap: tokens.spacing.md,
            padding: horizontal ? tokens.spacing.md : 0,
            paddingBottom: tokens.spacing.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [media, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, minWidth: 0, paddingHorizontal: horizontal ? 0 : tokens.spacing.md }, children: body })] }));
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: containerStyle, children: inner(false) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: containerStyle, children: ({ pressed }) => inner(pressed) }));
}
//# sourceMappingURL=RestaurantCardV4.js.map