"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRowV3 = PodcastRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * PodcastRow — **minimal playlist line** alternate design.
 *
 * A borderless, hairline-separated line: a tiny rounded artwork, a single-line
 * title with the show beneath, the duration right-aligned, and a compact
 * text-glyph play control. Built for dense episode lists rather than the v1
 * bordered card. Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: the divider is `colors.border`, the active play glyph is
 * `colors.primary` (muted when idle). No literal colors.
 */
function PodcastRowV3({ episode, playing = false, onPlayToggle, onPress, variant = 'standard', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const art = variant === 'compact' ? 36 : 44;
    const play = ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${episode.title}` : `Play ${episode.title}`, accessibilityState: { selected: playing }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!playing) : undefined, hitSlop: 8, style: ({ pressed }) => ({
            width: 32,
            height: 32,
            borderRadius: tokens.radius.full,
            alignItems: 'center',
            justifyContent: 'center',
            opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1,
        }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '❙❙' : '▶', size: "sm", color: playing ? 'primary' : 'muted' }) }));
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ paddingVertical: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: episode.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: art, height: art, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: art,
                            height: art,
                            borderRadius: tokens.radius.sm,
                            backgroundColor: colors.accent,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFA7", size: "sm", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: episode.title }), episode.show ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: episode.show })) : null] }), episode.duration ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: episode.duration })) : null, play] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border, marginTop: tokens.spacing.xs } })] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=PodcastRowV3.js.map