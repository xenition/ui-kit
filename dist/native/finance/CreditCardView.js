"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreditCardView = CreditCardView;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const appearance_1 = require("../primitives/internal/appearance");
const Gradient_1 = require("./internal/Gradient");
const mask_1 = require("./internal/mask");
const BRAND_LABEL = {
    visa: 'VISA',
    mastercard: 'Mastercard',
    amex: 'AMEX',
    generic: 'CARD',
};
/**
 * A realistic card face: a two-stop gradient painted from **theme ramp tokens**
 * (never literal brand colors), the masked number in a monospace-tabular row,
 * and holder / expiry / network footer. The gradient uses
 * `expo-linear-gradient` when present and degrades to a solid token fill
 * otherwise. `variant` picks the ramp (`primary` / `accent` / `dark`-neutral);
 * the number is masked to the last four via {@link maskCardNumber}. Foreground
 * text uses the ramp's on-color token so it stays legible on the fill.
 */
function CreditCardView({ holder, number, expiry, brand = 'generic', variant = 'primary', appearance = 'classic', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Optional frame around the gradient face (elevation / border). The face
    // itself is untouched; classic adds nothing. Radius/padding stay AFTER.
    const surface = appearance === 'classic' ? undefined : (0, appearance_1.appearanceStyle)(appearance, colors, tokens);
    const ramp = variant === 'accent' ? tokens.ramps.accent : variant === 'dark' ? tokens.ramps.neutral : tokens.ramps.primary;
    // Two-stop diagonal from a mid ramp step to a darker one — all token hexes.
    const stops = [ramp[500], ramp[variant === 'dark' ? 900 : 700]];
    // On a saturated fill the light on-primary/on-accent token reads best.
    const ink = variant === 'accent' ? colors.onAccent : variant === 'dark' ? colors.onSurface : colors.onPrimary;
    const inkMuted = ink;
    return ((0, jsx_runtime_1.jsxs)(Gradient_1.Gradient, { colors: stops, style: [
            surface,
            {
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                minHeight: 190,
                justifyContent: 'space-between',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: `${BRAND_LABEL[brand]} card ending ${number.replace(/\D+/g, '').slice(-4) || 'unknown'}`, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                width: 40,
                                height: 28,
                                borderRadius: tokens.radius.sm,
                                backgroundColor: colors.warn,
                                opacity: 0.9,
                            } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700', letterSpacing: 1 }, children: BRAND_LABEL[brand] })] }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: ink,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '600',
                    letterSpacing: 2,
                    fontVariant: ['tabular-nums'],
                }, children: (0, mask_1.maskCardNumber)(number) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkMuted, fontSize: tokens.typography.scale.xs, opacity: 0.8 }, children: "CARD HOLDER" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: holder.toUpperCase() })] }), expiry != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkMuted, fontSize: tokens.typography.scale.xs, opacity: 0.8 }, children: "EXPIRES" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: expiry })] })) : null] })] }));
}
//# sourceMappingURL=CreditCardView.js.map