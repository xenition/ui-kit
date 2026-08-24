"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VideoLessonRow = VideoLessonRow;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const primitives_1 = require("../primitives");
/**
 * A video lesson list row: a thumbnail with a play overlay, the title, a
 * duration / meta line, an optional watch-progress bar, and playing / watched
 * indicators. Announced with its play state. Token-only colors.
 */
function VideoLessonRow({ title, durationLabel, thumbnail, watchProgress, playing = false, watched = false, meta, onPlay, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const stateWord = playing ? 'now playing' : watched ? 'watched' : 'not watched';
    return ((0, jsx_runtime_1.jsxs)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Video: ${title}${durationLabel ? `, ${durationLabel}` : ''}, ${stateWord}`, accessibilityState: { selected: playing }, disabled: !onPlay, onPress: onPlay, style: ({ pressed }) => [
            {
                flexDirection: 'row',
                alignItems: 'center',
                gap: tokens.spacing.md,
                padding: tokens.spacing.sm,
                borderRadius: tokens.radius.md,
                backgroundColor: playing ? colors.accent : colors.surface,
                opacity: pressed ? 0.9 : 1,
            },
            style,
        ], children: [(0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
                    width: 72,
                    height: 48,
                    borderRadius: tokens.radius.sm,
                    overflow: 'hidden',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: colors.border,
                }, children: [thumbnail ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: thumbnail }, style: { width: '100%', height: '100%' }, resizeMode: "cover" })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', alignItems: 'center', justifyContent: 'center' }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { allowFontScaling: false, style: { color: colors.onSurface, fontSize: tokens.typography.scale.lg }, children: watched ? '✓' : '▶' }) })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: 4 }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 2, style: { color: colors.onSurface, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: title }), (meta || durationLabel) ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xs }, children: [meta, durationLabel].filter(Boolean).join(' · ') })) : null, watchProgress != null ? (0, jsx_runtime_1.jsx)(primitives_1.Progress, { value: watchProgress, tone: "primary", size: "sm" }) : null] })] }));
}
//# sourceMappingURL=VideoLessonRow.js.map