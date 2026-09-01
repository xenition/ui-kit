"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TournamentBracketV4 = TournamentBracketV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyStateV4_1 = require("../primitives/EmptyStateV4");
const IconV4_1 = require("../primitives/IconV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
const state_v4_1 = require("../primitives/internal/state-v4");
const arcade_v4_1 = require("./internal/arcade-v4");
/** A side of a match, drawn. Its numbers reach the reader through the match's name. */
function Side({ name, score, isWinner, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: isWinner ? 'bold' : 'regular', tone: name ? 'onCard' : 'mutedText', numberOfLines: 1, style: { flex: 1, minWidth: 0 }, children: name ?? 'TBD' }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: isWinner ? 'bold' : 'regular', numeric: "tabular", tone: isWinner ? 'primaryText' : 'mutedText', children: score == null ? '–' : String(score) })] }));
}
/**
 * **V4 tournament bracket** — same props as {@link TournamentBracket} plus
 * `advancedLabel`.
 *
 * ## Four changes
 *
 * 1. **The scores are announced.** The match's name was
 *    `` `${home} versus ${away}` `` on a `Pressable` that is `accessible` by
 *    default, so the two `Side`s that render the numbers were pruned with the
 *    rest of the subtree — a reader could not learn a single score anywhere in
 *    the bracket. The name now carries both sides *and* both scores, and the
 *    dash for an unplayed match survives as a spoken "–".
 * 2. **A match is not a toggle.** It announced
 *    `accessibilityState={{ selected: decided }}` (`aria-pressed={decided}` on
 *    web), so a reader was told the control was pressed because the match had
 *    a winner. Pressing it opens a detail view and can never change that.
 * 3. **The winner stops living in a hint.** It was an `accessibilityHint` here
 *    and a `title` attribute on web — a tooltip, which never reaches a touch
 *    user or a keyboard user. `advancedLabel` puts it in the name, on both
 *    twins.
 * 4. **The winning side uses `primaryText`**, the contrast-corrected ink,
 *    rather than the `primary` fill as text; a match card clears 44, and the
 *    press is a state layer instead of `opacity: 0.85`.
 */
function TournamentBracketV4({ rounds, emptyLabel = 'No matches scheduled', advancedLabel = (name) => `${name} advanced`, onMatchPress, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { colors, tokens } = theme;
    const totalMatches = rounds.reduce((n, r) => n + (r.matches?.length ?? 0), 0);
    if (rounds.length === 0 || totalMatches === 0) {
        return ((0, jsx_runtime_1.jsx)(EmptyStateV4_1.EmptyStateV4, { icon: (0, jsx_runtime_1.jsx)(IconV4_1.IconV4, { glyph: "\uD83C\uDFC6", size: "2xl", color: "mutedText" }), title: emptyLabel, style: style }));
    }
    const column = (0, chrome_v4_1.minTap)(tokens.spacing) * 4;
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.lg, padding: tokens.spacing.xs }, style: style, children: rounds.map((round, ri) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, minWidth: column }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { accessibilityRole: "header", size: "xs", weight: "bold", tone: "mutedText", style: { textTransform: 'uppercase' }, children: round.name }), (round.matches ?? []).map((match, mi) => {
                    const winnerName = match.winner === 'home'
                        ? match.home
                        : match.winner === 'away'
                            ? match.away
                            : undefined;
                    const name = (0, arcade_v4_1.spokenLine)([
                        match.home ?? 'TBD',
                        match.homeScore == null ? '–' : match.homeScore,
                        `versus ${match.away ?? 'TBD'}`,
                        match.awayScore == null ? '–' : match.awayScore,
                        winnerName ? advancedLabel(winnerName) : null,
                    ]);
                    const body = (pressed) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            gap: tokens.spacing.xs,
                            justifyContent: 'center',
                            minHeight: (0, chrome_v4_1.minTap)(tokens.spacing),
                            padding: tokens.spacing.sm,
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: colors.border,
                            backgroundColor: pressed
                                ? (0, state_v4_1.pressOver)(theme, colors.card, colors.onCard)
                                : colors.card,
                        }, children: [(0, jsx_runtime_1.jsx)(Side, { name: match.home, score: match.homeScore, isWinner: match.winner === 'home' }), (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityElementsHidden: true, importantForAccessibility: "no-hide-descendants", style: { height: 1, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(Side, { name: match.away, score: match.awayScore, isWinner: match.winner === 'away' })] }));
                    if (!onMatchPress) {
                        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: name, children: body(false) }, match.id));
                    }
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: name, onPress: () => onMatchPress(match, ri, mi), children: ({ pressed }) => body(pressed) }, match.id));
                })] }, `${round.name}-${ri}`))) }));
}
//# sourceMappingURL=TournamentBracketV4.js.map