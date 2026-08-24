"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryBarV3 = StoryBarV3;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const motion_1 = require("../primitives/internal/motion");
const color_1 = require("../primitives/internal/color");
const TILE_W = 68;
const TILE_H = 92;
function initials(name) {
    if (!name)
        return '?';
    const parts = name.trim().split(/\s+/).slice(0, 2);
    return parts.map((w) => w[0]?.toUpperCase() ?? '').join('') || '?';
}
/**
 * StoryBar, design V3 — **compact rounded square tiles**. Each story is a small
 * cover tile (image or tinted initials) with a scrim-backed name at the bottom;
 * ring state maps to the tile border (`unseen` primary, `seen` hairline, `live`
 * a badge, `add` a dashed `+`). Same props as {@link StoryBar}, token-only.
 */
function StoryBarV3({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, style: style, children: [showAdd ? (0, jsx_runtime_1.jsx)(Tile, { state: "add", name: addLabel, onPress: onPressAdd }) : null, stories.map((s) => ((0, jsx_runtime_1.jsx)(Tile, { src: s.src, name: s.name, state: s.state ?? 'unseen', onPress: onPressStory ? () => onPressStory(s.id) : undefined }, s.id)))] }));
}
function Tile({ src, name, state, onPress, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const press = (0, motion_1.usePressScale)();
    const border = state === 'add'
        ? { borderWidth: 2, borderStyle: 'dashed', borderColor: colors.border }
        : state === 'seen'
            ? { borderWidth: 1, borderColor: colors.border }
            : state === 'live'
                ? { borderWidth: 2, borderColor: colors.danger }
                : { borderWidth: 2, borderColor: colors.primary };
    const tile = ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: {
            width: TILE_W,
            height: TILE_H,
            borderRadius: tokens.radius.lg,
            overflow: 'hidden',
            backgroundColor: (0, color_1.withAlpha)(colors.primary, 0.1),
            alignItems: 'center',
            justifyContent: 'center',
            ...border,
        }, children: [state === 'add' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.xl, fontWeight: '700' }, children: "+" })) : src ? ((0, jsx_runtime_1.jsx)(react_native_1.Image, { source: { uri: src }, accessibilityLabel: name ?? 'Story', resizeMode: "cover", style: { width: '100%', height: '100%' } })) : ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.primaryText, fontSize: tokens.typography.scale.lg, fontWeight: '700' }, children: initials(name) })), state === 'live' ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', top: tokens.spacing.xs, alignSelf: 'center', backgroundColor: colors.danger, borderRadius: tokens.radius.full, paddingHorizontal: tokens.spacing.xs, paddingVertical: 1 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.onDanger, fontSize: tokens.typography.scale.xs, fontWeight: '700' }, children: "LIVE" }) })) : null, name ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: (0, color_1.withAlpha)(colors.onSurface, 0.55), paddingHorizontal: tokens.spacing.xs, paddingVertical: 2 }, children: (0, jsx_runtime_1.jsx)(react_native_1.Text, { numberOfLines: 1, style: { color: colors.surface, fontSize: tokens.typography.scale.xs, fontWeight: '600', textAlign: 'center' }, children: name }) })) : null] }));
    if (!onPress)
        return tile;
    return ((0, jsx_runtime_1.jsx)(react_native_1.Animated.View, { style: { transform: [{ scale: press.scale }] }, children: (0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: state === 'add' ? 'Add to your story' : `${name ?? 'Story'}${state === 'live' ? ', live' : ''}`, onPress: onPress, onPressIn: press.onPressIn, onPressOut: press.onPressOut, style: ({ pressed }) => ({ opacity: pressed ? 0.85 : 1 }), children: tile }) }));
}
//# sourceMappingURL=StoryBarV3.js.map