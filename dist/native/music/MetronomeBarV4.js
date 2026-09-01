"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetronomeBarV4 = MetronomeBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * MetronomeBar — **V4** "session" design (native parity of the web V4). The
 * tactile beat strip: `beatsPerBar` cells sit on a rounded token surface, each
 * 44px tall in the `bars` variant / a chunky dot in `dots`. The downbeat
 * (beat 1) is emphasized with an accent ring, and the `currentBeat` lights via
 * a primary fill **and** an inset marker dot (never color alone) — only while
 * `playing`. The optional transport toggle reports through `onToggle`; state is
 * in the a11y `selected`/label. The optional `bpm` shows in bold tabular
 * numerals. No gradient — clean/tactile. Token-only colors via
 * `useXenitionTheme()`.
 */
function MetronomeBarV4({ beatsPerBar = 4, currentBeat, playing = false, bpm, variant = 'dots', disabled = false, onToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const beats = (0, types_1.clamp)(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
    const current = currentBeat == null ? 0 : (0, types_1.clamp)(Math.trunc(currentBeat), 0, beats);
    const isDots = variant === 'dots';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [onToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? 'Stop metronome' : 'Start metronome', accessibilityState: { selected: playing, disabled }, disabled: disabled, onPress: () => onToggle(!playing), style: ({ pressed }) => ({
                    width: 44,
                    height: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: playing ? colors.primary : (0, types_1.withAlpha)(colors.primary, 0.16),
                    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: playing ? 'onPrimary' : 'primary' }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`, style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: tokens.spacing.xs, flex: 1 }, children: Array.from({ length: beats }).map((_, i) => {
                    const beat = i + 1;
                    const downbeat = beat === 1;
                    const lit = playing && beat === current;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: isDots ? (lit ? 22 : downbeat ? 18 : 14) : lit ? 16 : 12,
                            height: isDots ? (lit ? 22 : downbeat ? 18 : 14) : 44,
                            borderRadius: isDots ? tokens.radius.full : tokens.radius.sm,
                            borderWidth: downbeat ? 2 : 0,
                            borderColor: colors.accent,
                            backgroundColor: lit ? colors.primary : downbeat ? (0, types_1.withAlpha)(colors.primary, 0.3) : colors.border,
                        }, children: lit ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: tokens.radius.full, backgroundColor: colors.onPrimary } })) : null }, beat));
                }) }), bpm != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [Math.round(bpm), " BPM"] })) : null] }));
}
//# sourceMappingURL=MetronomeBarV4.js.map