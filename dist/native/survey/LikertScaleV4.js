"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikertScaleV4 = LikertScaleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * LikertScale — **V4** "clean form / focus" design. A calm, legible agreement
 * scale: the N points render as a row of big, tappable pills (min height 44) that
 * wrap responsively. The selected pill is a solid **primary** fill with
 * on-primary text; unselected pills sit on `surface` with a `border` hairline and
 * a soft primary tint on press. One accent, generous 8-pt air. Same
 * props/behavior as {@link LikertScaleProps} — the `radiogroup`/`radio` roles,
 * `accessibilityState`, anchor labels and `onChange` are all preserved;
 * token-only colors via `useXenitionTheme()` (no literal colors).
 */
function LikertScaleV4({ points = 5, value, onChange, minLabel, maxLabel, accessibilityLabel = 'Agreement scale', variant = 'dots', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: Array.from({ length: count }, (_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `Point ${point} of ${count}`, disabled: disabled, onPress: () => onChange?.(point), style: ({ pressed }) => ({
                            flex: 1,
                            minWidth: 44,
                            minHeight: 44,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: tokens.spacing.md,
                            paddingVertical: tokens.spacing.sm,
                            borderRadius: tokens.radius.lg,
                            borderWidth: selected ? 2 : 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: selected
                                ? colors.primary
                                : pressed
                                    ? (0, color_1.withAlpha)(colors.primary, 0.12)
                                    : colors.surface,
                            opacity: disabled ? 0.5 : 1,
                        }), children: variant === 'numbered' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '700',
                            }, children: point })) : null }, point));
                }) }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            flexShrink: 1,
                            textAlign: 'right',
                        }, children: maxLabel ?? '' })] })) : null] }));
}
//# sourceMappingURL=LikertScaleV4.js.map