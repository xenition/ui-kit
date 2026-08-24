"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RatingSummary = RatingSummary;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
/**
 * Aggregate rating block — a large average, a `Rating` star row, and the total
 * count. In `detailed` mode with a `distribution` it also draws a five-row bar
 * chart (5★→1★) using token-tinted fills. When `count` is 0 it shows a muted
 * empty label instead. Bar widths are guarded against a zero denominator.
 * Token-only.
 */
function RatingSummary({ average, count, distribution, variant = 'compact', emptyLabel = 'No ratings yet', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (count <= 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.xs }, style], children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: 0, size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel })] }));
    }
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: average.toFixed(1) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: average, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [count, " ", count === 1 ? 'rating' : 'ratings'] })] })] }));
    if (variant !== 'detailed' || !distribution || distribution.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${average.toFixed(1)} out of 5, ${count} ratings`, style: style, children: header }));
    }
    const maxBucket = Math.max(1, ...distribution);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${average.toFixed(1)} out of 5, ${count} ratings`, style: [{ gap: tokens.spacing.md }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: distribution.map((bucket, i) => {
                    const stars = distribution.length - i; // first entry = highest star
                    const pct = Math.max(0, Math.min(1, bucket / maxBucket));
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 16, color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'right' }, children: stars }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    flex: 1,
                                    height: 8,
                                    borderRadius: tokens.radius.full,
                                    overflow: 'hidden',
                                    backgroundColor: tokens.ramps.neutral[200],
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: `${pct * 100}%`, height: '100%', backgroundColor: colors.accent } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 32, color: colors.muted, fontSize: tokens.typography.scale.xs }, children: bucket })] }, stars));
                }) })] }));
}
//# sourceMappingURL=RatingSummary.js.map