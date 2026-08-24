/**
 * `@xenition/ui/native/food` — presentational food-ordering / restaurant
 * components for React Native. Mobile-first, native-only, styled exclusively
 * from compiled theme tokens (no literal colors), with no data fetching or SDK
 * imports. Money is always integer **cents**, formatted through the shared
 * `formatMoney` home re-exported from `@xenition/ui/native/commerce`.
 *
 * Components compose the native primitives (`Card`, `Button`, `Badge`, `Icon`,
 * `Rating`) and the commerce layer (`PriceTag`, `QuantityStepper`, the money
 * formatter) so the food domain stays a thin, opinionated surface on top.
 */

export { DishCard } from './DishCard';
export type { DishCardProps, DishCardVariant } from './DishCard';

export { MenuSection } from './MenuSection';
export type { MenuSectionProps } from './MenuSection';

export { CartBar } from './CartBar';
export type { CartBarProps, CartBarVariant } from './CartBar';

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
