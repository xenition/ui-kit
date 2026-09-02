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

// ── Alternate designs (V2 / V3) — drop-in components sharing each classic's
// Props (`<Name>V2Props = <Name>Props`), a genuinely different design each.
export { ShipmentCardV2 } from './ShipmentCardV2';
export type { ShipmentCardV2Props } from './ShipmentCardV2';
export { ShipmentCardV3 } from './ShipmentCardV3';
export type { ShipmentCardV3Props } from './ShipmentCardV3';

export { PackageRowV2 } from './PackageRowV2';
export type { PackageRowV2Props } from './PackageRowV2';
export { PackageRowV3 } from './PackageRowV3';
export type { PackageRowV3Props } from './PackageRowV3';

export { TrackingTimelineV2 } from './TrackingTimelineV2';
export type { TrackingTimelineV2Props } from './TrackingTimelineV2';
export { TrackingTimelineV3 } from './TrackingTimelineV3';
export type { TrackingTimelineV3Props } from './TrackingTimelineV3';

export { RouteStopV2 } from './RouteStopV2';
export type { RouteStopV2Props } from './RouteStopV2';
export { RouteStopV3 } from './RouteStopV3';
export type { RouteStopV3Props } from './RouteStopV3';

/*
 * ── V4 "dispatch" (confident operations-desk) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated calm cards, panels,
 * rows and bars with clear status by glyph + labelled badge + tone (never color
 * alone) and big legible tabular-nums figures. Five entity card/rows carry a
 * two-density `variant`: `PackageRow` / `RouteStop` / `ScanRow` / `ManifestRow`
 * add `full` | `compact`, and `ShipmentCard` reuses its base `default` | `compact`.
 * Every V4 keeps its base props (all status values honored). The brand gradient
 * is reserved for the dispatch moment — the `TrackingTimeline` hero header. Base/
 * V2/V3 untouched; V4 is additive. Token-driven, dark-mode safe, web + native.
 */
export { ShipmentCardV4, type ShipmentCardV4Props } from './ShipmentCardV4';
export { PackageRowV4, type PackageRowV4Props, type PackageRowLayout } from './PackageRowV4';
export { RouteStopV4, type RouteStopV4Props, type RouteStopLayout } from './RouteStopV4';
export { ScanRowV4, type ScanRowV4Props, type ScanRowLayout } from './ScanRowV4';
export { ManifestRowV4, type ManifestRowV4Props, type ManifestRowLayout } from './ManifestRowV4';
export { DeliveryProofV4, type DeliveryProofV4Props } from './DeliveryProofV4';
export { WarehouseBinV4, type WarehouseBinV4Props } from './WarehouseBinV4';
export { TrackingTimelineV4, type TrackingTimelineV4Props } from './TrackingTimelineV4';
export { CarrierBadgeV4, type CarrierBadgeV4Props } from './CarrierBadgeV4';
export { DockScheduleV4, type DockScheduleV4Props } from './DockScheduleV4';
export { LoadPlanBarV4, type LoadPlanBarV4Props } from './LoadPlanBarV4';
export { ETABarV4, type ETABarV4Props } from './ETABarV4';
