import * as React from 'react';
export interface FeedListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    /** Row data (e.g. posts). */
    data: ReadonlyArray<T>;
    /** Render one row. Pass your `PostCard` mapper. */
    renderItem: (item: T, index: number) => React.ReactElement | null;
    /** Stable key per row; falls back to the index. */
    keyExtractor?: (item: T, index: number) => string;
    /** Initial load — shows skeleton {@link PostCard}s instead of `data`. */
    loading?: boolean;
    /** Number of skeletons while `loading`. Default `3`. */
    loadingCount?: number;
    /** Refresh spinner state (paired with `onRefresh`). */
    refreshing?: boolean;
    onRefresh?: () => void;
    /** Infinite-scroll hook (fired when scrolled near the end of the list). */
    onEndReached?: () => void;
    /** Sticky-ish header (e.g. a StoryBar or composer). */
    ListHeaderComponent?: React.ReactNode;
    /** Footer (e.g. a "loading more" spinner). */
    ListFooterComponent?: React.ReactNode;
    emptyTitle?: string;
    emptyDescription?: string;
    emptyAction?: React.ReactNode;
    emptyIcon?: React.ReactNode;
    /** Enable inner vertical scrolling. Default `true`. */
    scrollEnabled?: boolean;
    /** Class for the inner content column (padding / gap overrides). */
    contentClassName?: string;
}
/**
 * The scrolling feed container: a vertical list with gap separators, an
 * optional refresh control, end-reached paging (via a scroll listener), a
 * header slot (StoryBar/composer), a `loading` skeleton state, and a built-in
 * {@link EmptyState} when there's nothing to show. Generic over the row type.
 * Web parity of the native `FeedList` (`FlatList`); token-only, `role="feed"`.
 */
export declare function FeedList<T>({ data, renderItem, keyExtractor, loading, loadingCount, refreshing, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle, emptyDescription, emptyAction, emptyIcon, scrollEnabled, className, contentClassName, ...rest }: FeedListProps<T>): React.ReactElement;
//# sourceMappingURL=FeedList.d.ts.map