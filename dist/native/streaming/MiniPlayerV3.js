"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPlayerV3 = MiniPlayerV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * **MiniPlayer — design V3 (flat dock).** A square-cornered, shadowless bar
 * that reads as part of the chrome: a single hairline divider on top, a
 * square-cropped thumbnail, text, transport, and a full-bleed progress line
 * pinned to the very bottom edge. The play control's accessible label reflects
 * `state`. Same `MiniPlayerProps`; token-pure; a11y-complete.
 */
function MiniPlayerV3({ track, state = 'paused', progress = 0, onPlayToggle, onNext, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const frac = clamp01(progress);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderTopColor: colors.border,
                borderTopWidth: 1,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: 40, height: 40, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.sm,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), isBuffering ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 8, style: ({ pressed }) => ({
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !onPlayToggle ? 0.5 : pressed ? 0.6 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "lg", color: "primary" }) })), onNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: colors.border }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 2, width: `${frac * 100}%`, backgroundColor: colors.primary } }) })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Now playing: ${track.title}. Expand`, onPress: () => onPress(track), style: ({ pressed }) => ({ opacity: pressed ? 0.95 : 1 }), children: body }));
}
//# sourceMappingURL=MiniPlayerV3.js.map