"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveformEditor = WaveformEditor;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/** Deterministic pseudo-random height so the placeholder looks wave-like. */
function placeholderHeight(i) {
    const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
    return 0.25 + (v - Math.floor(v)) * 0.7;
}
/**
 * A waveform editor — a **token-bar placeholder**, not a real renderer. It
 * draws `peaks` (or a deterministic placeholder when omitted) as a row of
 * token-colored bars, overlays a playhead at `progress`, and tints an optional
 * `selection` region. Tapping a bar fires `onSeek` with the `[0,1]` position.
 * Shows a `Spinner` while `loading` and an `EmptyState` when there is nothing
 * to show. No audio is decoded; token-only styling.
 */
function WaveformEditor({ peaks, progress, selection, variant = 'full', loading = false, emptyLabel = 'No audio loaded', placeholderBars = 48, onSeek, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const height = variant === 'mini' ? 32 : 72;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: "Loading waveform", style: [
                { height, alignItems: 'center', justifyContent: 'center', borderRadius: tokens.radius.md, backgroundColor: colors.surface },
                style,
            ], children: (0, jsx_runtime_1.jsx)(primitives_1.Spinner, {}) }));
    }
    const hasPeaks = Array.isArray(peaks) && peaks.length > 0;
    if (!hasPeaks && placeholderBars <= 0) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.EmptyState, { icon: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u3030\uFE0F", size: "2xl", color: "muted", accessibilityLabel: "Waveform" }), title: emptyLabel, style: style }));
    }
    const count = hasPeaks ? peaks.length : Math.max(1, Math.trunc(placeholderBars));
    const playRatio = progress == null ? null : (0, types_1.clamp)(progress, 0, 1);
    const [selStart, selEnd] = selection ?? [null, null];
    const inSelection = (ratio) => {
        if (selStart == null || selEnd == null)
            return false;
        const lo = (0, types_1.clamp)(Math.min(selStart, selEnd), 0, 1);
        const hi = (0, types_1.clamp)(Math.max(selStart, selEnd), 0, 1);
        return ratio >= lo && ratio <= hi;
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: "Waveform", accessibilityValue: playRatio == null ? undefined : { now: Math.round(playRatio * 100), min: 0, max: 100 }, style: [
            {
                height,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                paddingHorizontal: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                backgroundColor: (0, types_1.withAlpha)(colors.onSurface, 0.04),
                overflow: 'hidden',
            },
            style,
        ], children: [Array.from({ length: count }).map((_, i) => {
                const raw = hasPeaks ? peaks[i] : placeholderHeight(i);
                const mag = (0, types_1.clamp)(raw ?? 0, 0, 1);
                const ratio = count > 1 ? i / (count - 1) : 0;
                const played = playRatio != null && ratio <= playRatio;
                const selected = inSelection(ratio);
                const barColor = played ? colors.primary : selected ? colors.accent : (0, types_1.withAlpha)(colors.onSurface, 0.35);
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", disabled: !onSeek, onPress: () => onSeek?.(ratio), style: { flex: 1, height: '100%', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: `${Math.max(6, mag * 100)}%`,
                            borderRadius: tokens.radius.full,
                            backgroundColor: barColor,
                        } }) }, i));
            }), playRatio != null && variant === 'full' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${playRatio * 100}%`,
                    width: 2,
                    backgroundColor: colors.primary,
                } })) : null, !hasPeaks && variant === 'full' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    position: 'absolute',
                    alignSelf: 'center',
                    color: colors.muted,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                }, children: emptyLabel })) : null] }));
}
//# sourceMappingURL=WaveformEditor.js.map