"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoLessonRowV4 = VideoLessonRowV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const color_1 = require("../primitives/internal/color");
const primitives_1 = require("../primitives");
/**
 * VideoLessonRow — **V4** "campus" design (native twin of the web V4). An
 * elevated rounded row with a soft shadow, a thumbnail with a play / watched
 * overlay, the title, a section · duration meta line, an optional watch-progress
 * bar, and a "Now playing" pill when active (the playing state is a word + pill,
 * never color alone). Tappable when `onPlay` is set. Honors the V4 `variant` —
 * `full` (default) and `compact`. Token-only colors via `useXenitionTheme()`.
 */
function VideoLessonRowV4({ title, durationLabel, thumbnail, watchProgress, playing = false, watched = false, meta, onPlay, variant = 'full', style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
    const compact = variant === 'compact';
    const shell = {
        flexDirection: 'row',
        alignItems: 'center',
        gap: tokens.spacing.md,
        padding: tokens.spacing.sm,
        borderRadius: tokens.radius.lg,
        backgroundColor: colors.card,
        borderColor: playing ? colors.primary : colors.border,
        borderWidth: playing ? 2 : 1,
        shadowColor: colors.onSurface,
        shadowOpacity: 0.06,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        elevation: 2,
    };
    const thumbW = compact ? 56 : 72;
    const thumbH = compact ? 40 : 48;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`, accessibilityState: { selected: playing }, disabled: !onPlay, onPress: onPlay, style: ({ pressed }) => [shell, { opacity: pressed ? 0.9 : 1 }, style], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { width: thumbW, height: thumbH, borderRadius: tokens.radius.md, overflow: 'hidden', alignItems: 'center', justifyContent: 'center', backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: [thumbnail ? (0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnail }, style: { width: '100%', height: '100%' }, resizeMode: "cover" }) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: watched ? colors.success : colors.primary, fontSize: tokens.typography.scale.lg }, children: watched ? '✓' : '▶' }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), !compact && (meta || durationLabel) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs, fontVariant: ['tabular-nums'] }, children: [meta, durationLabel].filter(Boolean).join(' · ') })) : null, !compact && watchProgress != null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: watchProgress, tone: "primary", size: "sm" }) : null] }), playing ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs, backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1) }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "\u25B6 Now playing" }) })) : null] }));
}
//# sourceMappingURL=VideoLessonRowV4.js.map