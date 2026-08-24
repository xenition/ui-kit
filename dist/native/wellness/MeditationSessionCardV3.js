"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MeditationSessionCardV3 = MeditationSessionCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const CATEGORY_META = {
    breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
    focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
    sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
    calm: { glyph: '🍃', label: 'Calm', color: 'success' },
    movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
    'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
    'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};
/**
 * MeditationSessionCard — **media-left row** design (v3). A compact horizontal
 * item: a square category-tinted thumbnail on the left (with a small resume dot
 * when in progress), the category label + title + a meta line in the middle, and
 * a round start/resume control on the right. `locked` shows a lock control and
 * an unlock note; `loading` renders a skeleton. Same props as
 * {@link MeditationSessionCardProps}; token-only colors.
 */
function MeditationSessionCardV3({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const press = (0, motion_1.usePressScale)();
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
    const accent = colors[meta.color];
    const containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.lg,
        padding: tokens.spacing.md,
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading session", style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "rect", width: 64, height: 64 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "70%", height: tokens.typography.scale.base }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "45%", height: tokens.typography.scale.sm })] })] }));
    }
    const resume = progress != null && progress > 0 && progress < 1;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');
    const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;
    const metaLine = [durationMin != null ? `${durationMin} min` : null, level ? cap(level) : null, instructor ? instructor : null]
        .filter(Boolean)
        .join(' · ') ||
        description ||
        '';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} session: ${title}${locked ? ', premium' : ''}${resume ? `, ${pct}% complete` : ''}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                        width: 64,
                        height: 64,
                        borderRadius: tokens.radius.md,
                        backgroundColor: (0, color_1.withAlpha)(accent, 0.16),
                        alignItems: 'center',
                        justifyContent: 'center',
                    }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale['2xl'] }, children: meta.glyph }), resume ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                position: 'absolute',
                                bottom: 4,
                                right: 4,
                                paddingHorizontal: 4,
                                borderRadius: tokens.radius.full,
                                backgroundColor: accent,
                            }, children: (0, jsx_runtime_1.jsxs)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onPrimary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: [pct, "%"] }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: accent, fontSize: tokens.typography.scale.xs, fontWeight: '700', textTransform: 'uppercase' }, children: meta.label }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), metaLine ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaLine })) : null, locked ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontWeight: '600' }, children: "\uD83D\uDD12 Membership" })) : null] }), (0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: locked ? 'Premium, locked' : cta, accessibilityState: { disabled: locked }, disabled: locked || !onStart, onPress: onStart, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({
                            width: 44,
                            height: 44,
                            borderRadius: tokens.radius.full,
                            backgroundColor: locked ? (0, color_1.withAlpha)(colors.muted, 0.16) : accent,
                            alignItems: 'center',
                            justifyContent: 'center',
                            opacity: locked ? 0.6 : pressed ? 0.8 : 1,
                        }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: locked ? colors.muted : colors.onPrimary }, children: locked ? '🔒' : '▶' }) }) })] }) }));
}
function cap(s) {
    return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
//# sourceMappingURL=MeditationSessionCardV3.js.map