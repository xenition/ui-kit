"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueueListV4 = QueueListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const types_1 = require("./types");
/**
 * QueueList — **V4** "spotlight" design. An ordered now/next queue of calm surface
 * rows: each row is a small rounded artwork plus title/artist, with a trailing
 * duration and a per-row remove affordance. The row matching `nowPlayingId` gets
 * a soft-`primary` tint and a leading **primary** now-playing glyph (the one
 * accent), announced via `accessibilityState.selected`. Rows are clean surface
 * (no gradient — that is reserved for the artwork-hero moments); tap targets are
 * ≥44px. When `tracks` is empty it renders an `EmptyState`. Same props/behavior
 * as {@link QueueListProps}; token-only colors via `useXenitionTheme()`.
 */
function QueueListV4({ tracks, nowPlayingId, state = 'paused', title = 'Up Next', rowVariant: _rowVariant = 'standard', onSelect, onRemove, emptyLabel = 'Your queue is empty', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (tracks.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: (0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDFB5", size: "2xl", color: "muted", accessibilityLabel: "Queue" }), title: emptyLabel, description: "Add songs to build up your queue." }) }));
    }
    const tint = (0, color_1.withAlpha)(colors.primary, 0.1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '700',
                    letterSpacing: 0.5,
                    textTransform: 'uppercase',
                    paddingHorizontal: tokens.spacing.sm,
                    marginBottom: tokens.spacing.xs,
                }, children: title })) : null, tracks.map((track, index) => {
                const active = nowPlayingId != null && track.id === nowPlayingId;
                const isPlaying = active && state === 'playing';
                const lead = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 44, height: 44 }, children: [track.artworkUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: track.artworkUrl }, accessibilityIgnoresInvertColors: true, resizeMode: "cover", style: { width: 44, height: 44, borderRadius: tokens.radius.sm, backgroundColor: colors.border } })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: colors.accent,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "base", color: "onAccent" }) })), active ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14),
                                alignItems: 'center',
                                justifyContent: 'center',
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isPlaying ? '❙❙' : '▶', size: "base", color: "primary" }) })) : null] }));
                const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: tokens.spacing.md,
                        minHeight: 44,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        backgroundColor: active ? tint : 'transparent',
                    }, children: [lead, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                        color: active ? colors.primary : colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: active ? '700' : '600',
                                    }, children: track.title }), track.artist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: track.artist })) : null] }), track.duration != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: (0, types_1.formatTime)(track.duration) })) : null, onRemove ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Remove ${track.title}`, onPress: () => onRemove(track, index), hitSlop: 8, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: pressed ? 0.6 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EF", size: "lg", color: "muted" }) })) : null] }));
                if (!onSelect)
                    return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: row }, track.id);
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: track.title, accessibilityState: { selected: active }, onPress: () => onSelect(track, index), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: row }, track.id));
            })] }));
}
//# sourceMappingURL=QueueListV4.js.map