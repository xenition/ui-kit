/**
 * `@xenition/ui/native/automotive` — composed ride-hailing, fleet, and
 * connected-car blocks for React Native. Mobile-first, presentational only:
 * every component takes shaped data plus callbacks (nothing fetches) and is
 * styled exclusively from the compiled theme via `useXenitionTheme()`, so a
 * seed change (dark mode included) restyles the whole set. No literal colors
 * (only `SemanticColors` slots plus `withAlpha` tints), and no external map or
 * native dependencies — `TripRoute` is a static styled placeholder.
 */
export { RideRequestCard } from './RideRequestCard';
export type { RideRequestCardProps, RideRequestVariant, RideStop } from './RideRequestCard';
export { DriverCard } from './DriverCard';
export type { DriverCardProps, DriverCardVariant } from './DriverCard';
export { TripRoute } from './TripRoute';
export type { TripRouteProps, RoutePoint } from './TripRoute';
export { VehicleCard } from './VehicleCard';
export type { VehicleCardProps, VehicleCardVariant, VehicleStatus, VehicleSpec } from './VehicleCard';
export { FuelChargeGauge } from './FuelChargeGauge';
export type { FuelChargeGaugeProps, FuelChargeVariant, FuelKind } from './FuelChargeGauge';
export { ParkingSpot } from './ParkingSpot';
export type { ParkingSpotProps, ParkingSpotVariant, ParkingStatus } from './ParkingSpot';
export { RideStatusBar } from './RideStatusBar';
export type { RideStatusBarProps, RideStatusVariant, RideStage } from './RideStatusBar';
export { FareEstimate } from './FareEstimate';
export type { FareEstimateProps, FareEstimateVariant, FareLineItem } from './FareEstimate';
export { DriverRatingRow } from './DriverRatingRow';
export type { DriverRatingRowProps, DriverRatingVariant } from './DriverRatingRow';
export { TripHistoryRow, TripHistoryEmpty } from './TripHistoryRow';
export type { TripHistoryRowProps, TripHistoryVariant, TripOutcome, TripHistoryEmptyProps, } from './TripHistoryRow';
export { VehicleHealthRow } from './VehicleHealthRow';
export type { VehicleHealthRowProps, VehicleHealthVariant, HealthStatus } from './VehicleHealthRow';
export { ServiceReminder } from './ServiceReminder';
export type { ServiceReminderProps, ServiceReminderVariant, ServiceUrgency } from './ServiceReminder';
//# sourceMappingURL=index.d.ts.map