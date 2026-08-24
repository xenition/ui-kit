import * as React from 'react';
/** The four fulfilment stages, in order. */
export type OrderStage = 'placed' | 'preparing' | 'out-for-delivery' | 'delivered';
export type OrderStatusTrackerVariant = 'horizontal' | 'vertical';
export interface OrderStatusTrackerProps extends React.HTMLAttributes<HTMLDivElement> {
    /** The stage the order is currently in. */
    status: OrderStage;
    /** Layout orientation (default `horizontal`). */
    variant?: OrderStatusTrackerVariant;
    /** Override the default per-stage labels. */
    labels?: Partial<Record<OrderStage, string>>;
    /** Optional per-stage timestamp/subtext (e.g. "12:04 PM"). */
    timestamps?: Partial<Record<OrderStage, string>>;
    /** Marks the order cancelled — the current step reads as failed. */
    cancelled?: boolean;
}
/**
 * A four-stage delivery progress tracker: placed → preparing → out for delivery
 * → delivered. Completed steps show a check glyph, the current step a filled
 * dot, upcoming steps a hollow ring — and every step is *also* announced with
 * its state word ("completed" / "in progress" / "upcoming") so status is never
 * conveyed by color alone. `variant` switches horizontal vs. vertical. When
 * `cancelled`, the current step reads as failed. Web parity of the native
 * `OrderStatusTracker`; token-only, `role="progressbar"`.
 */
export declare const OrderStatusTracker: React.ForwardRefExoticComponent<OrderStatusTrackerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=OrderStatusTracker.d.ts.map