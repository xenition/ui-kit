"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastCardV3 = PodcastCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * **PodcastCard — design V3 (horizontal shelf row).** Artwork on the left,
 * meta on the right, laid out as a single low-profile line with a soft
 * primary-tinted fill and a hairline — the "browse list" counterpart to the
 * V2 hero. Same `PodcastCardProps`; token-pure; a11y-complete.
 */
function PodcastCardV3({ podcast, subscribed = false, variant = 'grid', onPress, onSubscribeToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const featured = variant === 'featured';
    const art = featured ? 88 : 64;
    const meta = [
        podcast.publisher,
        podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
    ]
        .filter(Boolean)
        .join('  ·  ');
    const artwork = podcast.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: podcast.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: art,
            height: art,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF99", size: "xl", color: "onAccent" }) }));
    const subscribeBtn = onSubscribeToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: subscribed ? 'secondary' : 'primary', size: "sm", onPress: () => onSubscribeToggle(!subscribed), accessibilityLabel: subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`, children: subscribed ? 'Subscribed' : 'Subscribe' })) : null;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.06),
                borderColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
            },
            style,
        ], children: [artwork, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: podcast.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, featured && podcast.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: podcast.description })) : null, featured && subscribeBtn ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs, alignSelf: 'flex-start' }, children: subscribeBtn })) : null] }), !featured && subscribeBtn ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: subscribeBtn }) : null] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: podcast.title, onPress: () => onPress(podcast), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=PodcastCardV3.js.map