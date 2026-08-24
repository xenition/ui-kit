"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRowV3 = LeaderboardRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const MEDAL = {
    1: { glyph: '🥇', color: 'accent' },
    2: { glyph: '🥈', color: 'muted' },
    3: { glyph: '🥉', color: 'warn' },
};
/**
 * LeaderboardRow, design v3 — a **minimal flat row** separated by a hairline
 * rule, no card. The rank is a plain numeral (medal glyph for the top three),
 * the name sits mid-row, and the score is emphasized as large numerals with a
 * quiet unit beside it. The highlighted (current-user) row gets a soft primary
 * tint wash rather than a solid fill, keeping text legible against a token color.
 * `empty` renders a muted placeholder. Same props as {@link LeaderboardRow}.
 * Token-only colors.
 */
function LeaderboardRowV3({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const medal = MEDAL[rank];
    const rowStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.md,
            paddingHorizontal: tokens.spacing.sm,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            backgroundColor: highlighted ? (0, color_1.withAlpha)(colors.primary, 0.08) : 'transparent',
            borderRadius: highlighted ? tokens.radius.sm : 0,
        },
        style,
    ];
    if (empty || !name) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Rank ${rank}, empty`, style: rowStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 26, textAlign: 'center', color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: rank }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u2014" })] }));
    }
    const rankColor = medal ? colors[medal.color] : colors.onSurface;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: rowStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: 26, textAlign: 'center', color: rankColor, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: medal ? medal.glyph : rank }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: highlighted ? '800' : '600' }, children: name }), trend ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: trend }) : null] }), score != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'baseline', gap: 3 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: score }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: scoreUnit })] })) : null] }));
    const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: content }));
}
//# sourceMappingURL=LeaderboardRowV3.js.map