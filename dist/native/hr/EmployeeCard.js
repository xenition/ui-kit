"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCard = EmployeeCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const StatusPill_1 = require("./StatusPill");
const internal_1 = require("./internal");
/**
 * Profile card for a single employee: avatar, name, title, department, and
 * employment-type / status chips (each a glyph + word so state never rests on
 * color alone). `compact` trims to a single row for lists; `detailed` adds
 * location and start date. Quick contact `actions` render as token-tinted
 * buttons. Renders a `loading` skeleton on demand. All colors are theme tokens
 * — no literals.
 */
function EmployeeCard({ name, title, department, avatarUrl, employmentType, status, location, startDate, actions, variant = 'default', loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const detailed = variant === 'detailed';
    const body = ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "outlined", padding: compact ? 'sm' : 'md', style: [{ gap: tokens.spacing.sm }, style], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading employee", style: { flexDirection: 'row', gap: tokens.spacing.sm, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 40, height: 40, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.base, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: compact ? 'sm' : 'md', name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), title ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: [title, department ? ` · ${department}` : ''] })) : department ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: department })) : null] }), status ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYEE_STATUS_META[status], size: "sm" }) : null] }), !compact && (employmentType || detailed) ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center', gap: tokens.spacing.xs }, children: [employmentType ? (0, jsx_runtime_1.jsx)(StatusPill_1.StatusPill, { meta: internal_1.EMPLOYMENT_META[employmentType], variant: "soft", size: "sm" }) : null, detailed && location ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", location] })) : null, detailed && startDate ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["Since ", startDate] })) : null] })) : null, !compact && actions && actions.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: actions.map((a) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a.label, onPress: a.onPress, style: ({ pressed }) => ({
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.xs / 2,
                            paddingVertical: tokens.spacing.xs,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            backgroundColor: (0, color_1.withAlpha)(colors.primary, pressed ? 0.2 : 0.1),
                        }), children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm }, children: a.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: a.label })] }, a.key))) })) : null] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Employee ${name}`, onPress: onPress, testID: testID, children: body }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: body });
}
//# sourceMappingURL=EmployeeCard.js.map