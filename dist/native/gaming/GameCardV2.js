"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameCardV2 = GameCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const types_1 = require("./types");
/** Light star row drawn on a dark scrim; empty when unrated. */
function HeroStars({ rating, light }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (rating == null || !Number.isFinite(rating))
        return null;
    const filled = Math.round((0, types_1.clamp)(rating, 0, 5));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: 1 }, accessible: true, accessibilityLabel: `Rated ${filled} out of 5 stars`, children: [0, 1, 2, 3, 4].map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: i < filled ? colors.warn : (0, types_1.withAlpha)(light, 0.4), fontSize: tokens.typography.scale.sm }, children: "\u2605" }, i))) }));
}
/**
 * GameCard — design variant **V2**: a **full-bleed cover hero** with a centered
 * play overlay and the title / genre / rating laid over a bottom scrim. Where V1
 * is a media-top card with a separate body, V2 is one immersive key-art tile —
 * the cover fills the frame, a circular play control floats at the center, and
 * the facts sit on a dark gradient scrim. Same props as {@link GameCardProps};
 * only the layout differs. Token-only: the scrim is `withAlpha` of the neutral
 * ramp, overlay text is the lightest neutral step, the play control uses
 * `primary`.
 */
function GameCardV2({ game, loading = false, onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const scrim = (a) => (0, types_1.withAlpha)(tokens.ramps.neutral[900] ?? colors.onSurface, a);
    const light = tokens.ramps.neutral[50] ?? colors.onPrimary;
    const playLabel = `${game.installed ? 'Play' : 'Install'} ${game.title}`;
    const playOverlay = onPlay ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playLabel, accessibilityState: { disabled: loading }, disabled: loading, onPress: () => onPlay(game), style: {
                width: 64,
                height: 64,
                borderRadius: tokens.radius.full,
                backgroundColor: (0, types_1.withAlpha)(colors.primary, 0.92),
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 2,
                borderColor: (0, types_1.withAlpha)(light, 0.5),
            }, children: loading ? (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) : (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: game.installed ? '▶' : '⬇', size: "xl", color: "onPrimary" }) }) })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                aspectRatio: 3 / 4,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
                backgroundColor: tokens.ramps.neutral[200] ?? colors.border,
                justifyContent: 'flex-end',
            },
            style,
        ], children: [game.coverUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: game.coverUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFAE", size: "3xl", color: "onPrimary" }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '62%', backgroundColor: scrim(0.2) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '40%', backgroundColor: scrim(0.44) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '20%', backgroundColor: scrim(0.68) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.sm, left: tokens.spacing.sm, flexDirection: 'row', gap: tokens.spacing.xs }, children: [game.genre ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: game.genre })) : null, game.installed ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "success", variant: "soft", size: "sm", children: "Installed" })) : null] }), playOverlay, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.md, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: light, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: game.title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(HeroStars, { rating: game.rating, light: light }), game.price ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: light, fontSize: tokens.typography.scale.sm, fontWeight: '600', opacity: 0.9 }, children: game.installed ? 'Installed' : game.price })) : null] })] })] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: game.title, onPress: () => onPress(game), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: (0, elevation_1.shadow)('lg', tokens), children: body }) }));
}
//# sourceMappingURL=GameCardV2.js.map