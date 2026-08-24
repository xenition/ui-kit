"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepStoryCardV3 = SleepStoryCardV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
const color_1 = require("../primitives/internal/color");
const motion_1 = require("../primitives/internal/motion");
const STORY_META = {
    nature: { glyph: '🌲', label: 'Nature', color: 'success' },
    fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
    asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
    music: { glyph: '🎵', label: 'Music', color: 'accent' },
    travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
    meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};
/**
 * SleepStoryCard — **slim list row** design (v3). A minimal single line: a left
 * play/pause control, a thin accent stripe, the small category glyph, and the
 * title + a category/narrator/length line — no large cover. `playing` flips the
 * control glyph and a11y label (state, not color alone); `locked` shows a lock;
 * `loading` renders a skeleton. Same props as {@link SleepStoryCardProps};
 * token-only colors.
 */
function SleepStoryCardV3({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const enter = (0, motion_1.useEnter)();
    const meta = STORY_META[category] ?? STORY_META.nature;
    const accent = colors[meta.color];
    const containerStyle = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.sm,
        backgroundColor: colors.surface,
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: tokens.radius.md,
        paddingVertical: tokens.spacing.sm,
        paddingRight: tokens.spacing.md,
        paddingLeft: 0,
        overflow: 'hidden',
    };
    if (loading) {
        return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: "Loading story", style: [containerStyle, { paddingLeft: tokens.spacing.md }, style], children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { variant: "circle", width: 36, height: 36 }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "65%", height: tokens.typography.scale.base }), (0, jsx_runtime_1.jsx)(primitives_1.Skeleton, { width: "40%", height: tokens.typography.scale.sm })] })] }));
    }
    const metaLine = [meta.label, narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
        description ||
        '';
    const control = locked ? '🔒' : playing ? '⏸' : '▶';
    const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { opacity: enter.opacity, transform: enter.transform }, children: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityLabel: `${meta.label} sleep story: ${title}${playing ? ', playing' : ''}${locked ? ', premium' : ''}`, style: [containerStyle, style], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { width: 4, alignSelf: 'stretch', backgroundColor: playing ? accent : (0, color_1.withAlpha)(accent, 0.5) } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: controlLabel, accessibilityState: { selected: playing, disabled: locked }, disabled: locked || !onPlay, onPress: onPlay, style: ({ pressed }) => ({
                        width: 40,
                        height: 40,
                        marginLeft: tokens.spacing.sm,
                        borderRadius: tokens.radius.full,
                        backgroundColor: playing ? accent : (0, color_1.withAlpha)(accent, 0.16),
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: locked ? 0.55 : pressed ? 0.75 : 1,
                    }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { fontSize: tokens.typography.scale.base, color: playing ? colors.onPrimary : accent }, children: control }) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 2 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.onSurface, fontSize: tokens.typography.scale.base, fontWeight: '700' }, children: title }), (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: metaLine })] })] }) }));
}
//# sourceMappingURL=SleepStoryCardV3.js.map