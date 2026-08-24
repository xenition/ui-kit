import * as React from 'react';
export interface VirtualListProps<T> extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'> {
    data: readonly T[];
    /** Row renderer. `index` is the row's position in `data`. */
    renderItem: (item: T, index: number) => React.ReactNode;
    keyExtractor?: (item: T, index: number) => string;
    /**
     * Fixed row height hint (px). Used to cap the scroll viewport at
     * ~12 rows so long lists don't blow out the page; also sets `min-height`
     * per row for a stable layout.
     */
    estimatedItemSize?: number;
    /** Draw a token-bound divider between rows (default true). */
    separators?: boolean;
    /** Shown when `data` is empty and not loading. */
    emptyText?: React.ReactNode;
    /** Render a centered spinner instead of the list. */
    loading?: boolean;
    /** Max viewport height (px) before the list scrolls. Default 480. */
    maxHeight?: number;
}
/**
 * Web parity of the native `VirtualList`. NOTE: this is **not** truly virtualized
 * — it takes no windowing dependency. It is a plain overflow-auto scroll
 * container with a `max-height` cap, so every row renders. It keeps the native
 * API (`data`/`renderItem`/`keyExtractor`/`separators`/`emptyText`/`loading`) so
 * call sites port over; swap in a windowing lib later without changing props. All
 * colors come from the `--xen-*` tokens via Tailwind classes — no literal colors.
 */
export declare function VirtualList<T>({ className, data, renderItem, keyExtractor, estimatedItemSize, separators, emptyText, loading, maxHeight, ...rest }: VirtualListProps<T>): React.ReactElement;
//# sourceMappingURL=VirtualList.d.ts.map