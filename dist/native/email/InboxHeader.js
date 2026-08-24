"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InboxHeader = InboxHeader;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * Top bar for an inbox / mailbox screen — optional back button, the folder
 * title with an unread count, an optional "Syncing…" caption, and a row of
 * trailing icon actions. Uses the `header` role and token-bound surface/border.
 * Data + callbacks only. No literal colors.
 */
function InboxHeader({ title, unreadCount = 0, onBack, actions, syncing = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeActions = actions ?? [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "header", style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [onBack ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Back", onPress: onBack, hitSlop: 8, style: ({ pressed }) => ({ padding: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2039", size: "2xl", color: "onSurface" }) })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: title }), unreadCount > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: unreadCount > 999 ? '999+' : String(unreadCount) })) : null] }), syncing ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "Syncing\u2026" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: safeActions.map((a) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a.label, onPress: a.onPress, hitSlop: 8, style: ({ pressed }) => ({ padding: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: a.glyph, size: "xl", color: "onSurface" }) }, a.id))) })] }));
}
//# sourceMappingURL=InboxHeader.js.map