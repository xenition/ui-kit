"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReorderRow = ReorderRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const commerce_1 = require("../commerce");
/**
 * A past-order row with a one-tap reorder action — thumbnail, title, an items
 * summary, date and total, and a `Reorder` button. The whole row is optionally
 * pressable to open the order. `disabled` dims the row and blocks reordering.
 * Reuses the `Button` primitive and the shared money formatter. Token-only.
 */
function ReorderRow({ title, itemsSummary, dateText, totalCents, currency = 'USD', imageUrl, onReorder, reorderLabel = 'Reorder', onPress, disabled = false, formatMoney = commerce_1.formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = [dateText, typeof totalCents === 'number' ? formatMoney(totalCents, currency) : undefined]
        .filter(Boolean)
        .join(' · ');
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.surface,
            padding: tokens.spacing.md,
            opacity: disabled ? 0.6 : 1,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 56,
                    height: 56,
                    borderRadius: tokens.radius.md,
                    overflow: 'hidden',
                    backgroundColor: tokens.ramps.neutral[100],
                }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: title, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), itemsSummary ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: itemsSummary })) : null, meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), onReorder ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "secondary", size: "sm", onPress: onReorder, disabled: disabled, children: reorderLabel })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${title}${meta ? `, ${meta}` : ''}`, accessibilityState: { disabled }, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : disabled ? 0.6 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=ReorderRow.js.map