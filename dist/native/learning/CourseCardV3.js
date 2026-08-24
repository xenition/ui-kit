"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCardV3 = CourseCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const LEVEL_META = {
    beginner: { label: 'Beginner', color: 'success' },
    intermediate: { label: 'Intermediate', color: 'accent' },
    advanced: { label: 'Advanced', color: 'danger' },
};
/**
 * CourseCard, design v3 — **minimal, typographic**: no thumbnail, no chrome.
 * A single bold tinted level chip sits above an oversized title, then a quiet
 * meta strip and a hairline progress bar. The whole surface is the press target
 * with a trailing chevron. Same props as {@link CourseCard}. Token-only colors.
 */
function CourseCardV3({ title, instructor, level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const levelMeta = level ? LEVEL_META[level] : undefined;
    const inProgress = progress != null;
    const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [
            {
                gap: tokens.spacing.sm,
                paddingVertical: tokens.spacing.lg,
                paddingHorizontal: tokens.spacing.md,
                backgroundColor: 'transparent',
                borderBottomWidth: 1,
                borderBottomColor: colors.border,
            },
            style,
        ], children: [levelMeta || category ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [levelMeta ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            alignSelf: 'flex-start',
                            paddingVertical: 3,
                            paddingHorizontal: tokens.spacing.sm,
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, color_1.withAlpha)(colors[levelMeta.color], 0.14),
                        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: {
                                color: colors[levelMeta.color],
                                fontSize: tokens.typography.scale.xs,
                                fontWeight: '800',
                                textTransform: 'uppercase',
                                letterSpacing: 0.5,
                            }, children: levelMeta.label }) })) : null, category ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: category })) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale['2xl'], fontWeight: '800' }, children: title }), instructor ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: instructor })) : null, rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), ratingCount != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: ["(", ratingCount, ")"] })) : null] })) : null, lessonCount != null || durationLabel ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [lessonCount != null ? `${lessonCount} lessons` : null, durationLabel].filter(Boolean).join('  ·  ') })) : null, inProgress ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4, marginTop: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, tone: "primary", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [Math.round(progress), "% complete"] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: [price ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.xl, fontWeight: '800' }, children: price })) : ((0, jsx_runtime_1.jsx)(react_native_1.View, {})), onPress ? ((0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: [label, " \u203A"] })) : null] })] }));
    const a11y = `Course: ${title}${instructor ? `, by ${instructor}` : ''}`;
    if (!onPress) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityLabel: a11y, children: body }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}: ${title}`, onPress: onPress, style: ({ pressed }) => ({ opacity: pressed ? 0.9 : 1 }), children: body }));
}
//# sourceMappingURL=CourseCardV3.js.map