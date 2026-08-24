/**
 * `@xenition/ui/food` — presentational food-ordering / restaurant components
 * for React DOM (the web parity of `@xenition/ui/native/food`). Web-only,
 * styled exclusively from the `--xen-*` theme tokens via Tailwind token classes
 * (no literal colors), with no data fetching or SDK imports. Money is always
 * integer **cents**, formatted through the shared `formatMoney` re-exported from
 * `@xenition/ui/commerce`.
 *
 * Components compose the web primitives (`Card`, `Button`, `Badge`, `Icon`,
 * `Rating`) and the commerce layer (`PriceTag`, `QuantityStepper`, `EmptyState`,
 * the money formatter) so the food domain stays a thin, opinionated surface on
 * top. Native `onPress` handlers map to DOM `onClick`; whole-item press targets
 * are keyboard-operable `role="button"` roots and per-cell actions are real
 * `<button>`s.
 */

export { DishCard } from './DishCard';
export type { DishCardProps, DishCardVariant } from './DishCard';
export { DishCardV2 } from './DishCardV2';
export type { DishCardV2Props } from './DishCardV2';
export { DishCardV3 } from './DishCardV3';
export type { DishCardV3Props } from './DishCardV3';

export { MenuSection } from './MenuSection';
export type { MenuSectionProps } from './MenuSection';
export { MenuSectionV2 } from './MenuSectionV2';
export type { MenuSectionV2Props } from './MenuSectionV2';
export { MenuSectionV3 } from './MenuSectionV3';
export type { MenuSectionV3Props } from './MenuSectionV3';

export { CartBar } from './CartBar';
export type { CartBarProps, CartBarVariant } from './CartBar';
export { CartBarV2 } from './CartBarV2';
export type { CartBarV2Props } from './CartBarV2';
export { CartBarV3 } from './CartBarV3';
export type { CartBarV3Props } from './CartBarV3';

export { OrderStatusTracker } from './OrderStatusTracker';
export type {
  OrderStatusTrackerProps,
  OrderStatusTrackerVariant,
  OrderStage,
} from './OrderStatusTracker';

export { RestaurantCard } from './RestaurantCard';
export type {
  RestaurantCardProps,
  RestaurantCardVariant,
  RestaurantOpenState,
} from './RestaurantCard';
export { RestaurantCardV2 } from './RestaurantCardV2';
export type { RestaurantCardV2Props } from './RestaurantCardV2';
export { RestaurantCardV3 } from './RestaurantCardV3';
export type { RestaurantCardV3Props } from './RestaurantCardV3';

export { ModifierList } from './ModifierList';
export type {
  ModifierListProps,
  ModifierOption,
  ModifierSelectionMode,
} from './ModifierList';

export { DeliveryEstimate } from './DeliveryEstimate';
export type {
  DeliveryEstimateProps,
  DeliveryEstimateVariant,
  FulfilmentMode,
} from './DeliveryEstimate';

export { RatingSummary } from './RatingSummary';
export type { RatingSummaryProps, RatingSummaryVariant } from './RatingSummary';

export { ReorderRow } from './ReorderRow';
export type { ReorderRowProps } from './ReorderRow';

export { TipSelector } from './TipSelector';
export type { TipSelectorProps } from './TipSelector';

export { NutritionBadge } from './NutritionBadge';
export type { NutritionBadgeProps, NutritionKind } from './NutritionBadge';

export { CuisineChip } from './CuisineChip';
export type { CuisineChipProps, CuisineChipSize } from './CuisineChip';

export { TableReservationRow } from './TableReservationRow';
export type {
  TableReservationRowProps,
  ReservationStatus,
} from './TableReservationRow';
