"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompanyCardV2 = CompanyCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const appearance_1 = require("../primitives/internal/appearance");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * CompanyCard — design V2. A profile-style card: a tinted banner strip, a large
 * rounded logo straddling it inside a surface ring, then the name, meta, a
 * headcount/open-roles badge row, and a full-width follow `Button`. Same props
 * as {@link CompanyCardProps} (drop-in). Token-pure — the banner and ring are
 * `withAlpha`/token fills, depth is the shared elevation scale.
 */
function CompanyCardV2({ company, following, onToggleFollow, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const showFollow = following != null || onToggleFollow != null;
    const meta = [company.industry, company.location].filter(Boolean).join(' · ');
    const surface = {
        ...(0, appearance_1.appearanceStyle)('elevated', colors, tokens),
        borderRadius: tokens.radius.lg,
        overflow: 'hidden',
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: [...enter.transform, { scale: press.scale }] }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: `${company.name}${company.industry ? `, ${company.industry}` : ''}`, disabled: !onPress, onPress: onPress ? () => onPress(company) : undefined, onPressIn: onPress ? press.onPressIn : undefined, onPressOut: onPress ? press.onPressOut : undefined, style: ({ pressed }) => [surface, pressed && onPress ? { opacity: 0.95 } : null, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 56, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.14) } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { paddingHorizontal: tokens.spacing.lg, paddingBottom: tokens.spacing.lg, gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                alignSelf: 'flex-start',
                                marginTop: -36,
                                padding: 4,
                                borderRadius: tokens.radius.lg,
                                backgroundColor: colors.surface,
                            }, children: (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: company.logoUrl, name: company.name, size: "xl", shape: "rounded" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: company.name }), meta ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: meta })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, flexWrap: 'wrap' }, children: [company.size ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: `${company.size} employees` }) : null, typeof company.openRoles === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: company.openRoles > 0 ? 'primary' : 'neutral', children: company.openRoles > 0 ? `${company.openRoles} open roles` : 'No open roles' })) : null] }), showFollow ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: following ? 'secondary' : 'primary', size: "sm", onPress: onToggleFollow ? () => onToggleFollow(company) : undefined, accessibilityLabel: following ? `Following ${company.name} — tap to unfollow` : `Follow ${company.name}`, style: { alignSelf: 'stretch' }, children: following ? 'Following' : 'Follow' })) : null] })] }) }));
}
//# sourceMappingURL=CompanyCardV2.js.map