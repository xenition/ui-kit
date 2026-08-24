"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LivestockRow = LivestockRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const HEALTH_META = {
    healthy: { label: 'Healthy', color: 'onSurface', tone: 'success' },
    monitor: { label: 'Monitor', color: 'warn', tone: 'warn' },
    sick: { label: 'Sick', color: 'danger', tone: 'danger' },
};
/**
 * A livestock group row — species glyph, name, head count (emphasized), and an
 * optional location, closed by a health {@link Badge}. Health colors the count
 * but is always paired with a text chip so an at-risk group reads without
 * color. `count` is guarded (renders "—" when absent). A hairline divider
 * separates rows unless `last`. Tappable via `onPress`. Token-bound throughout.
 */
function LivestockRow({ species, count, icon = '🐄', location, health = 'healthy', detail, last = false, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = HEALTH_META[health];
    const shownCount = typeof count === 'number' ? String(count) : '—';
    const Body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "xl", color: "onSurface" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: species }), (location != null || detail != null) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [location, detail].filter((s) => s != null && s !== '').join(' · ') })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors[meta.color], fontSize: tokens.typography.scale.lg, fontWeight: '700', fontFamily: tokens.typography.fontHeading }, children: shownCount }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] })] }));
    if (!onPress)
        return Body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${species}, ${shownCount} head, ${meta.label}`, onPress: onPress, style: ({ pressed }) => [{ opacity: pressed ? 0.85 : 1 }], children: Body }));
}
//# sourceMappingURL=LivestockRow.js.map