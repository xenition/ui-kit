"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRowV4 = LeaderboardRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const MEDAL = {
    1: { glyph: '🥇', color: 'accent' },
    2: { glyph: '🥈', color: 'muted' },
    3: { glyph: '🥉', color: 'warn' },
};
/**
 * LeaderboardRow — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow: rank (a medal glyph for the top
 * three), avatar, name, an optional trend, and a big legible **tabular-nums**
 * score. `highlighted` marks the current user with a primary ring; `empty`
 * renders a muted placeholder. Tappable when `onPress` is set. Honors the V4
 * `variant` — `full` (default) and `compact`. Token-only colors via
 * `useXenitionTheme()`.
 */
function LeaderboardRowV4({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onPress, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const medal = MEDAL[rank];
    const compact = variant === 'compact';
    const shell = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: compact ? tokens.spacing.xs : tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.card,
            borderWidth: highlighted ? 2 : 1,
            borderColor: highlighted ? colors.primary : colors.border,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 10,
            shadowOffset: { width: 0, height: 4 },
            elevation: 2,
        },
        style,
    ];
    if (empty || !name) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Rank ${rank}, empty`, style: shell, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 28, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: rank }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u2014" })] }));
    }
    const rankColor = medal ? colors[medal.color] : colors.onSurface;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: shell, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 28, textAlign: 'center', color: rankColor, fontSize: tokens.typography.scale.base, fontWeight: '800', fontVariant: ['tabular-nums'] }, children: medal ? medal.glyph : rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: highlighted ? '700' : '600' }, children: name }), trend ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: trend }) : null, score != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: [score, " ", scoreUnit] }) : null] }));
    const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: content }));
}
//# sourceMappingURL=LeaderboardRowV4.js.map