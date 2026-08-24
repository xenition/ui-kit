"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PodcastRow = PodcastRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A podcast / audio episode row — artwork, title, show, duration, and a
 * play/pause control. The play button is controlled via `playing` +
 * `onPlayToggle(next)`; tapping the rest of the row fires `onPress(episode)`.
 * Two variants (`standard` / `compact`). All colors come from `SemanticColors`;
 * no literal hex.
 */
function PodcastRow({ episode, playing = false, onPlayToggle, onPress, variant = 'standard', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const art = compact ? 44 : 64;
    const meta = [episode.show, episode.duration].filter(Boolean).join('  ·  ');
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.sm,
            },
            style,
        ], children: [episode.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: episode.artworkUrl }, accessibilityIgnoresInvertColors: true, style: { width: art, height: art, borderRadius: tokens.radius.md, backgroundColor: colors.border }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: art,
                    height: art,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFA7", size: "lg", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: episode.title }), !compact && meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${episode.title}` : `Play ${episode.title}`, accessibilityState: { selected: playing }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!playing) : undefined, hitSlop: 8, style: ({ pressed }) => ({
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })] }));
    if (!onPress)
        return inner;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: episode.title, onPress: () => onPress(episode), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: inner }));
}
//# sourceMappingURL=PodcastRow.js.map