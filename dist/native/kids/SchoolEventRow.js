"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchoolEventRow = SchoolEventRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const TYPE_META = {
    holiday: { glyph: '🏖️', label: 'Holiday', tone: 'success' },
    exam: { glyph: '📝', label: 'Exam', tone: 'danger' },
    meeting: { glyph: '👥', label: 'Meeting', tone: 'primary' },
    trip: { glyph: '🚌', label: 'Trip', tone: 'accent' },
    activity: { glyph: '⚽', label: 'Activity', tone: 'primary' },
    deadline: { glyph: '⏳', label: 'Deadline', tone: 'warn' },
    other: { glyph: '🏫', label: 'Event', tone: 'neutral' },
};
/**
 * A row for a school-calendar item: a type icon, title, a date/time/location
 * line, and a type chip. Pressable when `onPress` is set. Type is conveyed by
 * glyph + label + chip, not color alone. Token-only colors.
 */
function SchoolEventRow({ title, type = 'other', date, time, location, childName, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = TYPE_META[type] ?? TYPE_META.other;
    const metaParts = [date, time, location].filter(Boolean);
    const inner = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
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
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), metaParts.length > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaParts.join(' · ') })) : null, childName ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["\uD83D\uDC76 ", childName] })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.tone, variant: "soft", size: "sm", children: meta.label })] }));
    const a11y = `${meta.label}: ${title}${date ? `, ${date}` : ''}`;
    if (!onPress) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: inner });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: inner }));
}
//# sourceMappingURL=SchoolEventRow.js.map