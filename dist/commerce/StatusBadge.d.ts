import * as React from 'react';
export type OrderStatus = 'pending' | 'paid' | 'fulfilled' | 'shipped' | 'cancelled' | 'refunded';
export interface StatusBadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Order lifecycle status; drives the semantic tone. */
    status: OrderStatus;
    /** Human label (default: the capitalized status). */
    children?: React.ReactNode;
}
/**
 * Small pill badge for an order's status. Token-only, contrast-guaranteed via
 * the semantic `X`/`on-X` pairs.
 */
export declare const StatusBadge: React.ForwardRefExoticComponent<StatusBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=StatusBadge.d.ts.map