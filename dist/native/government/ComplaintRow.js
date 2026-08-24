"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ComplaintRow = ComplaintRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const primitives_2 = require("../primitives");
const format_1 = require("./internal/format");
const STATUS = {
    open: { label: 'Open', glyph: '🆕', tone: 'primary' },
    assigned: { label: 'Assigned', glyph: '👤', tone: 'accent' },
    'in-progress': { label: 'In progress', glyph: '🔧', tone: 'warn' },
    resolved: { label: 'Resolved', glyph: '✓', tone: 'success' },
    closed: { label: 'Closed', glyph: '✕', tone: 'neutral' },
};
const PRIORITY = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral' },
    normal: { label: 'Normal', glyph: '•', tone: 'neutral' },
    high: { label: 'High', glyph: '↑', tone: 'warn' },
    urgent: { label: 'Urgent', glyph: '!', tone: 'danger' },
};
/**
 * One line in a citizen-complaint / 311 service-request list: a tinted status
 * glyph disc, a title/ticket stack, and status + optional priority pills — each
 * conveyed by **glyph + label + a color that traces to a `SemanticColors`
 * slot** (resolved → success, urgent → danger), never color alone. Becomes a
 * button only when `onPress` is supplied.
 */
function ComplaintRow({ ticketNumber, title, status, category, priority, date, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = STATUS[status] ?? STATUS.open;
    const pr = priority ? PRIORITY[priority] ?? PRIORITY.normal : undefined;
    const showPriority = pr != null && (priority === 'high' || priority === 'urgent');
    const tint = sd.tone === 'neutral' ? colors.muted : colors[sd.tone];
    const row = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: (0, format_1.withAlpha)(tint, 0.14),
                }, children: (0, jsx_runtime_1.jsx)(primitives_2.Icon, { glyph: sd.glyph, accessibilityLabel: sd.label }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ticketNumber }), category != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\u00B7 ", category] })) : null, (0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: sd.tone, variant: "soft", size: "sm", children: `${sd.glyph} ${sd.label}` }), showPriority ? ((0, jsx_runtime_1.jsx)(primitives_2.Badge, { tone: pr.tone, variant: "outline", size: "sm", children: `${pr.glyph} ${pr.label}` })) : null] })] }), date != null ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: date })) : null] }));
    if (!onPress)
        return row;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Request ${ticketNumber}, ${title}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.7 : 1 }), children: row }));
}
//# sourceMappingURL=ComplaintRow.js.map