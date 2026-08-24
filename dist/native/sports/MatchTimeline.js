"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchTimeline = MatchTimeline;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const EVENT_META = {
    goal: { glyph: '⚽', label: 'Goal' },
    'own-goal': { glyph: '🥅', label: 'Own goal' },
    penalty: { glyph: '🅿', label: 'Penalty' },
    yellow: { glyph: '🟨', label: 'Yellow card' },
    red: { glyph: '🟥', label: 'Red card' },
    sub: { glyph: '🔁', label: 'Substitution' },
    var: { glyph: '📺', label: 'VAR' },
};
/**
 * A match event timeline — a vertical spine with a minute marker per event and
 * the event pushed to the home (left) or away (right) side. Each event carries
 * a glyph and an accessible kind prefix, so goals, cards, and subs are legible
 * without relying on color. Empty state built in. Presentational; pass shaped
 * `events`. Token-only colors; the spine is a plain `View`.
 */
function MatchTimeline({ homeLabel = 'Home', awayLabel = 'Away', events, emptyLabel = 'No events yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: homeLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, textAlign: 'right', color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: awayLabel })] }));
    if (events.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.md }, children: emptyLabel })] }));
    }
    const cell = (e, mine) => {
        const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
        if (!mine)
            return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } });
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                flex: 1,
                alignItems: e.side === 'home' ? 'flex-end' : 'flex-start',
            }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: e.side === 'home' ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, alignItems: e.side === 'home' ? 'flex-end' : 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: e.label }), e.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: e.detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph })] }) }));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [container, style], children: [header, events.map((e) => {
                const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
                return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${e.minute}, ${meta.label}, ${e.side === 'home' ? homeLabel : awayLabel}: ${e.label}${e.detail ? `, ${e.detail}` : ''}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [cell(e, e.side === 'home'), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', minWidth: 44 }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    paddingHorizontal: tokens.spacing.xs,
                                    paddingVertical: 1,
                                    borderRadius: tokens.radius.full,
                                    backgroundColor: tokens.ramps.neutral[100],
                                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: e.minute }) }) }), cell(e, e.side === 'away')] }, e.id));
            })] }));
}
//# sourceMappingURL=MatchTimeline.js.map