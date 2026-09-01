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
export type {
  TripHistoryRowProps,
  TripHistoryVariant,
  TripOutcome,
  TripHistoryEmptyProps,
} from './TripHistoryRow';

export { VehicleHealthRow } from './VehicleHealthRow';
export type { VehicleHealthRowProps, VehicleHealthVariant, HealthStatus } from './VehicleHealthRow';

export { ServiceReminder } from './ServiceReminder';
export type { ServiceReminderProps, ServiceReminderVariant, ServiceUrgency } from './ServiceReminder';

// ── Alternate designs (v2 / v3) — separate drop-in components sharing each
// original's props (`<Name>V{2,3}Props = <Name>Props`). Pick a look at the
// call site; no runtime variant prop.
export { RideRequestCardV2 } from './RideRequestCardV2';
export type { RideRequestCardV2Props } from './RideRequestCardV2';
export { RideRequestCardV3 } from './RideRequestCardV3';
export type { RideRequestCardV3Props } from './RideRequestCardV3';

export { DriverCardV2 } from './DriverCardV2';
export type { DriverCardV2Props } from './DriverCardV2';
export { DriverCardV3 } from './DriverCardV3';
export type { DriverCardV3Props } from './DriverCardV3';

export { VehicleCardV2 } from './VehicleCardV2';
export type { VehicleCardV2Props } from './VehicleCardV2';
export { VehicleCardV3 } from './VehicleCardV3';
export type { VehicleCardV3Props } from './VehicleCardV3';

export { RideStatusBarV2 } from './RideStatusBarV2';
export type { RideStatusBarV2Props } from './RideStatusBarV2';
export { RideStatusBarV3 } from './RideStatusBarV3';
export type { RideStatusBarV3Props } from './RideStatusBarV3';

// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `AUTOMOTIVE-BEAUTY-V4-BRIEF.md`.
// Each is a drop-in for its base — same props plus optional additions.
export { DriverCardV4 } from './DriverCardV4';
export type { DriverCardV4Props } from './DriverCardV4';
export { DriverRatingRowV4 } from './DriverRatingRowV4';
export type { DriverRatingRowV4Props } from './DriverRatingRowV4';
export { FareEstimateV4 } from './FareEstimateV4';
export type { FareEstimateV4Props } from './FareEstimateV4';
export { FuelChargeGaugeV4 } from './FuelChargeGaugeV4';
export type { FuelChargeGaugeV4Props, FuelBand } from './FuelChargeGaugeV4';
export { ParkingSpotV4 } from './ParkingSpotV4';
export type { ParkingSpotV4Props } from './ParkingSpotV4';
export { RideRequestCardV4 } from './RideRequestCardV4';
export type { RideRequestCardV4Props } from './RideRequestCardV4';
export { RideStatusBarV4 } from './RideStatusBarV4';
export type { RideStatusBarV4Props } from './RideStatusBarV4';
export { ServiceReminderV4 } from './ServiceReminderV4';
export type { ServiceReminderV4Props } from './ServiceReminderV4';
export { TripHistoryRowV4, TripHistoryEmptyV4 } from './TripHistoryRowV4';
export type { TripHistoryRowV4Props, TripHistoryEmptyV4Props } from './TripHistoryRowV4';
export { TripRouteV4 } from './TripRouteV4';
export type { TripRouteV4Props } from './TripRouteV4';
export { VehicleCardV4 } from './VehicleCardV4';
export type { VehicleCardV4Props } from './VehicleCardV4';
export { VehicleHealthRowV4 } from './VehicleHealthRowV4';
export type { VehicleHealthRowV4Props } from './VehicleHealthRowV4';
