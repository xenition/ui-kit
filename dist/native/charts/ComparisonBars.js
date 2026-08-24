"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComparisonBars = ComparisonBars;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/** Descending opacity steps so extra series stay within one theme color. */
const OPACITY_STEPS = [1, 0.6, 0.35, 0.2];
/**
 * Grouped comparison bars — token-bound, View/flex-based (no SVG). Renders each
 * group's series as adjacent vertical bars; distinguish series by cycling the
 * provided theme `colors` (and, beyond that, by descending opacity). Group
 * labels use `onSurface`; a `muted` baseline stands in for the axis.
 */
function ComparisonBars({ data, colors: seriesColors = ['primary', 'accent'], max, height = 120, accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (data.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "No data" }));
    }
    const ceiling = Math.max(max ?? Math.max(...data.flatMap((g) => g.values), 1), 1);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `Comparison bars, ${data.length} groups`, style: style, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', height, gap: tokens.spacing.sm }, children: data.map((group, gi) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'flex-end', gap: 2, height }, children: group.values.map((value, si) => {
                        const ratio = Math.min(Math.max(value / ceiling, 0), 1);
                        const colorKey = seriesColors[si % seriesColors.length] ?? 'primary';
                        const opacity = si < seriesColors.length ? 1 : OPACITY_STEPS[Math.min(si, OPACITY_STEPS.length - 1)];
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                flex: 1,
                                height: Math.max(ratio * height, 1),
                                backgroundColor: colors[colorKey],
                                opacity,
                                borderTopLeftRadius: tokens.radius.sm,
                                borderTopRightRadius: tokens.radius.sm,
                            } }, si));
                    }) }, gi))) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.muted, marginTop: tokens.spacing.xs } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: data.map((group, gi) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                        flex: 1,
                        textAlign: 'center',
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.xs,
                    }, children: group.label }, gi))) })] }));
}
//# sourceMappingURL=ComparisonBars.js.map