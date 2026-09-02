"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BillableTimeRowV4 = BillableTimeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * BillableTimeRow — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow, a date + **tabular-nums** duration
 * eyebrow, the narrative, the timekeeper, a big legible **tabular-nums** amount
 * (money carried as integer cents through the shared `formatMoney`), and a
 * labelled glyph + word billing status (never color alone). When `actionable`
 * and not yet billed, a "Log time" button fires `onLog`. Tappable when `onPress`
 * is set. Reuses the base `variant` (`default` / `compact`). Token-only colors
 * via `useXenitionTheme()`.
 */
function BillableTimeRowV4({ date, description, hours, rateCents, amountCents, currency = 'USD', timekeeper, status = 'draft', variant = 'default', actionable = false, onLog, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const amount = amountCents ?? (0, internal_1.billableCents)(hours, rateCents);
    const canLog = actionable && (status === 'draft' || status === 'unbilled');
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: date }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.xs }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, internal_1.formatHours)(hours) }) })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: compact ? 1 : 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm }, children: description }), !compact && timekeeper ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: timekeeper }) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: (0, internal_1.formatMoney)(amount, currency) }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.BILLABLE_STATUS_META[status], variant: "soft", size: "sm" }) : null] })] }), canLog && onLog ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", onPress: onLog, style: { alignSelf: 'flex-start' }, children: "Log time" })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Time entry ${date}, ${(0, internal_1.formatHours)(hours)}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.8 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=BillableTimeRowV4.js.map