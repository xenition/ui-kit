"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetronomeBar = MetronomeBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * A metronome / beat indicator — a UI shell only, it keeps no clock. Renders
 * `beatsPerBar` beat markers with the downbeat (beat 1) emphasized in size and
 * ring, and lights `currentBeat` via fill **and** scale (never color alone).
 * The optional transport toggle reports through `onToggle`; its state is in
 * the a11y `selected`/label. Token-only styling.
 */
function MetronomeBar({ beatsPerBar = 4, currentBeat, playing = false, bpm, variant = 'dots', disabled = false, onToggle, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const beats = (0, types_1.clamp)(Math.trunc(Number.isFinite(beatsPerBar) ? beatsPerBar : 4), 1, 16);
    const current = currentBeat == null ? 0 : (0, types_1.clamp)(Math.trunc(currentBeat), 0, beats);
    const isDots = variant === 'dots';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, style], children: [onToggle ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: playing ? 'Stop metronome' : 'Start metronome', accessibilityState: { selected: playing, disabled }, disabled: disabled, onPress: () => onToggle(!playing), style: ({ pressed }) => ({
                    width: 36,
                    height: 36,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: playing ? colors.primary : (0, types_1.withAlpha)(colors.primary, 0.16),
                    opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: playing ? '⏸' : '▶', size: "sm", color: playing ? 'onPrimary' : 'primary' }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: current > 0 ? `Beat ${current} of ${beats}${playing ? ', playing' : ''}` : `${beats} beats per bar`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }, children: Array.from({ length: beats }).map((_, i) => {
                    const beat = i + 1;
                    const downbeat = beat === 1;
                    const lit = playing && beat === current;
                    const base = isDots ? 10 : 14;
                    const size = lit ? base + 6 : downbeat ? base + 2 : base;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: isDots ? size : Math.max(6, size - 6),
                            height: isDots ? size : size + 8,
                            borderRadius: isDots ? tokens.radius.full : tokens.radius.sm,
                            borderWidth: downbeat ? 2 : 0,
                            borderColor: colors.accent,
                            backgroundColor: lit ? colors.primary : downbeat ? (0, types_1.withAlpha)(colors.primary, 0.3) : colors.border,
                        } }, beat));
                }) }), bpm != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [Math.round(bpm), " BPM"] })) : null] }));
}
//# sourceMappingURL=MetronomeBar.js.map