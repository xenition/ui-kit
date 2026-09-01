"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShareSheetV4 = ShareSheetV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * ShareSheet — **V4** "feed" design. A clean, airy bottom share surface: a
 * dimmed backdrop and a rounded panel holding a wrapping grid of share targets
 * — each a soft-primary tinted glyph disc with a ≥44px tap target and a label —
 * plus a full-width copy-link/Cancel row. Same props/behavior as
 * {@link ShareSheetProps} (self-contained overlay, empty-list handling,
 * `onSelect`/`onClose`); token-only colors via `useXenitionTheme()`. The
 * `appearance` prop is accepted for parity but the panel stays on the clean
 * surface in the feed line.
 */
function ShareSheetV4({ visible, title = 'Share', subtitle, targets, onSelect, onClose, emptyLabel = 'No share options available', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // A short rise as the panel appears from the bottom edge.
    const enter = (0, motion_1.useEnter)({ translateY: 16 });
    const softPrimary = (0, color_1.withAlpha)(colors.primary, 0.12);
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityViewIsModal: true, style: [{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, justifyContent: 'flex-end' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Dismiss", onPress: onClose, style: { position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, backgroundColor: colors.onSurface, opacity: 0.4 } }), (0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "menu", style: {
                    opacity: enter.opacity,
                    transform: enter.transform,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderTopLeftRadius: tokens.radius.lg,
                    borderTopRightRadius: tokens.radius.lg,
                    padding: tokens.spacing.lg,
                    gap: tokens.spacing.lg,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '800' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] }), targets.length === 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, paddingVertical: tokens.spacing.md }, children: emptyLabel })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.lg }, children: targets.map((t) => ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "menuitem", accessibilityLabel: t.label, onPress: onSelect ? () => onSelect(t.id) : undefined, style: ({ pressed }) => ({ alignItems: 'center', gap: tokens.spacing.xs, width: 72, opacity: pressed ? 0.85 : 1 }), children: ({ pressed }) => ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            width: 56,
                                            height: 56,
                                            borderRadius: tokens.radius.full,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.2) : softPrimary,
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xl }, children: t.icon ?? '↗' }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '500', textAlign: 'center' }, children: t.label })] })) }, t.id))) })), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Cancel", onPress: onClose, style: ({ pressed }) => ({
                            alignItems: 'center',
                            minHeight: 44,
                            justifyContent: 'center',
                            paddingVertical: tokens.spacing.md,
                            borderRadius: tokens.radius.md,
                            backgroundColor: pressed ? (0, color_1.withAlpha)(colors.primary, 0.2) : softPrimary,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: "Cancel" }) })] })] }));
}
//# sourceMappingURL=ShareSheetV4.js.map