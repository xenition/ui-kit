"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaylistRow = PlaylistRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A single track row for playlists / albums / queues — artwork (or a track
 * number), title + artist, a duration label, and an active-state indicator.
 * `onPress(track, index)` selects the row; an optional `onPlayToggle` renders a
 * trailing play/pause whose accessible label reflects `state`. When `active`,
 * the title is tinted `primary`. Token-only — no literal hex.
 */
function PlaylistRow({ track, index, active = false, state = 'paused', variant = 'standard', onPress, onPlayToggle, onMore, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const numbered = variant === 'numbered';
    const compact = variant === 'compact';
    const isPlaying = active && state === 'playing';
    const size = compact ? 40 : 48;
    const titleColor = active ? colors.primary : colors.onSurface;
    const lead = numbered ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 28, alignItems: 'center', justifyContent: 'center' }, children: active ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '▶' : '❙❙', size: "sm", color: "primary" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: index != null ? index + 1 : '—' })) })) : track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: size, height: size, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: size,
            height: size,
            borderRadius: tokens.radius.sm,
            backgroundColor: colors.accent,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onAccent" }) }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: active ? colors.border : 'transparent',
            },
            style,
        ], children: [lead, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: titleColor, fontSize: tokens.typography.scale.base, fontWeight: active ? '700' : '600' }, children: track.title }), track.artist && !compact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(track.duration) })) : null, onPlayToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: isPlaying ? `Pause ${track.title}` : `Play ${track.title}`, accessibilityState: { selected: isPlaying }, onPress: () => onPlayToggle(!isPlaying), hitSlop: 8, style: ({ pressed }) => ({ opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "primary" }) })) : null, onMore ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "More options", onPress: onMore, hitSlop: 8, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EF", size: "lg", color: "muted" }) })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: track.title, accessibilityState: { selected: active }, onPress: () => onPress(track, index), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=PlaylistRow.js.map