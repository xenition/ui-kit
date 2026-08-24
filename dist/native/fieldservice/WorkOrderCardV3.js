"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderCardV3 = WorkOrderCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS = {
    open: { label: 'Open', glyph: '○', tone: 'neutral', slot: 'muted' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary', slot: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn', slot: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success', slot: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral', slot: 'muted' },
};
const PRIORITY_GLYPH = {
    low: { glyph: '↓', label: 'Low' },
    medium: { glyph: '=', label: 'Medium' },
    high: { glyph: '↑', label: 'High' },
    emergency: { glyph: '!', label: 'Emergency' },
};
function WorkOrderCardV3({ workOrderNumber, title, status, priority, assignee, site, glyph = '🔧', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.open;
    const pd = priority ? PRIORITY_GLYPH[priority] : undefined;
    const rowStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        borderRadius: tokens.radius.md,
        borderWidth: 1,
        borderColor: colors.border,
        backgroundColor: colors.surface,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading work order", style: [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.4) } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 12, borderRadius: tokens.radius.sm, backgroundColor: (0, color_1.withAlpha)(colors.muted, 0.18) } })] }));
    }
    const subtitle = [workOrderNumber, pd ? `${pd.glyph} ${pd.label}` : null, site].filter(Boolean).join('  ·  ');
    const a11y = `Work order ${workOrderNumber}, ${title}, ${sd.label}`;
    const Container = onPress ? react_native_1.Pressable : react_native_1.View;
    return ((0, jsx_runtime_1.jsxs)(Container, { accessible: true, accessibilityRole: onPress ? 'button' : undefined, accessibilityLabel: a11y, onPress: onPress, style: onPress ? ({ pressed }) => [rowStyle, style, { opacity: pressed ? 0.85 : 1 }] : [rowStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { fontSize: tokens.typography.scale.base }, accessibilityLabel: "Trade", children: glyph }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 10, height: 10, borderRadius: tokens.radius.full, backgroundColor: colors[sd.slot] } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [subtitle, assignee != null ? `  ·  ${assignee}` : ''] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` })] }));
}
//# sourceMappingURL=WorkOrderCardV3.js.map