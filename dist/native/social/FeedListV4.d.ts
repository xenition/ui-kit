import * as React from 'react';
import type { FeedListProps } from './FeedList';
/** Drop-in for {@link FeedListProps} — same props, the V4 "feed" design. */
export type FeedListV4Props<T> = FeedListProps<T>;
/**
 * FeedList — **V4** "feed" design. The clean, airy feed container: a `FlatList`
 * with generous 8-pt gap separators, pull-to-refresh, end-reached paging, a
 * header slot (StoryBar/composer), a `loading` skeleton state built from
 * {@link PostCardV4}, and a built-in {@link EmptyState} when there's nothing to
 * show. Generic over the row type. Same props/behavior as {@link FeedListProps};
 * token-only colors via `useXenitionTheme()` (no literals).
 */
export declare function FeedListV4<T>({ data, renderItem, keyExtractor, loading, loadingCount, refreshing, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle, emptyDescription, emptyAction, emptyIcon, scrollEnabled, style, contentStyle, }: FeedListV4Props<T>): React.ReactElement;
//# sourceMappingURL=FeedListV4.d.ts.map