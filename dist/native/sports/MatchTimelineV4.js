"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MatchTimelineV4 = MatchTimelineV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Glyph + accessible label + semantic slot per kind (color reinforces the glyph, never alone). */
const EVENT_META = {
    goal: { glyph: '⚽', label: 'Goal', slot: 'primary' },
    'own-goal': { glyph: '🥅', label: 'Own goal', slot: 'warn' },
    penalty: { glyph: '🅿', label: 'Penalty', slot: 'primary' },
    yellow: { glyph: '🟨', label: 'Yellow card', slot: 'warn' },
    red: { glyph: '🟥', label: 'Red card', slot: 'danger' },
    sub: { glyph: '🔁', label: 'Substitution', slot: 'success' },
    var: { glyph: '📺', label: 'VAR', slot: 'muted' },
};
/**
 * MatchTimeline — **V4** "broadcast" design. The matchday feed: an elevated card
 * with a center rail, each event hung on the home (left) or away (right) side
 * and anchored by a round node carrying the kind glyph (goal ⚽ / card 🟨 / sub
 * 🔁) tinted from its semantic token, plus a bold minute chip on the rail. Kind
 * is always legible from glyph + shape, not color alone. Same props/behavior as
 * {@link MatchTimelineProps}; token-only colors via `useXenitionTheme()`.
 */
function MatchTimelineV4({ homeLabel = 'Home', awayLabel = 'Away', events, emptyLabel = 'No events yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
        gap: tokens.spacing.sm,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 3 },
        elevation: 2,
    };
    const header = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', justifyContent: 'space-between' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: homeLabel }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { flex: 1, textAlign: 'right', color: colors.accent, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: awayLabel })] }));
    if (events.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.md }, children: emptyLabel })] }));
    }
    const cell = (e, mine) => {
        const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
        if (!mine)
            return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1 } });
        const home = e.side === 'home';
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, alignItems: home ? 'flex-end' : 'flex-start' }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    flexDirection: home ? 'row' : 'row-reverse',
                    alignItems: 'center',
                    gap: tokens.spacing.xs,
                }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexShrink: 1, alignItems: home ? 'flex-end' : 'flex-start' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: e.label }), e.detail ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: e.detail })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(colors[meta.slot], 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }) })] }) }));
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [container, style], children: [header, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, position: 'relative' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { pointerEvents: "none", style: { position: 'absolute', top: 0, bottom: 0, left: '50%', width: 1, marginLeft: -0.5, backgroundColor: colors.border } }), events.map((e) => {
                        const meta = EVENT_META[e.kind] ?? EVENT_META.goal;
                        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityLabel: `${e.minute}, ${meta.label}, ${e.side === 'home' ? homeLabel : awayLabel}: ${e.label}${e.detail ? `, ${e.detail}` : ''}`, style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [cell(e, e.side === 'home'), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', minWidth: 44 }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                            paddingHorizontal: tokens.spacing.xs,
                                            paddingVertical: 1,
                                            borderRadius: tokens.radius.full,
                                            borderWidth: 1,
                                            borderColor: colors.border,
                                            backgroundColor: colors.surface,
                                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: e.minute }) }) }), cell(e, e.side === 'away')] }, e.id));
                    })] })] }));
}
//# sourceMappingURL=MatchTimelineV4.js.map