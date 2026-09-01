"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentMethodCard = PaymentMethodCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
const KIND_GLYPH = {
    card: '💳',
    bank: '🏦',
    wallet: '📱',
};
/**
 * A saved payment method — the clean, trust-first row on a money surface: the
 * instrument glyph in a small brand-gradient disc (the signature V4 touch), the
 * `label` + `detail`, an optional "Default" badge (success tone), and a manage
 * affordance. When `onSelect` is set the whole row is a radio carrying
 * `accessibilityState.selected`; a selected row gains a 2px primary border. All
 * colors trace to tokens — no literals.
 */
function PaymentMethodCard({ kind, label, detail, isDefault = false, selected = false, onSelect, onManage, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
        borderWidth: selected ? 2 : 0,
        borderColor: selected ? colors.primary : undefined,
    };
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [onSelect ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: {
                    width: 20,
                    height: 20,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: selected ? colors.primary : colors.border,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: selected ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors.primary } })) : null })) : null, (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg, color: (0, brand_1.brandInk)(r) }, children: KIND_GLYPH[kind] ?? KIND_GLYPH.card }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: label }), detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: detail })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [isDefault ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: "success", variant: "soft", children: "Default" })) : null, onManage ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Manage ${label}`, onPress: onManage, hitSlop: 8, style: ({ pressed }) => ({
                            paddingHorizontal: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                            borderRadius: tokens.radius.sm,
                            opacity: pressed ? 0.6 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: "Manage" }) })) : null] })] }));
    if (!onSelect)
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: [card, style], children: body });
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: detail ? `${label}, ${detail}` : label, onPress: onSelect, style: ({ pressed }) => [card, { opacity: pressed ? 0.9 : 1 }, style], children: body }));
}
//# sourceMappingURL=PaymentMethodCard.js.map