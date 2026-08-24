"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FamilyMemberRow = FamilyMemberRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const ROLE_META = {
    parent: { label: 'Parent', tone: 'primary' },
    guardian: { label: 'Guardian', tone: 'primary' },
    child: { label: 'Child', tone: 'accent' },
    sibling: { label: 'Sibling', tone: 'accent' },
    grandparent: { label: 'Grandparent', tone: 'neutral' },
    caregiver: { label: 'Caregiver', tone: 'success' },
    other: { label: 'Family', tone: 'neutral' },
};
/**
 * A roster row for a family member: avatar, name, an optional relationship line,
 * a role chip, and an optional presence indicator (dot + "Online"/"Offline"
 * text, never color alone). Pressable when `onPress` is set. Token-only colors.
 */
function FamilyMemberRow({ name, role = 'other', photoUrl, relationLabel, online, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = ROLE_META[role] ?? ROLE_META.other;
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.md,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: photoUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), relationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: relationLabel })) : null, online !== undefined ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    width: 8,
                                    height: 8,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: online ? colors.success : colors.border,
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: online ? 'Online' : 'Offline' })] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }));
    const a11y = `${name}, ${meta.label}${online !== undefined ? `, ${online ? 'online' : 'offline'}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=FamilyMemberRow.js.map