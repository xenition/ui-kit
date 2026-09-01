"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingTierV4 = PricingTierV4;
exports.PricingTableV4 = PricingTableV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
function isCta(value) {
    return typeof value === 'object' && value !== null && 'label' in value;
}
/**
 * PricingTier — **V4** "showcase" design (native mirror of the web V4). One
 * elevated rounded card built from a `PricingPlan`: an extra-bold name, a big
 * extra-bold `tabular-nums` price, a soft-primary ✓ feature list, and a
 * prominent CTA. The **highlighted** tier is the accent moment — a token primary
 * ring, a soft-primary "Popular" chip (never color alone), and a primary CTA
 * (others outline). A token accent, NOT a full brand gradient. Token-only colors,
 * no literals.
 */
function PricingTierV4({ plan }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const highlighted = plan.highlighted === true;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            position: 'relative',
            gap: tokens.spacing.md,
            backgroundColor: colors.card,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            borderWidth: highlighted ? 2 : 1,
            borderColor: highlighted ? colors.primary : colors.border,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        }, children: [highlighted ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-pricing-badge", style: {
                    alignSelf: 'flex-start',
                    backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.12),
                    borderRadius: tokens.radius.full,
                    paddingVertical: 2,
                    paddingHorizontal: tokens.spacing.sm,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: tokens.ramps.primary[700],
                        fontSize: tokens.typography.scale.xs,
                        fontWeight: '700',
                    }, children: plan.highlightLabel ?? 'Popular' }) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '800',
                    letterSpacing: -0.3,
                }, children: plan.name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['3xl'],
                            fontWeight: '800',
                            letterSpacing: -0.5,
                            fontVariant: ['tabular-nums'],
                        }, children: plan.price }), plan.period !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.period })) : null] }), plan.description !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: plan.description })) : null, plan.features && plan.features.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: plan.features.map((feature, fi) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontWeight: '700' }, children: "\u2713" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                flex: 1,
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                            }, children: feature })] }, fi))) })) : null, isCta(plan.cta) ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: plan.cta.label, onPress: plan.cta.onPress, style: ({ pressed }) => ({
                    marginTop: tokens.spacing.xs,
                    minHeight: 44,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: highlighted ? colors.primary : 'transparent',
                    borderColor: colors.primary,
                    borderWidth: highlighted ? 0 : 1,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.sm,
                    paddingHorizontal: tokens.spacing.md,
                    opacity: pressed ? 0.9 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: highlighted ? colors.onPrimary : colors.primary,
                        fontSize: tokens.typography.scale.sm,
                        fontWeight: '700',
                    }, children: plan.cta.label }) })) : plan.cta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.xs }, children: plan.cta })) : null] }));
}
/**
 * PricingTable — **V4** "showcase" design (native mirror of the web V4). Stacks
 * elevated `PricingTierV4` cards from the base's `plans` data array (the web V4
 * composes children in a responsive grid). The highlighted tier stands out with
 * a primary ring + soft-primary chip. Same props/behavior as
 * {@link PricingTableProps}; token-only colors, no literals.
 */
function PricingTableV4({ plans, style }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-pricing", style: [{ gap: tokens.spacing.lg }, style], children: plans.map((plan, i) => ((0, jsx_runtime_1.jsx)(PricingTierV4, { plan: plan }, i))) }));
}
//# sourceMappingURL=PricingTableV4.js.map