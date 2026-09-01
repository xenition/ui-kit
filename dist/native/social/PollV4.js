"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PollV4 = PollV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
/**
 * Poll — **V4** "feed" design. Clean and airy with a single primary accent:
 * before voting, big (≥44px) tappable option rows; after voting or when
 * `closed`, each row becomes a soft-primary fill bar showing the `%`, with the
 * viewer's pick and the leading option emphasized in primary. Keeps the
 * total-votes + expiry caption and guards an all-zero tally. Same props/behavior
 * as {@link PollProps}; token-only colors via `useXenitionTheme()` + `withAlpha`,
 * `radiogroup`/`radio` a11y.
 */
function PollV4({ question, options, votedOptionId, closed = false, onVote, meta, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const total = options.reduce((sum, o) => sum + (o.votes ?? 0), 0);
    const showResults = closed || votedOptionId != null;
    const leadVotes = options.reduce((max, o) => Math.max(max, o.votes ?? 0), 0);
    const derivedMeta = meta ??
        `${total.toLocaleString()} ${total === 1 ? 'vote' : 'votes'}${closed ? ' · Final' : ''}`;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Animated.View, { accessibilityRole: "radiogroup", style: [
            { opacity: enter.opacity, transform: enter.transform },
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                gap: tokens.spacing.sm,
                borderRadius: tokens.radius.lg,
                padding: tokens.spacing.lg,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: question }), options.map((o) => {
                const votes = o.votes ?? 0;
                const pct = total > 0 ? Math.round((votes / total) * 100) : 0;
                const selected = votedOptionId === o.id;
                const leading = showResults && votes === leadVotes && leadVotes > 0;
                const emphasize = selected || leading;
                if (showResults) {
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "radio", accessibilityState: { selected }, accessibilityLabel: `${o.label}, ${pct}%`, style: {
                            overflow: 'hidden',
                            minHeight: 44,
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            borderWidth: 1,
                            borderColor: emphasize ? colors.primary : colors.border,
                            backgroundColor: colors.surface,
                        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    width: `${pct}%`,
                                    backgroundColor: (0, color_1.withAlpha)(colors.primary, emphasize ? 0.2 : 0.1),
                                } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: emphasize ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: emphasize ? '700' : '500' }, children: selected ? `✓ ${o.label}` : o.label }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: emphasize ? colors.primaryText : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [pct, "%"] })] })] }, o.id));
                }
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "radio", accessibilityLabel: o.label, accessibilityState: { selected: false }, disabled: !onVote, onPress: onVote ? () => onVote(o.id) : undefined, style: ({ pressed }) => ({
                        minHeight: 44,
                        justifyContent: 'center',
                        paddingVertical: tokens.spacing.sm,
                        paddingHorizontal: tokens.spacing.md,
                        borderRadius: tokens.radius.full,
                        backgroundColor: pressed ? colors.primary : (0, color_1.withAlpha)(colors.primary, 0.1),
                    }), children: ({ pressed }) => ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: pressed ? colors.onPrimary : colors.primaryText, fontSize: tokens.typography.scale.sm, fontWeight: '600', textAlign: 'center' }, children: o.label })) }, o.id));
            }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: derivedMeta })] }));
}
//# sourceMappingURL=PollV4.js.map