/**
 * `@xenition/ui/native/commerce` — presentational catalog / cart / order
 * components for React Native, mirroring the web `@xenition/ui/commerce` prop
 * contracts exactly (Product `{title, priceCents, currency?, compareAtCents?,
 * imageUrl?}`, CartItem `{title, variantTitle, quantity, unitPriceCents}`). No
 * fetching, no SDK import; styled only from compiled theme tokens. Money is
 * always integer **cents**, formatted through the single {@link formatMoney}
 * home (re-exported from the web money util — one formatter across platforms).
 */

export { formatMoney } from './money';
export type { MoneyFormatter } from './money';
export { PriceTag } from './PriceTag';
export type { PriceTagProps } from './PriceTag';
// V4 design line — same props as `PriceTag`, a different design.
export { PriceTagV4 } from './PriceTagV4';
export type { PriceTagV4Props } from './PriceTagV4';
export { ProductCard } from './ProductCard';
export type { ProductCardProps } from './ProductCard';
export { ProductCardV2 } from './ProductCardV2';
export type { ProductCardV2Props } from './ProductCardV2';
export { ProductCardV3 } from './ProductCardV3';
export type { ProductCardV3Props } from './ProductCardV3';
export { ProductGrid } from './ProductGrid';
export type { ProductGridProps } from './ProductGrid';
export { QuantityStepper } from './QuantityStepper';
export type { QuantityStepperProps } from './QuantityStepper';
export { CartLineItem } from './CartLineItem';
export type { CartLineItemProps } from './CartLineItem';
export { CartLineItemV2 } from './CartLineItemV2';
export type { CartLineItemV2Props } from './CartLineItemV2';
export { CartLineItemV3 } from './CartLineItemV3';
export type { CartLineItemV3Props } from './CartLineItemV3';
export { CartSummary } from './CartSummary';
export type { CartSummaryProps } from './CartSummary';
export { CartSummaryV2 } from './CartSummaryV2';
export type { CartSummaryV2Props } from './CartSummaryV2';
export { CartSummaryV3 } from './CartSummaryV3';
export type { CartSummaryV3Props } from './CartSummaryV3';
export { OrderSummary, CheckoutSummary } from './OrderSummary';
export type { OrderSummaryProps, OrderLine } from './OrderSummary';
export { OrderSummaryV2, CheckoutSummaryV2 } from './OrderSummaryV2';
export type { OrderSummaryV2Props } from './OrderSummaryV2';
export { OrderSummaryV3, CheckoutSummaryV3 } from './OrderSummaryV3';
export type { OrderSummaryV3Props } from './OrderSummaryV3';
export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps, OrderStatus } from './StatusBadge';
// EmptyState is a primitive and now lives in `native/primitives`; `./EmptyState`
// is the re-export that keeps the commerce entry point (and every existing
// import of it) working.
export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';
export { GenerativeCover } from './GenerativeCover';
export type { GenerativeCoverProps } from './GenerativeCover';

/* ------------------------------------------------------------------------ *
 * The V4 line
 *
 * Eleven components on the current design pattern. See
 * `COMMERCE-MARKETPLACE-V4-BRIEF.md`.
 *
 * `CheckoutSummaryV4` is `OrderSummaryV4` under its checkout-time name, which
 * is the shape the base and both alternate lines already have.
 * ------------------------------------------------------------------------ */

export { CartLineItemV4 } from './CartLineItemV4';
export type { CartLineItemV4Props } from './CartLineItemV4';

export { CartSummaryV4 } from './CartSummaryV4';
export type { CartSummaryV4Props } from './CartSummaryV4';

export { OrderSummaryV4, CheckoutSummaryV4 } from './OrderSummaryV4';
export type {
  OrderSummaryV4Props,
  CheckoutSummaryV4Props,
  OrderSummaryV4Empty,
} from './OrderSummaryV4';

export { QuantityStepperV4 } from './QuantityStepperV4';
export type { QuantityStepperV4Props, QuantityStepperV4Size } from './QuantityStepperV4';

export { ProductCardV4 } from './ProductCardV4';
export type { ProductCardV4Props, ProductCardV4Aspect } from './ProductCardV4';

export { ProductGridV4 } from './ProductGridV4';
export type { ProductGridV4Props } from './ProductGridV4';

export { EmptyStateV4 } from './EmptyStateV4';
export type { EmptyStateV4Props } from './EmptyStateV4';

export { StatusBadgeV4 } from './StatusBadgeV4';
export type { StatusBadgeV4Props } from './StatusBadgeV4';

export { GenerativeCoverV4 } from './GenerativeCoverV4';
export type { GenerativeCoverV4Props } from './GenerativeCoverV4';
