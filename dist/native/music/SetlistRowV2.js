"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SetlistRowV2 = SetlistRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const elevation_1 = require("../primitives/internal/elevation");
const types_1 = require("./types");
/**
 * SetlistRow, redesigned (v2): an **elevated card** with an artwork tile (a
 * token-tinted square carrying the song's initial, or a ♪ for an empty slot), a
 * title / artist block, a duration `Badge`, and a drag handle. `playing` lights
 * the card with a marker + weight (never color alone) and springs on press. An
 * empty slot renders the same card, dashed and dimmed. Tapping fires `onPress`;
 * the optional play button fires `onPlay`. Meta is guarded. Token-only styling.
 * Distinct at a glance from v1's flat line. Same props.
 */
function SetlistRowV2({ song, index, playing = false, variant = 'full', emptyLabel = 'Empty slot', onPress, onPlay, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)(0.98);
    const pos = index != null && Number.isFinite(index) ? String(Math.trunc(index)) : '–';
    if (song == null) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: `Position ${pos}, ${emptyLabel}`, style: [
                {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    padding: tokens.spacing.sm,
                    borderRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderStyle: 'dashed',
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                    opacity: 0.6,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 48,
                        height: 48,
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, types_1.withAlpha)(colors.onSurface, 0.06),
                    }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "lg", color: "muted" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm, fontStyle: 'italic' }, children: emptyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: pos })] }));
    }
    const initial = song.title.trim().charAt(0).toUpperCase() || '♪';
    const meta = [];
    if (song.key)
        meta.push(song.key);
    if (song.bpm != null)
        meta.push(`${(0, types_1.formatBpm)(song.bpm)} BPM`);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: playing ? 1.5 : 0,
                borderColor: playing ? colors.primary : 'transparent',
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 48,
                    height: 48,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, types_1.withAlpha)(colors.primary, playing ? 0.24 : 0.12),
                }, children: playing ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u266A", size: "lg", color: "primary", accessibilityLabel: "Now playing" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: initial })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: playing ? '800' : '700' }, children: song.title }), variant === 'full' && (song.artist || meta.length > 0) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [song.artist, ...meta].filter(Boolean).join('  ·  ') })) : null] }), song.durationSec != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", size: "sm", children: (0, types_1.formatDuration)(song.durationSec) })) : null, onPlay ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? `Pause ${song.title}` : `Play ${song.title}`, accessibilityState: { selected: playing }, onPress: () => onPlay(song), style: ({ pressed }) => ({
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, types_1.withAlpha)(colors.primary, playing ? 0.28 : 0.16),
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: "primary" }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { importantForAccessibility: "no", accessibilityElementsHidden: true, style: { paddingLeft: 2 }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u22EE\u22EE", size: "base", color: "muted" }) })] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Position ${pos}, ${song.title}${song.artist ? `, ${song.artist}` : ''}${playing ? ', playing' : ''}`, accessibilityState: { selected: playing }, onPress: () => onPress(song), onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.95 : 1 }), children: body }) }));
}
//# sourceMappingURL=SetlistRowV2.js.map