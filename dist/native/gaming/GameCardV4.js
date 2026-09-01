"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCardV4 = GameCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const BadgeV4_1 = require("../primitives/BadgeV4");
const ButtonV4_1 = require("../primitives/ButtonV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const tone_v4_1 = require("../primitives/internal/tone-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
/**
 * **V4 game card** — same props as {@link GameCard} plus `playLabel` and
 * `installLabel`.
 *
 * ## Five changes
 *
 * 1. **Play is reachable, and it is a sibling of the card's activation.** The
 *    base wrapped the whole card — Play included — in a `Pressable` that is
 *    `accessible` by default and carried `accessibilityLabel={game.title}`, so
 *    VoiceOver flattened the card to one leaf and there was no gesture that
 *    installed or launched a game. (The web twin fails the same moment through
 *    the other door: Enter on Play fires both handlers and Space fires only the
 *    card's, because the card's bubbled keydown `preventDefault()`s the
 *    button's own activation.) The activation now wraps the cover and the meta
 *    only; the button sits beside it.
 * 2. **The card announces what it shows** — title, genre, price or installed
 *    state, and the rating — where the base's name was the title and nothing
 *    else, and the star row was a second, wordless stop.
 * 3. **A genre is identity, not a status.** It was `accent` here and `primary`
 *    on web, so the same genre was two colours across the product and a
 *    category was wearing a slot that should mean something happened. It is a
 *    neutral chip on both twins now.
 * 4. **A missing cover is a placeholder, not a brand-filled tile.** The base
 *    painted it `colors.primary` and the loaded `Image`'s ground `colors.border`
 *    — the hairline token used as a fill. Both are now the module's opaque
 *    placeholder ground, which is mixed from the card and so survives dark
 *    mode.
 * 5. **A press is a state layer** on the activation region, not
 *    `opacity: 0.9` on the whole card — 0.38 is M3's *disabled* band, so
 *    dimming a pressed card makes it read as unavailable.
 */
function GameCardV4({ game, variant = 'grid', loading = false, playLabel = 'Play', installLabel = 'Install', onPress, onPlay, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const list = variant === 'list';
    const featured = variant === 'featured';
    const tap = (0, chrome_v4_1.minTap)(tokens.spacing);
    const art = tokens.spacing['2xl'] + tokens.spacing.lg;
    /** The card's pressed state layer, or nothing — never a dimmed content. */
    const pressGround = (pressed) => pressed ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard) : 'transparent';
    const rating = (0, tone_v4_1.ratingParts)({ value: game.rating, max: 5 });
    const rated = game.rating != null && Number.isFinite(game.rating);
    const actionText = game.installed ? playLabel : (game.price ?? installLabel);
    const coverStyle = {
        width: list ? art : '100%',
        height: list ? art : undefined,
        aspectRatio: list ? undefined : featured ? 16 / 9 : 3 / 4,
        borderRadius: tokens.radius.md,
        backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
        overflow: 'hidden',
        alignItems: 'center',
        justifyContent: 'center',
    };
    const cover = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: coverStyle, children: game.coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: game.coverUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDFAE", size: "2xl", color: "onCard" })) }));
    const meta = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: list ? 1 : undefined, minWidth: 0, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numberOfLines: 2, children: game.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    flexWrap: 'wrap',
                }, children: [game.genre ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: arcade_v4_1.IDENTITY_TONE, children: game.genre })) : null, game.installed ? ((0, jsx_runtime_1.jsx)(BadgeV4_1.BadgeV4, { ...arcade_v4_1.BADGE_V4, tone: "success", children: "Installed" })) : null] }), rated ? (
            // The glyphs repeat the name's "4 out of 5"; five loose stars is not a
            // number, and reading them one by one is noise.
            (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { flexDirection: 'row', gap: tokens.spacing.xs / 2 }, children: [0, 1, 2, 3, 4].map((i) => ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", style: { color: i < rating.filled ? colors.warnText : colors.mutedText }, children: "\u2605" }, i))) })) : null] }));
    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: list
            ? {
                flex: 1,
                minWidth: 0,
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: pressGround(pressed),
            }
            : {
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: pressGround(pressed),
            }, children: [cover, meta] }));
    const name = (0, arcade_v4_1.spokenLine)([
        game.title,
        game.genre,
        game.installed ? 'Installed' : game.price,
        rated ? rating.label : null,
    ]);
    const activation = onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onPress(game), style: list ? { flex: 1, minWidth: 0 } : undefined, children: ({ pressed }) => body(pressed) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, style: list ? { flex: 1, minWidth: 0 } : undefined, children: body(false) }));
    // Change 1: a sibling of the activation, never a descendant of it.
    const action = onPlay ? ((0, jsx_runtime_1.jsx)(ButtonV4_1.ButtonV4, { variant: game.installed ? 'secondary' : 'primary', size: "sm", loading: loading, onPress: () => onPlay(game), accessibilityLabel: (0, arcade_v4_1.spokenLine)([game.installed ? playLabel : installLabel, game.title]), style: { minHeight: tap }, children: actionText })) : null;
    const containerStyle = [
        {
            gap: tokens.spacing.sm,
            padding: tokens.spacing.lg,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
        },
        style,
    ];
    if (list) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [activation, action] }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: containerStyle, children: [activation, action ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: featured ? 'stretch' : 'flex-start' }, children: action })) : null] }));
}
//# sourceMappingURL=GameCardV4.js.map