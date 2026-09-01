"use strict";
/**
 * `@xenition/ui/fieldservice` — presentational field-service / construction /
 * trades blocks for React DOM (web). The web parity of
 * `@xenition/ui/native/fieldservice`: same component names, same prop
 * contract (`onPress` → `onClick`, RN styles → `className`/`style`). Composed
 * from the web primitives (`Card`, `Button`, `Icon`, `Badge`, `Avatar`,
 * `Checkbox`, `Progress`, `Alert`, `Skeleton`) plus `EmptyState`/`formatMoney`
 * from `commerce`, and styled exclusively through the `--xen-*` Tailwind token
 * classes — no literal colors (kit lint rule). Money is carried as integer
 * **cents** through the single `formatMoney` home. Work-order / inspection /
 * equipment / dispatch status is always conveyed by **text + glyph + color** —
 * never color alone. Every component takes data + callbacks + variants/states
 * (no fetching, no SDK import) and forwards a ref to its DOM root.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkOrderCardV4 = exports.TimeLogRowV4 = exports.TechnicianCardV4 = exports.SignaturePadV4 = exports.ServiceChecklistV4 = exports.SafetyChecklistV4 = exports.PunchListItemV4 = exports.MaterialsRowV4 = exports.JobSiteCardV4 = exports.InspectionRowV4 = exports.EquipmentRowV4 = exports.DispatchBarV4 = exports.formatPct = exports.formatDuration = exports.formatMoney = exports.SafetyChecklist = exports.DispatchBar = exports.MaterialsRow = exports.SignaturePad = exports.TimeLogRow = exports.ServiceChecklist = exports.TechnicianCardV3 = exports.TechnicianCardV2 = exports.TechnicianCard = exports.EquipmentRow = exports.PunchListItem = exports.InspectionRowV3 = exports.InspectionRowV2 = exports.InspectionRow = exports.JobSiteCardV3 = exports.JobSiteCardV2 = exports.JobSiteCard = exports.WorkOrderCardV3 = exports.WorkOrderCardV2 = exports.WorkOrderCard = void 0;
var WorkOrderCard_1 = require("./WorkOrderCard");
Object.defineProperty(exports, "WorkOrderCard", { enumerable: true, get: function () { return WorkOrderCard_1.WorkOrderCard; } });
var WorkOrderCardV2_1 = require("./WorkOrderCardV2");
Object.defineProperty(exports, "WorkOrderCardV2", { enumerable: true, get: function () { return WorkOrderCardV2_1.WorkOrderCardV2; } });
var WorkOrderCardV3_1 = require("./WorkOrderCardV3");
Object.defineProperty(exports, "WorkOrderCardV3", { enumerable: true, get: function () { return WorkOrderCardV3_1.WorkOrderCardV3; } });
var JobSiteCard_1 = require("./JobSiteCard");
Object.defineProperty(exports, "JobSiteCard", { enumerable: true, get: function () { return JobSiteCard_1.JobSiteCard; } });
var JobSiteCardV2_1 = require("./JobSiteCardV2");
Object.defineProperty(exports, "JobSiteCardV2", { enumerable: true, get: function () { return JobSiteCardV2_1.JobSiteCardV2; } });
var JobSiteCardV3_1 = require("./JobSiteCardV3");
Object.defineProperty(exports, "JobSiteCardV3", { enumerable: true, get: function () { return JobSiteCardV3_1.JobSiteCardV3; } });
var InspectionRow_1 = require("./InspectionRow");
Object.defineProperty(exports, "InspectionRow", { enumerable: true, get: function () { return InspectionRow_1.InspectionRow; } });
var InspectionRowV2_1 = require("./InspectionRowV2");
Object.defineProperty(exports, "InspectionRowV2", { enumerable: true, get: function () { return InspectionRowV2_1.InspectionRowV2; } });
var InspectionRowV3_1 = require("./InspectionRowV3");
Object.defineProperty(exports, "InspectionRowV3", { enumerable: true, get: function () { return InspectionRowV3_1.InspectionRowV3; } });
var PunchListItem_1 = require("./PunchListItem");
Object.defineProperty(exports, "PunchListItem", { enumerable: true, get: function () { return PunchListItem_1.PunchListItem; } });
var EquipmentRow_1 = require("./EquipmentRow");
Object.defineProperty(exports, "EquipmentRow", { enumerable: true, get: function () { return EquipmentRow_1.EquipmentRow; } });
var TechnicianCard_1 = require("./TechnicianCard");
Object.defineProperty(exports, "TechnicianCard", { enumerable: true, get: function () { return TechnicianCard_1.TechnicianCard; } });
var TechnicianCardV2_1 = require("./TechnicianCardV2");
Object.defineProperty(exports, "TechnicianCardV2", { enumerable: true, get: function () { return TechnicianCardV2_1.TechnicianCardV2; } });
var TechnicianCardV3_1 = require("./TechnicianCardV3");
Object.defineProperty(exports, "TechnicianCardV3", { enumerable: true, get: function () { return TechnicianCardV3_1.TechnicianCardV3; } });
var ServiceChecklist_1 = require("./ServiceChecklist");
Object.defineProperty(exports, "ServiceChecklist", { enumerable: true, get: function () { return ServiceChecklist_1.ServiceChecklist; } });
var TimeLogRow_1 = require("./TimeLogRow");
Object.defineProperty(exports, "TimeLogRow", { enumerable: true, get: function () { return TimeLogRow_1.TimeLogRow; } });
var SignaturePad_1 = require("./SignaturePad");
Object.defineProperty(exports, "SignaturePad", { enumerable: true, get: function () { return SignaturePad_1.SignaturePad; } });
var MaterialsRow_1 = require("./MaterialsRow");
Object.defineProperty(exports, "MaterialsRow", { enumerable: true, get: function () { return MaterialsRow_1.MaterialsRow; } });
var DispatchBar_1 = require("./DispatchBar");
Object.defineProperty(exports, "DispatchBar", { enumerable: true, get: function () { return DispatchBar_1.DispatchBar; } });
var SafetyChecklist_1 = require("./SafetyChecklist");
Object.defineProperty(exports, "SafetyChecklist", { enumerable: true, get: function () { return SafetyChecklist_1.SafetyChecklist; } });
// Shared money/format home (re-exported for ergonomics; mirrors sibling modules).
var format_1 = require("./internal/format");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return format_1.formatMoney; } });
Object.defineProperty(exports, "formatDuration", { enumerable: true, get: function () { return format_1.formatDuration; } });
Object.defineProperty(exports, "formatPct", { enumerable: true, get: function () { return format_1.formatPct; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `EVENTS-FIELDSERVICE-V4-BRIEF.md`.
// Each is a drop-in for its base — same props plus optional additions.
var DispatchBarV4_1 = require("./DispatchBarV4");
Object.defineProperty(exports, "DispatchBarV4", { enumerable: true, get: function () { return DispatchBarV4_1.DispatchBarV4; } });
var EquipmentRowV4_1 = require("./EquipmentRowV4");
Object.defineProperty(exports, "EquipmentRowV4", { enumerable: true, get: function () { return EquipmentRowV4_1.EquipmentRowV4; } });
var InspectionRowV4_1 = require("./InspectionRowV4");
Object.defineProperty(exports, "InspectionRowV4", { enumerable: true, get: function () { return InspectionRowV4_1.InspectionRowV4; } });
var JobSiteCardV4_1 = require("./JobSiteCardV4");
Object.defineProperty(exports, "JobSiteCardV4", { enumerable: true, get: function () { return JobSiteCardV4_1.JobSiteCardV4; } });
var MaterialsRowV4_1 = require("./MaterialsRowV4");
Object.defineProperty(exports, "MaterialsRowV4", { enumerable: true, get: function () { return MaterialsRowV4_1.MaterialsRowV4; } });
var PunchListItemV4_1 = require("./PunchListItemV4");
Object.defineProperty(exports, "PunchListItemV4", { enumerable: true, get: function () { return PunchListItemV4_1.PunchListItemV4; } });
var SafetyChecklistV4_1 = require("./SafetyChecklistV4");
Object.defineProperty(exports, "SafetyChecklistV4", { enumerable: true, get: function () { return SafetyChecklistV4_1.SafetyChecklistV4; } });
var ServiceChecklistV4_1 = require("./ServiceChecklistV4");
Object.defineProperty(exports, "ServiceChecklistV4", { enumerable: true, get: function () { return ServiceChecklistV4_1.ServiceChecklistV4; } });
var SignaturePadV4_1 = require("./SignaturePadV4");
Object.defineProperty(exports, "SignaturePadV4", { enumerable: true, get: function () { return SignaturePadV4_1.SignaturePadV4; } });
var TechnicianCardV4_1 = require("./TechnicianCardV4");
Object.defineProperty(exports, "TechnicianCardV4", { enumerable: true, get: function () { return TechnicianCardV4_1.TechnicianCardV4; } });
var TimeLogRowV4_1 = require("./TimeLogRowV4");
Object.defineProperty(exports, "TimeLogRowV4", { enumerable: true, get: function () { return TimeLogRowV4_1.TimeLogRowV4; } });
var WorkOrderCardV4_1 = require("./WorkOrderCardV4");
Object.defineProperty(exports, "WorkOrderCardV4", { enumerable: true, get: function () { return WorkOrderCardV4_1.WorkOrderCardV4; } });
//# sourceMappingURL=index.js.map