"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThankYouCard = ThankYouCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Button_1 = require("../primitives/Button");
const Icon_1 = require("../primitives/Icon");
const internal_1 = require("./internal");
/**
 * A post-donation confirmation card: a celebratory glyph, a thank-you headline
 * (optionally naming the donor and their gift amount in integer cents), a
 * mission message, an optional concrete impact line, and share / receipt
 * actions. `celebratory` renders on a tinted accent panel (`withAlpha`). All
 * colors come from the compiled theme tokens — no literal colors.
 */
function ThankYouCard({ donorName, amountCents, currency = 'USD', headline, message, impactLabel, variant = 'default', onShare, onViewReceipt, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const celebratory = variant === 'celebratory';
    const resolvedHeadline = headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: resolvedHeadline, style: [
            {
                alignItems: 'center',
                gap: tokens.spacing.sm,
                padding: tokens.spacing.lg,
                borderRadius: tokens.radius.lg,
                borderWidth: celebratory ? 0 : 1,
                borderColor: colors.border,
                backgroundColor: celebratory ? (0, internal_1.withAlpha)(colors.primary, 0.1) : colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: tokens.spacing['2xl'],
                    height: tokens.spacing['2xl'],
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, internal_1.withAlpha)(colors.success, 0.16),
                }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF89", size: "xl" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }, children: resolvedHeadline }), typeof amountCents === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: (0, internal_1.formatMoney)(amountCents, currency) })) : null, message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message })) : null, impactLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, paddingVertical: tokens.spacing.xs, paddingHorizontal: tokens.spacing.md, borderRadius: tokens.radius.full, backgroundColor: (0, internal_1.withAlpha)(colors.success, 0.12) }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83C\uDF31", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: impactLabel })] })) : null, onShare || onViewReceipt ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [onShare ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "primary", onPress: onShare, children: "Share" })) : null, onViewReceipt ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { variant: "outline", onPress: onViewReceipt, children: "View receipt" })) : null] })) : null] }));
}
//# sourceMappingURL=ThankYouCard.js.map