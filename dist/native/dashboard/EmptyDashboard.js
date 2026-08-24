"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmptyDashboard = EmptyDashboard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A first-run / empty dashboard state (design.md §15): a centered headline, a
 * short guiding message, and exactly one dominant action. Illustration-less by
 * default. Token-only.
 */
function EmptyDashboard({ title, message, actionLabel, onAction, icon, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: title, style: [
            {
                alignItems: 'center',
                justifyContent: 'center',
                gap: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.xl,
                paddingVertical: tokens.spacing['2xl'],
            },
            style,
        ], children: [icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginBottom: tokens.spacing.sm }, children: icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '700',
                    textAlign: 'center',
                }, children: title }), message ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.muted,
                    fontSize: tokens.typography.scale.base,
                    textAlign: 'center',
                    maxWidth: 340,
                }, children: message })) : null, actionLabel && onAction ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { marginTop: tokens.spacing.md }, children: (0, jsx_runtime_1.jsx)(primitives_1.Button, { onPress: onAction, children: actionLabel }) })) : null] }));
}
//# sourceMappingURL=EmptyDashboard.js.map