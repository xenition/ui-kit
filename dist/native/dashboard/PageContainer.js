"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageContainer = PageContainer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
/**
 * The outer wrapper for a screen: fills with the `surface` token, applies
 * consistent padding, and (by default) scrolls its content. Renders an optional
 * title/subtitle header with a trailing action. Token-only.
 */
function PageContainer({ title, subtitle, headerAction, scroll = true, children, style, bottomInset = 0, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Derive top/bottom padding from the device safe-area insets so the screen
    // clears the status bar / notch and home indicator; the explicit `bottomInset`
    // prop stacks on top of the inset. Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
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
        paddingHorizontal: tokens.spacing.lg,
        paddingTop: tokens.spacing.lg + insets.top,
        paddingBottom: tokens.spacing.lg + insets.bottom + bottomInset,
    };
    if (!scroll) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ flex: 1, backgroundColor: colors.surface }, padding, style], children: [header, children] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { style: [{ flex: 1, backgroundColor: colors.surface }, style], contentContainerStyle: padding, keyboardShouldPersistTaps: "handled", children: [header, children] }));
}
//# sourceMappingURL=PageContainer.js.map