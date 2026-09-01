"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SliderScale = SliderScale;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Clamp `v` into `[min, max]` then snap to the nearest `step` stop. */
function clampSnap(v, min, max, step) {
    const clamped = Math.max(min, Math.min(max, v));
    const snapped = Math.round((clamped - min) / step) * step + min;
    return Math.max(min, Math.min(max, snapped));
}
/**
 * SliderScale — **V4** "clean form / focus" numeric slider question. A calm,
 * legible take: a big current-value numeral sits above a primary-filled track
 * with a large draggable thumb (the token-styled `Slider` primitive), flanked
 * by min/max anchor captions. The single accent is `primary`; the rail is
 * `border`. The `Slider` reports `accessibilityRole="adjustable"` with
 * min/max/now for VoiceOver/TalkBack. Controlled via `value` + `onChange`;
 * token-only colors via `useXenitionTheme()`.
 */
function SliderScale({ value, onChange, min = 0, max = 10, step = 1, minLabel, maxLabel, showValue = true, accessibilityLabel = 'Rating', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safe = clampSnap(value, min, max, step);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm, opacity: disabled ? 0.5 : 1 }, style], children: [showValue ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    alignSelf: 'center',
                    color: colors.primary,
                    fontSize: tokens.typography.scale['3xl'],
                    fontWeight: '800',
                }, children: safe })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: accessibilityLabel, children: (0, jsx_runtime_1.jsx)(primitives_1.Slider, { value: safe, min: min, max: max, step: step, disabled: disabled, onChange: (v) => {
                        if (!disabled)
                            onChange(clampSnap(v, min, max, step));
                    } }) }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            flexShrink: 1,
                            textAlign: 'right',
                        }, children: maxLabel })] })) : null] }));
}
//# sourceMappingURL=SliderScale.js.map