"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationListV4 = ConversationListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const TextV4_1 = require("../primitives/TextV4");
const ConversationRowV4_1 = require("./ConversationRowV4");
const thread_v4_1 = require("./internal/thread-v4");
/**
 * **V4 conversation list** — same props as {@link ConversationList} plus
 * `emptyDescription`.
 *
 * ## Three changes
 *
 * 1. **The loading state is a skeleton, not a spinner.** An inbox that shows
 *    three ghost rows tells the user what is coming; a spinner tells them to
 *    wait. The skeleton is opaque, mixed against the card's own ground.
 * 2. **The empty state explains itself** rather than showing one muted line.
 * 3. **The last row drops its separator**, which the base drew under every
 *    row including the final one — a hairline hanging off the end of a list.
 */
function ConversationListV4({ items = [], onPressItem, onLongPressItem, loading = false, emptyLabel = 'No conversations yet.', emptyDescription, dividers = true, children, style, }) {
    const theme = (0, theme_1.useXenitionTheme)();
    const { tokens } = theme;
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ gap: tokens.spacing.md, padding: tokens.spacing.md }, style], children: [0, 1, 2].map((i) => ((0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                            width: tokens.spacing['2xl'],
                            height: tokens.spacing['2xl'],
                            borderRadius: tokens.radius.full,
                            backgroundColor: (0, thread_v4_1.skeletonFill)(theme),
                        } }), (0, jsx_runtime_1.jsxs)(react_native_1.View, { style: { flex: 1, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.base,
                                    width: '45%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, thread_v4_1.skeletonFill)(theme),
                                } }), (0, jsx_runtime_1.jsx)(react_native_1.View, { style: {
                                    height: tokens.typography.scale.sm,
                                    width: '70%',
                                    borderRadius: tokens.radius.sm,
                                    backgroundColor: (0, thread_v4_1.skeletonFill)(theme),
                                } })] })] }, i))) }));
    }
    if (children)
        return (0, jsx_runtime_1.jsx)(react_native_1.View, { style: style, children: children });
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: items, keyExtractor: (item) => item.id, style: style, ListEmptyComponent: (0, jsx_runtime_1.jsxs)(react_native_1.View, { accessibilityRole: "summary", style: { padding: tokens.spacing.xl, gap: tokens.spacing.xs }, children: [(0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "sm", weight: "semibold", tone: "onSurface", align: "center", children: emptyLabel }), emptyDescription ? ((0, jsx_runtime_1.jsx)(TextV4_1.TextV4, { size: "xs", tone: "mutedText", align: "center", children: emptyDescription })) : null] }), renderItem: ({ item, index }) => ((0, jsx_runtime_1.jsx)(ConversationRowV4_1.ConversationRowV4, { ...item, 
            // The base drew a separator under the final row too — a hairline
            // hanging off the end of the list.
            last: !dividers || index === items.length - 1, onPress: onPressItem ? () => onPressItem(item.id) : undefined, onLongPress: onLongPressItem ? () => onLongPressItem(item.id) : undefined })) }));
}
//# sourceMappingURL=ConversationListV4.js.map