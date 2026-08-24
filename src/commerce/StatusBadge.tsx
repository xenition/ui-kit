import * as React from 'react';
import { cn } from '../primitives/cn';

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'fulfilled'
  | 'shipped'
  | 'cancelled'
  | 'refunded';

export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Order lifecycle status; drives the semantic tone. */
  status: OrderStatus;
  /** Human label (default: the capitalized status). */
  children?: React.ReactNode;
}

/**
 * Semantic → contrast-checked slot pairs. Using the `X` / `on-X` pairs (rather
 * than a translucent tint) means the badge is guaranteed AA-readable in both
 * light and dark modes with zero configuration.
 */
const STATUS_CLASSES: Record<OrderStatus, string> = {
  pending: 'bg-warn text-on-warn',
  paid: 'bg-success text-on-success',
  fulfilled: 'bg-success text-on-success',
  shipped: 'bg-primary text-on-primary',
  cancelled: 'bg-danger text-on-danger',
  refunded: 'bg-neutral-200 text-on-surface',
};

const capitalize = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Small pill badge for an order's status. Token-only, contrast-guaranteed via
 * the semantic `X`/`on-X` pairs.
 */
export const StatusBadge = React.forwardRef<HTMLSpanElement, StatusBadgeProps>(
  function StatusBadge({ status, children, className, ...rest }, ref) {
    return (
      <span
        ref={ref}
        data-xen-status-badge={status}
        className={cn(
          'inline-flex items-center rounded-full px-[var(--xen-space-sm)] py-0.5 text-xs font-medium',
          STATUS_CLASSES[status],
          className
        )}
        {...rest}
      >
        {children ?? capitalize(status)}
      </span>
    );
  }
);
