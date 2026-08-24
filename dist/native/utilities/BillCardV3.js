"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillCardV3 = BillCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * BillCard, redesigned (v3): a **dense scan line**. A small state dot leads, the
 * provider and a middot-joined `line · account · status · due` caption share the
 * flexible middle, and the amount hugs the right with an optional compact pay
 * button beneath it. No card, no glyph tile — tuned for long bill lists. Distinct
 * at a glance from v1/v2. Same props; status is dot + glyph + label text (never
 * color alone); integer cents; token-pure.
 */
function BillCardV3({ kind, provider, accountNumber, amountCents, dueDate, status = 'due', currency = 'USD', formatMoney: format = format_1.formatMoney, payLabel = 'Pay', onPay, paying = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.billStatus)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const settled = status === 'paid';
    const overdue = status === 'overdue';
    const dotColor = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const caption = [`${sd.glyph} ${sd.label}`, kd.label, dueDate].filter((s) => s != null).join(' · ');
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: dotColor } }), (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "sm", accessibilityLabel: `${kd.label} bill` }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: provider }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `${caption} · ${accountNumber}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: overdue ? colors.danger : colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '700',
                        }, children: format(amount, currency) }), onPay != null && !settled ? ((0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", size: "sm", tone: overdue ? 'danger' : 'default', onPress: onPay, loading: paying, children: payLabel })) : null] })] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=BillCardV3.js.map