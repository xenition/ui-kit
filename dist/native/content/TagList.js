"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagList = TagList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const primitives_1 = require("../primitives");
/**
 * A wrapping row of keyword / topic tags for an article — the native mirror of
 * a web tag cloud. Composes the `Tag` primitive; an optional `onTagPress` makes
 * each tag tappable (to open a topic feed). Respects a `max` cap with a "+N"
 * overflow chip and renders an `emptyLabel` when there are no tags. All colors
 * come from `SemanticColors` (via `Tag`); no literal hex.
 */
function TagList({ tags, onTagPress, max, emptyLabel = 'No tags', style, }) {
    const { colors, tokens } = (0, primitives_1.useXenitionTheme)();
    if (tags.length === 0) {
        if (emptyLabel == null)
            return null;
        return ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyLabel }));
    }
    const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
    const overflow = tags.length - visible.length;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, style], children: [visible.map((tag, i) => onTagPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: `Tag ${tag}`, onPress: () => onTagPress(tag, i), hitSlop: 4, children: (0, jsx_runtime_1.jsx)(primitives_1.Tag, { tone: "neutral", children: `#${tag}` }) }, `${tag}-${i}`)) : ((0, jsx_runtime_1.jsx)(primitives_1.Tag, { tone: "neutral", children: `#${tag}` }, `${tag}-${i}`))), overflow > 0 ? (0, jsx_runtime_1.jsx)(primitives_1.Tag, { tone: "primary", children: `+${overflow}` }) : null] }));
}
//# sourceMappingURL=TagList.js.map