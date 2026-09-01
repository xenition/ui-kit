import * as React from 'react';
import { cn } from '../primitives/cn';
import { Spinner } from '../primitives/Spinner';
import { EmptyState } from '../commerce/EmptyState';
import { PostCardV4 } from './PostCardV4';
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
export function FeedListV4<T>({
  data,
  renderItem,
  keyExtractor,
  loading = false,
  loadingCount = 3,
  refreshing = false,
  onRefresh,
  onEndReached,
  ListHeaderComponent,
  ListFooterComponent,
  emptyTitle = 'Nothing here yet',
  emptyDescription = 'Posts will show up here as people you follow share them.',
  emptyAction,
  emptyIcon,
  scrollEnabled = true,
  className,
  contentClassName,
  ...rest
}: FeedListV4Props<T>): React.ReactElement {
  const handleScroll = React.useCallback(
    (e: React.UIEvent<HTMLDivElement>) => {
      if (!onEndReached) return;
      const el = e.currentTarget;
      // Fire when within 40% of a viewport from the bottom (mirrors RN's 0.4).
      if (el.scrollHeight - el.scrollTop - el.clientHeight <= el.clientHeight * 0.4) {
        onEndReached();
      }
    },
    [onEndReached]
  );

  const outerClass = cn(scrollEnabled ? 'overflow-y-auto' : 'overflow-visible', className);
  const innerClass = cn('flex flex-col gap-lg p-md', contentClassName);

  if (loading) {
    const skeletons = Array.from({ length: Math.max(1, loadingCount) });
    return (
      <div aria-busy="true" aria-label="Loading feed" className={outerClass} {...rest}>
        <div className={innerClass}>
          {ListHeaderComponent}
          {skeletons.map((_, i) => (
            <PostCardV4 key={`skeleton-${i}`} variant="text" author={{ name: '' }} loading />
          ))}
        </div>
      </div>
    );
  }

  const isEmpty = data.length === 0;

  return (
    <div
      role="feed"
      className={outerClass}
      onScroll={onEndReached ? handleScroll : undefined}
      {...rest}
    >
      <div className={innerClass}>
        {ListHeaderComponent}
        {onRefresh ? (
          <button
            type="button"
            aria-label="Refresh"
            aria-busy={refreshing || undefined}
            disabled={refreshing}
            onClick={onRefresh}
            className="mx-auto inline-flex min-h-[44px] items-center gap-xs rounded-full px-md text-sm font-medium text-primary transition-colors hover:bg-primary/10 active:bg-primary/10 disabled:pointer-events-none"
          >
            {refreshing ? <Spinner size="sm" aria-label="Refreshing" /> : '↻'}
            <span>Refresh</span>
          </button>
        ) : null}
        {isEmpty ? (
          <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} action={emptyAction} />
        ) : (
          data.map((item, index) => (
            <React.Fragment key={keyExtractor ? keyExtractor(item, index) : String(index)}>
              {renderItem(item, index)}
            </React.Fragment>
          ))
        )}
        {ListFooterComponent}
      </div>
    </div>
  );
}
