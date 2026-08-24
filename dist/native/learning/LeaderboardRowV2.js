"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeaderboardRowV2 = LeaderboardRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const elevation_1 = require("../primitives/internal/elevation");
const MEDAL = {
    1: { glyph: '🥇', color: 'accent' },
    2: { glyph: '🥈', color: 'muted' },
    3: { glyph: '🥉', color: 'warn' },
};
/**
 * LeaderboardRow, design v2 — an **elevated card** row: a large tinted rank disc
 * (medal glyph for the top three) on the left, a ringed avatar, the name over an
 * optional trend line, and the score in a {@link Badge} on the right. The score
 * badge turns `primary` for the highlighted (current-user) row. `empty` renders
 * a muted placeholder. Same props as {@link LeaderboardRow}. Token-only colors.
 */
function LeaderboardRowV2({ rank, name, avatar, score, scoreUnit = 'pts', highlighted = false, empty = false, trend, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const medal = MEDAL[rank];
    const cardStyle = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.surface,
            borderWidth: highlighted ? 1.5 : 0,
            borderColor: highlighted ? colors.primary : colors.border,
            ...(0, elevation_1.shadow)('sm', tokens),
        },
        style,
    ];
    if (empty || !name) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Rank ${rank}, empty`, style: cardStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                        width: 40,
                        height: 40,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.12),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: rank }) }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.muted, fontSize: tokens.typography.scale.sm }, children: "\u2014" })] }));
    }
    const rankTint = medal ? colors[medal.color] : colors.primary;
    const content = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: cardStyle, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(rankTint, 0.14),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: medal ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: medal.glyph })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: rankTint, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: rank })) }), (0, jsx_runtime_1.jsx)(primitives_1.Avatar, { src: avatar, name: name, size: "md", ring: highlighted }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: highlighted ? '800' : '600' }, children: name }), trend ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: trend }) : null] }), score != null ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: highlighted ? 'primary' : 'neutral', variant: highlighted ? 'solid' : 'soft', size: "md", children: `${score} ${scoreUnit}` })) : null] }));
    const a11y = `Rank ${rank}, ${name}${score != null ? `, ${score} ${scoreUnit}` : ''}${highlighted ? ', you' : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: content });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: content }));
}
//# sourceMappingURL=LeaderboardRowV2.js.map