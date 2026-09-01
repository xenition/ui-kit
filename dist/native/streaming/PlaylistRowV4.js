"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistRowV4 = PlaylistRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const types_1 = require("./types");
/**
 * PlaylistRow — **V4** "spotlight" design. A calm, clean-surface playlist entry:
 * a rounded cover thumb, title + artist, a trailing duration, and — when
 * `onPlayToggle` is set — a big round **primary** play/pause affordance (the one
 * accent, ≥44px). `onPress(track, index)` selects the row with a soft-`primary`
 * press tint; when `active` the title tints `primary` and the artwork shows a
 * leading now-playing glyph, announced via `accessibilityState.selected`. The
 * `numbered` variant swaps the artwork for a track number. Same props/behavior as
 * {@link PlaylistRowProps}; token-only colors via `useXenitionTheme()`.
 */
function PlaylistRowV4({ track, index, active = false, state = 'paused', variant = 'standard', onPress, onPlayToggle, onMore, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const numbered = variant === 'numbered';
    const compact = variant === 'compact';
    const isPlaying = active && state === 'playing';
    const size = compact ? 44 : 48;
    const titleColor = active ? colors.primary : colors.onSurface;
    const lead = numbered ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, alignItems: 'center', justifyContent: 'center' }, children: active ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "sm", color: "primary" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: index != null ? index + 1 : '—' })) })) : ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: size, height: size }, children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: size, height: size, borderRadius: tokens.radius.md, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: size,
                    height: size,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onAccent" }) })), active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "primary" }) })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                minHeight: 44,
                paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: active ? (0, color_1.withAlpha)(colors.primary, 0.1) : 'transparent',
            },
            style,
        ], children: [lead, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: titleColor, fontSize: tokens.typography.scale.base, fontWeight: active ? '700' : '600' }, children: track.title }), track.artist && !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(track.duration) })) : null, onPlayToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? `Pause ${track.title}` : `Play ${track.title}`, accessibilityState: { selected: isPlaying }, onPress: () => onPlayToggle(!isPlaying), hitSlop: 8, style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.full,
                    backgroundColor: colors.primary,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "onPrimary" }) })) : null, onMore ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More options", onPress: onMore, hitSlop: 8, style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: pressed ? 0.6 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EF", size: "lg", color: "muted" }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: track.title, accessibilityState: { selected: active }, onPress: () => onPress(track, index), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=PlaylistRowV4.js.map