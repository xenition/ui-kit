"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingToggleV4 = PricingToggleV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * PricingToggle — **V4** "showcase" design (native mirror of the web V4). A
 * tactile segmented control: a soft-neutral track with a pill-shaped selected
 * segment in `primary` / `onPrimary` ink and an optional soft-primary "save X%"
 * chip per option. Reports the active key via `value`/`onChange`, ≥44px targets.
 * Same props/behavior as {@link PricingToggleProps}; token-only colors, no
 * literals.
 */
function PricingToggleV4({ options, value, onChange, label = 'Billing period', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-pricing-toggle", accessibilityRole: "radiogroup", accessibilityLabel: label, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: tokens.ramps.neutral[100],
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.full,
                padding: tokens.spacing.xs,
            },
            style,
        ], children: options.map((option) => {
            const active = option.value === value;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: active, checked: active }, accessibilityLabel: option.label, onPress: () => onChange(option.value), style: {
                    minHeight: 44,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.xs,
                    backgroundColor: active ? colors.primary : 'transparent',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: active ? colors.onPrimary : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                        }, children: option.label }), option.badge !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            borderRadius: tokens.radius.full,
                            paddingHorizontal: tokens.spacing.xs,
                            paddingVertical: 1,
                            backgroundColor: active ? colors.onPrimary : tokens.ramps.primary[100],
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: active ? colors.primary : tokens.ramps.primary[700],
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                            }, children: option.badge }) })) : null] }, option.value));
        }) }));
}
//# sourceMappingURL=PricingToggleV4.js.map