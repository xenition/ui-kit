"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikertScale = LikertScale;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Token-derived translucent tint (no literal hex; mirrors Button/GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * A Likert agreement scale — N equally-weighted points rendered as a
 * `radiogroup` of circular `radio` buttons, with optional anchor labels under
 * the extremes ("Strongly disagree" … "Strongly agree"). The selected point
 * fills with the primary token and is announced via `accessibilityState`
 * (selection is never color-alone). `numbered` prints each point's ordinal. No
 * literal colors.
 */
function LikertScale({ points = 5, value, onChange, minLabel, maxLabel, accessibilityLabel = 'Agreement scale', variant = 'dots', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: Array.from({ length: count }, (_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `Point ${point} of ${count}`, disabled: disabled, onPress: () => onChange?.(point), style: ({ pressed }) => ({
                            flex: 1,
                            aspectRatio: 1,
                            maxWidth: 56,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            borderWidth: selected ? 2 : 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: selected
                                ? colors.primary
                                : pressed
                                    ? withAlpha(colors.primary, 0.12)
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
//# sourceMappingURL=LikertScale.js.map