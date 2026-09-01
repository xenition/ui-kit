import * as React from 'react';
import type { FeedListProps } from './FeedList';
/** Drop-in for {@link FeedListProps} — same props, the V4 "feed" design. */
export type FeedListV4Props<T> = FeedListProps<T>;
/**
 * FeedList — **V4** "feed" design (web parity of the native V4). The clean,
 * airy feed container: a vertical list with generous 8-pt gap separators, an
 * optional refresh control, end-reached paging (via a scroll listener), a
 * header slot (StoryBar/composer), a `loading` skeleton state built from
 * {@link PostCardV4}, and a built-in {@link EmptyState}. Generic over the row
 * type. Same props/behavior as {@link FeedListProps}; all colors from `--xen-*`
 * token classes (no literals). `role="feed"`.
 */
export declare function FeedListV4<T>({ data, renderItem, keyExtractor, loading, loadingCount, refreshing, onRefresh, onEndReached, ListHeaderComponent, ListFooterComponent, emptyTitle, emptyDescription, emptyAction, emptyIcon, scrollEnabled, className, contentClassName, ...rest }: FeedListV4Props<T>): React.ReactElement;
//# sourceMappingURL=FeedListV4.d.ts.map