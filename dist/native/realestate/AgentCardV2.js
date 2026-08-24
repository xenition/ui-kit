"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCardV2 = AgentCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const elevation_1 = require("../primitives/internal/elevation");
const motion_1 = require("../primitives/internal/motion");
/**
 * AgentCard — design variant **V2**: a **centered hero profile**. A large
 * avatar sits above a centered name, title/agency, and star rating, with the
 * contact action rendered as a full-width primary button at the foot. Where V1
 * is a horizontal row, V2 is a portrait "business card" for a profile header or
 * a featured-agent slot. Same props as {@link AgentCardProps}; the `variant`
 * prop is accepted but the hero is always centered. Token-only, elevated.
 */
function AgentCardV2({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel = 'Contact', onContact, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)({ translateY: 10 });
    const hasRating = typeof rating === 'number';
    const fullStars = hasRating ? Math.round(Math.min(Math.max(rating, 0), 5)) : 0;
    const meta = [title, agency].filter(Boolean).join(' · ');
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                alignItems: 'center',
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                borderWidth: 0,
                backgroundColor: colors.surface,
                paddingVertical: tokens.spacing.xl,
                paddingHorizontal: tokens.spacing.lg,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: "xl" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: 'center' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: meta })) : null, hasRating ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: Array.from({ length: 5 }).map((_, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: i < fullStars ? '★' : '☆', size: "sm", color: i < fullStars ? 'warn' : 'muted' }, i))) }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `(${reviewCount})` })) : null] })) : null, onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "md", onPress: onContact, style: { alignSelf: 'stretch', marginTop: tokens.spacing.sm }, children: contactLabel })) : null] }));
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: body });
    }
    const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${meta ? `, ${meta}` : ''}${ratingLabel}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }) }));
}
//# sourceMappingURL=AgentCardV2.js.map