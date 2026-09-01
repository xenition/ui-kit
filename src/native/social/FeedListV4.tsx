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
import { PostCardV4 } from './PostCardV4';
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
  style,
  contentStyle,
}: FeedListV4Props<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  // Generous, clean separator between rows in the feed line.
  const separator = () => <View style={{ height: tokens.spacing.lg }} />;
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
        renderItem={() => <PostCardV4 variant="text" author={{ name: '' }} loading />}
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
