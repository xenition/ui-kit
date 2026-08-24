"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRow = LessonRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const STATUS_META = {
    locked: { glyph: '🔒', color: 'muted', a11y: 'locked' },
    available: { glyph: '▷', color: 'primary', a11y: 'available' },
    'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress' },
    completed: { glyph: '✓', color: 'success', a11y: 'completed' },
};
/**
 * A single lesson row for a course/module list: a status indicator (glyph +
 * semantic tone, never color alone), an optional index, title, content-kind and
 * duration meta, and a chevron affordance. `locked` rows are non-interactive and
 * announced as such. Token-only colors.
 */
function LessonRow({ title, index, durationLabel, status = 'available', kind, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const locked = status === 'locked';
    const interactive = !!onPress && !locked;
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.md,
                opacity: locked ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors[meta.color], fontSize: tokens.typography.scale.base }, children: meta.glyph }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: [index != null ? `${index}. ` : '', title] }), (kind || durationLabel) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [kind, durationLabel].filter(Boolean).join(' · ') })) : null] }), interactive ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u203A" })) : null] }));
    const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=LessonRow.js.map