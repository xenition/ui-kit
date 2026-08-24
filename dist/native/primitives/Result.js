"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Result = Result;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("./Icon");
const GLYPH = {
    success: '✓',
    error: '✕',
    empty: '∅',
    '404': '?',
};
/**
 * Full-screen result state — a centered status glyph, title, description, and
 * optional primary action for success / error / empty / 404 outcomes. The glyph
 * tone maps to a semantic token (`success`→success, `error`→danger, `empty` and
 * `404`→muted); title is `onSurface`, description `muted`. The action reuses the
 * primary/`onPrimary` button convention. No literal colors.
 */
function Result({ status = 'success', title, description, actionLabel, onAction, icon, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const iconColor = {
        success: 'success',
        error: 'danger',
        empty: 'muted',
        '404': 'muted',
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: [
            {
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.xl,
                backgroundColor: colors.surface,
            },
            style,
        ], children: [icon != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon })) : ((0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: GLYPH[status], size: "3xl", color: iconColor[status], accessibilityLabel: status })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                    color: colors.onSurface,
                    textAlign: 'center',
                }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, color: colors.muted, textAlign: 'center' }, children: description })) : null, actionLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, onPress: onAction, style: ({ pressed }) => ({
                    marginTop: tokens.spacing.sm,
                    backgroundColor: colors.primary,
                    borderRadius: tokens.radius.md,
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.xl,
                    opacity: pressed ? 0.85 : 1,
                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base, fontWeight: '600', color: colors.onPrimary }, children: actionLabel }) })) : null] }));
}
//# sourceMappingURL=Result.js.map