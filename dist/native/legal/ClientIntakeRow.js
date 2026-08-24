"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIntakeRow = ClientIntakeRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A prospective-client intake row: name, matter type, intake stage and
 * conflict-check pills (each a glyph + word so state never rests on color
 * alone). When `actionable` and still open, an accept/decline row is shown. All
 * colors are theme tokens — no literals.
 */
function ClientIntakeRow({ name, practiceArea, status = 'new', conflict, source, summary, avatarUrl, variant = 'default', actionable = false, onAccept, onDecline, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const decided = status === 'retained' || status === 'declined';
    const showActions = actionable && !decided;
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
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), source ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: source })) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.INTAKE_STATUS_META[status], size: "sm" })] }), !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }, children: [practiceArea ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PRACTICE_AREA_META[practiceArea], variant: "soft", size: "sm" }) : null, conflict ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CONFLICT_CHECK_META[conflict], variant: "soft", size: "sm" }) : null] })) : null, !compact && summary ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: summary })) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", tone: "success", disabled: conflict === 'conflict', onPress: onAccept, children: "Accept" })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", tone: "danger", onPress: onDecline, children: "Decline" })) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Intake ${name}`, onPress: onPress, testID: testID, children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: content });
}
//# sourceMappingURL=ClientIntakeRow.js.map