"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnreadDividerV4 = UnreadDividerV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
/**
 * **V4 unread divider** — same props as {@link UnreadDivider} plus
 * `formatCount`.
 *
 * ## Three changes
 *
 * 1. **The count reaches the label.** The base took `count` and drew it beside
 *    a fixed `'Unread'`, so a reader heard the word and the number as two
 *    fragments. It is now one sentence, and the sentence is a prop.
 * 2. **It is announced once, politely.** A divider that arrives mid-thread is
 *    a landmark, not an alert.
 * 3. **The rule takes `danger`, the label its corrected ink** — the base put
 *    the fill slot on the text.
 */
function UnreadDividerV4({ label = 'Unread', count, formatCount, style, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const text = typeof count === 'number' && count > 0
        ? (formatCount ??
            ((n) => `${n} unread ${n === 1 ? 'message' : 'messages'}`))(count)
        : label;
    return ((0, jsx_runtime_1.jsxs)(react_native_1.View, { accessible: true, accessibilityRole: "text", accessibilityLabel: text, style: [
            { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
            style,
        ], children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: colors.danger } }), (0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", weight: "bold", tone: "dangerText", children: text }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { flex: 1, height: 1, backgroundColor: colors.danger } })] }));
}
//# sourceMappingURL=UnreadDividerV4.js.map