"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureRowV4 = FixtureRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    scheduled: { label: 'Upcoming', glyph: '🕑', live: false, slot: 'primary' },
    live: { label: 'LIVE', glyph: '●', live: true, slot: 'danger' },
    final: { label: 'FT', glyph: '✓', live: false, slot: 'muted' },
    postponed: { label: 'PP', glyph: '⚠', live: false, slot: 'warn' },
};
/**
 * FixtureRow — **V4** "broadcast" design. The matchday take on a fixture line:
 * a clean, elevated row with teams flanking a bold center scoreline / kickoff,
 * and a soft-tint status pill (a pulsing `danger` dot reinforces "LIVE" — never
 * color alone). One accent: `primary`. Same props/behavior as
 * {@link FixtureRowProps} (drop-in); token-only colors via `useXenitionTheme()`.
 * Tappable via `onPress`.
 */
function FixtureRowV4({ home, away, homeCrest, awayCrest, homeScore, awayScore, kickoffLabel, minute, meta, status = 'scheduled', highlighted = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sm = STATUS_META[status] ?? STATUS_META.scheduled;
    const hasScore = homeScore !== undefined && awayScore !== undefined;
    const center = status === 'scheduled'
        ? kickoffLabel ?? 'vs'
        : hasScore
            ? `${homeScore} – ${awayScore}`
            : sm.label;
    const statusRight = status === 'live' && minute ? minute : status === 'scheduled' && meta ? meta : sm.label;
    const pillBg = (0, color_1.withAlpha)(colors[sm.slot], 0.12);
    const pillFg = colors[sm.slot];
    const teamText = (nameStr, crest, align) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: align === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    flex: 1,
                    textAlign: align,
                    color: colors.onSurface,
                    fontSize: tokens.typography.scale.sm,
                    fontWeight: '600',
                }, children: nameStr })] }));
    const container = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        borderRadius: tokens.radius.lg,
        borderWidth: 1,
        borderColor: highlighted ? colors.primary : colors.border,
        backgroundColor: highlighted ? tokens.ramps.primary[50] : colors.card,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const centerBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', minWidth: 72, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: status === 'scheduled' ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.xl,
                    fontWeight: '800',
                }, children: center }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 4,
                    paddingHorizontal: tokens.spacing.sm,
                    paddingVertical: 2,
                    borderRadius: tokens.radius.full,
                    backgroundColor: pillBg,
                }, children: [sm.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: pillFg, fontSize: tokens.typography.scale.xs }, children: sm.glyph })), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: pillFg, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: statusRight })] })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [teamText(home, homeCrest, 'right'), centerBlock, teamText(away, awayCrest, 'left')] }));
    const a11y = `${home} versus ${away}, ${sm.label}` +
        (hasScore ? `, ${homeScore} to ${awayScore}` : status === 'scheduled' && kickoffLabel ? `, ${kickoffLabel}` : '');
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=FixtureRowV4.js.map