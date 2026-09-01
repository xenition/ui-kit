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

/**
 * Alternate DESIGNS (V2 / V3) of the most-used food components. Each is a
 * genuinely different layout — not a restyle — and a drop-in for its classic:
 * `<Name>V2Props` / `<Name>V3Props` are aliases of the classic `<Name>Props`,
 * so they swap in with no prop changes. Same token purity, a11y, and cents
 * money contract as the originals.
 */
export { DishCardV2 } from './DishCardV2';
export type { DishCardV2Props } from './DishCardV2';
export { DishCardV3 } from './DishCardV3';
export type { DishCardV3Props } from './DishCardV3';

export { RestaurantCardV2 } from './RestaurantCardV2';
export type { RestaurantCardV2Props } from './RestaurantCardV2';
export { RestaurantCardV3 } from './RestaurantCardV3';
export type { RestaurantCardV3Props } from './RestaurantCardV3';

export { CartBarV2 } from './CartBarV2';
export type { CartBarV2Props } from './CartBarV2';
export { CartBarV3 } from './CartBarV3';
export type { CartBarV3Props } from './CartBarV3';

export { MenuSectionV2 } from './MenuSectionV2';
export type { MenuSectionV2Props } from './MenuSectionV2';
export { MenuSectionV3 } from './MenuSectionV3';
export type { MenuSectionV3Props } from './MenuSectionV3';

/**
 * The **V4 line** of the food module — a drop-in for each classic with the
 * same props plus a handful of optional copy hooks, and the module's
 * accessibility, token and touch-target defects fixed. The headline: a
 * `DishCard` announced its name and nothing else, so the allergen and dietary
 * badges it rendered never reached a screen-reader user at all.
 */
export { CartBarV4 } from './CartBarV4';
export type { CartBarV4Props } from './CartBarV4';

export { CuisineChipV4 } from './CuisineChipV4';
export type { CuisineChipV4Props } from './CuisineChipV4';

export { DeliveryEstimateV4 } from './DeliveryEstimateV4';
export type { DeliveryEstimateV4Props } from './DeliveryEstimateV4';

export { DishCardV4 } from './DishCardV4';
export type { DishCardV4Props } from './DishCardV4';

export { MenuSectionV4 } from './MenuSectionV4';
export type { MenuSectionV4Props } from './MenuSectionV4';

export { ModifierListV4 } from './ModifierListV4';
export type { ModifierListV4Props } from './ModifierListV4';

export { NutritionBadgeV4 } from './NutritionBadgeV4';
export type { NutritionBadgeV4Props, NutritionToneV4 } from './NutritionBadgeV4';

export { OrderStatusTrackerV4 } from './OrderStatusTrackerV4';
export type { OrderStatusTrackerV4Props } from './OrderStatusTrackerV4';

export { RatingSummaryV4 } from './RatingSummaryV4';
export type { RatingSummaryV4Props } from './RatingSummaryV4';

export { ReorderRowV4 } from './ReorderRowV4';
export type { ReorderRowV4Props } from './ReorderRowV4';

export { RestaurantCardV4 } from './RestaurantCardV4';
export type { RestaurantCardV4Props } from './RestaurantCardV4';

export { TableReservationRowV4 } from './TableReservationRowV4';
export type { TableReservationRowV4Props } from './TableReservationRowV4';

export { TipSelectorV4 } from './TipSelectorV4';
export type { TipSelectorV4Props } from './TipSelectorV4';
