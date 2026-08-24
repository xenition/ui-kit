"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonationCardV2 = DonationCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const elevation_1 = require("../primitives/internal/elevation");
const internal_1 = require("./internal");
/**
 * DonationCard — design variant **V2**: an **elevated donate surface**. Where V1
 * is a flat bordered card, V2 floats on a drop shadow (no border) and turns the
 * presets into a grid of large, tappable amount tiles — the tapped tile fills
 * with the primary slot and flips `accessibilityState.selected` (state by a11y +
 * fill, never color alone). The CTA is a full-width heart button that echoes the
 * chosen amount. Same props as {@link DonationCardProps}. Token-only; money is
 * integer cents formatted through `formatMoney`.
 */
function DonationCardV2({ title, description, presets = [], selected, currency = 'USD', ctaLabel = 'Donate', variant = 'default', onSelectAmount, onDonate, loading = false, disabled = false, style, }) {
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
                backgroundColor: colors.surface,
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, internal_1.withAlpha)(colors.primary, 0.12),
                            alignItems: 'center',
                            justifyContent: 'center',
                        }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2764\uFE0F", size: "base" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: {
                                    color: colors.onSurface,
                                    fontSize: isFeatured ? tokens.typography.scale['2xl'] : tokens.typography.scale.lg,
                                    fontWeight: '800',
                                }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: description })) : null] })] }), presets.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: presets.map((cents, i) => {
                    const isOn = cents === active;
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityState: { selected: isOn, disabled }, accessibilityLabel: (0, internal_1.formatMoney)(cents, currency), disabled: disabled, onPress: () => onSelectAmount?.(cents), style: ({ pressed }) => ({
                            flexGrow: 1,
                            flexBasis: '30%',
                            alignItems: 'center',
                            paddingVertical: tokens.spacing.md,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            borderWidth: isOn ? 0 : 1,
                            borderColor: colors.border,
                            backgroundColor: isOn
                                ? colors.primary
                                : pressed
                                    ? tokens.ramps.neutral[50] ?? colors.surface
                                    : colors.surface,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: isOn ? colors.onPrimary : colors.onSurface,
                                fontSize: tokens.typography.scale.lg,
                                fontWeight: '800',
                            }, children: (0, internal_1.formatMoney)(cents, currency) }) }, i));
                }) })) : null, (0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", size: "lg", loading: loading, disabled: disabled, onPress: () => onDonate?.(active), children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\u2764\uFE0F", size: "lg", accessibilityLabel: "Donate" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: presets.length > 0 ? `${ctaLabel} ${(0, internal_1.formatMoney)(active, currency)}` : ctaLabel })] }) })] }));
}
//# sourceMappingURL=DonationCardV2.js.map