"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollResultBar = PollResultBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/** Token-derived translucent tint (no literal hex; mirrors Button/GlassPanel). */
function withAlpha(hex, alpha) {
    const h = hex.replace('#', '');
    const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h;
    const r = parseInt(full.slice(0, 2), 16);
    const g = parseInt(full.slice(2, 4), 16);
    const b = parseInt(full.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
/**
 * Poll result bars — one row per option with a proportional fill and a percent
 * of the total votes; the winning option and the user's own pick are
 * highlighted with the primary token and a check (the pick is also announced,
 * not color-only). When `showResults` is `false` and `onVote` is supplied the
 * rows become vote buttons. `0` total votes render every bar at 0% safely. No
 * literal colors.
 */
function PollResultBar({ options, selectedId, showResults = true, onVote, accessibilityLabel = 'Poll results', style, }) {
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
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: isPick ? colors.primary : colors.border,
                        backgroundColor: colors.surface,
                        overflow: 'hidden',
                    }, children: [showResults ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                left: 0,
                                top: 0,
                                bottom: 0,
                                width: `${pct}%`,
                                backgroundColor: isWinner ? withAlpha(colors.primary, 0.22) : withAlpha(colors.primary, 0.1),
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
                                        fontWeight: isPick || isWinner ? '700' : '500',
                                    }, children: opt.label }), showResults ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [pct, "%"] })) : null] })] }));
                if (!showResults && onVote) {
                    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Vote for ${opt.label}`, onPress: () => onVote(opt.id), children: Row }, opt.id));
                }
                return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: Row }, opt.id);
            }), showResults ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [total, " ", total === 1 ? 'vote' : 'votes'] })) : null] }));
}
//# sourceMappingURL=PollResultBar.js.map