"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BracketViewV4 = BracketViewV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * BracketView — **V4** "broadcast" design. The knockout draw as a matchday
 * graphic: horizontally-scrolling round columns of clean, elevated matchup
 * cells, the advancing side bolded and washed in a soft-primary tint with a
 * primary check glyph (never color alone). The implied connective column
 * structure of the base is preserved, as is horizontal scroll. Same
 * props/behavior as {@link BracketViewProps}; token-only colors via
 * `useXenitionTheme()`.
 */
function BracketViewV4({ rounds, onSelectMatch, emptyLabel = 'Bracket not drawn yet', style, }) {
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
        const named = Boolean(slot.name && slot.name.length > 0);
        const win = Boolean(slot.winner);
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: tokens.spacing.xs,
                paddingHorizontal: tokens.spacing.xs,
                paddingVertical: 2,
                borderRadius: tokens.radius.sm,
                backgroundColor: win ? (0, color_1.withAlpha)(colors.primary, 0.1) : 'transparent',
            }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flex: 1 }, children: [win ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: "\u2713" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: "\u00B7" })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                flex: 1,
                                color: named ? (win ? colors.primary : colors.onSurface) : colors.muted,
                                fontSize: tokens.typography.scale.sm,
                                fontWeight: win ? '800' : '500',
                                fontStyle: named ? 'normal' : 'italic',
                            }, children: named ? slot.name : 'TBD' })] }), slot.score !== undefined ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: win ? colors.primary : colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: slot.score })) : null] }));
    };
    const renderMatch = (m, ri) => {
        const tileStyle = {
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: tokens.radius.md,
            backgroundColor: colors.surface,
            padding: tokens.spacing.sm,
            gap: tokens.spacing.xs,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 6,
            shadowOffset: { width: 0, height: 2 },
            elevation: 2,
        };
        const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: tileStyle, children: [renderSlot(m.top), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } }), renderSlot(m.bottom)] }));
        const a11y = `${m.top.name ?? 'TBD'} versus ${m.bottom.name ?? 'TBD'}`;
        return onSelectMatch ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelectMatch(m, ri), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile }, m.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: tile }, m.id));
    };
    return ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, contentContainerStyle: { gap: tokens.spacing.lg, padding: tokens.spacing.xs }, children: rounds.map((round, ri) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: 176, justifyContent: 'space-around', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '800', textAlign: 'center', letterSpacing: 0.5 }, children: round.title }), round.matches.map((m) => renderMatch(m, ri))] }, `${round.title}-${ri}`))) }));
}
//# sourceMappingURL=BracketViewV4.js.map