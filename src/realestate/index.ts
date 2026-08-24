/**
 * `@xenition/ui/realestate` — composed real-estate and property blocks for
 * React DOM. The web parity of `@xenition/ui/native/realestate`: presentational
 * only, every component takes shaped data plus callbacks (nothing fetches) and
 * is styled exclusively from the `--xen-*` theme tokens via Tailwind classes
 * (no literal colors), so a seed change (dark mode included) restyles the whole
 * set. No map or charting dependency — `MapPinCard` and `FloorPlanView` are
 * static, styled `div` placeholders; charts reuse the token-bound `../charts`
 * family. Money is always integer **cents**, formatted through the shared
 * `formatMoney`. Native `onPress` maps to the DOM `onClick`.
 */

export { PropertyCard } from './PropertyCard';
export type { PropertyCardProps, PropertyCardVariant, PropertyStatus } from './PropertyCard';
export { PropertyCardV2 } from './PropertyCardV2';
export type { PropertyCardV2Props } from './PropertyCardV2';
export { PropertyCardV3 } from './PropertyCardV3';
export type { PropertyCardV3Props } from './PropertyCardV3';

export { ListingGallery } from './ListingGallery';
export type { ListingGalleryProps } from './ListingGallery';
export { ListingGalleryV2 } from './ListingGalleryV2';
export type { ListingGalleryV2Props } from './ListingGalleryV2';
export { ListingGalleryV3 } from './ListingGalleryV3';
export type { ListingGalleryV3Props } from './ListingGalleryV3';

export { AmenityGrid } from './AmenityGrid';
export type { AmenityGridProps, Amenity } from './AmenityGrid';

export { PriceHistory } from './PriceHistory';
export type { PriceHistoryProps, PricePoint } from './PriceHistory';

export { MapPinCard } from './MapPinCard';
export type { MapPinCardProps } from './MapPinCard';

export { TourScheduler } from './TourScheduler';
export type { TourSchedulerProps, TourSlot, TourSchedulerVariant } from './TourScheduler';

export { MortgageCalc } from './MortgageCalc';
export type { MortgageCalcProps, MortgageEstimate } from './MortgageCalc';

export { AgentCard } from './AgentCard';
export type { AgentCardProps, AgentCardVariant } from './AgentCard';
export { AgentCardV2 } from './AgentCardV2';
export type { AgentCardV2Props } from './AgentCardV2';
export { AgentCardV3 } from './AgentCardV3';
export type { AgentCardV3Props } from './AgentCardV3';

export { FloorPlanView } from './FloorPlanView';
export type { FloorPlanViewProps, FloorPlanRoom } from './FloorPlanView';

export { SavedSearchRow } from './SavedSearchRow';
export type { SavedSearchRowProps } from './SavedSearchRow';

export { OpenHouseBadge } from './OpenHouseBadge';
export type { OpenHouseBadgeProps, OpenHouseStatus } from './OpenHouseBadge';

export { NeighborhoodStat } from './NeighborhoodStat';
export type { NeighborhoodStatProps } from './NeighborhoodStat';

export { ComparableRow } from './ComparableRow';
export type { ComparableRowProps, ComparableStatus } from './ComparableRow';
export { ComparableRowV2 } from './ComparableRowV2';
export type { ComparableRowV2Props } from './ComparableRowV2';
export { ComparableRowV3 } from './ComparableRowV3';
export type { ComparableRowV3Props } from './ComparableRowV3';
