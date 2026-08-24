"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BracketView = BracketView;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A knockout tournament bracket — a STATIC, dependency-free layout built from
 * horizontally-scrolling round columns of `View`-based match tiles. No SVG /
 * canvas / native dep; connectors are implied by column layout. Each tie shows
 * both competitors (TBD placeholder when unknown) and marks the winner by
 * weight + a check glyph, not color alone. Tappable via `onSelectMatch`.
 * Token-only colors.
 */
function BracketView({ rounds, onSelectMatch, emptyLabel = 'Bracket not drawn yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (rounds.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
                {
                    borderWidth: 1,
                    borderColor: colors.border,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.surface,
                    padding: tokens.spacing.xl,
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                },
                style,
            ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: emptyLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, textAlign: 'center' }, children: "Rounds appear once the draw is made." })] }));
    }
    const renderSlot = (slot) => {
        const named = slot.name && slot.name.length > 0;
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }, children: [slot.winner ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.success, fontSize: tokens.typography.scale.xs }, children: "\u2713" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u00B7" })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: named ? colors.onSurface : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: slot.winner ? '700' : '500',
                                fontStyle: named ? 'normal' : 'italic',
                            }, children: named ? slot.name : 'TBD' })] }), slot.score !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: slot.score })) : null] }));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, contentContainerStyle: { gap: tokens.spacing.lg, padding: tokens.spacing.xs }, children: rounds.map((round, ri) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 176, justifyContent: 'space-around', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '700', textAlign: 'center' }, children: round.title }), round.matches.map((m) => {
                    const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                            borderWidth: 1,
                            borderColor: colors.border,
                            borderRadius: tokens.radius.md,
                            backgroundColor: colors.surface,
                            padding: tokens.spacing.sm,
                            gap: tokens.spacing.xs,
                        }, children: [renderSlot(m.top), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), renderSlot(m.bottom)] }));
                    const a11y = `${m.top.name ?? 'TBD'} versus ${m.bottom.name ?? 'TBD'}`;
                    return onSelectMatch ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelectMatch(m, ri), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile }, m.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: tile }, m.id));
                })] }, `${round.title}-${ri}`))) }));
}
//# sourceMappingURL=BracketView.js.map