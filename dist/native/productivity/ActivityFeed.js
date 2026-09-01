"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFeed = ActivityFeed;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
/**
 * Per-action presentation: a kind glyph, its semantic accent slot (drives the
 * badge disc + glyph), and the sentence verb. Each color traces to a
 * `SemanticColors` slot — no literals.
 */
const ACTION = {
    completed: { glyph: '✓', accent: 'success', text: 'successText', verb: 'completed' },
    created: { glyph: '＋', accent: 'primary', text: 'primaryText', verb: 'created' },
    commented: { glyph: '💬', accent: 'accent', text: 'accentText', verb: 'commented on' },
    assigned: { glyph: '👤', accent: 'warn', text: 'warnText', verb: 'assigned' },
    moved: { glyph: '↔', accent: 'primary', text: 'primaryText', verb: 'moved' },
};
/** A single activity row: actor avatar + kind glyph badge + action text + time. */
function Row({ item }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const kind = ACTION[item.action] ?? ACTION.created;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            gap: tokens.spacing.md,
            paddingVertical: tokens.spacing.sm,
        }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { children: [(0, jsx_runtime_1.jsx)(primitives_1.Avatar, { size: "sm", name: item.actor.name, src: item.actor.avatarUrl }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            position: 'absolute',
                            bottom: -4,
                            right: -4,
                            width: 20,
                            height: 20,
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: tokens.radius.full,
                            borderWidth: 2,
                            borderColor: colors.card,
                            backgroundColor: (0, color_1.withAlpha)(colors[kind.accent], 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[kind.text], fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: kind.glyph }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onCard, fontWeight: '700' }, children: item.actor.name }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText }, children: ` ${kind.verb}` }), item.target ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onCard, fontWeight: '700' }, children: ` ${item.target}` })) : null] }), item.time ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: item.time })) : null] })] }));
}
/**
 * ActivityFeed — **V4** "flow" task activity feed (native twin of the web
 * component). A calm vertical list: each row an actor {@link Avatar} pinned with
 * a kind glyph badge (✓ / ＋ / 💬 / 👤 / ↔) tinted by its **semantic** token, the
 * action sentence with its **target in bold**, and a muted timestamp. Exposes a
 * `list` for screen readers. Presentational only. Token-only colors via
 * `useXenitionTheme()` — no literals.
 */
function ActivityFeed({ items, title = 'Activity', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const rows = Array.isArray(items) ? items : [];
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            { gap: tokens.spacing.sm, padding: tokens.spacing.md, borderRadius: tokens.radius.lg, backgroundColor: colors.card },
            style,
        ], children: [title ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onCard, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", children: rows.map((item, i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: i > 0 ? { borderTopWidth: 1, borderTopColor: colors.border } : undefined, children: (0, jsx_runtime_1.jsx)(Row, { item: item }) }, item.id))) })] }));
}
//# sourceMappingURL=ActivityFeed.js.map