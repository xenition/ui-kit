"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AchievementUnlock = AchievementUnlock;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const types_1 = require("./types");
/**
 * An achievement / trophy unlock surface — a glyph medallion, an overline, the
 * title + criteria, and a point value. Locked achievements render a padlock and
 * muted copy (state shown via text + icon, not color alone). `toast` is a
 * compact banner; `inline` is a centered card. `onPress` opens it. Uses
 * `accessibilityRole="summary"` so a screen reader announces it. Composes
 * `Card`, `Icon`. Token-only.
 */
function AchievementUnlock({ achievement, variant = 'toast', unlocked = true, label = 'Achievement unlocked', onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const inline = variant === 'inline';
    const accent = unlocked ? colors.warn : colors.muted;
    const medallion = 56;
    const badge = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: medallion,
            height: medallion,
            borderRadius: medallion / 2,
            backgroundColor: (0, types_1.withAlpha)(accent, 0.18),
            borderWidth: 2,
            borderColor: accent,
            alignItems: 'center',
            justifyContent: 'center',
        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: unlocked ? achievement.glyph ?? '🏆' : '🔒', size: "2xl", color: unlocked ? 'warn' : 'muted' }) }));
    const text = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: inline ? undefined : 1, gap: 2, alignItems: inline ? 'center' : 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase', letterSpacing: 0.5 }, children: unlocked ? label : 'Locked' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', textAlign: inline ? 'center' : 'left' }, children: achievement.title }), achievement.description ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: inline ? 3 : 2, style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: inline ? 'center' : 'left' }, children: achievement.description })) : null, achievement.points != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600', marginTop: 2 }, children: `${achievement.points} G` })) : null] }));
    const card = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: unlocked ? 'elevated' : 'outlined', style: [
            inline
                ? { alignItems: 'center', gap: tokens.spacing.sm }
                : { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md },
            style,
        ], children: [badge, text] }));
    const a11yLabel = `${unlocked ? label : 'Locked achievement'}: ${achievement.title}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "summary", accessibilityLabel: a11yLabel, children: card }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, accessibilityState: { disabled: !unlocked }, onPress: () => onPress(achievement), style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: card }));
}
//# sourceMappingURL=AchievementUnlock.js.map