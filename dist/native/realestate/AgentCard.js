"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgentCard = AgentCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A listing agent summary — avatar (initials fallback), name/title/agency, an
 * optional star rating with review count, and a contact action. Data +
 * callbacks only; nothing fetches. `variant="compact"` drops the rating row for
 * dense lists. Reuses the shared `Avatar`, `Button`, and `Icon` primitives;
 * token-only colors and an a11y label describing the agent.
 */
function AgentCard({ name, title, agency, avatarUrl, rating, reviewCount, contactLabel = 'Contact', onContact, onPress, variant = 'default', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const compact = variant === 'compact';
    const hasRating = typeof rating === 'number';
    const fullStars = hasRating ? Math.round(Math.min(Math.max(rating, 0), 5)) : 0;
    const meta = [title, agency].filter(Boolean).join(' · ');
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                borderRadius: tokens.radius.lg,
                borderWidth: 1,
                borderColor: colors.border,
                backgroundColor: colors.surface,
                padding: compact ? tokens.spacing.md : tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatarUrl, name: name, size: compact ? 'md' : 'lg' }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null, hasRating && !compact ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flexDirection: 'row' }, children: Array.from({ length: 5 }).map((_, i) => ((0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: i < fullStars ? '★' : '☆', size: "sm", color: i < fullStars ? 'warn' : 'muted' }, i))) }), typeof reviewCount === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: `(${reviewCount})` })) : null] })) : null] }), onContact ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "secondary", size: "sm", onPress: onContact, children: contactLabel })) : null] }));
    if (!onPress)
        return body;
    const ratingLabel = hasRating ? `, rated ${rating} of 5` : '';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${name}${meta ? `, ${meta}` : ''}${ratingLabel}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=AgentCard.js.map