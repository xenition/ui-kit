"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreBoardV4 = ScoreBoardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const AvatarV4_1 = require("../primitives/AvatarV4");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const arcade_v4_1 = require("./internal/arcade-v4");
/** A crest, or the entry's initials. Never the `border` token as a fill. */
function Crest({ entry, size, theme, }) {
    if (entry.avatarUrl) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: entry.avatarUrl }, accessibilityIgnoresInvertColors: true, style: {
                width: size,
                height: size,
                borderRadius: theme.tokens.radius.sm,
                backgroundColor: (0, arcade_v4_1.placeholderGround)(theme),
            } }));
    }
    return (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { name: entry.name, size: size >= theme.tokens.spacing['2xl'] ? 'lg' : 'sm' });
}
/**
 * **V4 scoreboard** — same props as {@link ScoreBoard} plus `scoreUnit`.
 *
 * ## Five changes
 *
 * 1. **A standings table is a list.** The rows were flex `View`s in a card
 *    with no list context at all, so a reader was never told how many
 *    competitors there were or where in the order it had landed. The ranked
 *    board is an `accessibilityRole="list"` whose rows are its items.
 * 2. **A score carries its unit.** "Rank 1, Nova, 4200" leaves the reader to
 *    guess what 4200 counts; `scoreUnit` says, and the same prop exists on the
 *    web twin, where the row's whole accessible name is currently thrown away
 *    (an `aria-label` on a role-less `<div>` is discarded by ARIA).
 * 3. **The figures are tabular.** A column of proportional numerals in a
 *    ranked list wanders left and right as it descends, which is the one thing
 *    a scoreboard's alignment is for.
 * 4. **The leader's rank and the winning side use `primaryText`,** the
 *    contrast-corrected ink, rather than the `primary` *fill* drawn as text —
 *    measured as low as 1.32:1 on a pale seed. The lead is still carried by
 *    weight and by the word "leading" as well as by colour.
 * 5. **A crest with no image loads on the module's placeholder ground**, not
 *    on `border` — the hairline token used as a fill — and the empty board is
 *    the V4 empty state.
 */
function ScoreBoardV4({ entries, variant = 'ranked', title, emptyLabel = 'No scores yet', scoreUnit = 'points', style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    if (entries.length === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDFC1", size: "2xl", color: "mutedText" }), title: emptyLabel, style: style }));
    }
    const cardStyle = {
        padding: tokens.spacing.lg,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.card,
    };
    const header = title ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "base", weight: "bold", tone: "onCard", children: title })) : null;
    if (variant === 'versus') {
        const home = entries[0];
        const away = entries[1];
        const homeWins = home != null && away != null && home.score > away.score;
        const awayWins = home != null && away != null && away.score > home.score;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [cardStyle, { gap: tokens.spacing.md }, style], children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(VersusSide, { entry: home, winner: homeWins, scoreUnit: scoreUnit }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", tone: "mutedText", children: "VS" }), (0, jsx_runtime_1.jsx)(VersusSide, { entry: away, winner: awayWins, scoreUnit: scoreUnit })] })] }));
    }
    const ranked = [...entries].sort((a, b) => b.score - a.score);
    const rank = tokens.spacing.lg;
    const crest = tokens.spacing.lg + tokens.spacing.xs;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [cardStyle, { gap: tokens.spacing.xs }, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: { gap: tokens.spacing.xs }, children: ranked.map((entry, i) => {
                    const leader = i === 0;
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, arcade_v4_1.spokenLine)([
                            `Rank ${i + 1}`,
                            entry.name,
                            `${entry.score} ${scoreUnit}`,
                            entry.detail,
                        ]), style: {
                            flexDirection: 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: tokens.spacing.xs,
                        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "bold", numeric: "tabular", tone: leader ? 'primaryText' : 'mutedText', style: { width: rank }, children: String(i + 1) }), (0, jsx_runtime_1.jsx)(Crest, { entry: entry, size: crest, theme: theme }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: leader ? 'bold' : 'medium', tone: "onCard", numberOfLines: 1, children: entry.name }), entry.detail ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", numberOfLines: 1, children: entry.detail })) : null] }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "base", weight: "bold", tone: "onCard", numeric: "tabular", children: String(entry.score) })] }, entry.id));
                }) })] }));
}
function VersusSide({ entry, winner, scoreUnit, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    const score = entry?.score ?? 0;
    const name = entry?.name ?? 'TBD';
    const crest = tokens.spacing['2xl'];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: (0, arcade_v4_1.spokenLine)([
            name,
            `${score} ${scoreUnit}`,
            winner ? 'leading' : null,
        ]), style: { flex: 1, alignItems: 'center', gap: tokens.spacing.xs }, children: [entry ? (0, jsx_runtime_1.jsx)(Crest, { entry: entry, size: crest, theme: theme }) : (0, jsx_runtime_1.jsx)(AvatarV4_1.AvatarV4, { name: "?", size: "lg" }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: winner ? 'bold' : 'medium', tone: "onCard", numberOfLines: 1, align: "center", children: name }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "2xl", weight: "bold", numeric: "tabular", tone: winner ? 'primaryText' : 'mutedText', children: String(score) })] }));
}
//# sourceMappingURL=ScoreBoardV4.js.map