"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrendCard = TrendCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Sparkline_1 = require("./Sparkline");
/**
 * A labelled stat paired with an inline {@link Sparkline} — token-bound,
 * View-based (no SVG). Surfaces a headline metric with an at-a-glance trend.
 */
function TrendCard({ label, value, delta, data, color = 'primary', accessibilityLabel, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: accessibilityLabel ?? `${label}, ${value}${delta ? `, ${delta}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.md,
                gap: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: value }), delta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[color], fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: delta })) : null] }), data && data.length > 0 ? (0, jsx_runtime_1.jsx)(Sparkline_1.Sparkline, { data: data, color: color, height: 28 }) : null] }));
}
//# sourceMappingURL=TrendCard.js.map