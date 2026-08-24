"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPlayer = MiniPlayer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * A docked **mini player** bar — the collapsed now-playing surface that sits
 * above a tab bar. UI shell only: `onPlayToggle(next)` / `onNext` report intent
 * and `onPress` expands to the full player. A thin `primary` progress line rides
 * the top edge. The play control's accessible label reflects `state`.
 * Token-only — no literal hex.
 */
function MiniPlayer({ track, state = 'paused', progress = 0, variant = 'bar', onPlayToggle, onNext, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const isPlaying = state === 'playing';
    const isBuffering = state === 'buffering';
    const floating = variant === 'floating';
    const frac = clamp01(progress);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: floating ? tokens.radius.lg : tokens.radius.sm,
                paddingVertical: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    backgroundColor: colors.border,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 2,
                        width: `${frac * 100}%`,
                        backgroundColor: colors.primary,
                    } }) }), track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: 40, height: 40, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
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
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "lg", color: "primary" }) })), onNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Now playing: ${track.title}. Expand`, onPress: () => onPress(track), style: ({ pressed }) => ({ opacity: pressed ? 0.95 : 1 }), children: body }));
}
//# sourceMappingURL=MiniPlayer.js.map