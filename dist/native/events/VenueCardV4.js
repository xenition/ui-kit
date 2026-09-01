"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VenueCardV4 = VenueCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const IconV4_1 = require("../primitives/IconV4");
const RatingV4_1 = require("../primitives/RatingV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const event_v4_1 = require("./internal/event-v4");
/** `Rating`'s own scale. A value outside it draws six filled stars out of five. */
const RATING_MAX = 5;
/**
 * **V4 venue card** — same props as {@link VenueCard} plus `directionsLabel`.
 *
 * ## Five changes
 *
 * 1. **Directions is reachable.** The outer `Pressable` is `accessible` by
 *    default and carried the venue name as its label, so VoiceOver flattened
 *    the card into one leaf and the Directions control did not exist for it —
 *    on a component whose entire point is getting someone to a place. The
 *    card's activation now wraps only the media and text, and Directions is
 *    its **sibling**. (The web twin loses the same control a different way:
 *    the card's `onKeyDown` cancels Enter's default action on the nested
 *    button, so pressing Enter on "Directions" opens the venue instead.)
 * 2. **Directions clears 44 and presses as a state layer**, where it was a
 *    bare text run that dimmed to `opacity: 0.6` — inside M3's disabled band.
 * 3. **The card announces what it shows** — address, rating, capacity and
 *    distance — where `accessibilityLabel={name}` replaced all of it.
 * 4. **The media placeholder survives dark mode.** It was
 *    `tokens.ramps.neutral[100]`, and the native ramps carry their light
 *    orientation in both schemes, so an unloaded venue photo was a near-white
 *    slab on a dark page.
 * 5. **`rating` is clamped** before it reaches `Rating`, which otherwise fills
 *    `Math.round(value)` glyphs and will happily draw seven out of five.
 *
 * **Renders nothing without a `name`.**
 */
function VenueCardV4({ name, address, distance, capacity, rating, imageUrl, imageAlt, directionsLabel = 'Directions', variant = 'default', onPress, onDirections, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (!name)
        return null;
    const isCompact = variant === 'compact';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const stars = typeof rating === 'number' && Number.isFinite(rating)
        ? Math.max(0, Math.min(RATING_MAX, rating))
        : null;
    const seatsLabel = typeof capacity === 'number' ? `Seats ${capacity}` : null;
    const containerStyle = [
        {
            overflow: 'hidden',
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            flexDirection: isCompact ? 'row' : 'column',
        },
        style,
    ];
    const media = !isCompact ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            height: tokens.spacing['2xl'] * 2 + tokens.spacing.lg,
            width: '100%',
            backgroundColor: (0, event_v4_1.placeholderGround)(theme),
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: imageAlt ?? name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: imageAlt != null, accessibilityLabel: imageAlt, style: { flex: 1, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDDFA\uFE0F", size: "2xl" }) })) })) : null;
    const summary = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.xs,
            padding: tokens.spacing.md,
            backgroundColor: pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent',
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 1, children: name }), address ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83D\uDCCD", size: "sm", color: "mutedText" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", numberOfLines: 1, style: { flex: 1 }, children: address })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    flexWrap: 'wrap',
                }, children: [stars != null ? (0, jsx_runtime_1.jsx)(RatingV4_1.RatingV4, { value: stars, size: "sm", showValue: true }) : null, seatsLabel ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: seatsLabel })) : null, distance ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numeric: "tabular", children: distance })) : null] })] }));
    const spoken = (0, event_v4_1.spokenLine)([
        name,
        address,
        stars != null ? `${stars} out of ${RATING_MAX}` : null,
        seatsLabel,
        distance,
    ]);
    const activation = onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: spoken, onPress: onPress, style: { flex: isCompact ? 1 : undefined }, children: ({ pressed }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: isCompact ? 'row' : 'column' }, children: [media, summary(pressed)] })) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: spoken, style: { flexDirection: isCompact ? 'row' : 'column', flex: isCompact ? 1 : undefined }, children: [media, summary(false)] }));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [containerStyle, { flexDirection: 'column' }], children: [activation, onDirections ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: (0, event_v4_1.spokenLine)([directionsLabel, name]), onPress: onDirections, style: ({ pressed }) => ({
                    alignSelf: 'flex-start',
                    justifyContent: 'center',
                    minHeight: tap,
                    marginHorizontal: tokens.spacing.md,
                    marginBottom: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    backgroundColor: pressed
                        ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                        : 'transparent',
                }), children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", style: { color: (0, event_v4_1.toneInk)(theme, 'primary') }, children: directionsLabel }) })) : null] }));
}
//# sourceMappingURL=VenueCardV4.js.map