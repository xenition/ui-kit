"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerCardV3 = SellerCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const internal_1 = require("./internal");
/**
 * SellerCard — Design V3: a **minimal trust-line**. No card chrome — just a
 * leading avatar, the name with an inline verified check, a single condensed
 * meta line (rating · sales · location), and the contact action rendered as a
 * quiet text link on the trailing edge. A hairline underline is the only
 * separator. Deliberately lightweight for dense lists — the opposite of the V2
 * profile banner. Same props as `SellerCard`; the contact link stays outside
 * the profile press target; token-pure colors.
 */
function SellerCardV3({ name, avatarUrl, rating, reviewCount, salesCount, location, verified = false, actionLabel = 'Contact', onContact, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const meta = [];
    if (typeof salesCount === 'number')
        meta.push(`${salesCount.toLocaleString()} sales`);
    if (location)
        meta.push(location);
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "md" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), verified ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { accessibilityRole: "image", accessibilityLabel: "Verified seller", style: { color: colors.accentText, fontSize: tokens.typography.scale.sm }, children: "\u2713" })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [typeof rating === 'number' ? (0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }) : null, typeof rating === 'number' && typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `(${reviewCount.toLocaleString()})` })) : null, meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, flexShrink: 1 }, children: (typeof rating === 'number' ? '· ' : '') + meta.join(' · ') })) : null] })] })] }));
    const action = onContact ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: actionLabel, onPress: onContact, hitSlop: 8, style: ({ pressed }) => ({ paddingHorizontal: tokens.spacing.xs, paddingVertical: tokens.spacing.xs, opacity: pressed ? 0.6 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: actionLabel }) })) : null;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.xs,
                borderBottomWidth: 1,
                borderBottomColor: (0, internal_1.withAlpha)(colors.border, 0.6),
                backgroundColor: 'transparent',
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${verified ? ', verified seller' : ''}${typeof rating === 'number' ? `, rated ${rating} of 5` : ''}`, onPress: onPress, style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 }), children: identity })) : (identity), action] }));
}
//# sourceMappingURL=SellerCardV3.js.map