"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRowV2 = LessonRowV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    locked: { glyph: '🔒', color: 'muted', a11y: 'locked' },
    available: { glyph: '▷', color: 'primary', a11y: 'available' },
    'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress' },
    completed: { glyph: '✓', color: 'success', a11y: 'completed' },
};
/**
 * LessonRow, design v2 — a **timeline node** row: a large ringed circle on the
 * left carries the 1-based index (or a status glyph when there's no index),
 * tinted by the lesson's semantic status. The title and meta sit to the right
 * with no surrounding card. Same props as {@link LessonRow}. Token-only colors.
 */
function LessonRowV2({ title, index, durationLabel, status = 'available', kind, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const locked = status === 'locked';
    const interactive = !!onPress && !locked;
    const tint = colors[meta.color];
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                paddingVertical: tokens.spacing.sm,
                opacity: locked ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 40,
                    height: 40,
                    borderRadius: tokens.radius.full,
                    borderWidth: 2,
                    borderColor: tint,
                    backgroundColor: (0, color_1.withAlpha)(tint, 0.1),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: index != null && !locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: tint, fontSize: tokens.typography.scale.base, fontWeight: '800' }, children: index })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: tint, fontSize: tokens.typography.scale.base }, children: meta.glyph })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: title }), kind || durationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [kind, durationLabel].filter(Boolean).join(' · ') })) : null] }), interactive ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.lg }, children: "\u203A" })) : null] }));
    const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=LessonRowV2.js.map