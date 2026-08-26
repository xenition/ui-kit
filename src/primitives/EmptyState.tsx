import * as React from 'react';
import { cn } from './cn';

export interface EmptyStateProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Optional decorative icon/illustration slot. */
  icon?: React.ReactNode;
  /** Headline (e.g. "Your cart is empty"). */
  title: React.ReactNode;
  /** Supporting line under the title. */
  description?: React.ReactNode;
  /** Primary action slot (e.g. a "Browse products" button). */
  action?: React.ReactNode;
}

/**
 * Generic empty / no-results state — an empty cart, a filtered catalog with no
 * matches, an order list with nothing yet. Centered icon slot, muted copy, and
 * an optional action. Token-only and domain-agnostic. It lives in `primitives`
 * because nearly every screen in the kit reaches for it, and because a prop is
 * only confirmable against `dist/<module>/<Name>.d.ts` when the component
 * actually has a file in the module it is exported from. `commerce` re-exports
 * it so the older import path keeps working.
 */
export const EmptyState = React.forwardRef<HTMLDivElement, EmptyStateProps>(
  function EmptyState({ icon, title, description, action, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        data-xen-empty-state=""
        className={cn(
          'flex flex-col items-center justify-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-dashed border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-2xl)] text-center',
          className
        )}
        {...rest}
      >
        {icon ? (
          <div data-xen-empty-icon="" className="text-muted" aria-hidden="true">
            {icon}
          </div>
        ) : null}
        <p className="font-heading text-base font-semibold text-on-surface">{title}</p>
        {description ? (
          <p className="max-w-sm text-sm leading-relaxed text-muted">{description}</p>
        ) : null}
        {action ? <div className="mt-[var(--xen-space-sm)]">{action}</div> : null}
      </div>
    );
  }
);
