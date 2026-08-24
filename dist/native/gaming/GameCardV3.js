"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCardV3 = GameCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
/** Inline star row; empty when unrated. */
function StarRow({ rating }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (rating == null || !Number.isFinite(rating))
        return null;
    const filled = Math.round((0, types_1.clamp)(rating, 0, 5));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 1 }, accessible: true, accessibilityLabel: `Rated ${filled} out of 5 stars`, children: [0, 1, 2, 3, 4].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: i < filled ? colors.warn : colors.border, fontSize: tokens.typography.scale.xs }, children: "\u2605" }, i))) }));
}
/**
 * GameCard — design variant **V3**: a **horizontal cover-left row**. A compact
 * square of key art on the left, the title / genre / rating stacked in the
 * middle, and the Play / Install control pinned to the right — a dense library
 * list line rather than V1's boxed tile or V2's hero. Same props as
 * {@link GameCardProps}; the action label + a11y still bind to `game.installed`.
 * Token-only, elevated surface (no border).
 */
function GameCardV3({ game, loading = false, onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 6 });
    const art = 64;
    const cover = game.coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: game.coverUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: art,
            height: art,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.primary,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFAE", size: "xl", color: "onPrimary" }) }));
    const action = onPlay ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: game.installed ? 'secondary' : 'primary', size: "sm", loading: loading, onPress: () => onPlay(game), accessibilityLabel: `${game.installed ? 'Play' : 'Install'} ${game.title}`, children: game.installed ? 'Play' : game.price ?? 'Install' })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
                ...(0, elevation_1.shadow)('sm', tokens),
            },
            style,
        ], children: [cover, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: game.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [game.genre ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: game.genre })) : null, game.installed ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "Installed" })) : null] }), (0, jsx_runtime_1.jsx)(StarRow, { rating: game.rating })] }), action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: game.title, onPress: () => onPress(game), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: body }) }));
}
//# sourceMappingURL=GameCardV3.js.map