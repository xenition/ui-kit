"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThankYouCardV4 = ThankYouCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
const rally_1 = require("./internal/rally");
const GradientSurface_1 = require("./internal/GradientSurface");
/**
 * ThankYouCard — **V4** "rally" design. The post-donation confirmation card and
 * the ONE reserved gradient moment of the nonprofit "rally" line: a celebratory
 * glyph, a thank-you headline (optionally naming the donor), the gift amount in
 * integer cents, a mission message, an optional concrete impact chip, and share
 * / receipt actions. Honors both `variant`s and is prop-identical to
 * {@link ThankYouCardProps}.
 *
 * - `celebratory` = the reserved gradient celebration: a `rallyGradient` ground
 *   filling a rounded, overflow-hidden container, near-white `rallyInk` /
 *   `rallyInkSoft` ink, and frosted (`rallyTile` + `rallyBorder`) amount / impact
 *   tiles.
 * - `default` = a clean, warm thank-you on the plain surface (no gradient): a
 *   soft-shadowed rounded card, with the amount as a soft-primary chip.
 *
 * Token-only colors via `useXenitionTheme()` + the rally ramp helpers — no
 * literal colors. Web/native parity with the web `ThankYouCardV4`.
 */
function ThankYouCardV4({ donorName, amountCents, currency = 'USD', headline, message, impactLabel, variant = 'default', onShare, onViewReceipt, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const celebratory = variant === 'celebratory';
    const ink = celebratory ? (0, rally_1.rallyInk)(r) : colors.onSurface;
    const inkSoft = celebratory ? (0, rally_1.rallyInkSoft)(r) : colors.muted;
    const resolvedHeadline = headline ?? (donorName ? `Thank you, ${donorName}!` : 'Thank you for your gift!');
    const hasAmount = typeof amountCents === 'number';
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: tokens.spacing['2xl'],
                    height: tokens.spacing['2xl'],
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: celebratory ? (0, rally_1.rallyTile)(r) : (0, color_1.withAlpha)(colors.success, 0.16),
                    borderWidth: celebratory ? 1 : 0,
                    borderColor: (0, rally_1.rallyBorder)(r),
                }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: celebratory ? '💝' : '🎉', size: "xl" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', textAlign: 'center' }, children: resolvedHeadline }), hasAmount ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: celebratory ? (0, rally_1.rallyTile)(r) : (0, color_1.withAlpha)(colors.primary, 0.1),
                    borderWidth: celebratory ? 1 : 0,
                    borderColor: (0, rally_1.rallyBorder)(r),
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: celebratory ? (0, rally_1.rallyInk)(r) : colors.primary,
                        fontSize: tokens.typography.scale['2xl'],
                        fontWeight: '800',
                    }, children: (0, internal_1.formatMoney)(amountCents, currency) }) })) : null, message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: message })) : null, impactLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                    paddingVertical: tokens.spacing.xs,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.full,
                    backgroundColor: celebratory ? (0, rally_1.rallyTile)(r) : (0, color_1.withAlpha)(colors.success, 0.12),
                    borderWidth: celebratory ? 1 : 0,
                    borderColor: (0, rally_1.rallyBorder)(r),
                }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\uD83C\uDF31", size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: celebratory ? (0, rally_1.rallyInk)(r) : colors.success,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: '600',
                        }, children: impactLabel })] })) : null, onShare || onViewReceipt ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.xs }, children: [onShare ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", onPress: onShare, children: "Share" })) : null, onViewReceipt ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", onPress: onViewReceipt, children: "View receipt" })) : null] })) : null] }));
    if (celebratory) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: resolvedHeadline, style: [
                {
                    borderRadius: tokens.radius.lg,
                    overflow: 'hidden',
                    shadowColor: colors.onSurface,
                    shadowOpacity: 0.12,
                    shadowRadius: 16,
                    shadowOffset: { width: 0, height: 8 },
                    elevation: 4,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, rally_1.rallyGradient)(r), style: { ...absoluteFill } }), content] }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", accessibilityLabel: resolvedHeadline, style: [
            {
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                shadowColor: colors.onSurface,
                shadowOpacity: 0.08,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 6 },
                elevation: 3,
            },
            style,
        ], children: content }));
}
const absoluteFill = { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 };
//# sourceMappingURL=ThankYouCardV4.js.map