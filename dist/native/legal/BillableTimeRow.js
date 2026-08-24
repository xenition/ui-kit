"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillableTimeRow = BillableTimeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StatusPill_1 = require("./StatusPill");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * One billable time entry: date, narrative, duration, and the computed amount.
 * Money is carried as integer **cents** (computed from `hours × rateCents` when
 * `amountCents` is absent) and rendered through the shared `formatMoney` for a
 * stable 2-decimal string. Billing status is a glyph + word pill so it never
 * rests on color alone. When `actionable` and not yet billed, a "Log time"
 * button fires `onLog`. All colors are theme tokens — no literals.
 */
function BillableTimeRow({ date, description, hours, rateCents, amountCents, currency = 'USD', timekeeper, status = 'draft', variant = 'default', actionable = false, onLog, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const amount = amountCents ?? (0, internal_1.billableCents)(hours, rateCents);
    const canLog = actionable && (status === 'draft' || status === 'unbilled');
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.xs,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: date }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: (0, internal_1.formatHours)(hours) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: description }), !compact && timekeeper ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timekeeper })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: (0, internal_1.formatMoney)(amount, currency) }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.BILLABLE_STATUS_META[status], variant: "inline", size: "sm" }) : null] })] }), canLog && onLog ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onPress: onLog, style: { alignSelf: 'flex-start' }, children: "Log time" })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Time entry ${date}, ${(0, internal_1.formatHours)(hours)}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=BillableTimeRow.js.map