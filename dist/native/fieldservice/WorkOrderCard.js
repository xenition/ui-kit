"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderCard = WorkOrderCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
const format_1 = require("./internal/format");
const WORK_ORDER_STATUS = {
    open: { label: 'Open', glyph: '○', tone: 'neutral' },
    'in-progress': { label: 'In progress', glyph: '⟳', tone: 'primary' },
    'on-hold': { label: 'On hold', glyph: '⏸', tone: 'warn' },
    done: { label: 'Done', glyph: '✓', tone: 'success' },
    cancelled: { label: 'Cancelled', glyph: '✕', tone: 'neutral' },
};
const PRIORITY = {
    low: { label: 'Low', glyph: '↓', tone: 'neutral' },
    medium: { label: 'Medium', glyph: '=', tone: 'primary' },
    high: { label: 'High', glyph: '↑', tone: 'warn' },
    emergency: { label: 'Emergency', glyph: '!', tone: 'danger' },
};
/**
 * A summary card for a single field-service work order. A tinted leading trade
 * glyph disc, a title/number stack, a status pill (text + glyph + a color that
 * traces to a `SemanticColors` slot — never color alone), an optional priority
 * pill, and assignee / site / schedule meta. Becomes a pressable button only
 * when `onPress` is supplied. Renders a `Skeleton` while `loading`. Every color
 * traces to a token or a `ramps`-derived tint — no literals.
 */
function WorkOrderCard({ workOrderNumber, title, status, priority, assignee, site, scheduledFor, glyph = '🔧', loading = false, onPress, style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    const sd = WORK_ORDER_STATUS[status] ?? WORK_ORDER_STATUS.open;
    const pd = priority ? PRIORITY[priority] : undefined;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(primitives_1.Card, { variant: "elevated", style: style, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading work order", style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 44, height: 44 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "70%", height: 14 }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "text", width: "40%", height: 10 })] })] }) }));
    }
    const body = ((0, jsx_runtime_1.jsxs)(primitives_1.Card, { variant: onPress ? 'interactive' : 'elevated', style: style, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: (0, format_1.withAlpha)(colors.primary, 0.12),
                        }, children: (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: glyph, size: "xl", accessibilityLabel: "Work order" }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: workOrderNumber })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: sd.tone, variant: "soft", children: `${sd.glyph} ${sd.label}` }), pd ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: pd.tone, variant: "outline", size: "sm", children: `${pd.glyph} ${pd.label}` })) : null] })] }), assignee != null || site != null || scheduledFor != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    marginTop: tokens.spacing.md,
                    paddingTop: tokens.spacing.md,
                    borderTopWidth: 1,
                    borderTopColor: colors.border,
                    gap: 2,
                }, children: [site != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDCCD ", site] })) : null, assignee != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDC77 ", assignee] })) : null, scheduledFor != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDD51 ", scheduledFor] })) : null] })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Work order ${workOrderNumber}, ${title}, ${sd.label}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=WorkOrderCard.js.map