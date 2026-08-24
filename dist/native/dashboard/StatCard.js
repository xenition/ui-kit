"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatCard = StatCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A single at-a-glance metric card. The `value` is the dominant element; the
 * `delta` reads in a success (up) or danger (down) tone. Token-only; the native
 * mirror of a dashboard stat tile every admin screen otherwise hand-rolls.
 */
function StatCard({ label, value, delta, trend, icon, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const deltaColor = trend === 'down' ? colors.danger : trend === 'up' ? colors.success : colors.muted;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${label}: ${String(value)}${delta ? `, ${delta}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: label }), icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale['2xl'],
                    fontWeight: '700',
                }, children: value }), delta ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: deltaColor, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [trend === 'up' ? '▲ ' : trend === 'down' ? '▼ ' : '', delta] })) : null] }));
}
//# sourceMappingURL=StatCard.js.map