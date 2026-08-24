"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRowV2 = PodcastRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
/**
 * PodcastRow — **artwork-forward player card** alternate design.
 *
 * Large square artwork with the play/pause control overlaid at its center on a
 * scrim, title + show stacked to the right, and the duration shown as a tinted
 * pill. A "now playing" feel versus the v1 list row with a tiny trailing button.
 * Same props as {@link PodcastRow}, so it is a drop-in swap.
 *
 * Token-pure: elevation via the shared `shadow()`, the play scrim via
 * `withAlpha(ramps.neutral[900], …)`, the duration pill via
 * `withAlpha(colors.primary, …)`. No literal colors.
 */
function PodcastRowV2({ episode, playing = false, onPlayToggle, onPress, variant = 'standard', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const art = variant === 'compact' ? 64 : 84;
    const scrimHex = tokens.ramps.neutral[900] ?? tokens.ramps.neutral[800] ?? colors.onSurface;
    const playButton = ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${episode.title}` : `Play ${episode.title}`, accessibilityState: { selected: playing }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!playing) : undefined, hitSlop: 8, style: ({ pressed }) => ({
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: (0, color_1.withAlpha)(scrimHex, playing ? 0.28 : 0.4),
            opacity: !onPlayToggle ? 0.6 : pressed ? 0.85 : 1,
        }), children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: 40,
                height: 40,
                borderRadius: tokens.radius.full,
                backgroundColor: colors.primary,
                alignItems: 'center',
                justifyContent: 'center',
                ...(0, elevation_1.shadow)('sm', tokens),
            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) }) }));
    const artwork = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: art, height: art, borderRadius: tokens.radius.md, overflow: 'hidden' }, children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: episode.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: '100%', height: '100%', backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: '100%',
                    height: '100%',
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFA7", size: "xl", color: "onAccent" }) })), playButton] }));
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [artwork, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '800',
                            lineHeight: tokens.typography.scale.base * 1.25,
                        }, children: episode.title }), episode.show ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: episode.show })) : null, episode.duration ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: 2,
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: episode.duration }) })) : null] })] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.92 : 1 }), children: inner }));
}
//# sourceMappingURL=PodcastRowV2.js.map