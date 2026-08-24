"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRow = LeaderboardRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Medal tone for the top three ranks. */
const MEDAL = {
    1: { glyph: '🥇', color: 'accent' },
    2: { glyph: '🥈', color: 'muted' },
    3: { glyph: '🥉', color: 'warn' },
};
/**
 * A leaderboard entry row: rank (medal glyph for the top three), avatar, name,
 * and score. `highlighted` marks the current user; `empty` renders a muted
 * placeholder for an unfilled slot. Token-only colors.
 */
function LeaderboardRow({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const medal = MEDAL[rank];
    const base = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.md,
            backgroundColor: highlighted ? colors.primary : colors.surface,
            borderWidth: 1,
            borderColor: highlighted ? colors.primary : colors.border,
        },
        style,
    ];
    if (empty || !name) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Rank ${rank}, empty`, style: base, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 28, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: rank }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u2014" })] }));
    }
    const fg = highlighted ? colors.onPrimary : colors.onSurface;
    const muted = highlighted ? colors.onPrimary : colors.muted;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: base, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 28, textAlign: 'center', color: medal ? colors[medal.color] : fg, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: medal ? medal.glyph : rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: fg, fontSize: tokens.typography.scale.sm, fontWeight: highlighted ? '700' : '600' }, children: name }), trend ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: muted, fontSize: tokens.typography.scale.xs }, children: trend }) : null, score != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: fg, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [score, " ", scoreUnit] })) : null] }));
    const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: content }));
}
//# sourceMappingURL=LeaderboardRow.js.map