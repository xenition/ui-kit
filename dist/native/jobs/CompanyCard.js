"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCard = CompanyCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * An employer summary card — logo (`Avatar`), name, industry / location, a
 * headcount `Badge`, an open-roles count, and an optional follow `Button`.
 * Data + callbacks only; the follow button flips between primary "Follow" and
 * secondary "Following" while keeping an explicit accessible label. Tokens only.
 */
function CompanyCard({ company, following, onToggleFollow, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${company.name}${company.industry ? `, ${company.industry}` : ''}`, disabled: !onPress, onPress: onPress ? () => onPress(company) : undefined, style: ({ pressed }) => [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
                gap: tokens.spacing.md,
            },
            pressed && onPress ? { opacity: 0.9 } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: company.logoUrl, name: company.name, size: "lg" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '600' }, children: company.name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [company.size ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: `${company.size} employees` }) : null, typeof company.openRoles === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: company.openRoles > 0 ? 'primary' : 'neutral', children: company.openRoles > 0 ? `${company.openRoles} open roles` : 'No open roles' })) : null] }), showFollow ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onPress: onToggleFollow ? () => onToggleFollow(company) : undefined, accessibilityLabel: following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`, children: following ? 'Following' : 'Follow' })) : null] }));
}
//# sourceMappingURL=CompanyCard.js.map