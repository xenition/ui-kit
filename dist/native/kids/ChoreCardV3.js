"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChoreCardV3 = ChoreCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const STATUS_LABEL = {
    todo: 'To do',
    'in-progress': 'In progress',
    done: 'Done',
    skipped: 'Skipped',
};
/**
 * ChoreCard, redesigned (v3): a **dense checklist line**. A leading checkbox
 * toggles completion (checking it fires `onComplete`), the title sits inline
 * with a small assignee·due caption, and points show as a trailing star figure.
 * One tight row for long chore lists — the opposite of v2's tall quest card.
 * Same props.
 */
function ChoreCardV3({ title, assignee, points, due, icon = '🧹', status = 'todo', loading = false, onComplete, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const isDone = status === 'done';
    const container = [
        {
            flexDirection: 'row',
            alignItems: 'center',
            gap: tokens.spacing.md,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderWidth: 1,
            borderRadius: tokens.radius.md,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
        },
        style,
    ];
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading chore", style: container, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 20, height: 20, borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 12, width: '55%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 9, width: '35%', borderRadius: tokens.radius.sm, backgroundColor: colors.border } })] })] }));
    }
    const subParts = [assignee, due].filter(Boolean);
    const a11y = `${title}${assignee ? `, ${assignee}` : ''}, ${STATUS_LABEL[status]}`;
    // Checking the box is the completion gesture. Only fire on the true edge.
    const handleToggle = (next) => {
        if (next && !isDone)
            onComplete?.();
        else
            onPress?.();
    };
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: a11y, style: container, children: [(0, jsx_runtime_1.jsx)(primitives_1.Checkbox, { checked: isDone, onCheckedChange: handleToggle, accessibilityLabel: `Mark ${title} done` }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.lg }, children: icon }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                            color: colors.onSurface,
                            fontSize: tokens.typography.scale.base,
                            fontWeight: '600',
                            textDecorationLine: isDone ? 'line-through' : 'none',
                        }, children: title }), subParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: subParts.join(' · ') })) : null] }), typeof points === 'number' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.accentText, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: `⭐ ${points}` })) : null] }));
}
//# sourceMappingURL=ChoreCardV3.js.map