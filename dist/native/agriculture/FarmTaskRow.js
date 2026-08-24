"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FarmTaskRow = FarmTaskRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const PRIORITY_META = {
    low: { label: 'Low', tone: 'neutral', color: 'muted' },
    normal: { label: 'Normal', tone: 'primary', color: 'primary' },
    high: { label: 'High', tone: 'warn', color: 'warn' },
    urgent: { label: 'Urgent', tone: 'danger', color: 'danger' },
};
/**
 * A farm task row — a tappable check control (a themed checkbox whose a11y
 * `checked` state carries completion, not color), the task title (struck +
 * muted when done), due / field / assignee meta, and a priority {@link Badge}
 * stated as text. `overdue` adds a text chip and colors the due line so urgency
 * reads without color. Toggling the check fires `onToggle(next)`; tapping the
 * body fires `onPress`. Token-bound throughout — no literal colors.
 */
function FarmTaskRow({ title, done = false, due, priority = 'normal', field, assignee, icon = '✅', overdue = false, onToggle, onPress, last = false, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = PRIORITY_META[priority];
    const metaLine = [due, field, assignee].filter((s) => s != null && s !== '').join(' · ');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.sm,
                borderBottomWidth: last ? 0 : 1,
                borderBottomColor: colors.border,
                opacity: done ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "checkbox", accessibilityState: { checked: done }, accessibilityLabel: `Mark ${title} ${done ? 'not done' : 'done'}`, onPress: () => onToggle?.(!done), style: {
                    width: 24,
                    height: 24,
                    borderRadius: tokens.radius.sm,
                    borderWidth: 2,
                    borderColor: done ? colors.success : colors.border,
                    backgroundColor: done ? colors.success : 'transparent',
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: done ? (0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: "\u2713", size: "sm", color: "onSuccess", accessibilityLabel: "done" }) : null }), (0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: title, onPress: onPress, disabled: !onPress, style: { flex: 1 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Icon, { glyph: icon, size: "sm", color: "muted" }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                                    flex: 1,
                                    color: colors.onSurface,
                                    fontSize: tokens.typography.scale.sm,
                                    fontWeight: '600',
                                    textDecorationLine: done ? 'line-through' : 'none',
                                }, children: title })] }), metaLine !== '' ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: overdue ? colors.danger : colors.muted, fontSize: tokens.typography.scale.xs, marginTop: 2 }, children: [overdue ? '⚠ Overdue · ' : '', metaLine] })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'flex-end', gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label }), overdue ? ((0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "danger", variant: "outline", size: "sm", children: "Overdue" })) : null] })] }));
}
//# sourceMappingURL=FarmTaskRow.js.map