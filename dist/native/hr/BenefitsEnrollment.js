"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BenefitsEnrollment = BenefitsEnrollment;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * A benefits-plan enrollment card: plan name, benefit type, coverage tier, and
 * per-period cost (integer **cents** via `formatMoney`). Enrollment status is a
 * glyph + word pill (enrolled → success, eligible → primary, never color alone).
 * When `actionable` and not already enrolled, an enroll / change action renders.
 * `compact` drops coverage + deadline. All colors are theme tokens — no
 * literals.
 */
function BenefitsEnrollment({ planName, type, status, coverage, costCents, costPeriod = '/mo', currency = 'USD', enrollBy, actionable = false, variant = 'default', onEnroll, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const typeMeta = internal_1.BENEFIT_TYPE_META[type];
    const showAction = actionable && (status === 'eligible' || status === 'pending');
    const enrolled = status === 'enrolled';
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, children: typeMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: planName })] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: typeMeta.label })] }), (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.BENEFIT_STATUS_META[status], size: "sm" })] }), !compact && coverage ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: coverage })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [costCents != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: (0, internal_1.formatMoney)(costCents, currency) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '400' }, children: costPeriod })] })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), !compact && enrollBy && !enrolled ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Enroll by ", enrollBy] })) : null] }), showAction ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", onPress: onEnroll, children: status === 'pending' ? 'Complete enrollment' : 'Enroll' })) : null] }));
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Benefit ${planName}, ${internal_1.BENEFIT_STATUS_META[status].label}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=BenefitsEnrollment.js.map