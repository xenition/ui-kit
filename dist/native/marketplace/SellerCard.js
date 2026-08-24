"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SellerCard = SellerCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A seller / shop identity block — avatar, name, an optional verified badge,
 * a star rating with review count, and a sales/location meta line, plus an
 * optional contact action. Presentational: shaped data + callbacks only. The
 * contact `Button` is kept outside the card's press target so contacting never
 * also navigates. Reuses `Avatar`, `Rating`, `Badge`, `Button`; token-only
 * colors via `useXenitionTheme()`.
 */
function SellerCard({ name, avatarUrl, rating, reviewCount, salesCount, location, verified = false, actionLabel = 'Contact', onContact, onPress, variant = 'card', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const inline = variant === 'inline';
    const meta = [];
    if (typeof salesCount === 'number')
        meta.push(`${salesCount.toLocaleString()} sales`);
    if (location)
        meta.push(location);
    const identity = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md, flex: 1 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: inline ? 'md' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flexShrink: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: name }), verified ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: "\u2713 Verified" })) : null] }), typeof rating === 'number' ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `(${reviewCount.toLocaleString()})` })) : null] })) : null, meta.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta.join(' · ') })) : null] })] }));
    const action = onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "outline", size: "sm", onPress: onContact, children: actionLabel })) : null;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: inline ? 0 : 1,
                borderColor: colors.border,
                backgroundColor: inline ? 'transparent' : colors.surface,
                padding: inline ? 0 : tokens.spacing.lg,
            },
            style,
        ], children: [onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${verified ? ', verified seller' : ''}${typeof rating === 'number' ? `, rated ${rating} of 5` : ''}`, onPress: onPress, style: ({ pressed }) => ({ flex: 1, opacity: pressed ? 0.85 : 1 }), children: identity })) : (identity), action] }));
    return body;
}
//# sourceMappingURL=SellerCard.js.map