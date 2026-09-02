"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientIntakeRowV4 = ClientIntakeRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * ClientIntakeRow — **V4** "chambers" design (native twin of the web V4). An
 * elevated rounded card with a soft shadow, an avatar + name + source line, a
 * labelled glyph + word intake-stage pill (never color alone), a soft-primary
 * chip strip carrying practice area + conflict-check, and an optional summary.
 * When `actionable` and still open, an accept/decline row of buttons is shown
 * (Accept disabled on a hard conflict). Tappable when `onPress` is set. Reuses
 * the base `variant` (`default` / `compact`). Token-only colors via
 * `useXenitionTheme()`.
 */
function ClientIntakeRowV4({ name, practiceArea, status = 'new', conflict, source, summary, avatarUrl, variant = 'default', actionable = false, onAccept, onDecline, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const decided = status === 'retained' || status === 'declined';
    const showActions = actionable && !decided;
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
    const content = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: name }), source ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: source }) : null] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.INTAKE_STATUS_META[status], variant: "soft", size: "sm" })] }), !compact && (practiceArea || conflict) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [practiceArea ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.PRACTICE_AREA_META[practiceArea], variant: "soft", size: "sm" }) : null, conflict ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.CONFLICT_CHECK_META[conflict], variant: "soft", size: "sm" }) : null] })) : null, !compact && summary ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: summary }) : null, showActions ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [onAccept ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "primary", disabled: conflict === 'conflict', onPress: onAccept, children: "Accept" })) : null, onDecline ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "outline", onPress: onDecline, children: "Decline" })) : null] })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Intake ${name}`, onPress: onPress, testID: testID, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style], children: content }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, style: [shell, style], children: content });
}
//# sourceMappingURL=ClientIntakeRowV4.js.map