"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryBarV2 = StoryBarV2;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const Avatar_1 = require("../primitives/Avatar");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const RING = 84;
/**
 * StoryBar, design V2 — **large gradient-ring circles**. Each tile is an
 * oversized avatar inside a four-corner multi-tone ring (a token-pure faux
 * gradient), with `live` in danger and `add` a dashed ring. Same props as
 * {@link StoryBar}, token-only; scrolls without a visible scrollbar.
 */
function StoryBarV2({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.md, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, style: style, children: [showAdd ? (0, jsx_runtime_1.jsx)(Ring, { state: "add", label: addLabel, onPress: onPressAdd }) : null, stories.map((s) => ((0, jsx_runtime_1.jsx)(Ring, { src: s.src, name: s.name, state: s.state ?? 'unseen', onPress: onPressStory ? () => onPressStory(s.id) : undefined }, s.id)))] }));
}
function Ring({ src, name, state, label, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const caption = label ?? (state === 'add' ? 'Your story' : name);
    // A four-corner multi-tone border reads as a gradient sweep — every stop is
    // derived from a theme token via withAlpha, so no literal color appears.
    const gradientRing = state === 'live'
        ? { borderTopColor: colors.danger, borderRightColor: (0, color_1.withAlpha)(colors.danger, 0.7), borderBottomColor: (0, color_1.withAlpha)(colors.danger, 0.5), borderLeftColor: colors.danger }
        : state === 'seen'
            ? { borderTopColor: colors.border, borderRightColor: colors.border, borderBottomColor: colors.border, borderLeftColor: colors.border }
            : {
                borderTopColor: colors.primary,
                borderRightColor: (0, color_1.withAlpha)(colors.accent, 0.9),
                borderBottomColor: (0, color_1.withAlpha)(colors.accent, 0.6),
                borderLeftColor: (0, color_1.withAlpha)(colors.primary, 0.7),
            };
    const ring = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: RING,
            height: RING,
            borderRadius: RING / 2,
            borderWidth: 3,
            borderStyle: state === 'add' ? 'dashed' : 'solid',
            ...(state === 'add'
                ? { borderColor: colors.border }
                : gradientRing),
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
        }, children: [state === 'add' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale['2xl'], fontWeight: '700' }, children: "+" })) : ((0, jsx_runtime_1.jsx)(Avatar_1.Avatar, { src: src, name: name, size: "lg" })), state === 'live' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', bottom: -tokens.spacing.xs, backgroundColor: colors.danger, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.sm, paddingVertical: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "LIVE" }) })) : null] }));
    const body = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { alignItems: 'center', gap: tokens.spacing.xs, width: RING + tokens.spacing.md }, children: [ring, caption ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: state === 'seen' ? colors.muted : colors.onSurface, fontSize: tokens.typography.scale.xs, textAlign: 'center', maxWidth: RING + tokens.spacing.md }, children: caption })) : null] }));
    if (!onPress)
        return body;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.8 : 1 }), children: body }) }));
}
//# sourceMappingURL=StoryBarV2.js.map