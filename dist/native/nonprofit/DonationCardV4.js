"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCardV4 = DonationCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
/**
 * DonationCard — **V4** "rally" design. The warm, mission-driven donate
 * call-to-action surface: an elevated rounded card with a soft shadow, a bold
 * title/blurb, a grid of preset gift amounts as tappable soft-primary chips
 * (integer cents → localized currency via `formatMoney`, each ≥44px), and a
 * primary CTA that reports the chosen amount. Selection is conveyed by a filled
 * soft-primary chip, a bold border, and `accessibilityState.selected` — never
 * color alone. Honors all three `variant`s — `default` (full card), `compact`
 * (dense padding), and `featured` (larger title) — identical props/behavior to
 * {@link DonationCardProps}. Token-only colors via `useXenitionTheme()`.
 */
function DonationCardV4({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant = 'default', onSelectAmount, onDonate, loading = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';
    const fallback = presets.length > 0 ? presets[0] : 0;
    const active = (selected != null ? selected : fallback) ?? 0;
    const containerStyle = [
        {
            gap: tokens.spacing.md,
            padding: isCompact ? tokens.spacing.md : tokens.spacing.lg,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: title, style: containerStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg,
                            fontWeight: '700',
                        }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), presets.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: presets.map((cents, i) => {
                    const isOn = cents === active;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: isOn, disabled }, accessibilityLabel: (0, internal_1.formatMoney)(cents, currency), disabled: disabled, onPress: () => onSelectAmount?.(cents), style: ({ pressed }) => ({
                            minHeight: 44,
                            justifyContent: 'center',
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.full,
                            borderWidth: isOn ? 2 : 1,
                            borderColor: isOn ? colors.primary : colors.border,
                            backgroundColor: isOn
                                ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                : pressed
                                    ? (0, color_1.withAlpha)(colors.primary, 0.1)
                                    : colors.surface,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: isOn ? colors.primary : colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: '700',
                            }, children: (0, internal_1.formatMoney)(cents, currency) }) }, i));
                }) })) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", loading: loading, disabled: disabled, onPress: () => onDonate?.(active), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2764\uFE0F", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: presets.length > 0 ? `${ctaLabel} ${(0, internal_1.formatMoney)(active, currency)}` : ctaLabel })] }) })] }));
}
//# sourceMappingURL=DonationCardV4.js.map