"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyState = EmptyState;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Generic empty / no-results state — the native mirror of the web
 * `EmptyState`. Centered icon slot, muted copy, optional action. Token-only
 * (dashed `border`, `surface` background, `muted` text). Domain-agnostic.
 */
function EmptyState({ icon, title, description, action, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderStyle: 'dashed',
                borderColor: colors.border,
                backgroundColor: colors.surface,
                paddingHorizontal: tokens.spacing.lg,
                paddingVertical: tokens.spacing['2xl'],
            },
            style,
        ], children: [icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: icon }) : null, typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '600',
                    textAlign: 'center',
                }, children: title })) : (title), description ? (typeof description === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.sm,
                    textAlign: 'center',
                    maxWidth: 320,
                }, children: description })) : (description)) : null, action ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.sm }, children: action }) : null] }));
}
//# sourceMappingURL=EmptyState.js.map