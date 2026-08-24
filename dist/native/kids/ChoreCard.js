"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreCard = ChoreCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_META = {
    todo: { glyph: '⬜', label: 'To do', tone: 'neutral' },
    'in-progress': { glyph: '🔄', label: 'In progress', tone: 'primary' },
    done: { glyph: '✅', label: 'Done', tone: 'success' },
    skipped: { glyph: '⏭️', label: 'Skipped', tone: 'warn' },
};
/**
 * A single chore: an icon, title, assignee + due line, a reward-points chip, a
 * status chip, and a "Mark done" button. Status is conveyed by glyph + text +
 * a11y label (never color alone). Renders a muted skeleton while `loading`.
 * Token-only colors.
 */
function ChoreCard({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status] ?? STATUS_META.todo;
    const isDone = status === 'done';
    const container = [
        {
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.lg,
            padding: tokens.spacing.lg,
            gap: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading chore", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 14, width: '60%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 10, width: '40%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] }));
    }
    const subParts = [assignee, due].filter(Boolean);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: container, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: icon }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.base,
                                    fontWeight: '700',
                                    textDecorationLine: isDone ? 'line-through' : 'none',
                                }, children: title }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subParts.join(' · ') })) : null] }), typeof points === 'number' ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "accent", variant: "soft", size: "sm", children: `⭐ ${points}` })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: `${meta.glyph} ${meta.label}` }), !isDone && onComplete ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { size: "sm", variant: "soft", tone: "success", onPress: onComplete, children: "Mark done" })) : null] })] }));
    const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${meta.label}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=ChoreCard.js.map