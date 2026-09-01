"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaveformEditorV4 = WaveformEditorV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
const session_1 = require("./internal/session");
const GradientSurface_1 = require("./internal/GradientSurface");
/** Deterministic pseudo-random height so the placeholder looks wave-like. */
function placeholderHeight(i) {
    const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453);
    return 0.25 + (v - Math.floor(v)) * 0.7;
}
/**
 * WaveformEditor — **V4** "session" design, and the ONE reserved gradient moment
 * of the music V4 line: the signal hero (web/native parity). In `full` the
 * waveform sits on the brand-gradient ground (`sessionGradient(tokens.ramps)` as
 * an absolute-fill wash) with the bars drawn in near-white ink — `sessionInk(r)`
 * for played/active, `withAlpha(sessionInk(r), 0.4)` for unplayed — the playhead
 * in `sessionInk`, any labels in `sessionInk`/`sessionInkSoft`, and a time chip
 * as a frosted tile (`sessionTile` + `sessionBorder`). In `mini` it degrades to a
 * clean, compact strip on the plain surface (no gradient) with bars in
 * `colors.primary`/`withAlpha(colors.primary, 0.3)`. Honors every prop of
 * {@link WaveformEditorProps}: the played/unplayed split, playhead position,
 * optional selection region, and the `onSeek` intent. State is never on color
 * alone: the playhead is a real marker. Token-only colors via `useXenitionTheme()`.
 */
function WaveformEditorV4({ peaks, progress, selection, variant = 'full', loading = false, emptyLabel = 'No audio loaded', placeholderBars = 48, onSeek, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const isFull = variant === 'full';
    const height = isFull ? 72 : 32;
    const ink = (0, session_1.sessionInk)(r);
    const inkSoft = (0, session_1.sessionInkSoft)(r);
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: "Loading waveform", style: [
                {
                    height,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    borderWidth: isFull ? 0 : 1,
                    borderColor: colors.border,
                    backgroundColor: isFull ? undefined : colors.surface,
                },
                style,
            ], children: [isFull ? ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, session_1.sessionGradient)(r), style: absoluteFill })) : null, (0, jsx_runtime_1.jsx)(primitives_1.Spinner, {})] }));
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
    // Near-white ink on the gradient ground (`full`); primary token on the plain
    // surface (`mini`).
    const activeBar = isFull ? ink : colors.primary;
    const idleBar = isFull ? (0, types_1.withAlpha)(ink, 0.4) : (0, types_1.withAlpha)(colors.primary, 0.3);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "adjustable", accessibilityLabel: "Waveform", accessibilityValue: playRatio == null ? undefined : { now: Math.round(playRatio * 100), min: 0, max: 100 }, style: [
            {
                height,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 1,
                paddingHorizontal: tokens.spacing.xs,
                borderRadius: tokens.radius.md,
                overflow: 'hidden',
                borderWidth: isFull ? 0 : 1,
                borderColor: colors.border,
                backgroundColor: isFull ? undefined : colors.surface,
            },
            style,
        ], children: [isFull ? (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, session_1.sessionGradient)(r), style: absoluteFill }) : null, Array.from({ length: count }).map((_, i) => {
                const raw = hasPeaks ? peaks[i] : placeholderHeight(i);
                const mag = (0, types_1.clamp)(raw ?? 0, 0, 1);
                const ratio = count > 1 ? i / (count - 1) : 0;
                const played = playRatio != null && ratio <= playRatio;
                const selected = inSelection(ratio);
                const barColor = played || selected ? activeBar : idleBar;
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", disabled: !onSeek, onPress: () => onSeek?.(ratio), style: { flex: 1, height: '100%', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: `${Math.max(6, mag * 100)}%`,
                            borderRadius: tokens.radius.full,
                            backgroundColor: barColor,
                        } }) }, i));
            }), playRatio != null && isFull ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    left: `${playRatio * 100}%`,
                    width: 2,
                    backgroundColor: ink,
                } })) : null, playRatio != null && isFull ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: {
                    position: 'absolute',
                    right: tokens.spacing.xs,
                    bottom: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 1,
                    borderRadius: tokens.radius.full,
                    backgroundColor: (0, session_1.sessionTile)(r),
                    borderWidth: 1,
                    borderColor: (0, session_1.sessionBorder)(r),
                }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: [Math.round(playRatio * 100), "%"] }) })) : null, !hasPeaks && isFull ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', left: 0, right: 0, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: emptyLabel }) })) : null] }));
}
const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };
//# sourceMappingURL=WaveformEditorV4.js.map