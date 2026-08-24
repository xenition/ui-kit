"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActionSheet = ActionSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const react_native_safe_area_context_1 = require("react-native-safe-area-context");
const theme_1 = require("../theme");
/**
 * iOS-style action sheet — a bottom-anchored `Modal` presenting a token-bound
 * list of choices plus a separated Cancel affordance, over a translucent
 * `onSurface` scrim. Distinct from `Drawer(side="bottom")` (arbitrary content)
 * and `Menu` (tap-anchored list) by the iOS grouped list + destructive/cancel
 * convention. Destructive actions use the `danger` token. No literal colors.
 */
function ActionSheet({ open, onClose, title, actions, cancelLabel = 'Cancel', }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Clear the home indicator by adding the bottom safe-area inset to the bottom
    // container's padding. Needs a `SafeAreaProvider` above it (Expo default).
    const insets = (0, react_native_safe_area_context_1.useSafeAreaInsets)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.Modal, { visible: open, transparent: true, animationType: "slide", onRequestClose: onClose, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, justifyContent: 'flex-end' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityLabel: "Close", onPress: onClose, style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.5 } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        padding: tokens.spacing.md,
                        paddingBottom: tokens.spacing.md + insets.bottom,
                        gap: tokens.spacing.sm,
                    }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "menu", style: {
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                overflow: 'hidden',
                            }, children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { paddingVertical: tokens.spacing.md, paddingHorizontal: tokens.spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.muted, textAlign: 'center' }, children: title }) })) : null, actions.map((action, i) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityState: { disabled: action.disabled }, disabled: action.disabled, onPress: () => {
                                        action.onSelect?.();
                                        onClose();
                                    }, style: ({ pressed }) => ({
                                        paddingVertical: tokens.spacing.md,
                                        paddingHorizontal: tokens.spacing.lg,
                                        alignItems: 'center',
                                        borderTopWidth: i === 0 && !title ? 0 : 1,
                                        borderTopColor: colors.border,
                                        opacity: action.disabled ? 0.5 : 1,
                                        backgroundColor: pressed ? colors.border : colors.surface,
                                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                            fontSize: tokens.typography.scale.base,
                                            fontWeight: '500',
                                            color: action.destructive ? colors.danger : colors.primary,
                                        }, children: action.label }) }, i)))] }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: cancelLabel, onPress: onClose, style: ({ pressed }) => ({
                                backgroundColor: colors.surface,
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.lg,
                                paddingVertical: tokens.spacing.md,
                                alignItems: 'center',
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onSurface }, children: cancelLabel }) })] })] }) }));
}
//# sourceMappingURL=ActionSheet.js.map