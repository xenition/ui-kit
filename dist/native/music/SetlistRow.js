"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetlistRow = SetlistRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A setlist row — one song in a performance / practice list, a UI shell only.
 * With a `song` it shows position, title, artist and a key/BPM/duration meta
 * line; with no `song` it renders a dimmed empty slot (so a fixed-length
 * setlist can show gaps). `playing` lights the row via a marker + weight, not
 * color alone. Tapping fires `onPress`; the optional play button fires
 * `onPlay`. Meta is guarded against missing fields. Token-only styling.
 */
function SetlistRow({ song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';
    if (song == null) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Position ${pos}, ${emptyLabel}`, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.sm,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    opacity: 0.55,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 20, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pos }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: emptyLabel })] }));
    }
    const meta = [];
    if (song.key)
        meta.push(song.key);
    if (song.bpm != null)
        meta.push(`${(0, types_1.formatBpm)(song.bpm)} BPM`);
    if (song.durationSec != null)
        meta.push((0, types_1.formatDuration)(song.durationSec));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`, accessibilityState: { selected: playing }, disabled: !onPress, onPress: () => onPress?.(song), style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: playing ? colors.primary : colors.border,
                backgroundColor: playing ? (0, types_1.withAlpha)(colors.primary, 0.12) : pressed ? (0, types_1.withAlpha)(colors.onSurface, 0.04) : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 20, alignItems: 'center' }, children: playing ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", accessibilityLabel: "Now playing" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pos })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: playing ? '700' : '600' }, children: song.title }), variant === 'full' && (song.artist || meta.length > 0) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [song.artist, ...meta].filter(Boolean).join('  ·  ') })) : null] }), onPlay ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${song.title}` : `Play ${song.title}`, accessibilityState: { selected: playing }, onPress: () => onPlay(song), style: ({ pressed }) => ({
                    width: 34,
                    height: 34,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, types_1.withAlpha)(colors.primary, playing ? 0.28 : 0.16),
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: "primary" }) })) : null] }));
}
//# sourceMappingURL=SetlistRow.js.map