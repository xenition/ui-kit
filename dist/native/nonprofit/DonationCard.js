"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCard = DonationCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * The donate call-to-action surface: a title/blurb, a grid of preset gift
 * amounts (integer cents → localized currency via `formatMoney`), and a primary
 * CTA that reports the chosen amount. Selection is conveyed by a filled chip, a
 * bold border, and `accessibilityState.selected` — not color alone. When no
 * `presets` are supplied the grid is omitted and the CTA reports `0`. All colors
 * come from the compiled theme tokens — no literal colors.
 */
function DonationCard({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant = 'default', onSelectAmount, onDonate, loading = false, disabled = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isFeatured = variant === 'featured';
    const isCompact = variant === 'compact';
    const fallback = presets.length > 0 ? presets[0] : 0;
    const active = (selected != null ? selected : fallback) ?? 0;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                gap: tokens.spacing.md,
                padding: isCompact ? tokens.spacing.md : tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: colors.onSurface,
                            fontSize: isFeatured ? tokens.typography.scale.xl : tokens.typography.scale.lg,
                            fontWeight: '700',
                        }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] }), presets.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: presets.map((cents, i) => {
                    const isOn = cents === active;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: isOn, disabled }, accessibilityLabel: (0, internal_1.formatMoney)(cents, currency), disabled: disabled, onPress: () => onSelectAmount?.(cents), style: ({ pressed }) => ({
                            paddingVertical: tokens.spacing.sm,
                            paddingHorizontal: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            borderWidth: isOn ? 2 : 1,
                            borderColor: isOn ? colors.primary : colors.border,
                            backgroundColor: isOn
                                ? (0, internal_1.withAlpha)(colors.primary, 0.12)
                                : pressed
                                    ? tokens.ramps.neutral[50]
                                    : colors.surface,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: isOn ? colors.primary : colors.onSurface,
                                fontSize: tokens.typography.scale.base,
                                fontWeight: '700',
                            }, children: (0, internal_1.formatMoney)(cents, currency) }) }, i));
                }) })) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", loading: loading, disabled: disabled, onPress: () => onDonate?.(active), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2764\uFE0F", size: "base" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: presets.length > 0 ? `${ctaLabel} ${(0, internal_1.formatMoney)(active, currency)}` : ctaLabel })] }) })] }));
}
//# sourceMappingURL=DonationCard.js.map