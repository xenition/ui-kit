import * as React from 'react';
import { type FlatListProps, type ListRenderItem, type StyleProp, type ViewStyle } from 'react-native';
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
export declare function VirtualList<T>({ data, renderItem, keyExtractor, estimatedItemSize, separators, emptyText, loading, style, contentContainerStyle, }: VirtualListProps<T>): React.ReactElement;
//# sourceMappingURL=VirtualList.d.ts.map