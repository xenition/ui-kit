"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetlistRowV4 = SetlistRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * SetlistRow — **V4** "session" design. The tactile DAW take on a setlist row: a
 * rounded control surface where the playing row lights with a soft-primary fill,
 * a primary border, a leading `♪` marker and a left accent bar (never color
 * alone), the title reads bold, and the key/BPM/duration meta sits on one line.
 * Honors both `variant`s (`full` / `compact`) and the empty-slot state, identical
 * props/behavior to {@link SetlistRowProps}. The optional play button is a
 * satisfying ≥44px round control. Token-only colors via `useXenitionTheme()`.
 */
function SetlistRowV4({ song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';
    if (song == null) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Position ${pos}, ${emptyLabel}`, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    padding: tokens.spacing.sm,
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
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`, accessibilityState: { selected: playing }, disabled: !onPress, onPress: () => onPress?.(song), style: ({ pressed }) => ({
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    paddingVertical: tokens.spacing.sm,
                    paddingRight: tokens.spacing.sm,
                    paddingLeft: tokens.spacing.md,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    overflow: 'hidden',
                    borderColor: playing ? colors.primary : colors.border,
                    backgroundColor: playing ? (0, types_1.withAlpha)(colors.primary, 0.12) : pressed ? (0, types_1.withAlpha)(colors.onSurface, 0.04) : colors.surface,
                }), children: [playing ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, top: 4, bottom: 4, width: 4, borderRadius: tokens.radius.full, backgroundColor: colors.primary } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 20, alignItems: 'center' }, children: playing ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "sm", color: "primary", accessibilityLabel: "Now playing" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pos })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: playing ? '700' : '600' }, children: song.title }), variant === 'full' && (song.artist || meta.length > 0) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [song.artist, ...meta].filter(Boolean).join('  ·  ') })) : null] })] }), onPlay ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${song.title}` : `Play ${song.title}`, accessibilityState: { selected: playing }, onPress: () => onPlay(song), style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: playing ? colors.primary : (0, types_1.withAlpha)(colors.primary, 0.16),
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: playing ? 'onPrimary' : 'primary' }) })) : null] }));
}
//# sourceMappingURL=SetlistRowV4.js.map