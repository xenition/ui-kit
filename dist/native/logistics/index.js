"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ETABarV4 = exports.LoadPlanBarV4 = exports.DockScheduleV4 = exports.CarrierBadgeV4 = exports.TrackingTimelineV4 = exports.WarehouseBinV4 = exports.DeliveryProofV4 = exports.ManifestRowV4 = exports.ScanRowV4 = exports.RouteStopV4 = exports.PackageRowV4 = exports.ShipmentCardV4 = exports.RouteStopV3 = exports.RouteStopV2 = exports.TrackingTimelineV3 = exports.TrackingTimelineV2 = exports.PackageRowV3 = exports.PackageRowV2 = exports.ShipmentCardV3 = exports.ShipmentCardV2 = exports.CARRIER_META = exports.DOCK_META = exports.SCAN_META = exports.PROOF_META = exports.STOP_META = exports.SHIPMENT_META = exports.TRACKING_META = exports.TRACKING_ORDER = exports.trackingIndex = exports.formatWeight = exports.clampPct = exports.withAlpha = exports.toneColor = exports.ETABar = exports.ScanRow = exports.LoadPlanBar = exports.DockSchedule = exports.ManifestRow = exports.CarrierBadge = exports.TrackingTimeline = exports.WarehouseBin = exports.DeliveryProof = exports.RouteStop = exports.PackageRow = exports.ShipmentCard = void 0;
var ShipmentCard_1 = require("./ShipmentCard");
Object.defineProperty(exports, "ShipmentCard", { enumerable: true, get: function () { return ShipmentCard_1.ShipmentCard; } });
var PackageRow_1 = require("./PackageRow");
Object.defineProperty(exports, "PackageRow", { enumerable: true, get: function () { return PackageRow_1.PackageRow; } });
var RouteStop_1 = require("./RouteStop");
Object.defineProperty(exports, "RouteStop", { enumerable: true, get: function () { return RouteStop_1.RouteStop; } });
var DeliveryProof_1 = require("./DeliveryProof");
Object.defineProperty(exports, "DeliveryProof", { enumerable: true, get: function () { return DeliveryProof_1.DeliveryProof; } });
var WarehouseBin_1 = require("./WarehouseBin");
Object.defineProperty(exports, "WarehouseBin", { enumerable: true, get: function () { return WarehouseBin_1.WarehouseBin; } });
var TrackingTimeline_1 = require("./TrackingTimeline");
Object.defineProperty(exports, "TrackingTimeline", { enumerable: true, get: function () { return TrackingTimeline_1.TrackingTimeline; } });
var CarrierBadge_1 = require("./CarrierBadge");
Object.defineProperty(exports, "CarrierBadge", { enumerable: true, get: function () { return CarrierBadge_1.CarrierBadge; } });
var ManifestRow_1 = require("./ManifestRow");
Object.defineProperty(exports, "ManifestRow", { enumerable: true, get: function () { return ManifestRow_1.ManifestRow; } });
var DockSchedule_1 = require("./DockSchedule");
Object.defineProperty(exports, "DockSchedule", { enumerable: true, get: function () { return DockSchedule_1.DockSchedule; } });
var LoadPlanBar_1 = require("./LoadPlanBar");
Object.defineProperty(exports, "LoadPlanBar", { enumerable: true, get: function () { return LoadPlanBar_1.LoadPlanBar; } });
var ScanRow_1 = require("./ScanRow");
Object.defineProperty(exports, "ScanRow", { enumerable: true, get: function () { return ScanRow_1.ScanRow; } });
var ETABar_1 = require("./ETABar");
Object.defineProperty(exports, "ETABar", { enumerable: true, get: function () { return ETABar_1.ETABar; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "toneColor", { enumerable: true, get: function () { return internal_1.toneColor; } });
Object.defineProperty(exports, "withAlpha", { enumerable: true, get: function () { return internal_1.withAlpha; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
Object.defineProperty(exports, "formatWeight", { enumerable: true, get: function () { return internal_1.formatWeight; } });
Object.defineProperty(exports, "trackingIndex", { enumerable: true, get: function () { return internal_1.trackingIndex; } });
Object.defineProperty(exports, "TRACKING_ORDER", { enumerable: true, get: function () { return internal_1.TRACKING_ORDER; } });
Object.defineProperty(exports, "TRACKING_META", { enumerable: true, get: function () { return internal_1.TRACKING_META; } });
Object.defineProperty(exports, "SHIPMENT_META", { enumerable: true, get: function () { return internal_1.SHIPMENT_META; } });
Object.defineProperty(exports, "STOP_META", { enumerable: true, get: function () { return internal_1.STOP_META; } });
Object.defineProperty(exports, "PROOF_META", { enumerable: true, get: function () { return internal_1.PROOF_META; } });
Object.defineProperty(exports, "SCAN_META", { enumerable: true, get: function () { return internal_1.SCAN_META; } });
Object.defineProperty(exports, "DOCK_META", { enumerable: true, get: function () { return internal_1.DOCK_META; } });
Object.defineProperty(exports, "CARRIER_META", { enumerable: true, get: function () { return internal_1.CARRIER_META; } });
// ── Alternate designs (V2 / V3) — drop-in components sharing each classic's
// Props (`<Name>V2Props = <Name>Props`), a genuinely different design each.
var ShipmentCardV2_1 = require("./ShipmentCardV2");
Object.defineProperty(exports, "ShipmentCardV2", { enumerable: true, get: function () { return ShipmentCardV2_1.ShipmentCardV2; } });
var ShipmentCardV3_1 = require("./ShipmentCardV3");
Object.defineProperty(exports, "ShipmentCardV3", { enumerable: true, get: function () { return ShipmentCardV3_1.ShipmentCardV3; } });
var PackageRowV2_1 = require("./PackageRowV2");
Object.defineProperty(exports, "PackageRowV2", { enumerable: true, get: function () { return PackageRowV2_1.PackageRowV2; } });
var PackageRowV3_1 = require("./PackageRowV3");
Object.defineProperty(exports, "PackageRowV3", { enumerable: true, get: function () { return PackageRowV3_1.PackageRowV3; } });
var TrackingTimelineV2_1 = require("./TrackingTimelineV2");
Object.defineProperty(exports, "TrackingTimelineV2", { enumerable: true, get: function () { return TrackingTimelineV2_1.TrackingTimelineV2; } });
var TrackingTimelineV3_1 = require("./TrackingTimelineV3");
Object.defineProperty(exports, "TrackingTimelineV3", { enumerable: true, get: function () { return TrackingTimelineV3_1.TrackingTimelineV3; } });
var RouteStopV2_1 = require("./RouteStopV2");
Object.defineProperty(exports, "RouteStopV2", { enumerable: true, get: function () { return RouteStopV2_1.RouteStopV2; } });
var RouteStopV3_1 = require("./RouteStopV3");
Object.defineProperty(exports, "RouteStopV3", { enumerable: true, get: function () { return RouteStopV3_1.RouteStopV3; } });
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
var ShipmentCardV4_1 = require("./ShipmentCardV4");
Object.defineProperty(exports, "ShipmentCardV4", { enumerable: true, get: function () { return ShipmentCardV4_1.ShipmentCardV4; } });
var PackageRowV4_1 = require("./PackageRowV4");
Object.defineProperty(exports, "PackageRowV4", { enumerable: true, get: function () { return PackageRowV4_1.PackageRowV4; } });
var RouteStopV4_1 = require("./RouteStopV4");
Object.defineProperty(exports, "RouteStopV4", { enumerable: true, get: function () { return RouteStopV4_1.RouteStopV4; } });
var ScanRowV4_1 = require("./ScanRowV4");
Object.defineProperty(exports, "ScanRowV4", { enumerable: true, get: function () { return ScanRowV4_1.ScanRowV4; } });
var ManifestRowV4_1 = require("./ManifestRowV4");
Object.defineProperty(exports, "ManifestRowV4", { enumerable: true, get: function () { return ManifestRowV4_1.ManifestRowV4; } });
var DeliveryProofV4_1 = require("./DeliveryProofV4");
Object.defineProperty(exports, "DeliveryProofV4", { enumerable: true, get: function () { return DeliveryProofV4_1.DeliveryProofV4; } });
var WarehouseBinV4_1 = require("./WarehouseBinV4");
Object.defineProperty(exports, "WarehouseBinV4", { enumerable: true, get: function () { return WarehouseBinV4_1.WarehouseBinV4; } });
var TrackingTimelineV4_1 = require("./TrackingTimelineV4");
Object.defineProperty(exports, "TrackingTimelineV4", { enumerable: true, get: function () { return TrackingTimelineV4_1.TrackingTimelineV4; } });
var CarrierBadgeV4_1 = require("./CarrierBadgeV4");
Object.defineProperty(exports, "CarrierBadgeV4", { enumerable: true, get: function () { return CarrierBadgeV4_1.CarrierBadgeV4; } });
var DockScheduleV4_1 = require("./DockScheduleV4");
Object.defineProperty(exports, "DockScheduleV4", { enumerable: true, get: function () { return DockScheduleV4_1.DockScheduleV4; } });
var LoadPlanBarV4_1 = require("./LoadPlanBarV4");
Object.defineProperty(exports, "LoadPlanBarV4", { enumerable: true, get: function () { return LoadPlanBarV4_1.LoadPlanBarV4; } });
var ETABarV4_1 = require("./ETABarV4");
Object.defineProperty(exports, "ETABarV4", { enumerable: true, get: function () { return ETABarV4_1.ETABarV4; } });
//# sourceMappingURL=index.js.map