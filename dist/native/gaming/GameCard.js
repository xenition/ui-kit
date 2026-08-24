"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCard = GameCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/** Render up to 5 star glyphs for a `[0,5]` rating; empty when unrated. */
function Stars({ rating }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (rating == null || !Number.isFinite(rating))
        return null;
    const filled = Math.round((0, types_1.clamp)(rating, 0, 5));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 1 }, accessible: true, accessibilityLabel: `Rated ${filled} out of 5 stars`, children: [0, 1, 2, 3, 4].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: i < filled ? colors.warn : colors.border, fontSize: tokens.typography.scale.sm }, children: "\u2605" }, i))) }));
}
/**
 * A game / store title card — key art, title, genre, star rating, and a
 * Play/Install action. `onPress(game)` opens the title; `onPlay(game)` runs the
 * primary action with its label bound to `game.installed`. Composes `Card`,
 * `Button`, `Badge`. Token-only — no literal hex.
 */
function GameCard({ game, variant = 'grid', loading = false, onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const list = variant === 'list';
    const featured = variant === 'featured';
    const art = list ? 72 : featured ? 132 : 148;
    const cover = game.coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: game.coverUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: {
            width: list ? art : '100%',
            height: list ? art : undefined,
            aspectRatio: list ? undefined : featured ? 16 / 9 : 3 / 4,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.border,
        } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: list ? art : '100%',
            height: list ? art : undefined,
            aspectRatio: list ? undefined : featured ? 16 / 9 : 3 / 4,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFAE", size: "2xl", color: "onPrimary" }) }));
    const action = onPlay ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: game.installed ? 'secondary' : 'primary', size: "sm", loading: loading, onPress: () => onPlay(game), accessibilityLabel: `${game.installed ? 'Play' : 'Install'} ${game.title}`, children: game.installed ? 'Play' : game.price ?? 'Install' })) : null;
    const meta = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: list ? 1 : undefined, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: game.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [game.genre ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: game.genre })) : null, game.installed ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "Installed" })) : null] }), (0, jsx_runtime_1.jsx)(Stars, { rating: game.rating })] }));
    const inner = list ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [cover, meta, action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [cover, meta, action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: featured ? 'stretch' : 'flex-start' }, children: action }) : null] }));
    const card = ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: featured ? 'elevated' : 'outlined', style: [{ gap: tokens.spacing.sm }, style], children: inner }));
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: game.title, onPress: () => onPress(game), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=GameCard.js.map