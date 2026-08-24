"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikertScaleV3 = LikertScaleV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
/**
 * LikertScale, design V3 — a **compact segmented bar**. The points are joined
 * edge-to-edge in one bordered track (hairline dividers between, no gaps),
 * reading as a single control rather than the original's separate dots. The
 * selected segment fills with the primary token; anchor labels sit beneath the
 * extremes. `radiogroup`/`radio` with selection announced (never color-alone).
 * Low-profile for dense forms. Token-pure.
 */
function LikertScaleV3({ points = 5, value, onChange, minLabel, maxLabel, accessibilityLabel = 'Agreement scale', disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const count = Math.max(2, Math.floor(points));
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "radiogroup", accessibilityLabel: accessibilityLabel, style: {
                    flexDirection: 'row',
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    overflow: 'hidden',
                    backgroundColor: colors.surface,
                    opacity: disabled ? 0.5 : 1,
                }, children: Array.from({ length: count }, (_, i) => {
                    const point = i + 1;
                    const selected = value === point;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected, disabled }, accessibilityLabel: `Point ${point} of ${count}`, disabled: disabled, onPress: () => onChange?.(point), style: ({ pressed }) => ({
                            flex: 1,
                            minHeight: 40,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderLeftWidth: i === 0 ? 0 : 1,
                            borderLeftColor: colors.border,
                            backgroundColor: selected
                                ? colors.primary
                                : pressed
                                    ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                    : 'transparent',
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: selected ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '700',
                            }, children: point }) }, point));
                }) }), minLabel || maxLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, flexShrink: 1 }, children: minLabel ?? '' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            flexShrink: 1,
                            textAlign: 'right',
                        }, children: maxLabel ?? '' })] })) : null] }));
}
//# sourceMappingURL=LikertScaleV3.js.map