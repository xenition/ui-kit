"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoryBar = StoryBar;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const StoryRing_1 = require("./StoryRing");
/**
 * A horizontally-scrolling rail of {@link StoryRing}s, optionally led by the
 * viewer's "add story" tile. Ring state (unseen/seen/live) comes straight from
 * each story. Token-only; scrolls without a visible scrollbar.
 */
function StoryBar({ stories, onPressStory, showAdd = true, onPressAdd, addLabel = 'Your story', style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    return ((0, jsx_runtime_1.jsxs)(react_native_1.ScrollView, { horizontal: true, showsHorizontalScrollIndicator: false, accessibilityRole: "list", contentContainerStyle: { gap: tokens.spacing.sm, paddingHorizontal: tokens.spacing.sm }, style: style, children: [showAdd ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", children: (0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { state: "add", label: addLabel, onPress: onPressAdd }) })) : null, stories.map((s) => ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessibilityRole: "none", children: (0, jsx_runtime_1.jsx)(StoryRing_1.StoryRing, { src: s.src, name: s.name, state: s.state ?? 'unseen', onPress: onPressStory ? () => onPressStory(s.id) : undefined }) }, s.id)))] }));
}
//# sourceMappingURL=StoryBar.js.map