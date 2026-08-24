"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCardV3 = AgentCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * AgentCard — design variant **V3**: an **ultra-compact borderless row**. A
 * small avatar, a single-line name + inline collapsed rating ("★ 4.0 · 87"),
 * and a `link`-style contact action with a trailing chevron. Where V1 is a
 * bordered card with a stacked star row, V3 is chrome-free for dense directory
 * lists — separation comes from spacing, not a box. Same props as
 * {@link AgentCardProps}. Token-only.
 */
function AgentCardV3({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel = 'Contact', onContact, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const hasRating = typeof rating === 'number';
    const clamped = hasRating ? Math.min(Math.max(rating, 0), 5) : 0;
    const meta = [title, agency].filter(Boolean).join(' · ');
    const ratingBits = [];
    if (hasRating)
        ratingBits.push(clamped.toFixed(1));
    if (typeof reviewCount === 'number')
        ratingBits.push(`${reviewCount}`);
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                backgroundColor: 'transparent',
                borderWidth: 0,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [hasRating ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2605", size: "xs", color: "warn" }) : null, ratingBits.length > 0 ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [ratingBits.join(' · '), meta ? `  ·  ${meta}` : ''] })) : meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] })] }), onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "link", size: "sm", onPress: onContact, style: { paddingHorizontal: 0 }, children: contactLabel })) : onPress ? ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u203A", size: "lg", color: "muted" })) : null] }));
    if (!onPress)
        return body;
    const ratingLabel = hasRating ? `, rated ${clamped} of 5` : '';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${meta ? `, ${meta}` : ''}${ratingLabel}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=AgentCardV3.js.map