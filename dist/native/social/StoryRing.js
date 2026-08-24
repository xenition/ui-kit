"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryRing = StoryRing;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const DIAMETER = { xs: 32, sm: 44, md: 56, lg: 76, xl: 96 };
/**
 * An avatar wrapped in a story ring. The ring color encodes state — unseen
 * (primary), seen (muted), live (danger with a LIVE badge) — and an `add`
 * variant renders a dashed ring with a `+` for the viewer's own tile. Token-only.
 */
function StoryRing({ src, name, state = 'unseen', size = 'md', label, onPress, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const outer = DIAMETER[size];
    const ringColor = state === 'live' ? colors.danger : state === 'seen' ? colors.border : colors.primary;
    const caption = label ?? (state === 'add' ? 'Your story' : name);
    const ring = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: outer,
            height: outer,
            borderRadius: outer / 2,
            borderWidth: 2,
            borderStyle: state === 'add' ? 'dashed' : 'solid',
            borderColor: state === 'add' ? colors.border : ringColor,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
        }, children: [state === 'add' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: "+" })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, name: name, size: size })), state === 'live' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                    position: 'absolute',
                    bottom: -tokens.spacing.xs,
                    backgroundColor: colors.danger,
                    borderRadius: tokens.radius.full,
                    paddingHorizontal: tokens.spacing.xs,
                    paddingVertical: 1,
                }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "LIVE" }) })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: [{ alignItems: 'center', gap: tokens.spacing.xs, width: outer + tokens.spacing.md }, style], children: [ring, caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: {
                    color: state === 'seen' ? colors.muted : colors.onSurface,
                    fontSize: tokens.typography.scale.xs,
                    textAlign: 'center',
                    maxWidth: outer + tokens.spacing.md,
                }, children: caption })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.8 : 1 }), children: body }) }));
}
//# sourceMappingURL=StoryRing.js.map