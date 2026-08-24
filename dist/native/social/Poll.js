"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poll = Poll;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * A tap-to-vote poll with three states: open (tappable options), voted, and
 * closed. Once voted or closed each option becomes a labeled percentage bar,
 * the viewer's pick is tinted primary, and the leading option is emphasized.
 * Guards an all-zero tally. Token-only.
 */
function Poll({ question, options, votedOptionId, closed = false, onVote, meta, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const total = options.reduce((sum, o) => sum + (o.votes ?? 0), 0);
    const showResults = closed || votedOptionId != null;
    const leadVotes = options.reduce((max, o) => Math.max(max, o.votes ?? 0), 0);
    const derivedMeta = meta ??
        `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'}${closed ? ' · Final' : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radiogroup", style: [
            {
                gap: tokens.spacing.sm,
                borderWidth: 1,
                borderColor: colors.border,
                borderRadius: tokens.radius.lg,
                backgroundColor: colors.surface,
                padding: tokens.spacing.md,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: question }), options.map((o) => {
                const votes = o.votes ?? 0;
                const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
                const selected = votedOptionId === o.id;
                const leading = showResults && votes === leadVotes && leadVotes > 0;
                if (showResults) {
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${o.label}, ${pct}%`, style: {
                            overflow: 'hidden',
                            borderRadius: tokens.radius.md,
                            borderWidth: 1,
                            borderColor: selected ? colors.primary : colors.border,
                            backgroundColor: colors.surface,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: `${pct}%`,
                                    backgroundColor: selected ? colors.primary : colors.border,
                                    opacity: selected ? 0.25 : 0.6,
                                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: leading ? '700' : '500' }, children: selected ? `✓ ${o.label}` : o.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [pct, "%"] })] })] }, o.id));
                }
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: o.label, accessibilityState: { selected: false }, disabled: !onVote, onPress: onVote ? () => onVote(o.id) : undefined, style: ({ pressed }) => ({
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        borderRadius: tokens.radius.md,
                        borderWidth: 1,
                        borderColor: colors.primary,
                        backgroundColor: pressed ? colors.primary : colors.surface,
                    }), children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: pressed ? colors.onPrimary : colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'center' }, children: o.label })) }, o.id));
            }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: derivedMeta })] }));
}
//# sourceMappingURL=Poll.js.map