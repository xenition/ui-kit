"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AccountHeader = AccountHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * The account home header: a calm brand-gradient panel with the account name, the
 * current balance (integer cents via `formatMoney`), the next due date + an
 * optional AutoPay chip, and a pay CTA. When the balance is `<= 0` it flips to an
 * "all paid up" state. Near-white ink and the gradient derive from the brand
 * ramp — no literals, restyles from the seed, light + dark. The one vivid surface
 * on an otherwise clean, trust-first screen.
 */
function AccountHeader({ accountName, address, balanceCents, currency = 'USD', dueDate, autoPay = false, formatMoney: format = format_1.formatMoney, payLabel = 'Pay bill', onPay, onProfile, avatarGlyph = '👤', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, brand_1.brandInk)(r);
    const inkSoft = (0, brand_1.brandInkSoft)(r);
    const owed = Math.max(0, Math.trunc(balanceCents || 0));
    const settled = owed <= 0;
    const Chip = ({ glyph, text }) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
            paddingHorizontal: tokens.spacing.md,
            paddingVertical: tokens.spacing.xs,
            borderRadius: tokens.radius.full,
            backgroundColor: (0, brand_1.brandTile)(r),
            borderWidth: 1,
            borderColor: (0, brand_1.brandBorder)(r),
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: text })] }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandGradient)(r), style: { borderRadius: tokens.radius.lg, padding: tokens.spacing.lg, overflow: 'hidden' }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: accountName }), address ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: inkSoft, fontSize: tokens.typography.scale.sm, marginTop: 2 }, children: address })) : null] }), onProfile ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Open profile", onPress: onProfile, style: ({ pressed }) => ({
                                width: 44,
                                height: 44,
                                borderRadius: tokens.radius.full,
                                alignItems: 'center',
                                justifyContent: 'center',
                                backgroundColor: (0, brand_1.brandTile)(r, 0.22),
                                borderWidth: 1,
                                borderColor: (0, brand_1.brandBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: avatarGlyph }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { marginTop: tokens.spacing.lg }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: settled ? 'Balance' : 'Current balance' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: ink, fontSize: tokens.typography.scale['3xl'] * 1.3, fontWeight: '800', letterSpacing: -1, marginTop: 2 }, children: settled ? format(0, currency) : format(owed, currency) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, marginTop: tokens.spacing.md }, children: [settled ? ((0, jsx_runtime_1.jsx)(Chip, { glyph: "\u2713", text: "All paid up" })) : dueDate ? ((0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDDD3\uFE0F", text: `Due ${dueDate}` })) : null, autoPay ? (0, jsx_runtime_1.jsx)(Chip, { glyph: "\uD83D\uDD01", text: "AutoPay on" }) : null] }), onPay && !settled ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${payLabel}, ${format(owed, currency)}`, onPress: onPay, style: ({ pressed }) => ({
                        marginTop: tokens.spacing.lg,
                        paddingVertical: tokens.spacing.md,
                        borderRadius: tokens.radius.md,
                        alignItems: 'center',
                        backgroundColor: ink,
                        opacity: pressed ? 0.9 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: `${payLabel} · ${format(owed, currency)}` }) })) : null] }) }));
}
//# sourceMappingURL=AccountHeader.js.map