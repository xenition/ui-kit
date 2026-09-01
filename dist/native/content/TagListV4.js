"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TagListV4 = TagListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TagV4_1 = require("../primitives/TagV4");
const TextV4_1 = require("../primitives/TextV4");
const chrome_v4_1 = require("../primitives/internal/chrome-v4");
/**
 * **V4 tag list** — same props as {@link TagList} plus `formatTagLabel` and
 * `formatOverflow`.
 *
 * ## Four changes
 *
 * 1. **The empty branch keeps the caller's props.** The populated branch
 *    applied `style` (and, on the web twin, every `id`, `data-*` and handler
 *    the caller passed) and the empty branch dropped them — so a tag row
 *    silently lost its identity exactly when there was nothing in it, which is
 *    also when a test or a layout is most likely to be looking for it.
 * 2. **A list has list items.** The tags hung directly off a `role="list"` as
 *    bare buttons; each is now one announced child of the list.
 * 3. **A tappable tag clears 44.** They were about 20px — the chip stays
 *    exactly as small, and only the touch area grows.
 * 4. **The `+N` chip says what the N are.** It was an unfocusable chip reading
 *    "+3" with nothing to say which three.
 */
function TagListV4({ tags, onTagPress, max, emptyLabel = 'No tags', formatTagLabel = (label) => `Tag ${label}`, formatOverflow = (count) => `${count} more tags`, style, }) {
    const { tokens } = (0, theme_1.useXenitionTheme)();
    if (tags.length === 0) {
        if (emptyLabel == null)
            return null;
        // `style` survives the empty branch — see change 1.
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", tone: "mutedText", children: emptyLabel }) }));
    }
    const visible = typeof max === 'number' && max >= 0 ? tags.slice(0, max) : tags;
    const overflow = tags.length - visible.length;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "list", style: [{ flexDirection: 'row', flexWrap: 'wrap', gap: tokens.spacing.xs }, style], children: [visible.map((tag, i) => onTagPress ? ((0, jsx_runtime_1.jsx)(react_native_1.Pressable, { accessibilityRole: "button", accessibilityLabel: formatTagLabel(tag), onPress: () => onTagPress(tag, i), 
                // The chip keeps its size; the target grows around it.
                style: { justifyContent: 'center', minHeight: (0, chrome_v4_1.minTap)(tokens.spacing) }, children: (0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "neutral", children: `#${tag}` }) }, `${tag}-${i}`)) : ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: tag, children: (0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "neutral", children: `#${tag}` }) }, `${tag}-${i}`))), overflow > 0 ? ((0, jsx_runtime_1.jsx)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: formatOverflow(overflow), children: (0, jsx_runtime_1.jsx)(TagV4_1.TagV4, { tone: "primary", children: `+${overflow}` }) })) : null] }));
}
//# sourceMappingURL=TagListV4.js.map