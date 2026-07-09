import * as React from 'react';
import { FlatList, View, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface ProductGridProps {
  /** Column count (default 2 — a sensible phone default vs. web's 4). */
  columns?: 2 | 3 | 4;
  /**
   * Product cards. Rendered through a `FlatList` (each child becomes an item),
   * so the grid virtualizes on long catalogs while keeping the web
   * children-based API — a template swaps web→native by import path only.
   */
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  /** Passed through to the underlying FlatList (e.g. `scrollEnabled`). */
  scrollEnabled?: boolean;
}

/**
 * Responsive grid of {@link ProductCard}s — the native mirror of the web
 * `ProductGrid`. Backed by a `FlatList` with `numColumns`; row/column gaps come
 * from the theme spacing scale.
 */
export function ProductGrid({
  columns = 2,
  children,
  style,
  scrollEnabled,
}: ProductGridProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const items = React.Children.toArray(children);
  const gap = tokens.spacing.lg;

  return (
    <FlatList
      data={items}
      // `key` forces a fresh list when the column count changes (RN requirement).
      key={`cols-${columns}`}
      numColumns={columns}
      scrollEnabled={scrollEnabled}
      keyExtractor={(_, index) => String(index)}
      columnWrapperStyle={{ gap }}
      contentContainerStyle={[{ gap }, style]}
      renderItem={({ item }) => <View style={{ flex: 1 }}>{item as React.ReactElement}</View>}
    />
  );
}
