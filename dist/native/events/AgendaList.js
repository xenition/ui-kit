"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AgendaList = AgendaList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATUS_TONE = {
    upcoming: 'muted',
    live: 'success',
    done: 'border',
};
/**
 * A vertical, time-anchored agenda. Each row shows a time gutter, a status dot
 * (whose meaning is also spelled out for `live` entries), the title and an
 * optional subtitle. Renders a skeleton when `loading` and a centered empty
 * message when there are no items. Colors come from the compiled theme tokens;
 * no literal colors.
 */
function AgendaList({ items, onSelectItem, emptyLabel = 'No sessions scheduled yet', loading = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: "Loading agenda", style: [{ gap: tokens.spacing.sm }, style], children: Array.from({ length: 3 }, (_, i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing['2xl'], height: tokens.spacing.md, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[200] } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: tokens.spacing.lg, borderRadius: tokens.radius.sm, backgroundColor: tokens.ramps.neutral[100] } })] }, i))) }));
    }
    if (items.length === 0) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", style: [
                {
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: tokens.spacing.xl,
                    borderRadius: tokens.radius.md,
                    borderWidth: 1,
                    borderColor: colors.border,
                    backgroundColor: colors.surface,
                },
                style,
            ], children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }) }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "list", style: [{ gap: tokens.spacing.xs }, style], children: items.map((item) => {
            const status = item.status ?? 'upcoming';
            const Row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.md, paddingVertical: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { width: tokens.spacing['2xl'] + tokens.spacing.md, color: colors.muted, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: item.time }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', paddingTop: tokens.spacing.xs / 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: tokens.spacing.sm, height: tokens.spacing.sm, borderRadius: tokens.radius.full, backgroundColor: colors[STATUS_TONE[status]] } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { flex: 1, color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: item.title }), status === 'live' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.success, fontSize: tokens.typography.scale.xs, fontWeight: '700', letterSpacing: 1 }, children: "LIVE" })) : null] }), item.subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: item.subtitle })) : null] })] }));
            if (onSelectItem) {
                return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${item.time} ${item.title}`, onPress: () => onSelectItem(item), style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: Row }, item.id));
            }
            return (0, jsx_runtime_1.jsx)(react_native_1.View, { children: Row }, item.id);
        }) }));
}
//# sourceMappingURL=AgendaList.js.map