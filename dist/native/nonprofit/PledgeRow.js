"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PledgeRow = PledgeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Button_1 = require("../primitives/Button");
const internal_1 = require("./internal");
const STATUS = {
    pending: { tone: 'warn', label: 'Pending' },
    fulfilled: { tone: 'success', label: 'Fulfilled' },
    overdue: { tone: 'danger', label: 'Overdue' },
    declined: { tone: 'neutral', label: 'Declined' },
};
/**
 * A single pledge in a campaign ledger: donor avatar + name, the pledged amount
 * (integer cents → `formatMoney`), a status badge, and — for still-open pledges
 * — a "Mark fulfilled" action. Status is carried by both the badge text and
 * `accessibilityLabel`, never color alone. All colors come from the compiled
 * theme tokens — no literal colors.
 */
function PledgeRow({ donorName, avatarUrl, amountCents, currency = 'USD', status = 'pending', dueLabel, onFulfill, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS[status];
    const open = status === 'pending' || status === 'overdue';
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: donorName, src: avatarUrl, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: donorName }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, children: meta.label })] }), dueLabel ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: dueLabel }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(amountCents, currency) }), open && onFulfill ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", tone: "success", loading: loading, onPress: onFulfill, children: "Mark fulfilled" })) : null] })] }));
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
        },
        style,
    ];
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${donorName}, ${(0, internal_1.formatMoney)(amountCents, currency)} pledge, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [rowStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: `${donorName}, ${(0, internal_1.formatMoney)(amountCents, currency)} pledge, ${meta.label}`, style: rowStyle, children: inner }));
}
//# sourceMappingURL=PledgeRow.js.map