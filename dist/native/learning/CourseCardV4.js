"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CourseCardV4 = CourseCardV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
const LEVEL_META = {
    beginner: { label: 'Beginner', tone: 'success' },
    intermediate: { label: 'Intermediate', tone: 'warn' },
    advanced: { label: 'Advanced', tone: 'danger' },
};
/**
 * CourseCard — **V4** "campus" design (native twin of the web V4). An elevated
 * rounded card with a soft shadow, a soft-primary media well (thumbnail or
 * glyph), level + category badges, the title + instructor, a rating, a lessons ·
 * duration strip, an optional progress bar with a **tabular-nums** percentage,
 * price, and one dominant CTA. Honors the V4 `variant` — `full` (card, default)
 * and `compact` (a dense single row). Token-only colors via `useXenitionTheme()`.
 */
function CourseCardV4({ title, instructor, thumbnail, glyph = '📚', level, category, lessonCount, durationLabel, rating, ratingCount, progress, price, ctaLabel, onPress, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const levelMeta = level ? LEVEL_META[level] : undefined;
    const inProgress = progress != null;
    const label = ctaLabel ?? (inProgress ? 'Continue' : 'Enroll');
    const shell = {
        backgroundColor: colors.card,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const cta = onPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `${label}: ${title}`, onPress: onPress, style: ({ pressed }) => ({ borderRadius: tokens.radius.md, paddingVertical: tokens.spacing.sm, paddingHorizontal: tokens.spacing.lg, backgroundColor: colors.primary, opacity: pressed ? 0.85 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onPrimary, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: label }) })) : null;
    // ── compact: dense single row ──
    if (variant === 'compact') {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Course: ${title}${instructor ? `, by ${instructor}` : ''}`, style: [shell, { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, padding: tokens.spacing.sm }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 44, height: 44, borderRadius: tokens.radius.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: thumbnail ? (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnail }, style: { width: '100%', height: '100%' }, resizeMode: "cover" }) : (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.xl }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, minWidth: 0, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '700' }, children: title }), instructor ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: instructor }) : null] }), levelMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: levelMeta.tone, variant: "soft", children: levelMeta.label }) : null, cta] }));
    }
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `Course: ${title}${instructor ? `, by ${instructor}` : ''}`, style: [shell, { overflow: 'hidden' }, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 120, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1), alignItems: 'center', justifyContent: 'center' }, children: thumbnail ? (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnail }, style: { width: '100%', height: '100%' }, resizeMode: "cover" }) : (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['3xl'] }, children: glyph }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { padding: tokens.spacing.lg, gap: tokens.spacing.sm }, children: [levelMeta || category ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', gap: tokens.spacing.xs }, children: [levelMeta ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: levelMeta.tone, variant: "soft", children: levelMeta.label }) : null, category ? (0, jsx_runtime_1.jsx)(primitives_1.Badge, { tone: "neutral", variant: "soft", children: category }) : null] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: title }), instructor ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: instructor }) : null, rating != null ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Rating, { value: rating, size: "sm", showValue: true }), ratingCount != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: ["(", ratingCount, ")"] }) : null] })) : null, lessonCount != null || durationLabel ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.sm, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.05), borderRadius: tokens.radius.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, children: [lessonCount != null ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: ["\uD83D\uDCD8 ", lessonCount, " lessons"] }) : null, durationLabel ? (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: ["\u23F1 ", durationLabel] }) : null] })) : null, inProgress ? ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: 4 }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: progress, tone: "primary", size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: [Math.round(progress), "% complete"] })] })) : null, (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: tokens.spacing.xs }, children: [price ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg, fontWeight: '700', fontVariant: ['tabular-nums'] }, children: price }) : (0, jsx_runtime_1.jsx)(react_native_1.View, {}), cta] })] })] }));
}
//# sourceMappingURL=CourseCardV4.js.map