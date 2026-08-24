"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SamplePad = SamplePad;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const WaveformEditor_1 = require("./WaveformEditor");
const types_1 = require("./types");
/**
 * A single sample trigger pad — a UI shell only, it plays no audio. When
 * `name` is set it shows the sample (glyph + name, an inline mini-`Waveform`
 * in the `row` variant) and fires `onPress(name)` on a hit; when `name` is
 * omitted it renders a dimmed "empty" slot. `playing` lights the pad and adds
 * a non-color dot; `loading` swaps in a `Spinner` and blocks presses. Accent
 * comes from a semantic token slot; no literal colors.
 */
function SamplePad({ name, detail, glyph = '♪', peaks, color, index = 0, variant = 'tile', playing = false, loading = false, disabled = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const accentKey = color ?? (0, types_1.padAccentKey)(index);
    const accent = colors[accentKey];
    const isEmpty = name == null || name.length === 0;
    const isRow = variant === 'row';
    const blocked = isEmpty || loading || disabled;
    const stateNote = loading ? ', loading' : isEmpty ? ', empty' : playing ? ', playing' : '';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${isEmpty ? 'Empty pad' : name}${stateNote}`, accessibilityState: { disabled: blocked, selected: playing, busy: loading }, disabled: blocked || !onPress, onPress: () => onPress?.(name ?? ''), style: ({ pressed }) => [
            {
                flexDirection: isRow ? 'row' : 'column',
                alignItems: 'center',
                justifyContent: isRow ? 'flex-start' : 'center',
                gap: tokens.spacing.sm,
                minHeight: isRow ? 56 : 88,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: playing ? 2 : 1,
                borderColor: isEmpty ? colors.border : playing ? accent : (0, types_1.withAlpha)(accent, 0.4),
                backgroundColor: isEmpty ? colors.surface : (0, types_1.withAlpha)(accent, playing || pressed ? 0.24 : 0.12),
                opacity: isEmpty ? 0.5 : 1,
            },
            style,
        ], children: [loading ? ((0, jsx_runtime_1.jsx)(primitives_1.Spinner, {})) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 32,
                    height: 32,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.full,
                    backgroundColor: isEmpty ? colors.border : (0, types_1.withAlpha)(accent, 0.2),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: isEmpty ? '＋' : glyph, size: "base", color: isEmpty ? 'muted' : accentKey }) })), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: isRow ? 1 : undefined, alignItems: isRow ? 'flex-start' : 'center', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: isEmpty ? colors.muted : colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: playing ? '700' : '600',
                        }, children: isEmpty ? 'Empty' : name }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: detail })) : null] }), isRow && !isEmpty && !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 72 }, children: (0, jsx_runtime_1.jsx)(WaveformEditor_1.WaveformEditor, { peaks: peaks, variant: "mini", placeholderBars: peaks ? 0 : 20 }) })) : null, playing && !loading ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 4,
                    right: 4,
                    width: 6,
                    height: 6,
                    borderRadius: tokens.radius.full,
                    backgroundColor: accent,
                } })) : null] }));
}
//# sourceMappingURL=SamplePad.js.map