"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventFeed = EventFeed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/** Glyph + accessible label + semantic color slot per kind (color reinforces the glyph, never alone). */
const KIND_META = {
    goal: { glyph: '⚽', label: 'Goal', slot: 'primary' },
    'own-goal': { glyph: '🥅', label: 'Own goal', slot: 'warn' },
    penalty: { glyph: '🅿', label: 'Penalty', slot: 'primary' },
    yellow: { glyph: '🟨', label: 'Yellow card', slot: 'warn' },
    red: { glyph: '🟥', label: 'Red card', slot: 'danger' },
    sub: { glyph: '🔁', label: 'Substitution', slot: 'success' },
    var: { glyph: '📺', label: 'VAR', slot: 'muted' },
};
/**
 * EventFeed — **V4** "broadcast" design. A vertical feed of match moments on an
 * elevated card: each row pairs a bold minute chip with a round glyph node
 * (goal ⚽ / card 🟨·🟥 / sub 🔁 / VAR 📺) tinted from its semantic token and the
 * event text. Goals are emphasized (heavier text); rows with a `side` align
 * home→left / away→right. Kind is always legible from glyph + shape, not color
 * alone. Token-only colors via `useXenitionTheme()`; dark-mode safe.
 */
function EventFeed({ events, title, emptyLabel = 'No events yet', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const container = {
        backgroundColor: colors.card,
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
    const header = title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '800' }, children: title })) : null;
    if (events.length === 0) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm, textAlign: 'center', paddingVertical: tokens.spacing.sm }, children: emptyLabel })] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [container, style], children: [header, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: { gap: 6 }, children: events.map((e, i) => {
                    const meta = KIND_META[e.kind] ?? KIND_META.goal;
                    const tint = colors[meta.slot];
                    const isGoal = e.kind === 'goal' || e.kind === 'own-goal' || e.kind === 'penalty';
                    const away = e.side === 'away';
                    const a11y = `${e.minute}, ${meta.label}${e.side ? `, ${away ? 'away' : 'home'}` : ''}: ${e.text}`;
                    const chip = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { minWidth: 44, alignItems: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                borderColor: colors.border,
                                borderWidth: 1,
                                borderRadius: tokens.radius.full,
                                backgroundColor: colors.surface,
                                paddingHorizontal: tokens.spacing.sm,
                                paddingVertical: 1,
                            }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.xs, fontWeight: '800' }, children: e.minute }) }) }));
                    const node = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 28,
                            height: 28,
                            borderRadius: 14,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, color_1.withAlpha)(tint, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base }, children: meta.glyph }) }));
                    const label = ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            flex: 1,
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.sm,
                            fontWeight: isGoal ? '800' : '500',
                            textAlign: away ? 'right' : 'left',
                        }, children: e.text }));
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: a11y, style: {
                            flexDirection: away ? 'row-reverse' : 'row',
                            alignItems: 'center',
                            gap: tokens.spacing.sm,
                            paddingVertical: 2,
                        }, children: [chip, node, label] }, i));
                }) })] }));
}
//# sourceMappingURL=EventFeed.js.map