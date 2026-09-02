"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LessonRowV4 = LessonRowV4;
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
 * LessonRow — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded row with a soft shadow, a status glyph in a tone-tinted well (glyph +
 * tone, never color alone), an optional index, the title, a content-kind ·
 * duration meta line, and a chevron. `locked` rows are non-interactive; others
 * are a tappable `role="button"`. Honors the V4 `variant` — `full` (default) and
 * `compact` (a denser single line). Token-only colors via `useXenitionTheme()`.
 */
function LessonRowV4({ title, index, durationLabel, status = 'available', kind, onPress, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const meta = STATUS_META[status];
    const locked = status === 'locked';
    const interactive = !!onPress && !locked;
    const compact = variant === 'compact';
    const tone = colors[meta.color];
    const shell = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        minHeight: compact ? 44 : 56,
        paddingVertical: tokens.spacing.sm,
        paddingHorizontal: tokens.spacing.md,
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        opacity: locked ? 0.6 : 1,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [shell, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(tone, 0.12) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: tone, fontSize: tokens.typography.scale.base }, children: meta.glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '600' }, children: [index != null ? `${index}. ` : '', title] }), !compact && (kind || durationLabel) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [kind, durationLabel].filter(Boolean).join(' · ') })) : null] }), interactive ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.base }, children: "\u203A" }) : null] }));
    const a11yLabel = `${title}, ${meta.a11y}${durationLabel ? `, ${durationLabel}` : ''}`;
    if (!interactive) {
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "text", accessibilityLabel: a11yLabel, children: body });
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11yLabel, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }));
}
//# sourceMappingURL=LessonRowV4.js.map