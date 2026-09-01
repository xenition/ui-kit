"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryViewer = StoryViewer;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const color_1 = require("../primitives/internal/color");
const GradientSurface_1 = require("./internal/GradientSurface");
const feed_1 = require("./internal/feed");
/**
 * StoryViewer — the immersive, full-screen story view for the social V4 "feed"
 * line. A full-bleed frame (the `imageUrl` under a brand-gradient scrim, or the
 * gradient itself) carries a top row of segment progress bars — played/active in
 * near-white, upcoming in a frosted track — an author header + close control in
 * near-white ink, invisible left/right tap-zones for rewind/advance, an optional
 * caption, and a frosted reply affordance. Token-only colors via `GradientSurface`
 * + `feed*` + `useXenitionTheme()` (no literals); dark-mode safe.
 */
function StoryViewer({ segments, activeIndex, author, timeLabel, imageUrl, caption, replyPlaceholder = 'Send message', onNext, onPrev, onClose, onReply, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const r = tokens.ramps;
    const ink = (0, feed_1.feedInk)(r);
    const inkSoft = (0, feed_1.feedInkSoft)(r);
    const count = Math.max(0, Math.trunc(segments));
    const bars = Array.from({ length: count }, (_, i) => i);
    const scrim = (0, color_1.withAlpha)(r.primary[700], 0.6);
    return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ borderRadius: tokens.radius.lg, aspectRatio: 9 / 16, overflow: 'hidden' }, style], children: (0, jsx_runtime_1.jsxs)(GradientSurface_1.GradientSurface, { colors: (0, feed_1.feedGradient)(r), style: { flex: 1 }, children: [imageUrl ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: imageUrl }, accessible: false, resizeMode: "cover", style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: scrim } })] })) : null, (0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "progressbar", accessibilityValue: { min: 0, max: count, now: activeIndex + 1 }, style: { flexDirection: 'row', gap: tokens.spacing.xs, padding: tokens.spacing.md }, children: bars.map((i) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 4, borderRadius: tokens.radius.full, backgroundColor: (0, feed_1.feedTile)(r, 0.3), overflow: 'hidden' }, children: (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: '100%', width: i <= activeIndex ? '100%' : '0%', borderRadius: tokens.radius.full, backgroundColor: ink } }) }, i))) }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.md }, children: [(0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: author.avatarUrl, name: author.name, size: "sm" }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: ink, fontSize: tokens.typography.scale.sm, fontWeight: '700', flexShrink: 1 }, children: author.name }), timeLabel ? (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.xs }, children: timeLabel }) : null] }), onClose ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Close story", onPress: onClose, style: ({ pressed }) => ({ width: 44, height: 44, alignItems: 'center', justifyContent: 'center', opacity: pressed ? 0.7 : 1 }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: "\u2715" }) })) : null] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, flexDirection: 'row' }, children: [(0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Previous", onPress: onPrev, style: { flex: 1 } }), (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: "Next", onPress: onNext, style: { flex: 2 } })] }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { gap: tokens.spacing.sm, padding: tokens.spacing.md }, children: [caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: ink, fontSize: tokens.typography.scale.sm, lineHeight: tokens.typography.scale.sm * 1.5 }, children: caption })) : null, onReply ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: replyPlaceholder, onPress: onReply, style: ({ pressed }) => ({
                                minHeight: 44,
                                justifyContent: 'center',
                                paddingHorizontal: tokens.spacing.lg,
                                borderRadius: tokens.radius.full,
                                backgroundColor: (0, feed_1.feedTile)(r),
                                borderWidth: 1,
                                borderColor: (0, feed_1.feedBorder)(r),
                                opacity: pressed ? 0.85 : 1,
                            }), children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: inkSoft, fontSize: tokens.typography.scale.sm, fontWeight: '600' }, children: replyPlaceholder }) })) : null] })] }) }));
}
//# sourceMappingURL=StoryViewer.js.map