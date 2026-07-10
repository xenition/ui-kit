"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthCard = AuthCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Card_1 = require("./Card");
/**
 * Centered card shell for auth screens (LoginForm/SignupForm/…) — the native
 * mirror of the web `AuthCard`. A themed `Card` holding an optional title +
 * subtitle, the form `children`, and an optional footer. Token-bound; no
 * literal colors. (`className` → `style` is the only idiomatic swap.)
 */
function AuthCard({ title, subtitle, children, footer, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ width: '100%', maxWidth: 384, alignSelf: 'center' }, style], children: (0, jsx_runtime_1.jsxs)(Card_1.Card, { style: { gap: tokens.spacing.md }, children: [title != null || subtitle != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs }, children: [title != null ? (typeof title === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors.onSurface,
                                fontSize: tokens.typography.scale.xl,
                                fontWeight: '700',
                            }, children: title })) : (title)) : null, subtitle != null ? (typeof subtitle === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: subtitle })) : (subtitle)) : null] })) : null, children, footer != null ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center' }, children: typeof footer === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: footer })) : (footer) })) : null] }) }));
}
//# sourceMappingURL=AuthCard.js.map