"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollResultBarV4 = PollResultBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * PollResultBar — **V4** "focus" design. The calm, legible take on a result
 * chart: tall (~44px) rounded rows on a soft-primary track, each filled to its
 * share of the vote in primary and trailed by a big percent numeral. The
 * **leading** option is emphasised (bolder label, solid-primary fill) and the
 * respondent's own pick keeps its primary border + spoken "your choice"; when
 * `showResults` is `false` and `onVote` is set the rows become vote buttons.
 * One accent (primary), no gradients. Same props/behavior as
 * {@link PollResultBarProps}; token-only colors via `useXenitionTheme()` +
 * `withAlpha`. `0` total votes render every bar at 0% safely.
 */
function PollResultBarV4({ options, selectedId, showResults = true, onVote, accessibilityLabel = 'Poll results', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = options.reduce((sum, o) => sum + Math.max(0, o.votes), 0);
    const topVotes = options.reduce((m, o) => Math.max(m, o.votes), 0);
    if (options.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "summary", style: [{ padding: tokens.spacing.lg, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "No poll options yet." }) }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", accessibilityLabel: accessibilityLabel, style: [{ gap: tokens.spacing.sm }, style], children: [options.map((opt) => {
                const pct = total > 0 ? Math.round((Math.max(0, opt.votes) / total) * 100) : 0;
                const isPick = selectedId === opt.id;
                const isWinner = showResults && total > 0 && opt.votes === topVotes;
                const rowLabel = showResults
                    ? `${opt.label}: ${pct}%${isPick ? ', your choice' : ''}`
                    : opt.label;
                const Row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: rowLabel, style: {
                        minHeight: 44,
                        justifyContent: 'center',
                        borderRadius: tokens.radius.lg,
                        borderWidth: 1,
                        borderColor: isPick ? colors.primary : colors.border,
                        // Soft-primary track in results mode; a plain surface for voting.
                        backgroundColor: showResults ? (0, color_1.withAlpha)(colors.primary, 0.12) : colors.surface,
                        overflow: 'hidden',
                    }, children: [showResults ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${pct}%`,
                                backgroundColor: isWinner ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.7),
                            } })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: tokens.spacing.sm,
                                paddingVertical: tokens.spacing.sm,
                                paddingHorizontal: tokens.spacing.md,
                            }, children: [isPick ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "primary" }) : opt.icon ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: opt.icon, size: "base", color: "onSurface" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                        flex: 1,
                                        color: colors.onSurface,
                                        fontSize: tokens.typography.scale.base,
                                        fontWeight: isPick || isWinner ? '800' : '600',
                                    }, children: opt.label }), showResults ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: [pct, "%"] })) : null] })] }));
                if (!showResults && onVote) {
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Vote for ${opt.label}`, onPress: () => onVote(opt.id), children: Row }, opt.id));
                }
                return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: Row }, opt.id);
            }), showResults ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: [total, " ", total === 1 ? 'vote' : 'votes'] })) : null] }));
}
//# sourceMappingURL=PollResultBarV4.js.map