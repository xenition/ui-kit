"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmployeeCardV3 = EmployeeCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const motion_1 = require("../primitives/internal/motion");
const internal_1 = require("./internal");
/**
 * EmployeeCard, design **V3** — a compact directory row. A small avatar, name +
 * title on one line, and the status carried by a leading tone glyph plus a
 * trailing employment word — dense enough to stack many per screen. Same Props
 * as {@link EmployeeCard}; the card chrome is dropped for a hairline divider
 * row. Press-scales on tap; token-pure (no literal colors).
 */
function EmployeeCardV3({ name, title, department, avatarUrl, employmentType, status, loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const statusMeta = status ? internal_1.EMPLOYEE_STATUS_META[status] : undefined;
    const row = ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: [
            {
                transform: [{ scale: press.scale }],
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading employee", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: tokens.radius.full, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '50%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), title || department ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [title, department].filter(Boolean).join(' · ') })) : null] }), employmentType ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: internal_1.EMPLOYMENT_META[employmentType].label })) : null, statusMeta ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: statusMeta.label, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: (0, internal_1.toneColor)(colors, statusMeta.tone), fontSize: tokens.typography.scale.sm }, children: statusMeta.glyph }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: statusMeta.label })] })) : null] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Employee ${name}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=EmployeeCardV3.js.map