import * as React from 'react';
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
  type FlatListProps,
  type ListRenderItem,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';

export interface VirtualListProps<T> {
  data: readonly T[];
  renderItem: ListRenderItem<T>;
  keyExtractor?: (item: T, index: number) => string;
  /** Hint for `getItemLayout` when rows are a fixed height (px). */
  estimatedItemSize?: number;
  /** Draw a token-bound divider between rows (default true). */
  separators?: boolean;
  /** Shown when `data` is empty and not loading. */
  emptyText?: React.ReactNode;
  /** Render a centered spinner instead of the list. */
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: FlatListProps<T>['contentContainerStyle'];
}

/**
 * Thin themed wrapper over `FlatList` — the recycling list primitive. Adds a
 * token-bound row separator, a muted empty state, and a loading spinner, plus a
 * `getItemLayout` fast-path when `estimatedItemSize` is supplied. All colors
 * come from the compiled theme tokens via `useXenitionTheme()` — no literal
 * colors.
 */
export function VirtualList<T>({
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize,
  separators = true,
  emptyText = 'Nothing here yet',
  loading = false,
  style,
  contentContainerStyle,
}: VirtualListProps<T>): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();

  if (loading) {
    return (
      <View style={[{ padding: tokens.spacing.xl, alignItems: 'center' }, style]}>
        <ActivityIndicator color={colors.primary} />
      </View>
    );
  }

  const Separator = separators
    ? (): React.ReactElement => <View style={{ height: 1, backgroundColor: colors.border }} />
    : undefined;

  const Empty = (
    <View style={{ padding: tokens.spacing.xl, alignItems: 'center' }}>
      {typeof emptyText === 'string' ? (
        <Text style={{ color: colors.muted, fontSize: tokens.typography.scale.sm }}>{emptyText}</Text>
      ) : (
        emptyText
      )}
    </View>
  );

  return (
    <FlatList<T>
      data={data as T[]}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
      ItemSeparatorComponent={Separator}
      ListEmptyComponent={Empty}
      getItemLayout={
        estimatedItemSize != null
          ? (_, index) => ({
              length: estimatedItemSize,
              offset: estimatedItemSize * index,
              index,
            })
          : undefined
      }
      style={[{ backgroundColor: colors.surface }, style]}
      contentContainerStyle={contentContainerStyle}
    />
  );
}
