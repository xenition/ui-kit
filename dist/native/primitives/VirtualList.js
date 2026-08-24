"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VirtualList = VirtualList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
/**
 * Thin themed wrapper over `FlatList` — the recycling list primitive. Adds a
 * token-bound row separator, a muted empty state, and a loading spinner, plus a
 * `getItemLayout` fast-path when `estimatedItemSize` is supplied. All colors
 * come from the compiled theme tokens via `useXenitionTheme()` — no literal
 * colors.
 */
function VirtualList({ data, renderItem, keyExtractor, estimatedItemSize, separators = true, emptyText = 'Nothing here yet', loading = false, style, contentContainerStyle, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    if (loading) {
        return ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: [{ padding: tokens.spacing.xl, alignItems: 'center' }, style], children: (0, jsx_runtime_1.jsx)(react_native_1.ActivityIndicator, { color: colors.primary }) }));
    }
    const Separator = separators
        ? () => (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: 1, backgroundColor: colors.border } })
        : undefined;
    const Empty = ((0, jsx_runtime_1.jsx)(react_native_1.View, { style: { padding: tokens.spacing.xl, alignItems: 'center' }, children: typeof emptyText === 'string' ? ((0, jsx_runtime_1.jsx)(react_native_1.Text, { style: { color: colors.muted, fontSize: tokens.typography.scale.sm }, children: emptyText })) : (emptyText) }));
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { data: data, renderItem: renderItem, keyExtractor: keyExtractor, ItemSeparatorComponent: Separator, ListEmptyComponent: Empty, getItemLayout: estimatedItemSize != null
            ? (_, index) => ({
                length: estimatedItemSize,
                offset: estimatedItemSize * index,
                index,
            })
            : undefined, style: [{ backgroundColor: colors.surface }, style], contentContainerStyle: contentContainerStyle }));
}
//# sourceMappingURL=VirtualList.js.map