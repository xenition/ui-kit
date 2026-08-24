"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactCardV3 = ContactCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * ContactCard **design V3** — a *compact directory row*: small avatar, name with
 * title·company beneath, and (when present) the first tag as a trailing muted
 * chip. No card surface, no action pills — the densest possible list item for an
 * A–Z contacts index. Same props as {@link ContactCard}; a `loading` skeleton is
 * supported. Token-pure.
 */
function ContactCardV3({ name, title, company, avatarUrl, tags, loading = false, onPress, testID, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const trailingTag = Array.isArray(tags) && tags.length > 0 ? tags[0] : undefined;
    const row = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                paddingHorizontal: tokens.spacing.sm,
            },
            style,
        ], children: loading ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading contact", style: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs / 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.sm, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.typography.scale.xs, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: name, src: avatarUrl }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), title || company ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [title, company].filter(Boolean).join(' · ') })) : null] }), trailingTag ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        paddingHorizontal: tokens.spacing.xs,
                        paddingVertical: 2,
                        borderRadius: tokens.radius.full,
                        backgroundColor: colors.border,
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: trailingTag }) })) : null] })) }));
    if (onPress && !loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Contact ${name}`, onPress: onPress, testID: testID, children: row }));
    }
    return (0, jsx_runtime_1.jsx)(react_native_1.View, { testID: testID, children: row });
}
//# sourceMappingURL=ContactCardV3.js.map