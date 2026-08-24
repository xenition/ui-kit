"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PricingToggle = PricingToggle;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Monthly/yearly (or N-option) segmented switch — the native mirror of the web
 * `PricingToggle`. Reports the active key via `value`/`onChange` and keeps the
 * per-option "save %" `badge` slot. Built as a token-styled pill track (the base
 * `Segmented` primitive has no badge slot), matching the web pill-toggle look.
 * Token-only.
 */
function PricingToggle({ options, value, onChange, label = 'Billing period', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { testID: "xen-pricing-toggle", accessibilityRole: "radiogroup", accessibilityLabel: label, style: [
            {
                alignSelf: 'flex-start',
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.xs,
                backgroundColor: colors.surface,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.full,
                padding: tokens.spacing.xs,
            },
            style,
        ], children: options.map((option) => {
            const active = option.value === value;
            return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: active, checked: active }, accessibilityLabel: option.label, onPress: () => onChange(option.value), style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.md,
                    paddingVertical: tokens.spacing.xs,
                    backgroundColor: active ? colors.primary : 'transparent',
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: active ? colors.onPrimary : colors.muted,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '500',
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
//# sourceMappingURL=PricingToggle.js.map