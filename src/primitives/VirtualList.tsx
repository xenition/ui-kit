import * as React from 'react';
import { cn } from './cn';

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
export function VirtualList<T>({
  className,
  data,
  renderItem,
  keyExtractor,
  estimatedItemSize,
  separators = true,
  emptyText = 'Nothing here yet',
  loading = false,
  maxHeight = 480,
  ...rest
}: VirtualListProps<T>): React.ReactElement {
  if (loading) {
    return (
      <div className={cn('flex items-center justify-center p-6', className)} {...rest}>
        <span
          role="status"
          aria-label="Loading"
          className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-neutral-300 border-t-primary"
        />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className={cn('bg-surface p-6 text-center text-sm text-muted', className)} {...rest}>
        {emptyText}
      </div>
    );
  }

  return (
    <div
      role="list"
      className={cn('bg-surface overflow-auto', separators && 'divide-y divide-border', className)}
      style={{ maxHeight }}
      {...rest}
    >
      {data.map((item, index) => (
        <div
          role="listitem"
          key={keyExtractor ? keyExtractor(item, index) : String(index)}
          style={estimatedItemSize != null ? { minHeight: estimatedItemSize } : undefined}
        >
          {renderItem(item, index)}
        </div>
      ))}
    </div>
  );
}
