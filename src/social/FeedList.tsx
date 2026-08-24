import * as React from 'react';
import { cn } from '../primitives/cn';
import { Spinner } from '../primitives/Spinner';
import { EmptyState } from '../commerce/EmptyState';
import { PostCard } from './PostCard';

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
  // ── empty state ──
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
export function FeedList<T>({
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
}: FeedListProps<T>): React.ReactElement {
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
  const innerClass = cn('flex flex-col gap-md p-md', contentClassName);

  if (loading) {
    const skeletons = Array.from({ length: Math.max(1, loadingCount) });
    return (
      <div aria-busy="true" aria-label="Loading feed" className={outerClass} {...rest}>
        <div className={innerClass}>
          {ListHeaderComponent}
          {skeletons.map((_, i) => (
            <PostCard key={`skeleton-${i}`} variant="text" author={{ name: '' }} loading />
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
            className="mx-auto inline-flex items-center gap-xs text-sm font-medium text-muted transition-opacity hover:opacity-70 disabled:pointer-events-none"
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
