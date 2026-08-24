import * as React from 'react';
import type { OrderSummaryProps } from './OrderSummary';
/** Drop-in alternate of {@link OrderSummaryProps} — identical prop contract. */
export type OrderSummaryV2Props = OrderSummaryProps;
/**
 * OrderSummary — design variant **V2**: an **elevated receipt**. Where the base
 * is a flat bordered recap, V2 floats on a shadow, prefixes each line with a
 * neutral **`×qty` chip**, separates items from totals with a **dashed
 * perforation**, and drops the grand total into a primary-tinted band. Same
 * props as {@link OrderSummaryProps}. Read-only; token-only; integer cents.
 */
export declare const OrderSummaryV2: React.ForwardRefExoticComponent<OrderSummaryProps & React.RefAttributes<HTMLDivElement>>;
export { OrderSummaryV2 as CheckoutSummaryV2 };
//# sourceMappingURL=OrderSummaryV2.d.ts.map