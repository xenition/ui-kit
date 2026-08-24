"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadDivider = UnreadDivider;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Full-width rule marking the first unread message in a thread — the "New
 * messages" line. Uses the primary token so it reads as an active marker.
 * Announced as a header. No literal colors.
 */
function UnreadDivider({ label = 'Unread messages', count, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const text = count != null && count > 0 ? `${count} ${label}` : label;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "header", accessibilityLabel: text, style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.xs,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: colors.primary, opacity: 0.5 } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.primary,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: '600',
                }, children: text }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: colors.primary, opacity: 0.5 } })] }));
}
//# sourceMappingURL=UnreadDivider.js.map