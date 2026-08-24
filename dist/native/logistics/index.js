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
exports.CARRIER_META = exports.DOCK_META = exports.SCAN_META = exports.PROOF_META = exports.STOP_META = exports.SHIPMENT_META = exports.TRACKING_META = exports.TRACKING_ORDER = exports.trackingIndex = exports.formatWeight = exports.clampPct = exports.withAlpha = exports.toneColor = exports.ETABar = exports.ScanRow = exports.LoadPlanBar = exports.DockSchedule = exports.ManifestRow = exports.CarrierBadge = exports.TrackingTimeline = exports.WarehouseBin = exports.DeliveryProof = exports.RouteStop = exports.PackageRow = exports.ShipmentCard = void 0;
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
//# sourceMappingURL=index.js.map