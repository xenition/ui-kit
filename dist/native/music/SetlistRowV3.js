"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetlistRowV3 = SetlistRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * SetlistRow, redesigned (v3): a **dense numbered playlist line** — a fixed
 * position number, the title with an inline muted artist, and a right-aligned
 * duration, all on one tight row with no card chrome. `playing` swaps the
 * number for a ♪ marker and bolds the title (never color alone). An empty slot
 * dims to a placeholder line. Tapping fires `onPress`; the optional play button
 * fires `onPlay`. Token-only styling. Distinct at a glance from v1. Same props.
 */
function SetlistRowV3({ song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';
    if (song == null) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Position ${pos}, ${emptyLabel}`, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: 6,
                    paddingHorizontal: tokens.spacing.xs,
                    opacity: 0.5,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 22, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pos }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: emptyLabel })] }));
    }
    const showArtist = variant === 'full' && !!song.artist;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`, accessibilityState: { selected: playing }, disabled: !onPress, onPress: () => onPress?.(song), style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: 6,
                paddingHorizontal: tokens.spacing.xs,
                borderRadius: tokens.radius.sm,
                backgroundColor: playing
                    ? (0, types_1.withAlpha)(colors.primary, 0.1)
                    : pressed
                        ? (0, types_1.withAlpha)(colors.onSurface, 0.04)
                        : 'transparent',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 22, alignItems: 'center' }, children: playing ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", accessibilityLabel: "Now playing" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: pos })) }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: playing ? '800' : '600' }, children: [song.title, showArtist ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontWeight: '400' }, children: `  ${song.artist}` })) : null] }), song.durationSec != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', fontVariant: ['tabular-nums'] }, children: (0, types_1.formatDuration)(song.durationSec) })) : null, onPlay ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${song.title}` : `Play ${song.title}`, accessibilityState: { selected: playing }, onPress: () => onPlay(song), style: ({ pressed }) => ({ paddingHorizontal: 4, opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: "primary" }) })) : null] }));
}
//# sourceMappingURL=SetlistRowV3.js.map