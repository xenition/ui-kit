"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikertScaleV2 = LikertScaleV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/** One tall, rounded-full pill in the V2 row — its own press-scale spring. */
function LikertPill({ point, count, selected, disabled, onPress }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { flex: 1, transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `Point ${point} of ${count}`, disabled: disabled, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: {
                minHeight: 52,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: tokens.radius.full,
                borderWidth: selected ? 2 : 1,
                borderColor: selected ? colors.primary : colors.border,
                backgroundColor: selected ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.04),
                paddingVertical: tokens.spacing.sm,
                opacity: disabled ? 0.5 : 1,
                ...(selected ? (0, elevation_1.shadow)('sm', tokens) : null),
            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: selected ? colors.onPrimary : colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                }, children: point }) }) }));
}
/**
 * LikertScale, design V2 — a row of **big labeled pills**. Each agreement point
 * is a tall, rounded-full pill (a faint primary tint at rest, a solid primary
 * fill with a lift when selected) that always prints its ordinal, in place of
 * the original's small circular dots. Anchor labels sit under the extremes.
 * `radiogroup`/`radio` with selection announced (never color-alone); each pill
 * springs on press. Token-pure.
 */
function LikertScaleV2({ points = 5, value, onChange, minLabel, maxLabel, accessibilityLabel = 'Agreement scale', disabled = false, style, }) {
    const { tokens, colors } = (0, theme_1.useXenitionTheme)();
    const count = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: Array.from({ length: count }, (_, i) => {
                    const point = i + 1;
                    return ((0, jsx_runtime_1.jsx)(LikertPill, { point: point, count: count, selected: value === point, disabled: disabled, onPress: () => onChange?.(point) }, point));
                }) }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            flexShrink: 1,
                            textAlign: 'right',
                        }, children: maxLabel ?? '' })] })) : null] }));
}
//# sourceMappingURL=LikertScaleV2.js.map