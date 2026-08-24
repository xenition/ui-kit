"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedList = FeedList;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const PostCard_1 = require("./PostCard");
/**
 * The scrolling feed container: a `FlatList` with gap separators, pull-to-
 * refresh, end-reached paging, a header slot (StoryBar/composer), a `loading`
 * skeleton state, and a built-in {@link EmptyState} when there's nothing to
 * show. Generic over the row type. Token-only.
 */
function FeedList({ data, renderItem, keyExtractor, loading = false, loadingCount = 3, refreshing = false, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle = 'Nothing here yet', emptyDescription = 'Posts will show up here as people you follow share them.', emptyAction, emptyIcon, scrollEnabled = true, style, contentStyle, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    const separator = () => (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.md } });
    const contentContainerStyle = [{ padding: tokens.spacing.md }, contentStyle];
    if (loading) {
        const skeletons = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { accessibilityLabel: "Loading feed", data: skeletons, scrollEnabled: scrollEnabled, keyExtractor: (_, i) => `skeleton-${i}`, ItemSeparatorComponent: separator, ListHeaderComponent: ListHeaderComponent, renderItem: () => ((0, jsx_runtime_1.jsx)(PostCard_1.PostCard, { variant: "text", author: { name: '' }, loading: true })), contentContainerStyle: contentContainerStyle, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { accessibilityRole: "list", data: data, scrollEnabled: scrollEnabled, keyExtractor: keyExtractor ?? ((_, index) => String(index)), renderItem: ({ item, index }) => renderItem(item, index), ItemSeparatorComponent: separator, ListHeaderComponent: ListHeaderComponent, ListFooterComponent: ListFooterComponent, onEndReached: onEndReached, onEndReachedThreshold: 0.4, refreshControl: onRefresh ? ((0, jsx_runtime_1.jsx)(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: onRefresh, tintColor: colors.muted, colors: [colors.primary] })) : undefined, ListEmptyComponent: (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: emptyIcon, title: emptyTitle, description: emptyDescription, action: emptyAction }), contentContainerStyle: contentContainerStyle, style: style }));
}
//# sourceMappingURL=FeedList.js.map