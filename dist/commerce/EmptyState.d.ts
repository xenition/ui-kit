import * as React from 'react';
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
 * an optional action. Token-only and domain-agnostic.
 */
export declare const EmptyState: React.ForwardRefExoticComponent<EmptyStateProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=EmptyState.d.ts.map