"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContainer = PageContainer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * The outer wrapper for a screen: fills with the `surface` token, applies
 * consistent padding, and (by default) scrolls its content. Renders an optional
 * title/subtitle header with a trailing action. Token-only.
 */
function PageContainer({ title, subtitle, headerAction, scroll = true, children, style, bottomInset = 0, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const header = title ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            gap: tokens.spacing.md,
            marginBottom: tokens.spacing.lg,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "header", style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale['2xl'],
                            fontWeight: '700',
                        }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: subtitle })) : null] }), headerAction ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: headerAction }) : null] })) : null;
    const padding = {
        padding: tokens.spacing.lg,
        paddingBottom: tokens.spacing.lg + bottomInset,
    };
    if (!scroll) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, padding, style], children: [header, children] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: [{ flex: 1, backgroundColor: colors.surface }, style], contentContainerStyle: padding, keyboardShouldPersistTaps: "handled", children: [header, children] }));
}
//# sourceMappingURL=PageContainer.js.map