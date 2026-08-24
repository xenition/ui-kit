"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingTable = PricingTable;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
function isCta(value) {
    return typeof value === 'object' && value !== null && 'label' in value;
}
/**
 * Stacked pricing tiers — the native mirror of the web `PricingTable` +
 * `PricingTier`. The web version composes children in a responsive grid; native
 * takes a `plans` data array and stacks the cards vertically (the `lg:scale-105`
 * highlight is expressed with a token ring + badge only). Token-only.
 */
function PricingTable({ plans, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-pricing", style: [{ gap: tokens.spacing.lg }, style], children: plans.map((plan, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                position: 'relative',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                borderWidth: plan.highlighted ? 2 : 1,
                borderColor: plan.highlighted ? colors.primary : colors.border,
            }, children: [plan.highlighted ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-pricing-badge", style: {
                        alignSelf: 'flex-start',
                        backgroundColor: colors.primary,
                        borderRadius: tokens.radius.full,
                        paddingVertical: 2,
                        paddingHorizontal: tokens.spacing.sm,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onPrimary,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                        }, children: plan.highlightLabel ?? 'Most popular' }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: colors.onSurface,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '600',
                    }, children: plan.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale['3xl'],
                                fontWeight: '700',
                            }, children: plan.price }), plan.period !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.period })) : null] }), plan.description !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.description })) : null, plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: plan.features.map((feature, fi) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontWeight: '700' }, children: "\u2713" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                }, children: feature })] }, fi))) })) : null, isCta(plan.cta) ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: plan.cta.label, onPress: plan.cta.onPress, style: ({ pressed }) => ({
                        marginTop: tokens.spacing.xs,
                        alignItems: 'center',
                        backgroundColor: plan.highlighted ? colors.primary : colors.surface,
                        borderColor: colors.primary,
                        borderWidth: 1,
                        borderRadius: tokens.radius.md,
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        opacity: pressed ? 0.9 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: plan.highlighted ? colors.onPrimary : colors.primary,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                        }, children: plan.cta.label }) })) : plan.cta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: plan.cta })) : null] }, i))) }));
}
//# sourceMappingURL=PricingTable.js.map