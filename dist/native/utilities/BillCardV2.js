"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillCardV2 = BillCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
const format_1 = require("./internal/format");
const status_1 = require("./internal/status");
/**
 * BillCard, redesigned (v2): a **lifted hero card**. A tinted header band carries
 * a large utility glyph tile, provider, and a status pill; the body sets the
 * amount big on the left with a bordered **due-date block** (calendar-style tile,
 * tinted danger when overdue) on the right; a full-width pay CTA anchors the
 * bottom. Enters with a fade+rise and springs on press. Distinct at a glance from
 * v1's flat horizontal disc row and v3's dense line. Same props, integer cents,
 * status by glyph+text+tone (never color alone), token-pure.
 */
function BillCardV2({ kind, provider, accountNumber, amountCents, dueDate, status = 'due', currency = 'USD', formatMoney: format = format_1.formatMoney, payLabel = 'Pay now', onPay, paying = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const kd = (0, status_1.utilityKind)(kind);
    const sd = (0, status_1.billStatus)(status);
    const amount = Math.max(0, Math.trunc(amountCents || 0));
    const settled = status === 'paid';
    const overdue = status === 'overdue';
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                overflow: 'hidden',
                ...(0, elevation_1.shadow)('lg', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingVertical: tokens.spacing.md,
                    backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.08),
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 52,
                            height: 52,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: kd.glyph, size: "2xl", accessibilityLabel: `${kd.label} bill` }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: provider }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [kd.label, " \u00B7 ", accountNumber] })] }), (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'flex-end',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.lg,
                    paddingTop: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: settled ? 'Paid' : 'Amount due' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale['3xl'], fontWeight: '700' }, children: format(amount, currency) })] }), dueDate != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            alignItems: 'center',
                            gap: 2,
                            minWidth: 88,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: overdue ? colors.danger : colors.border,
                            backgroundColor: overdue ? (0, format_1.withAlpha)(colors.danger, 0.08) : 'transparent',
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: settled ? 'Paid on' : 'Due' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: overdue ? colors.danger : colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '700',
                                }, children: dueDate })] })) : null] }), onPay != null && !settled ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.lg, paddingTop: tokens.spacing.md, paddingBottom: tokens.spacing.lg }, children: (0, jsx_runtime_1.jsx)(primitives_2.Button, { variant: "primary", tone: overdue ? 'danger' : 'default', onPress: onPay, loading: paying, children: `${payLabel} · ${format(amount, currency)}` }) })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg } }))] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${provider}, ${kd.label} bill, ${sd.label}, ${format(amount, currency)}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=BillCardV2.js.map