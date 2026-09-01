"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryRingV4 = StoryRingV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const feed_1 = require("./internal/feed");
const GradientSurface_1 = require("./internal/GradientSurface");
const DIAMETER = { xs: 32, sm: 44, md: 56, lg: 76, xl: 96 };
/**
 * StoryRing — **V4** "feed" design. The one place in the feed line that carries
 * a gradient: an unseen story wears an accent→primary gradient ring
 * ({@link feedStory} through a {@link GradientSurface}), a seen one falls back
 * to a muted ring, `live` keeps the danger ring + LIVE tag, and `add` renders a
 * dashed ring with a primary `⊕`. Keeps `size`, `state`, `label` and the
 * caption behavior. Same props/behavior as {@link StoryRingProps}; token-only
 * colors via `useXenitionTheme()` / feed helpers (no literals).
 */
function StoryRingV4({ src, name, state = 'unseen', size = 'md', label, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const outer = DIAMETER[size];
    // A 3px ring stroke sits between the gradient/tone backing and the avatar.
    const ringWidth = 3;
    const backing = outer + ringWidth * 2 + tokens.spacing.xs;
    const caption = label ?? (state === 'add' ? 'Your story' : name);
    const avatarNode = state === 'add' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
            width: outer,
            height: outer,
            borderRadius: outer / 2,
            borderWidth: 2,
            borderStyle: 'dashed',
            borderColor: colors.border,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
        }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primary, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: "\u2295" }) })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, name: name, size: size }));
    // The avatar padded on the surface so the ring reads as a clean stroke.
    const avatarPad = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: ringWidth, borderRadius: backing / 2, backgroundColor: colors.surface }, children: avatarNode }));
    let ring;
    if (state === 'add') {
        ring = (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center' }, children: avatarPad });
    }
    else if (state === 'unseen') {
        ring = ((0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: (0, feed_1.feedStory)(tokens.ramps), style: { width: backing, height: backing, borderRadius: backing / 2, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }, children: avatarPad }));
    }
    else {
        ring = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                width: backing,
                height: backing,
                borderRadius: backing / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: state === 'live' ? colors.danger : colors.border,
            }, children: avatarPad }));
    }
    const ringWrap = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', justifyContent: 'center' }, children: [ring, state === 'live' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    bottom: -tokens.spacing.xs,
                    backgroundColor: colors.danger,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 1,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "LIVE" }) })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ alignItems: 'center', gap: tokens.spacing.xs, width: backing + tokens.spacing.md }, style], children: [ringWrap, caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: state === 'seen' ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.xs,
                    fontWeight: state === 'seen' ? '400' : '500',
                    textAlign: 'center',
                    maxWidth: backing + tokens.spacing.md,
                }, children: caption })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: body }) }));
}
//# sourceMappingURL=StoryRingV4.js.map