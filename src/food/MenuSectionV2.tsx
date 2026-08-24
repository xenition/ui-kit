import * as React from 'react';
import { cn } from '../primitives/cn';
import type { MenuSectionProps } from './MenuSection';

/** Drop-in for {@link MenuSection}: identical props, a distinct design. */
export type MenuSectionV2Props = MenuSectionProps;

const isEmptyChildren = (children: React.ReactNode): boolean =>
  React.Children.toArray(children).length === 0;

/**
 * MenuSection, alternate design **V2** — a *panelled banner* group. The whole
 * section is wrapped in an elevated surface card; the heading sits in a soft
 * primary-tinted banner strip across the top (title, description, and the
 * `aside` slot as a right-hand chip), with the items grouped inside below. The
 * empty state is a soft-tinted inset panel rather than a plain box. This reads
 * as a bold, contained category card — the opposite of the flat base. Same
 * props as the base; token-only.
 */
export const MenuSectionV2 = React.forwardRef<HTMLElement, MenuSectionV2Props>(function MenuSectionV2(
  { title, description, aside, children, emptyLabel = 'No items yet', emptyState, className, ...rest },
  ref
) {
  const empty = isEmptyChildren(children);

  return (
    <section
      ref={ref}
      className={cn('overflow-hidden rounded-[var(--xen-radius-lg)] bg-surface shadow-md', className)}
      {...rest}
    >
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)] bg-primary/10 px-[var(--xen-space-lg)] py-[var(--xen-space-md)]">
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <h3 className="font-heading text-lg font-extrabold text-primary">{title}</h3>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </div>
        {aside ? <div className="shrink-0">{aside}</div> : null}
      </div>

      <div className="p-[var(--xen-space-lg)]">
        {empty ? (
          emptyState ?? (
            <div className="flex items-center justify-center rounded-[var(--xen-radius-md)] bg-primary/5 px-[var(--xen-space-lg)] py-[var(--xen-space-xl)] text-center text-sm text-muted">
              {emptyLabel}
            </div>
          )
        ) : (
          <div className="flex flex-col gap-[var(--xen-space-sm)]">{children}</div>
        )}
      </div>
    </section>
  );
});
