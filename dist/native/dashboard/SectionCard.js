"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionCard = SectionCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A titled card wrapper: a header row (title + optional subtitle + trailing
 * action) above a body slot, inside a bordered `surface` card. The standard
 * container for grouping dashboard content. Token-only.
 */
function SectionCard({ title, subtitle, action, divided = false, children, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: tokens.spacing.sm,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.lg,
                                    fontWeight: '700',
                                }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action }) : null] }), divided ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { children: children })] }));
}
//# sourceMappingURL=SectionCard.js.map