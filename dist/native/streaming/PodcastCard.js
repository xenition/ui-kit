"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastCard = PodcastCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A podcast show card — artwork, title, publisher, episode count, and (in
 * `featured`) a description plus a subscribe button. `onPress(podcast)` opens
 * the show; `onSubscribeToggle(next)` flips the subscription, with the button
 * label + a11y reflecting `subscribed`. Composes `Card` / `Button`. Token-only
 * — no literal hex.
 */
function PodcastCard({ podcast, subscribed = false, variant = 'grid', onPress, onSubscribeToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const list = variant === 'list';
    const featured = variant === 'featured';
    const art = featured ? 120 : list ? 64 : 140;
    const meta = [
        podcast.publisher,
        podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
    ]
        .filter(Boolean)
        .join(' · ');
    const artwork = podcast.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: podcast.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: {
            width: list ? art : '100%',
            height: list ? art : undefined,
            aspectRatio: list ? undefined : 1,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.border,
        } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: list ? art : '100%',
            height: list ? art : undefined,
            aspectRatio: list ? undefined : 1,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF99", size: "2xl", color: "onAccent" }) }));
    const subscribeBtn = onSubscribeToggle ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: subscribed ? 'secondary' : 'primary', size: "sm", onPress: () => onSubscribeToggle(!subscribed), accessibilityLabel: subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`, children: subscribed ? 'Subscribed' : 'Subscribe' })) : null;
    const textBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: list ? 1 : undefined, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: podcast.title }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null, featured && podcast.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 3, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, marginTop: tokens.spacing.xs }, children: podcast.description })) : null, featured && subscribeBtn ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm, alignSelf: 'flex-start' }, children: subscribeBtn })) : null] }));
    const inner = list ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [artwork, textBlock, !featured && subscribeBtn ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: subscribeBtn }) : null] })) : featured ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: art }, children: artwork }), textBlock] })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm }, children: [artwork, textBlock, subscribeBtn ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignSelf: 'flex-start' }, children: subscribeBtn }) : null] }));
    const card = (0, jsx_runtime_1.jsx)(primitives_1.Card, { style: [{ gap: tokens.spacing.sm }, style], children: inner });
    if (!onPress)
        return card;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: podcast.title, onPress: () => onPress(podcast), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=PodcastCard.js.map