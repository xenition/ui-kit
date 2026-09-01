"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiniPlayerV4 = MiniPlayerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const clamp01 = (n) => (n < 0 ? 0 : n > 1 ? 1 : n);
/**
 * MiniPlayer — **V4** "spotlight" design. The compact docked bar in the
 * artwork-forward line: a small rounded artwork thumb, title/artist, and a big
 * round **primary** play button (filled, `onPrimary` glyph) — the one accent. A
 * thin `primary` progress line rides the top edge over a soft-`primary` track.
 * The surface stays clean (no big gradient — reserved for the artwork-hero
 * moments). Same props/behavior as {@link MiniPlayerProps}; token-only colors
 * via `useXenitionTheme()`. `variant="floating"` rounds/insets the bar.
 */
function MiniPlayerV4({ track, state = 'paused', progress = 0, variant = 'bar', onPlayToggle, onNext, onPress, style, }) {
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
                borderRadius: floating ? tokens.radius.lg : tokens.radius.lg,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                overflow: 'hidden',
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 10,
                shadowOffset: { width: 0, height: 4 },
                elevation: 3,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.18),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        height: 3,
                        width: `${frac * 100}%`,
                        backgroundColor: colors.primary,
                    } }) }), track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: 44, height: 44, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onAccent" }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), isBuffering ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, { size: "sm" }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? 'Pause' : 'Play', accessibilityState: { selected: isPlaying }, disabled: !onPlayToggle, onPress: onPlayToggle ? () => onPlayToggle(!isPlaying) : undefined, hitSlop: 8, style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: !onPlayToggle ? 0.5 : pressed ? 0.7 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "sm", color: "onPrimary" }) })), onNext ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u23ED", size: "lg", color: "onSurface" }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Now playing: ${track.title}. Expand`, onPress: () => onPress(track), style: ({ pressed }) => ({ opacity: pressed ? 0.95 : 1 }), children: body }));
}
//# sourceMappingURL=MiniPlayerV4.js.map