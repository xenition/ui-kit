"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCardV3 = DonationCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
/**
 * DonationCard — design variant **V3**: a **minimal inline amount row**. No card
 * chrome at all — a compact title, a single horizontal strip of pill amounts,
 * and an inline donate button. Selection rounds a pill to a filled primary tint
 * with a bold ring and flips `accessibilityState.selected` (state by a11y + fill,
 * never color alone). Meant to drop into an existing surface (a sheet, a list
 * footer) rather than own one. Same props as {@link DonationCardProps}.
 * Token-only; money is integer cents formatted through `formatMoney`.
 */
function DonationCardV3({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant = 'default', onSelectAmount, onDonate, loading = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isCompact = variant === 'compact';
    const fallback = presets.length > 0 ? presets[0] : 0;
    const active = (selected != null ? selected : fallback) ?? 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), description && !isCompact ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [presets.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, children: presets.map((cents, i) => {
                            const isOn = cents === active;
                            return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: isOn, disabled }, accessibilityLabel: (0, internal_1.formatMoney)(cents, currency), disabled: disabled, onPress: () => onSelectAmount?.(cents), style: ({ pressed }) => ({
                                    paddingVertical: tokens.spacing.xs,
                                    paddingHorizontal: tokens.spacing.sm,
                                    borderRadius: tokens.radius.full,
                                    borderWidth: isOn ? 1.5 : 1,
                                    borderColor: isOn ? colors.primary : colors.border,
                                    backgroundColor: isOn
                                        ? (0, internal_1.withAlpha)(colors.primary, 0.12)
                                        : pressed
                                            ? tokens.ramps.neutral[50] ?? colors.surface
                                            : 'transparent',
                                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: isOn ? colors.primaryText : colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '700',
                                    }, children: (0, internal_1.formatMoney)(cents, currency) }) }, i));
                        }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } })), (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "sm", loading: loading, disabled: disabled, onPress: () => onDonate?.(active), children: ctaLabel })] })] }));
}
//# sourceMappingURL=DonationCardV3.js.map