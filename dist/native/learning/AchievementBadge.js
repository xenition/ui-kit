"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementBadge = AchievementBadge;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TIER_COLOR = {
    bronze: 'warn',
    silver: 'muted',
    gold: 'accent',
    platinum: 'primary',
};
const SIZE_DIAMETER = { sm: 48, md: 64, lg: 84 };
/**
 * A gamification achievement badge: a tier-toned medallion with an icon, plus a
 * title / description. Locked achievements dim the medallion and overlay a lock
 * glyph (state is spoken, not color-only). Token-only colors.
 */
function AchievementBadge({ title, glyph = '🏆', tier = 'gold', unlocked = true, description, size = 'md', hideLabel = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const diameter = SIZE_DIAMETER[size];
    const ring = colors[TIER_COLOR[tier]];
    const medallion = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: diameter,
                    height: diameter,
                    borderRadius: diameter / 2,
                    borderWidth: 3,
                    borderColor: unlocked ? ring : colors.border,
                    backgroundColor: colors.surface,
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: unlocked ? 1 : 0.5,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: diameter * 0.42 }, children: unlocked ? glyph : '🔒' }) }), !hideLabel ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: unlocked ? colors.onSurface : colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', textAlign: 'center' }, children: title }), description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: description })) : null] })) : null] }));
    const a11y = `${title} achievement, ${tier} tier, ${unlocked ? 'unlocked' : 'locked'}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, style: style, children: medallion }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: [{ alignSelf: 'flex-start' }, style], children: medallion }));
}
//# sourceMappingURL=AchievementBadge.js.map