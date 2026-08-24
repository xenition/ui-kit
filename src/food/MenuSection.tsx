import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyState } from '../commerce';

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

const isEmptyChildren = (children: React.ReactNode): boolean =>
  // React.Children.toArray already strips null/undefined/boolean children.
  React.Children.toArray(children).length === 0;

/**
 * A titled group of menu items — heading, optional description and `aside`
 * slot, then its `children` (usually `DishCard`s) stacked with token spacing.
 * When it has no children it renders the commerce {@link EmptyState} (or a
 * custom `emptyState`) so an empty category still reads clearly. Web parity of
 * the native `MenuSection`; token-only.
 */
export const MenuSection = React.forwardRef<HTMLElement, MenuSectionProps>(function MenuSection(
  { title, description, aside, children, emptyLabel = 'No items yet', emptyState, className, ...rest },
  ref
) {
  const empty = isEmptyChildren(children);

  return (
    <section ref={ref} className={cn('flex flex-col gap-[var(--xen-space-md)]', className)} {...rest}>
      <div className="flex items-end justify-between gap-[var(--xen-space-sm)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="font-heading text-lg font-bold text-on-surface">{title}</h3>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>

      {empty ? (
        emptyState ?? <EmptyState title={emptyLabel} />
      ) : (
        <div className="flex flex-col gap-[var(--xen-space-sm)]">{children}</div>
      )}
    </section>
  );
});
