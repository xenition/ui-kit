"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentConfirmation = PaymentConfirmation;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * The payment success surface — the module's peak moment and the one full
 * brand-gradient ground beyond the account header. A frosted check badge, the
 * headline, and the paid amount (integer cents via `formatMoney`) sit centered
 * in near-white ink over the gradient; the confirmation #, method, and date read
 * as frosted rows. "Done" (a near-white pill) and "View receipt" (a ghost
 * button) each appear only when their handler is set. Every color derives from
 * the brand ramp — no literals, light + dark.
 */
function PaymentConfirmation({ amountCents, currency = 'USD', confirmationNumber, method, date, formatMoney: format = format_1.formatMoney, title = 'Payment successful', onDone, onViewReceipt, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, brand_1.brandInk)(r);
    const inkSoft = (0, brand_1.brandInkSoft)(r);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const Row = ({ label, value }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            borderRadius: tokens.radius.md,
            backgroundColor: (0, brand_1.brandTile)(r),
            borderWidth: 1,
            borderColor: (0, brand_1.brandBorder)(r),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', flexShrink: 1, textAlign: 'right' }, children: value })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.xl, overflow: 'hidden', alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "image", accessibilityLabel: title, style: {
                        width: 64,
                        height: 64,
                        borderRadius: tokens.radius.full,
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: (0, brand_1.brandTile)(r, 0.22),
                        borderWidth: 1,
                        borderColor: (0, brand_1.brandBorder)(r),
                    }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2713", size: "2xl", style: { color: ink } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '800', marginTop: tokens.spacing.md, textAlign: 'center' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, accessibilityLabel: `Paid ${format(amount, currency)}`, style: { color: ink, fontSize: tokens.typography.scale['3xl'], fontWeight: '800', letterSpacing: -1, marginTop: tokens.spacing.xs }, children: format(amount, currency) }), confirmationNumber || method || date ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [confirmationNumber ? (0, jsx_runtime_1.jsx)(Row, { label: "Confirmation", value: confirmationNumber }) : null, method ? (0, jsx_runtime_1.jsx)(Row, { label: "Method", value: method }) : null, date ? (0, jsx_runtime_1.jsx)(Row, { label: "Date", value: date }) : null] })) : null, onDone || onViewReceipt ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignSelf: 'stretch', gap: tokens.spacing.sm, marginTop: tokens.spacing.lg }, children: [onDone ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Done", onPress: onDone, style: ({ pressed }) => ({
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                backgroundColor: ink,
                                opacity: pressed ? 0.9 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: "Done" }) })) : null, onViewReceipt ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "View receipt", onPress: onViewReceipt, style: ({ pressed }) => ({
                                paddingVertical: tokens.spacing.md,
                                borderRadius: tokens.radius.md,
                                alignItems: 'center',
                                borderWidth: 1,
                                borderColor: (0, brand_1.brandBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: "View receipt" }) })) : null] })) : null] }) }));
}
//# sourceMappingURL=PaymentConfirmation.js.map