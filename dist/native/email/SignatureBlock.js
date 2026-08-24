"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignatureBlock = SignatureBlock;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * An email signature block — avatar/logo, name, title · company, and a set of
 * contact lines (email / phone / website). Rendered read-only for a thread
 * footer or compose preview; a leading accent rule anchors it. All colors from
 * theme tokens. No literal colors.
 */
function SignatureBlock({ name, title, company, avatarUri, contacts, tagline, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const safeContacts = contacts ?? [];
    const roleLine = [title, company].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingLeft: tokens.spacing.md,
                borderLeftWidth: 3,
                borderLeftColor: colors.primary,
            },
            style,
        ], children: [avatarUri || name ? (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "lg", src: avatarUri, name: name, shape: "rounded" }) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), roleLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: roleLine })) : null, safeContacts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { gap: 2, marginTop: tokens.spacing.xs }, children: safeContacts.map((c) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [c.glyph ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: c.glyph, size: "xs", color: "muted" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm }, children: c.value })] }, c.id))) })) : null, tagline ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, marginTop: tokens.spacing.xs }, children: tagline })) : null] })] }));
}
//# sourceMappingURL=SignatureBlock.js.map