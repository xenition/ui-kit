import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface FeedListProps<T> {
    /** Row data (e.g. posts). */
    data: ReadonlyArray<T>;
    /** Render one row. Defaults to nothing — pass your `PostCard` mapper. */
    renderItem: (item: T, index: number) => React.ReactElement | null;
    /** Stable key per row; falls back to the index. */
    keyExtractor?: (item: T, index: number) => string;
    /** Initial load — shows skeleton {@link PostCard}s instead of `data`. */
    loading?: boolean;
    /** Number of skeletons while `loading`. Default `3`. */
    loadingCount?: number;
    /** Pull-to-refresh spinner state. */
    refreshing?: boolean;
    onRefresh?: () => void;
    /** Infinite-scroll hook (near the end of the list). */
    onEndReached?: () => void;
    /** Sticky-ish header (e.g. a StoryBar or composer). */
    ListHeaderComponent?: React.ReactElement | null;
    /** Footer (e.g. a "loading more" spinner). */
    ListFooterComponent?: React.ReactElement | null;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactNode;
    emptyIcon?: React.ReactNode;
    /** Disable scrolling (e.g. when embedded in a parent ScrollView / tests). */
    scrollEnabled?: boolean;
    style?: StyleProp<ViewStyle>;
    contentStyle?: StyleProp<ViewStyle>;
}
/**
 * The scrolling feed container: a `FlatList` with gap separators, pull-to-
 * refresh, end-reached paging, a header slot (StoryBar/composer), a `loading`
 * skeleton state, and a built-in {@link EmptyState} when there's nothing to
 * show. Generic over the row type. Token-only.
 */
export declare function FeedList<T>({ data, renderItem, keyExtractor, loading, loadingCount, refreshing, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle, emptyDescription, emptyAction, emptyIcon, scrollEnabled, style, contentStyle, }: FeedListProps<T>): React.ReactElement;
//# sourceMappingURL=FeedList.d.ts.map