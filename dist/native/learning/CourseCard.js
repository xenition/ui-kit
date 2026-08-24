"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCard = CourseCard;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const LEVEL_META = {
    beginner: { label: 'Beginner', tone: 'success' },
    intermediate: { label: 'Intermediate', tone: 'warn' },
    advanced: { label: 'Advanced', tone: 'danger' },
};
/**
 * A course summary card: thumbnail (or glyph fallback), level + category tags,
 * title, instructor, a lessons / duration / rating stat strip, an optional
 * progress bar, price, and a single dominant CTA. `progress` flips the card into
 * an "in progress" state (Continue). Token-only colors.
 */
function CourseCard({ title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const levelMeta = level ? LEVEL_META[level] : undefined;
    const inProgress = progress != null;
    const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Course: ${title}${instructor ? `, by ${instructor}` : ''}`, style: [
            {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderWidth: 1,
                borderRadius: tokens.radius.lg,
                overflow: 'hidden',
            },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    height: 120,
                    backgroundColor: colors.accent,
                    alignItems: 'center',
                    justifyContent: 'center',
                }, children: thumbnail ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnail }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: glyph })) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [levelMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: levelMeta.tone, children: levelMeta.label }) : null, category ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", children: category }) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), instructor ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: instructor })) : null, rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), ratingCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", ratingCount, ")"] })) : null] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.lg }, children: [lessonCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [lessonCount, " lessons"] })) : null, durationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: durationLabel })) : null] }), inProgress ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, tone: "primary", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [Math.round(progress), "% complete"] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: [price ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: price })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}: ${title}`, onPress: onPress, style: ({ pressed }) => ({
                                    borderRadius: tokens.radius.md,
                                    paddingVertical: tokens.spacing.sm,
                                    paddingHorizontal: tokens.spacing.lg,
                                    backgroundColor: colors.primary,
                                    opacity: pressed ? 0.85 : 1,
                                }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }) })) : null] })] })] }));
}
//# sourceMappingURL=CourseCard.js.map