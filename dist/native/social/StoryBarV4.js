"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryBarV4 = StoryBarV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StoryRing_1 = require("./StoryRing");
const feed_1 = require("./internal/feed");
const GradientSurface_1 = require("./internal/GradientSurface");
/**
 * StoryBar — **V4** "feed" design. A clean, airy horizontally-scrolling rail of
 * {@link StoryRing}s, optionally led by the viewer's "add story" tile. In the
 * feed line an unseen story wears the accent→primary gradient ring ({@link
 * feedStory}) while a seen one falls back to the ring's muted tone; the add
 * tile keeps its dashed ring. Ring state comes straight from each story. Same
 * props/behavior as {@link StoryBarProps}; token-only colors via
 * `useXenitionTheme()`. Scrolls without a visible scrollbar.
 */
function StoryBarV4({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    const storyColors = (0, feed_1.feedStory)(tokens.ramps);
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "list", contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm, paddingVertical: tokens.spacing.xs }, style: style, children: [showAdd ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", children: (0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { state: "add", label: addLabel, onPress: onPressAdd }) })) : null, stories.map((s) => {
                const state = s.state ?? 'unseen';
                const ring = ((0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { src: s.src, name: s.name, state: state, onPress: onPressStory ? () => onPressStory(s.id) : undefined }));
                // An unseen story rides the accent→primary gradient ring; the gradient
                // sits behind the ring (which draws its own surface-filled avatar plate),
                // so it reads as a gradient halo. Seen/live keep the StoryRing tones.
                if (state === 'unseen') {
                    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "none", style: { alignItems: 'center' }, children: [(0, jsx_runtime_1.jsx)(GradientSurface_1.GradientSurface, { colors: storyColors, style: { position: 'absolute', top: 0, alignSelf: 'center', width: 60, height: 60, borderRadius: 30 } }), ring] }, s.id));
                }
                return ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", children: ring }, s.id));
            })] }));
}
//# sourceMappingURL=StoryBarV4.js.map