"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DishCardV3 = DishCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Rating_1 = require("../primitives/Rating");
const commerce_1 = require("../commerce");
/**
 * DishCard, alternate design **V3** — a *text-first* menu line. Borderless and
 * dense, separated from its neighbours by a single hairline rule rather than a
 * card. The name and price share the top baseline (name left, price right,
 * bridged by a dotted leader), the description follows, and a small square
 * thumbnail sits on the *right* — the inverse of the classic left-thumb row.
 * Adding is a quiet text button, not a filled pill. Same props as the classic.
 */
function DishCardV3({ name, description, priceCents, currency = 'USD', imageUrl, rating, badges, soldOut = false, loading = false, onPress, onAdd, addLabel = 'Add', soldOutLabel = 'Sold out', formatMoney, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const thumb = 56;
    const containerStyle = [
        {
            flexDirection: 'row',
            gap: tokens.spacing.md,
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
            borderBottomWidth: 1,
            borderColor: colors.border,
            paddingVertical: tokens.spacing.md,
            opacity: soldOut ? 0.6 : 1,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading dish", style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '80%', borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: thumb, height: thumb, borderRadius: tokens.radius.md, backgroundColor: tokens.ramps.neutral[200] } })] }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), (0, jsx_runtime_1.jsx)(commerce_1.PriceTag, { cents: priceCents, currency: currency, formatMoney: formatMoney, size: "sm" })] }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, marginTop: tokens.spacing.xs }, children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(Rating_1.Rating, { value: rating, size: "sm", showValue: true }) : null, badges ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: badges })) : null, soldOut ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.dangerText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: soldOutLabel })) : onAdd ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: addLabel, onPress: onAdd, hitSlop: 8, children: ({ pressed }) => ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: {
                                color: colors.primaryText,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '700',
                                opacity: pressed ? 0.6 : 1,
                            }, children: ["+ ", addLabel] })) })) : null] })] }));
    const media = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: thumb,
            height: thumb,
            borderRadius: tokens.radius.md,
            overflow: 'hidden',
            backgroundColor: tokens.ramps.neutral[100],
        }, children: imageUrl ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: true, accessibilityLabel: name, resizeMode: "cover", style: { width: '100%', height: '100%' } })) : null }));
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [body, media] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, accessibilityState: { disabled: soldOut }, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : soldOut ? 0.6 : 1 }], children: inner }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: containerStyle, children: inner });
}
//# sourceMappingURL=DishCardV3.js.map