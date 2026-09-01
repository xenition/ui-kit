"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatementRow = StatementRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
const GradientSurface_1 = require("./internal/GradientSurface");
const brand_1 = require("./internal/brand");
/**
 * One line in a statement history — the clean V4 look: a brand-gradient disc with
 * a document glyph (the signature touch), the period with an optional status pill
 * carrying text + glyph + color, and the total in integer cents via `formatMoney`.
 * An optional download icon button renders only when `onDownload` is supplied, and
 * the whole row becomes a button when `onPress` is set. Token-only colors.
 */
function StatementRow({ period, amountCents, currency = 'USD', status, formatMoney: format = format_1.formatMoney, onDownload, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const r = tokens.ramps;
    const sd = status != null ? (0, status_1.billStatus)(status) : null;
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const card = {
        backgroundColor: colors.card,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.1,
        shadowRadius: 14,
        shadowOffset: { width: 0, height: 6 },
        elevation: 3,
    };
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [card, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, brand_1.brandDisc)(r), style: {
                    width: 44,
                    height: 44,
                    borderRadius: tokens.radius.md,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\uD83D\uDCC4", size: "lg", accessibilityLabel: "Statement", style: { color: (0, brand_1.brandInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: period }), sd != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: format(amount, currency) }), onDownload != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Download statement", onPress: onDownload, style: ({ pressed }) => ({
                            width: 36,
                            height: 36,
                            borderRadius: tokens.radius.full,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: colors.muted,
                            opacity: pressed ? 0.7 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: "\u2B07", color: "onSurface" }) })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Statement ${period}, ${format(amount, currency)}${sd != null ? `, ${sd.label}` : ''}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: row }));
}
//# sourceMappingURL=StatementRow.js.map