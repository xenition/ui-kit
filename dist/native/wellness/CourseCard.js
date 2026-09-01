"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCard = CourseCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Icon_1 = require("../primitives/Icon");
const GradientSurface_1 = require("./internal/GradientSurface");
const color_1 = require("../primitives/internal/color");
const calm_1 = require("./internal/calm");
/**
 * CourseCard — a multi-day program on a calm, clean surface card. A single small
 * gradient cover tile and a slim gradient progress fill are the only color; the
 * rest stays on the neutral surface with `onSurface`/`mutedText` type, in the
 * spirit of restraint. Progress is stated in words ("Day 3 of 10") as well as
 * the bar, so it never depends on color alone. Every value is a token, so it
 * adapts light + dark and restyles from the seed.
 */
function CourseCard({ title, subtitle, category, totalDays, completedDays = 0, coverGlyph = '🌿', onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const safeTotal = totalDays > 0 ? totalDays : 0;
    const done = Math.max(0, Math.min(completedDays, safeTotal));
    const pct = safeTotal > 0 ? (done / safeTotal) * 100 : 0;
    const a11y = `${category ? category + ', ' : ''}${title}${subtitle ? ', ' + subtitle : ''}, day ${done} of ${safeTotal}`;
    const body = ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), style: {
                            width: 56,
                            height: 56,
                            borderRadius: tokens.radius.md,
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(Icon_1.Icon, { glyph: coverGlyph, size: 24, style: { color: (0, calm_1.calmInk)(r) } }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0 }, children: [category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                    color: colors.mutedText,
                                    fontSize: tokens.typography.scale.xs,
                                    fontWeight: '700',
                                    letterSpacing: 1,
                                    textTransform: 'uppercase',
                                }, children: category })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), subtitle ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.mutedText, fontSize: tokens.typography.scale.sm }, children: subtitle })) : null] })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.xs, marginTop: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            height: 6,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.1),
                            overflow: 'hidden',
                        }, children: (0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, calm_1.calmGradient)(r), start: { x: 0, y: 0 }, end: { x: 1, y: 0 }, style: { width: `${pct}%`, height: 6, borderRadius: tokens.radius.full } }) }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.mutedText, fontSize: tokens.typography.scale.xs }, children: `Day ${done} of ${safeTotal}` })] })] }));
    const cardStyle = {
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.lg,
    };
    if (onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: a11y, onPress: onPress, style: ({ pressed }) => [cardStyle, { opacity: pressed ? 0.9 : 1 }, style], children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityLabel: a11y, style: [cardStyle, style], children: body }));
}
//# sourceMappingURL=CourseCard.js.map