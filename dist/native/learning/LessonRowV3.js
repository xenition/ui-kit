"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRowV3 = LessonRowV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const STATUS_META = {
    locked: { glyph: '🔒', color: 'muted', a11y: 'locked', badge: 'neutral', badgeText: 'Locked' },
    available: { glyph: '▷', color: 'primary', a11y: 'available', badge: 'primary', badgeText: 'Start' },
    'in-progress': { glyph: '◑', color: 'accent', a11y: 'in progress', badge: 'accent', badgeText: 'Resume' },
    completed: { glyph: '✓', color: 'success', a11y: 'completed', badge: 'success', badgeText: 'Done' },
};
/**
 * LessonRow, design v3 — a **filled chip row**: a solid tinted disc holds the
 * status glyph on the left, the title stacks over quiet meta in the middle, and
 * a status {@link Badge} (glyph-free but spoken via the row a11y label) sits on
 * the right. The whole row is a rounded filled surface. Same props as
 * {@link LessonRow}. Token-only colors.
 */
function LessonRowV3({ title, index, durationLabel, status = 'available', kind, onPress, style, }) {
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
                paddingVertical: tokens.spacing.md,
                paddingHorizontal: tokens.spacing.md,
                borderRadius: tokens.radius.md,
                backgroundColor: (0, color_1.withAlpha)(tint, 0.08),
                opacity: locked ? 0.6 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 36,
                    height: 36,
                    borderRadius: tokens.radius.md,
                    backgroundColor: (0, color_1.withAlpha)(tint, 0.18),
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: tint, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: [index != null ? `${index}. ` : '', title] }), kind || durationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [kind, durationLabel].filter(Boolean).join(' · ') })) : null] }), (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: meta.badge, variant: "soft", children: meta.badgeText })] }));
    const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;
    if (!interactive) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11yLabel, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=LessonRowV3.js.map