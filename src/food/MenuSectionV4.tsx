import * as React from 'react';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import type { MenuSectionProps } from './MenuSection';

export interface MenuSectionV4Props extends MenuSectionProps {
  /**
   * The sentence under the empty title. An empty category needs a next step —
   * "Nothing here yet" alone tells a user what they can already see.
   */
  emptyDescription?: string;
}

const isEmptyChildren = (children: React.ReactNode): boolean =>
  // React.Children.toArray already strips null/undefined/boolean children.
  React.Children.toArray(children).length === 0;

/**
 * **V4 menu section** — the web twin of the native `MenuSectionV4`, same props
 * as {@link MenuSection} plus `emptyDescription`.
 *
 * ## Three changes
 *
 * 1. **Both twins render the same empty state.** The "EmptyState is a
 *    primitive" change only ever landed on this side — native still hand-rolls
 *    a dashed box — so one twin's empty category was the kit's empty state and
 *    the other's was a dashed rectangle §11 argues against. Both take
 *    `EmptyStateV4` now, and `emptyDescription` gives it the second sentence a
 *    title on its own cannot carry.
 * 2. **The section is a real landmark.** A `<section>` with no accessible name
 *    is skipped by a reader's region list; `aria-labelledby` points it at its
 *    own heading, so a menu of eight categories is navigable as eight regions
 *    instead of one long run of dishes.
 * 3. **Tokens.** The supporting line was `text-muted` — a fill slot used as
 *    ink, with no contrast promise — where `mutedText` is the corrected one.
 */
export const MenuSectionV4 = React.forwardRef<HTMLElement, MenuSectionV4Props>(
  function MenuSectionV4(
    {
      title,
      description,
      aside,
      children,
      emptyLabel = 'No items yet',
      emptyDescription,
      emptyState,
      className,
      ...rest
    },
    ref
  ) {
    const empty = isEmptyChildren(children);
    const headingId = React.useId();

    return (
      <section
        ref={ref}
        aria-labelledby={title ? headingId : undefined}
        className={cn('flex flex-col gap-md', className)}
        {...rest}
      >
        <div className="flex items-end justify-between gap-sm">
          <div className="flex min-w-0 flex-1 flex-col gap-xs">
            <h3 id={headingId} className="font-heading text-lg font-bold text-on-surface">
              {title}
            </h3>
            {description ? <p className="text-sm text-muted-text">{description}</p> : null}
          </div>
          {aside ? <div className="shrink-0">{aside}</div> : null}
        </div>

        {empty ? (
          (emptyState ?? <EmptyStateV4 title={emptyLabel} description={emptyDescription} />)
        ) : (
          <div className="flex flex-col gap-sm">{children}</div>
        )}
      </section>
    );
  }
);
