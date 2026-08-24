import * as React from 'react';
import { cn } from '../primitives/cn';
import type { MenuSectionProps } from './MenuSection';

/** Drop-in for {@link MenuSection}: identical props, a distinct design. */
export type MenuSectionV3Props = MenuSectionProps;

const isEmptyChildren = (children: React.ReactNode): boolean =>
  React.Children.toArray(children).length === 0;

/**
 * MenuSection, alternate design **V3** — a *minimal editorial* group. The title
 * is a compact heading followed by a hairline rule that runs to the edge, with
 * the `aside` slot tucked at the far right of that rule; the optional
 * description sits under it. Items follow, tightly stacked. The empty state is a
 * single quiet italic line, not a boxed panel. Line-based and understated — the
 * opposite of V2's contained banner. Same props as the base; token-only.
 */
export const MenuSectionV3 = React.forwardRef<HTMLElement, MenuSectionV3Props>(function MenuSectionV3(
  { title, description, aside, children, emptyLabel = 'No items yet', emptyState, className, ...rest },
  ref
) {
  const empty = isEmptyChildren(children);

  return (
    <section ref={ref} className={cn('flex flex-col gap-[var(--xen-space-sm)]', className)} {...rest}>
      <div className="flex items-center gap-[var(--xen-space-sm)]">
        <h3 className="font-heading text-base font-extrabold uppercase tracking-wide text-on-surface">{title}</h3>
        <span className="h-px flex-1 bg-border" aria-hidden="true" />
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>

      {description ? <p className="text-sm text-muted">{description}</p> : null}

      {empty ? (
        emptyState ?? <p className="text-sm italic text-muted">{emptyLabel}</p>
      ) : (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">{children}</div>
      )}
    </section>
  );
});
