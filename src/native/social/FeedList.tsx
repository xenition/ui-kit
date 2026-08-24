import * as React from 'react';
import {
  FlatList,
  RefreshControl,
  View,
  type ListRenderItemInfo,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { EmptyState } from '../commerce/EmptyState';
import { PostCard } from './PostCard';

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
  // ── empty state ──
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
  style,
  contentStyle,
}: FeedListProps<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  const separator = () => <View style={{ height: tokens.spacing.md }} />;
  const contentContainerStyle: StyleProp<ViewStyle> = [{ padding: tokens.spacing.md }, contentStyle];

  if (loading) {
    const skeletons = Array.from({ length: Math.max(1, loadingCount) });
    return (
      <FlatList
        accessibilityLabel="Loading feed"
        data={skeletons}
        scrollEnabled={scrollEnabled}
        keyExtractor={(_, i) => `skeleton-${i}`}
        ItemSeparatorComponent={separator}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={() => (
          <PostCard variant="text" author={{ name: '' }} loading />
        )}
        contentContainerStyle={contentContainerStyle}
        style={style}
      />
    );
  }

  return (
    <FlatList<T>
      accessibilityRole="list"
      data={data as T[]}
      scrollEnabled={scrollEnabled}
      keyExtractor={keyExtractor ?? ((_, index) => String(index))}
      renderItem={({ item, index }: ListRenderItemInfo<T>) => renderItem(item, index)}
      ItemSeparatorComponent={separator}
      ListHeaderComponent={ListHeaderComponent}
      ListFooterComponent={ListFooterComponent}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.4}
      refreshControl={
        onRefresh ? (
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.muted} colors={[colors.primary]} />
        ) : undefined
      }
      ListEmptyComponent={
        <EmptyState icon={emptyIcon} title={emptyTitle} description={emptyDescription} action={emptyAction} />
      }
      contentContainerStyle={contentContainerStyle}
      style={style}
    />
  );
}
