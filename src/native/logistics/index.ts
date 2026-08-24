/**
 * `@xenition/ui/native/logistics` — presentational shipping / logistics /
 * fleet-delivery blocks for React Native. Composed from the native primitives
 * (`Card`, `Badge`) and this module's `CarrierBadge`, styled exclusively from
 * the compiled theme tokens via `useXenitionTheme()` — colors are only
 * `SemanticColors` slots, `tokens.ramps.*` steps, or a `withAlpha` tint of
 * those; never a literal hex. Every tracking / shipment / stop / dock status is
 * conveyed by a **glyph + word** (and, where relevant, a `progressbar` /
 * `accessibilityValue`), never by color alone. Each component is data +
 * callbacks + variants/states with empty/loading handling and a11y labels — no
 * fetching, no SDK import, no barcode/scan dependency (scan codes render as a
 * token-bar placeholder). The canonical delivery lifecycle is
 * picked → in-transit → out-for-delivery → delivered.
 */

export { ShipmentCard } from './ShipmentCard';
export type { ShipmentCardProps, ShipmentCardVariant } from './ShipmentCard';

export { PackageRow } from './PackageRow';
export type { PackageRowProps } from './PackageRow';

export { RouteStop } from './RouteStop';
export type { RouteStopProps } from './RouteStop';

export { DeliveryProof } from './DeliveryProof';
export type { DeliveryProofProps, ProofOutcome } from './DeliveryProof';

export { WarehouseBin } from './WarehouseBin';
export type { WarehouseBinProps, BinState } from './WarehouseBin';

export { TrackingTimeline } from './TrackingTimeline';
export type { TrackingTimelineProps, TrackingEvent } from './TrackingTimeline';

export { CarrierBadge } from './CarrierBadge';
export type { CarrierBadgeProps, CarrierBadgeVariant, CarrierBadgeSize } from './CarrierBadge';

export { ManifestRow } from './ManifestRow';
export type { ManifestRowProps, ManifestState } from './ManifestRow';

export { DockSchedule } from './DockSchedule';
export type { DockScheduleProps, DockSlot } from './DockSchedule';

export { LoadPlanBar } from './LoadPlanBar';
export type { LoadPlanBarProps, LoadSegment } from './LoadPlanBar';

export { ScanRow } from './ScanRow';
export type { ScanRowProps } from './ScanRow';

export { ETABar } from './ETABar';
export type { ETABarProps, ETAStatus } from './ETABar';

// Shared logistics vocabulary (status glyph/label/tone maps + helpers).
export type {
  LogisticsTone,
  StatusMeta,
  TrackingStage,
  ShipmentStatus,
  StopStatus,
  ProofKind,
  ScanKind,
  DockStatus,
  CarrierCode,
  CarrierMeta,
} from './internal';
export {
  toneColor,
  withAlpha,
  clampPct,
  formatWeight,
  trackingIndex,
  TRACKING_ORDER,
  TRACKING_META,
  SHIPMENT_META,
  STOP_META,
  PROOF_META,
  SCAN_META,
  DOCK_META,
  CARRIER_META,
} from './internal';
