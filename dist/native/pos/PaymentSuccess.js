"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentSuccess = PaymentSuccess;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const internal_1 = require("./internal");
const GradientSurface_1 = require("./internal/GradientSurface");
const register_1 = require("./internal/register");
/**
 * PaymentSuccess — the POS V4 "register" **peak-end**: the payment-complete
 * celebration. A two-hue celebratory gradient (`registerCelebrate`, accent →
 * primary) carries a big frosted ✓ glyph, the headline, and the **big near-white
 * amount** (integer cents via `formatMoney`). The tender `method` and any cash
 * `changeDueCents` read as frosted glass tiles; "Print receipt" / "Email receipt"
 * and "New sale" appear only when their handler is set. Every color derives from
 * the brand ramp via `useXenitionTheme()` — no literals, light + dark safe.
 */
function PaymentSuccess({ amountCents, currency = 'USD', method, changeDueCents, title = 'Payment complete', onReceipt, onEmailReceipt, onNewSale, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, register_1.registerInk)(r);
    const inkSoft = (0, register_1.registerInkSoft)(r);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const change = Math.max(0, Math.trunc(changeDueCents || 0));
    const Tile = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            minWidth: 0,
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: (0, register_1.registerTile)(r),
            borderWidth: 1,
            borderColor: (0, register_1.registerBorder)(r),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: value })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, register_1.registerCelebrate)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.xl, overflow: 'hidden', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "image", accessibilityLabel: title, style: {
                        width: 64,
                        height: 64,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, register_1.registerTile)(r, 0.22),
                        borderWidth: 1,
                        borderColor: (0, register_1.registerBorder)(r),
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800' }, children: "\u2713" }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', marginTop: tokens.spacing.md }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityLabel: `Charged ${(0, internal_1.formatMoney)(amount, currency)}`, allowFontScaling: false, style: {
                        color: ink,
                        fontSize: tokens.typography.scale['3xl'] * 1.35,
                        fontWeight: '800',
                        letterSpacing: -1,
                        marginTop: tokens.spacing.xs,
                    }, children: (0, internal_1.formatMoney)(amount, currency) }), method || change > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg, width: '100%' }, children: [method ? (0, jsx_runtime_1.jsx)(Tile, { label: "Method", value: method }) : null, change > 0 ? (0, jsx_runtime_1.jsx)(Tile, { label: "Change due", value: (0, internal_1.formatMoney)(change, currency) }) : null] })) : null, onReceipt || onEmailReceipt || onNewSale ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: '100%', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [onReceipt ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Print receipt", onPress: onReceipt, style: ({ pressed }) => ({
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Print receipt" }) })) : null, onEmailReceipt ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Email receipt", onPress: onEmailReceipt, style: ({ pressed }) => ({
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: (0, register_1.registerBorder)(r),
                                backgroundColor: (0, register_1.registerTile)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "Email receipt" }) })) : null, onNewSale ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "New sale", onPress: onNewSale, style: ({ pressed }) => ({
                                minHeight: 44,
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                justifyContent: 'center',
                                opacity: pressed ? 0.7 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "New sale" }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=PaymentSuccess.js.map