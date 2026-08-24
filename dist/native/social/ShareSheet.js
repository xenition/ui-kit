"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareSheet = ShareSheet;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A bottom share sheet: a dimmed backdrop and a rounded panel holding a grid of
 * share destinations plus a Cancel action. Self-contained overlay (renders
 * `null` while hidden) — the parent owns `visible`. Handles an empty target
 * list. Token-only.
 */
function ShareSheet({ visible, title = 'Share', subtitle, targets, onSelect, onClose, emptyLabel = 'No share options available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityViewIsModal: true, style: [{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onClose, style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.4 } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "menu", style: {
                    backgroundColor: colors.surface,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    borderWidth: 1,
                    borderColor: colors.border,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.md,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), targets.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, paddingVertical: tokens.spacing.md }, children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.md }, children: targets.map((t) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityLabel: t.label, onPress: onSelect ? () => onSelect(t.id) : undefined, style: ({ pressed }) => ({ alignItems: 'center', gap: tokens.spacing.xs, width: 72, opacity: pressed ? 0.7 : 1 }), children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                        width: 52,
                                        height: 52,
                                        borderRadius: tokens.radius.full,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        backgroundColor: colors.surface,
                                        borderWidth: 1,
                                        borderColor: colors.border,
                                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.xl }, children: t.icon ?? '↗' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: t.label })] }, t.id))) })), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Cancel", onPress: onClose, style: ({ pressed }) => ({
                            alignItems: 'center',
                            paddingVertical: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: colors.border,
                            opacity: pressed ? 0.8 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "Cancel" }) })] })] }));
}
//# sourceMappingURL=ShareSheet.js.map