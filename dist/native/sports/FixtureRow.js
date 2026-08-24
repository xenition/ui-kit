"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FixtureRow = FixtureRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const STATUS_META = {
    scheduled: { label: 'vs', glyph: '🕑', live: false },
    live: { label: 'LIVE', glyph: '●', live: true },
    final: { label: 'FT', glyph: '✓', live: false },
    postponed: { label: 'PP', glyph: '⚠', live: false },
};
/**
 * A compact one-line fixture — home vs away with a leading center column that
 * shows either the kickoff time, the live scoreline, or the final result. The
 * status is conveyed by text + glyph (a `danger` dot only reinforces "LIVE").
 * Built for tight lists (schedules, results). Tappable via `onPress`.
 * Token-only colors.
 */
function FixtureRow({ home, away, homeCrest, awayCrest, homeScore, awayScore, kickoffLabel, minute, meta, status = 'scheduled', highlighted = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sm = STATUS_META[status] ?? STATUS_META.scheduled;
    const hasScore = homeScore !== undefined && awayScore !== undefined;
    const center = status === 'scheduled'
        ? kickoffLabel ?? 'vs'
        : hasScore
            ? `${homeScore} – ${awayScore}`
            : sm.label;
    const teamText = (nameStr, crest, align) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flex: 1,
            flexDirection: align === 'right' ? 'row-reverse' : 'row',
            alignItems: 'center',
            gap: tokens.spacing.xs,
        }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.sm }, children: crest ?? '🛡' }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
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
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: highlighted ? colors.primary : colors.border,
        backgroundColor: highlighted ? tokens.ramps.primary[50] : colors.surface,
    };
    const centerBlock = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', minWidth: 64 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                    color: status === 'scheduled' ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.base,
                    fontWeight: '700',
                }, children: center }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: 3 }, children: [sm.live ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 6, height: 6, borderRadius: 3, backgroundColor: colors.danger } })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                            color: sm.live ? colors.danger : colors.muted,
                            fontSize: tokens.typography.scale.xs,
                            fontWeight: '600',
                        }, children: status === 'live' && minute ? minute : status === 'scheduled' ? (meta ?? '') : sm.label })] })] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [teamText(home, homeCrest, 'right'), centerBlock, teamText(away, awayCrest, 'left')] }));
    const a11y = `${home} versus ${away}, ${sm.label}` +
        (hasScore ? `, ${homeScore} to ${awayScore}` : status === 'scheduled' && kickoffLabel ? `, ${kickoffLabel}` : '');
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, children: body }));
}
//# sourceMappingURL=FixtureRow.js.map