"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoadingOverlay = LoadingOverlay;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Blocking loading overlay — an absolute-fill dim layer with a centered spinner
 * (tinted from the `primary` token) and an optional label. The dim is the
 * `onSurface` token faded via opacity; the label card is `surface`. Fills its
 * nearest positioned ancestor, so wrap it in a `position: relative` parent (or
 * let it cover the screen). Announces a polite busy live region. No literals.
 */
function LoadingOverlay({ visible, label, style }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (!visible)
        return null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityLabel: label ?? 'Loading', accessibilityLiveRegion: "polite", style: [
            {
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                alignItems: 'center',
                justifyContent: 'center',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: colors.onSurface,
                    opacity: 0.4,
                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    alignItems: 'center',
                    gap: tokens.spacing.sm,
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                    borderWidth: 1,
                    borderRadius: tokens.radius.lg,
                    paddingVertical: tokens.spacing.lg,
                    paddingHorizontal: tokens.spacing.xl,
                }, children: [(0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { size: "large", color: colors.primary }), label ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, color: colors.onSurface, textAlign: 'center' }, children: label })) : null] })] }));
}
//# sourceMappingURL=LoadingOverlay.js.map