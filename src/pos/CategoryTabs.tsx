import * as React from 'react';
import { cn } from '../primitives/cn';
import { TONE_SOFT } from './internal';
import type { PosTone } from './internal';

/** A single selectable category in the register grid tab strip. */
export interface CategoryTab {
  /** Stable identifier reported to `onSelect` and used as the React key. */
  id: string;
  /** Human-readable tab label. */
  label: string;
  /** Optional item count shown as a pill beside the label. */
  count?: number;
  /** Optional semantic tone for the count pill on the unselected state. */
  tone?: PosTone;
}

/**
 * Props for {@link CategoryTabs} — a horizontally-scrolling product category
 * tab strip for the register grid. Presentational only: the caller owns the
 * selected id and receives the chosen id via `onSelect`.
 */
export interface CategoryTabsProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  /** The categories to render, left to right. */
  categories: readonly CategoryTab[];
  /** The id of the currently selected category. */
  selectedId?: string;
  /** Fired with the category id when a tab is pressed. */
  onSelect?: (id: string) => void;
  /** Optional test id forwarded to the root element. */
  testID?: string;
}

/**
 * CategoryTabs — **V4** "register" design. A horizontally-scrolling `tablist`
 * for the product grid: the selected tab fills **solid primary** with
 * on-primary ink; unselected tabs stay calm on `surface`. Each tab is a ≥44px
 * target and may carry a count pill (soft-toned when unselected, on-primary
 * when selected). Presentational only — selection is driven by props and
 * reported via `onSelect`. All colors from `--xen-*` token classes (no
 * literals), dark-mode safe.
 */
export const CategoryTabs = React.forwardRef<HTMLDivElement, CategoryTabsProps>(function CategoryTabs(
  { categories, selectedId, onSelect, testID, className, ...rest },
  ref
) {
  return (
    <div
      ref={ref}
      role="tablist"
      aria-label="Product categories"
      aria-orientation="horizontal"
      data-xen-category-tabs=""
      data-testid={testID}
      className={cn(
        'flex gap-[var(--xen-space-sm)] overflow-x-auto',
        'p-[var(--xen-space-xs)]',
        className
      )}
      {...rest}
    >
      {categories.map((cat) => {
        const selected = cat.id === selectedId;
        return (
          <button
            key={cat.id}
            type="button"
            role="tab"
            aria-selected={selected}
            onClick={() => onSelect?.(cat.id)}
            tabIndex={selected ? 0 : -1}
            className={cn(
              'inline-flex min-h-[44px] shrink-0 items-center gap-[var(--xen-space-xs)]',
              'rounded-[var(--xen-radius-md)] px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
              'text-sm font-bold transition-all',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
              selected
                ? 'bg-primary text-on-primary shadow-md'
                : 'bg-surface text-on-surface hover:bg-primary-50 active:scale-[0.98]'
            )}
          >
            <span>{cat.label}</span>
            {typeof cat.count === 'number' ? (
              <span
                className={cn(
                  'inline-flex min-w-[1.25rem] items-center justify-center',
                  'rounded-full px-1.5 text-xs font-bold tabular-nums',
                  selected ? 'bg-on-primary/20 text-on-primary' : TONE_SOFT[cat.tone ?? 'neutral']
                )}
              >
                {cat.count}
              </span>
            ) : null}
          </button>
        );
      })}
    </div>
  );
});
