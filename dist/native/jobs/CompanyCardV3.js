"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCardV3 = CompanyCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * CompanyCard — design V3. A compact directory row: a small logo, the name and
 * `industry · location` meta stacked, and a trailing open-roles `Badge` plus a
 * small follow `Button`. Hairline-separated for dense lists. Same props as
 * {@link CompanyCardProps} (drop-in). Token-pure.
 */
function CompanyCardV3({ company, following, onToggleFollow, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${company.name}${company.industry ? `, ${company.industry}` : ''}`, disabled: !onPress, onPress: onPress ? () => onPress(company) : undefined, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderBottomColor: colors.border,
                borderBottomWidth: 1,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
            },
            pressed && onPress ? { opacity: 0.9 } : null,
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: company.logoUrl, name: company.name, size: "md", shape: "rounded" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: company.name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: meta })) : null] }), typeof company.openRoles === 'number' && company.openRoles > 0 ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "primary", children: `${company.openRoles} open` })) : null, showFollow ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onPress: onToggleFollow ? () => onToggleFollow(company) : undefined, accessibilityLabel: following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`, children: following ? 'Following' : 'Follow' })) : null] }));
}
//# sourceMappingURL=CompanyCardV3.js.map