"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PledgeRowV4 = PledgeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Badge_1 = require("../primitives/Badge");
const Avatar_1 = require("../primitives/Avatar");
const Icon_1 = require("../primitives/Icon");
const Button_1 = require("../primitives/Button");
const color_1 = require("../primitives/internal/color");
const internal_1 = require("./internal");
const STATUS = {
    pending: { tone: 'warn', label: 'Pending', glyph: '⏳' },
    fulfilled: { tone: 'success', label: 'Fulfilled', glyph: '✅' },
    overdue: { tone: 'danger', label: 'Overdue', glyph: '⚠️' },
    declined: { tone: 'neutral', label: 'Declined', glyph: '🚫' },
};
/**
 * PledgeRow — **V4** "rally" design. An elevated, rounded pledge-ledger row on a
 * clean surface (no gradient): a leading donor avatar in a soft-primary well, a
 * bold donor name with a glyph + labelled status {@link Badge} (never color
 * alone), an optional due-date chip, a trailing bold pledged amount (integer
 * cents → `formatMoney`), and — for still-open (pending/overdue) pledges — a
 * "Mark fulfilled" action. The whole row is pressable via `onPress`. Identical
 * props/behavior to {@link PledgeRowProps}. Token-only colors via
 * `useXenitionTheme()`.
 */
function PledgeRowV4({ donorName, avatarUrl, amountCents, currency = 'USD', status = 'pending', dueLabel, onFulfill, onPress, loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS[status];
    const open = status === 'pending' || status === 'overdue';
    const label = `${donorName}, ${(0, internal_1.formatMoney)(amountCents, currency)} pledge, ${meta.label}`;
    const containerStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            minHeight: 44,
            borderRadius: tokens.radius.lg,
            borderWidth: 1,
            borderColor: colors.border,
            backgroundColor: colors.card,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 6 },
            elevation: 3,
        },
        style,
    ];
    const inner = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 44, width: 44, borderRadius: 22, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { name: donorName, src: avatarUrl, size: "sm" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: donorName }), (0, jsx_runtime_1.jsx)(Badge_1.Badge, { tone: meta.tone, variant: "soft", children: `${meta.glyph} ${meta.label}` })] }), dueLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', gap: tokens.spacing.xs, paddingVertical: 2, paddingHorizontal: tokens.spacing.sm, borderRadius: tokens.radius.lg, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: [(0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: "\uD83D\uDCC5", size: "xs" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: dueLabel })] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(amountCents, currency) }), open && onFulfill ? ((0, jsx_runtime_1.jsx)(Button_1.Button, { size: "sm", variant: "soft", tone: "success", loading: loading, onPress: onFulfill, children: "Mark fulfilled" })) : null] })] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: label, onPress: onPress, style: ({ pressed }) => [containerStyle, { opacity: pressed ? 0.9 : 1 }], children: inner }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: label, style: containerStyle, children: inner }));
}
//# sourceMappingURL=PledgeRowV4.js.map