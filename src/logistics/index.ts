/**
 * `@xenition/ui/logistics` — presentational shipping / logistics /
 * fleet-delivery blocks for React DOM. Composed from the web primitives
 * (`Card`, `Badge`, `CarrierBadge`) and styled exclusively from the `--xen-*`
 * token classes — no literal colors. Every tracking / shipment / stop / dock
 * status is conveyed by a **glyph + word** (and, where relevant, a `progressbar`
 * / `aria-valuenow`), never by color alone. Each component is data + callbacks +
 * variants/states with empty/loading handling and a11y labels — no fetching, no
 * SDK import, no barcode/scan dependency (scan codes render as a token-bar
 * placeholder). The canonical delivery lifecycle is
 * picked → in-transit → out-for-delivery → delivered. Web parity of
 * `@xenition/ui/native/logistics`.
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

// Shared logistics vocabulary (status glyph/label/tone maps + token-class maps
// + helpers).
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
  TONE_TEXT,
  TONE_BG,
  TONE_ON_TEXT,
  TONE_SOFT_BG,
  TONE_SOFT_STRONG_BG,
  TONE_BORDER,
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
