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

export { ListingGallery } from './ListingGallery';
export type { ListingGalleryProps } from './ListingGallery';

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
