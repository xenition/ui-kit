import * as React from 'react';
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
export declare const CategoryTabs: React.ForwardRefExoticComponent<CategoryTabsProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=CategoryTabs.d.ts.map