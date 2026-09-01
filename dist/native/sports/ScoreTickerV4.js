"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScoreTickerV4 = ScoreTickerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    live: { label: 'LIVE', glyph: '●', live: true, slot: 'danger' },
    final: { label: 'FT', glyph: '✓', live: false, slot: 'muted' },
    upcoming: { label: 'SOON', glyph: '🕑', live: false, slot: 'primary' },
};
/**
 * ScoreTicker — **V4** "broadcast" design. A horizontally-scrolling strip of
 * mini score cards, each a compact matchup with a soft-tint status pill (a
 * pulsing `danger` dot reinforces "LIVE" — never color alone) and bold
 * numerals; live tiles are subtly emphasised with a `primary` edge. One accent:
 * `primary`. Same props/behavior as {@link ScoreTickerProps} (drop-in) — keeps
 * the horizontal scroll, per-match `onSelect`, loading and empty states.
 * Token-only colors via `useXenitionTheme()`.
 */
function ScoreTickerV4({ matches, onSelect, loadingTiles, emptyLabel = 'No matches', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const strip = (children) => ((0, jsx_runtime_1.jsx)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, style: style, contentContainerStyle: {
            gap: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.xs,
            paddingVertical: tokens.spacing.xs,
        }, children: children }));
    if (loadingTiles && loadingTiles > 0) {
        return strip(Array.from({ length: loadingTiles }).map((_, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityState: { busy: true }, style: {
                width: 144,
                height: 80,
                borderRadius: tokens.radius.lg,
                backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1),
            } }, i))));
    }
    if (matches.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [
                {
                    paddingVertical: tokens.spacing.md,
                    paddingHorizontal: tokens.spacing.md,
                    borderRadius: tokens.radius.lg,
                    backgroundColor: colors.surface,
                    borderWidth: 1,
                    borderColor: colors.border,
                },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center' }, children: emptyLabel }) }));
    }
    return strip(matches.map((m) => {
        const status = m.status ?? 'upcoming';
        const sm = STATUS_META[status] ?? STATUS_META.upcoming;
        const hasScore = m.homeScore !== undefined && m.awayScore !== undefined;
        const pillBg = (0, color_1.withAlpha)(colors[sm.slot], 0.12);
        const pillFg = colors[sm.slot];
        const line = (name, score) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                        color: score === undefined ? colors.muted : colors.onSurface,
                        fontSize: tokens.typography.scale.lg,
                        fontWeight: '800',
                    }, children: score === undefined ? '–' : score })] }));
        const tileStyle = {
            width: 144,
            borderWidth: 1,
            borderColor: sm.live ? colors.primary : colors.border,
            borderRadius: tokens.radius.lg,
            backgroundColor: colors.card,
            padding: tokens.spacing.md,
            gap: 4,
            shadowColor: colors.onSurface,
            shadowOpacity: 0.06,
            shadowRadius: 8,
            shadowOffset: { width: 0, height: 3 },
            elevation: 2,
        };
        const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: tileStyle, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 4 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                                flex: 1,
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 4,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: 2,
                                borderRadius: tokens.radius.full,
                                backgroundColor: pillBg,
                                alignSelf: 'flex-start',
                            }, children: [sm.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: pillFg, fontSize: tokens.typography.scale.xs }, children: sm.glyph })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: pillFg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: sm.label })] }), m.clock ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: m.clock })) : null] }), line(m.home, m.homeScore), line(m.away, m.awayScore)] }));
        const a11y = `${m.home} versus ${m.away}, ${sm.label}${hasScore ? `, ${m.homeScore} ${m.awayScore}` : ''}`;
        return onSelect ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: () => onSelect(m), style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile }, m.id)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: tile }, m.id));
    }));
}
//# sourceMappingURL=ScoreTickerV4.js.map