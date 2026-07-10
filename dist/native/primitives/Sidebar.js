"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sidebar = Sidebar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Vertical nav rail — the native mirror of the web `Sidebar`. A `brand` slot on
 * top, one or more groups of token-styled `Pressable` nav rows with an active
 * state, and an optional `footer`. Used as a persistent rail on tablet or inside
 * the `AppShell` drawer on phones. No literal colors.
 */
function Sidebar({ brand, items, groups, footer, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const resolvedGroups = groups ?? (items ? [{ items }] : []);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flex: 1,
                backgroundColor: colors.surface,
                borderRightWidth: 1,
                borderColor: colors.border,
                paddingHorizontal: tokens.spacing.sm,
                paddingVertical: tokens.spacing.lg,
            },
            style,
        ], children: [brand != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.sm, marginBottom: tokens.spacing.md }, children: typeof brand === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: brand })) : (brand) })) : null, (0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { style: { flex: 1 }, contentContainerStyle: { gap: tokens.spacing.lg }, children: resolvedGroups.map((group, gi) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [group.label != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.muted,
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '600',
                                textTransform: 'uppercase',
                                letterSpacing: 0.6,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingBottom: tokens.spacing.xs,
                            }, children: group.label })) : null, group.items.map((item, ii) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityState: { selected: item.active }, onPress: item.onSelect, style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.sm,
                                borderRadius: tokens.radius.md,
                                paddingHorizontal: tokens.spacing.md,
                                paddingVertical: tokens.spacing.sm,
                                backgroundColor: item.active ? colors.primary : 'transparent',
                            }, children: [item.icon != null ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: item.icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        color: item.active ? colors.onPrimary : colors.onSurface,
                                        fontSize: tokens.typography.scale.sm,
                                        fontWeight: '500',
                                    }, children: item.label })] }, ii)))] }, gi))) }), footer != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderTopWidth: 1, borderColor: colors.border, paddingTop: tokens.spacing.md }, children: footer })) : null] }));
}
//# sourceMappingURL=Sidebar.js.map