"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastCardV2 = PodcastCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * **PodcastCard — design V2 (hero).** A big square-artwork hero: full-bleed
 * cover artwork with a floating play affordance in the corner and a legibility
 * scrim, the show meta stacked below on an elevated (shadowed, borderless)
 * surface. Distinct at a glance from the classic bordered card. Same
 * `PodcastCardProps`; token-pure; a11y-complete.
 */
function PodcastCardV2({ podcast, subscribed = false, variant = 'grid', onPress, onSubscribeToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 8 });
    const press = (0, motion_1.usePressScale)(0.98);
    const featured = variant === 'featured';
    const meta = [
        podcast.publisher,
        podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
    ]
        .filter(Boolean)
        .join('  ·  ');
    const artwork = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', aspectRatio: 1, borderRadius: tokens.radius.lg, overflow: 'hidden' }, children: [podcast.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: podcast.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: '100%', height: '100%', backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF99", size: "3xl", color: "onAccent" }) })), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    height: '38%',
                    backgroundColor: (0, color_1.withAlpha)(tokens.ramps.neutral[900] ?? colors.onSurface, 0.28),
                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    right: tokens.spacing.sm,
                    bottom: tokens.spacing.sm,
                    width: 48,
                    height: 48,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    ...(0, elevation_1.shadow)('md', tokens),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u25B6", size: "lg", color: "onPrimary" }) })] }));
    const subscribeBtn = onSubscribeToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: subscribed ? 'secondary' : 'primary', size: "sm", onPress: () => onSubscribeToggle(!subscribed), accessibilityLabel: subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`, children: subscribed ? 'Subscribed' : 'Subscribe' })) : null;
    const card = ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { style: [
            {
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
                opacity: enter.opacity,
                transform: [...enter.transform, { scale: press.scale }],
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [artwork, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2, paddingHorizontal: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: podcast.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, featured && podcast.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            marginTop: tokens.spacing.xs,
                        }, children: podcast.description })) : null] }), subscribeBtn ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start', paddingHorizontal: tokens.spacing.xs }, children: subscribeBtn })) : null] }));
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: podcast.title, onPress: () => onPress(podcast), onPressIn: press.onPressIn, onPressOut: press.onPressOut, children: card }));
}
//# sourceMappingURL=PodcastCardV2.js.map