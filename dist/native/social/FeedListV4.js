"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FeedListV4 = FeedListV4;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_native_1 = require("react-native");
const theme_1 = require("../theme");
const EmptyState_1 = require("../commerce/EmptyState");
const PostCardV4_1 = require("./PostCardV4");
/**
 * FeedList — **V4** "feed" design. The clean, airy feed container: a `FlatList`
 * with generous 8-pt gap separators, pull-to-refresh, end-reached paging, a
 * header slot (StoryBar/composer), a `loading` skeleton state built from
 * {@link PostCardV4}, and a built-in {@link EmptyState} when there's nothing to
 * show. Generic over the row type. Same props/behavior as {@link FeedListProps};
 * token-only colors via `useXenitionTheme()` (no literals).
 */
function FeedListV4({ data, renderItem, keyExtractor, loading = false, loadingCount = 3, refreshing = false, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle = 'Nothing here yet', emptyDescription = 'Posts will show up here as people you follow share them.', emptyAction, emptyIcon, scrollEnabled = true, style, contentStyle, }) {
    const { colors, tokens } = (0, theme_1.useXenitionTheme)();
    // Generous, clean separator between rows in the feed line.
    const separator = () => (0, jsx_runtime_1.jsx)(react_native_1.View, { style: { height: tokens.spacing.lg } });
    const contentContainerStyle = [{ padding: tokens.spacing.md }, contentStyle];
    if (loading) {
        const skeletons = Array.from({ length: Math.max(1, loadingCount) });
        return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { accessibilityLabel: "Loading feed", data: skeletons, scrollEnabled: scrollEnabled, keyExtractor: (_, i) => `skeleton-${i}`, ItemSeparatorComponent: separator, ListHeaderComponent: ListHeaderComponent, renderItem: () => (0, jsx_runtime_1.jsx)(PostCardV4_1.PostCardV4, { variant: "text", author: { name: '' }, loading: true }), contentContainerStyle: contentContainerStyle, style: style }));
    }
    return ((0, jsx_runtime_1.jsx)(react_native_1.FlatList, { accessibilityRole: "list", data: data, scrollEnabled: scrollEnabled, keyExtractor: keyExtractor ?? ((_, index) => String(index)), renderItem: ({ item, index }) => renderItem(item, index), ItemSeparatorComponent: separator, ListHeaderComponent: ListHeaderComponent, ListFooterComponent: ListFooterComponent, onEndReached: onEndReached, onEndReachedThreshold: 0.4, refreshControl: onRefresh ? ((0, jsx_runtime_1.jsx)(react_native_1.RefreshControl, { refreshing: refreshing, onRefresh: onRefresh, tintColor: colors.muted, colors: [colors.primary] })) : undefined, ListEmptyComponent: (0, jsx_runtime_1.jsx)(EmptyState_1.EmptyState, { icon: emptyIcon, title: emptyTitle, description: emptyDescription, action: emptyAction }), contentContainerStyle: contentContainerStyle, style: style }));
}
//# sourceMappingURL=FeedListV4.js.map