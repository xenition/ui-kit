"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCardV2 = CourseCardV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const charts_1 = require("../charts");
const elevation_1 = require("../primitives/internal/elevation");
const LEVEL_META = {
    beginner: { label: 'Beginner', tone: 'success' },
    intermediate: { label: 'Intermediate', tone: 'warn' },
    advanced: { label: 'Advanced', tone: 'danger' },
};
/**
 * CourseCard, design v2 — a **horizontal** row: a square thumbnail (or glyph)
 * on the left, a stacked content column on the right, and an elevated,
 * borderless surface (drop shadow). When `progress` is set the card shows a
 * compact {@link ProgressRing} instead of a bar. Same props as {@link CourseCard}.
 * Token-only colors.
 */
function CourseCardV2({ title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const levelMeta = level ? LEVEL_META[level] : undefined;
    const inProgress = progress != null;
    const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Course: ${title}${instructor ? `, by ${instructor}` : ''}`, style: [
            {
                flexDirection: 'row',
                gap: tokens.spacing.md,
                padding: tokens.spacing.md,
                backgroundColor: colors.surface,
                borderRadius: tokens.radius.lg,
                ...(0, elevation_1.shadow)('md', tokens),
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    width: 92,
                    height: 92,
                    borderRadius: tokens.radius.md,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                }, children: thumbnail ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnail }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: glyph })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs, flexWrap: 'wrap' }, children: [levelMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: levelMeta.tone, children: levelMeta.label }) : null, category ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: category }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), instructor ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: instructor })) : null, rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), ratingCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", ratingCount, ")"] })) : null] })) : null, lessonCount != null || durationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [lessonCount != null ? `${lessonCount} lessons` : null, durationLabel].filter(Boolean).join(' · ') })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: [price ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: price })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onPress ? ((0, jsx_runtime_1.jsx)(primitives_1.Button, { variant: "primary", size: "sm", onPress: onPress, accessibilityLabel: `${label}: ${title}`, children: label })) : null] })] }), inProgress ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(charts_1.ProgressRing, { value: progress, max: 100, size: 52, strokeWidth: 6, color: "primary" }) })) : null] }));
}
//# sourceMappingURL=CourseCardV2.js.map