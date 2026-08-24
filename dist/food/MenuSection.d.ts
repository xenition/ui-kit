import * as React from 'react';
export interface MenuSectionProps extends React.HTMLAttributes<HTMLElement> {
    /** Section heading (e.g. "Starters", "Mains"). */
    title: string;
    /** Optional supporting line under the heading. */
    description?: string;
    /** Right-aligned slot next to the title (e.g. item count, a chip). */
    aside?: React.ReactNode;
    /** Section body — typically a list of `DishCard`s. */
    children?: React.ReactNode;
    /** Message shown when the section has no items (default `No items yet`). */
    emptyLabel?: string;
    /** Slot rendered instead of `emptyLabel` when empty (illustration/action). */
    emptyState?: React.ReactNode;
}
/**
 * A titled group of menu items — heading, optional description and `aside`
 * slot, then its `children` (usually `DishCard`s) stacked with token spacing.
 * When it has no children it renders the commerce {@link EmptyState} (or a
 * custom `emptyState`) so an empty category still reads clearly. Web parity of
 * the native `MenuSection`; token-only.
 */
export declare const MenuSection: React.ForwardRefExoticComponent<MenuSectionProps & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=MenuSection.d.ts.map