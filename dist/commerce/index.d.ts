/**
 * `@xenition/ui/commerce` — presentational catalog / cart / order components.
 *
 * Every component takes data as props (Product `{slug,title,imageUrl}`, Variant
 * `{title,priceCents,currency,compareAtCents}`, CartItem
 * `{title,variantTitle,quantity,unitPriceCents,imageUrl}`) — no fetching, no
 * SDK import — and is styled exclusively via the `--xen-*` theme tokens, so a
 * seed change restyles the storefront (dark mode included). Money is always
 * integer **cents**, formatted through the single {@link formatMoney} home.
 */
export { formatMoney } from './money';
export type { MoneyFormatter } from './money';
export { PriceTag } from './PriceTag';
export type { PriceTagProps } from './PriceTag';
export { ProductCard } from './ProductCard';
export type { ProductCardProps } from './ProductCard';
export { ProductGrid } from './ProductGrid';
export type { ProductGridProps } from './ProductGrid';
export { QuantityStepper } from './QuantityStepper';
export type { QuantityStepperProps } from './QuantityStepper';
export { CartLineItem } from './CartLineItem';
export type { CartLineItemProps } from './CartLineItem';
export { CartSummary } from './CartSummary';
export type { CartSummaryProps } from './CartSummary';
export { OrderSummary, CheckoutSummary } from './OrderSummary';
export type { OrderSummaryProps, OrderLine } from './OrderSummary';
export { StatusBadge } from './StatusBadge';
export type { StatusBadgeProps, OrderStatus } from './StatusBadge';
export { EmptyState } from './EmptyState';
export type { EmptyStateProps } from './EmptyState';
//# sourceMappingURL=index.d.ts.map