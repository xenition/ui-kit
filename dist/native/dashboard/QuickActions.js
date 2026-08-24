"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuickActions = QuickActions;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A grid of labelled quick-action buttons — the shortcut launcher on a
 * dashboard home. Each tile is a square-ish token-bound button with an optional
 * icon above the label. Token-only.
 */
function QuickActions({ actions, title, columns = 3, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const basis = `${Math.floor(100 / columns) - 2}%`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ gap: tokens.spacing.sm }, style], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.lg,
                    fontWeight: '700',
                }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm }, children: actions.map((action) => ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: action.label, accessibilityState: { disabled: !!action.disabled }, disabled: action.disabled, onPress: action.onPress, style: ({ pressed }) => ({
                        flexGrow: 1,
                        flexBasis: basis,
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: tokens.spacing.xs,
                        paddingVertical: tokens.spacing.lg,
                        paddingHorizontal: tokens.spacing.sm,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.border,
                        backgroundColor: colors.surface,
                        opacity: action.disabled ? 0.5 : pressed ? 0.8 : 1,
                    }), children: [action.icon ? (0, jsx_runtime_1.jsx)(react_native_1.View, { children: action.icon }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: '600',
                            }, children: action.label })] }, action.key))) })] }));
}
//# sourceMappingURL=QuickActions.js.map