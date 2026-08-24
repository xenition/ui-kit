"use strict";
/**
 * `@xenition/ui/legal` — presentational law-firm / legal-practice blocks for
 * React DOM. Web parity of `@xenition/ui/native/legal`: identical component
 * names and prop contracts (with `onPress` → `onClick`, RN → DOM), composed
 * from the web primitives (`Card`, `Button`, `Avatar`) and the module-local
 * `StatusPill`, styled exclusively from the `--xen-*` theme token utility
 * classes — no literal colors. Money (billable time / retainer) is carried as
 * integer **cents** and funnelled through the shared `formatMoney` for stable
 * 2-decimal output. Every status — case open/closed, matter stage, document
 * draft/signed/filed, clause flagged/agreed, appointment scheduled/cancelled,
 * billing unbilled/billed, intake new/retained, court urgency, retainer health,
 * signature sent/signed, evidence admitted/objected — is conveyed by a
 * **glyph + word**, never by color alone. Every DOM-root component forwards a
 * ref; interactive cards/rows are `role="button"` with keyboard activation, and
 * action affordances are real `<button>`s.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISCLAIMER_META = exports.EVIDENCE_STATUS_META = exports.EVIDENCE_KIND_META = exports.SIGNATURE_STATUS_META = exports.RETAINER_STATUS_META = exports.COURT_URGENCY_META = exports.COURT_EVENT_META = exports.CONFLICT_CHECK_META = exports.INTAKE_STATUS_META = exports.BILLABLE_STATUS_META = exports.APPOINTMENT_STATUS_META = exports.APPOINTMENT_TYPE_META = exports.CLAUSE_RISK_META = exports.CLAUSE_STATUS_META = exports.DOCUMENT_KIND_META = exports.DOCUMENT_STATUS_META = exports.MATTER_STAGE_ORDER = exports.MATTER_STAGE_META = exports.PRACTICE_AREA_META = exports.CASE_PRIORITY_META = exports.CASE_STATUS_META = exports.activateOnKey = exports.toneSoftBgClass = exports.toneBgClass = exports.toneTextClass = exports.clampPct = exports.billableCents = exports.formatHours = exports.formatMoney = exports.EmptyState = exports.StatusPill = exports.SignatureRequest = exports.EvidenceRow = exports.DisclaimerBanner = exports.RetainerBalance = exports.CourtDateCard = exports.ClientIntakeRow = exports.MatterStatus = exports.BillableTimeRow = exports.LegalAppointment = exports.ContractClause = exports.DocumentRow = exports.CaseCard = void 0;
var CaseCard_1 = require("./CaseCard");
Object.defineProperty(exports, "CaseCard", { enumerable: true, get: function () { return CaseCard_1.CaseCard; } });
var DocumentRow_1 = require("./DocumentRow");
Object.defineProperty(exports, "DocumentRow", { enumerable: true, get: function () { return DocumentRow_1.DocumentRow; } });
var ContractClause_1 = require("./ContractClause");
Object.defineProperty(exports, "ContractClause", { enumerable: true, get: function () { return ContractClause_1.ContractClause; } });
var LegalAppointment_1 = require("./LegalAppointment");
Object.defineProperty(exports, "LegalAppointment", { enumerable: true, get: function () { return LegalAppointment_1.LegalAppointment; } });
var BillableTimeRow_1 = require("./BillableTimeRow");
Object.defineProperty(exports, "BillableTimeRow", { enumerable: true, get: function () { return BillableTimeRow_1.BillableTimeRow; } });
var MatterStatus_1 = require("./MatterStatus");
Object.defineProperty(exports, "MatterStatus", { enumerable: true, get: function () { return MatterStatus_1.MatterStatus; } });
var ClientIntakeRow_1 = require("./ClientIntakeRow");
Object.defineProperty(exports, "ClientIntakeRow", { enumerable: true, get: function () { return ClientIntakeRow_1.ClientIntakeRow; } });
var CourtDateCard_1 = require("./CourtDateCard");
Object.defineProperty(exports, "CourtDateCard", { enumerable: true, get: function () { return CourtDateCard_1.CourtDateCard; } });
var RetainerBalance_1 = require("./RetainerBalance");
Object.defineProperty(exports, "RetainerBalance", { enumerable: true, get: function () { return RetainerBalance_1.RetainerBalance; } });
var DisclaimerBanner_1 = require("./DisclaimerBanner");
Object.defineProperty(exports, "DisclaimerBanner", { enumerable: true, get: function () { return DisclaimerBanner_1.DisclaimerBanner; } });
var EvidenceRow_1 = require("./EvidenceRow");
Object.defineProperty(exports, "EvidenceRow", { enumerable: true, get: function () { return EvidenceRow_1.EvidenceRow; } });
var SignatureRequest_1 = require("./SignatureRequest");
Object.defineProperty(exports, "SignatureRequest", { enumerable: true, get: function () { return SignatureRequest_1.SignatureRequest; } });
// ── shared status vocabulary + reusable pill ──────────────────────────────
var StatusPill_1 = require("./StatusPill");
Object.defineProperty(exports, "StatusPill", { enumerable: true, get: function () { return StatusPill_1.StatusPill; } });
// Generic empty / no-results state re-used from commerce (domain-agnostic).
var commerce_1 = require("../commerce");
Object.defineProperty(exports, "EmptyState", { enumerable: true, get: function () { return commerce_1.EmptyState; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "formatHours", { enumerable: true, get: function () { return internal_1.formatHours; } });
Object.defineProperty(exports, "billableCents", { enumerable: true, get: function () { return internal_1.billableCents; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
Object.defineProperty(exports, "toneTextClass", { enumerable: true, get: function () { return internal_1.toneTextClass; } });
Object.defineProperty(exports, "toneBgClass", { enumerable: true, get: function () { return internal_1.toneBgClass; } });
Object.defineProperty(exports, "toneSoftBgClass", { enumerable: true, get: function () { return internal_1.toneSoftBgClass; } });
Object.defineProperty(exports, "activateOnKey", { enumerable: true, get: function () { return internal_1.activateOnKey; } });
Object.defineProperty(exports, "CASE_STATUS_META", { enumerable: true, get: function () { return internal_1.CASE_STATUS_META; } });
Object.defineProperty(exports, "CASE_PRIORITY_META", { enumerable: true, get: function () { return internal_1.CASE_PRIORITY_META; } });
Object.defineProperty(exports, "PRACTICE_AREA_META", { enumerable: true, get: function () { return internal_1.PRACTICE_AREA_META; } });
Object.defineProperty(exports, "MATTER_STAGE_META", { enumerable: true, get: function () { return internal_1.MATTER_STAGE_META; } });
Object.defineProperty(exports, "MATTER_STAGE_ORDER", { enumerable: true, get: function () { return internal_1.MATTER_STAGE_ORDER; } });
Object.defineProperty(exports, "DOCUMENT_STATUS_META", { enumerable: true, get: function () { return internal_1.DOCUMENT_STATUS_META; } });
Object.defineProperty(exports, "DOCUMENT_KIND_META", { enumerable: true, get: function () { return internal_1.DOCUMENT_KIND_META; } });
Object.defineProperty(exports, "CLAUSE_STATUS_META", { enumerable: true, get: function () { return internal_1.CLAUSE_STATUS_META; } });
Object.defineProperty(exports, "CLAUSE_RISK_META", { enumerable: true, get: function () { return internal_1.CLAUSE_RISK_META; } });
Object.defineProperty(exports, "APPOINTMENT_TYPE_META", { enumerable: true, get: function () { return internal_1.APPOINTMENT_TYPE_META; } });
Object.defineProperty(exports, "APPOINTMENT_STATUS_META", { enumerable: true, get: function () { return internal_1.APPOINTMENT_STATUS_META; } });
Object.defineProperty(exports, "BILLABLE_STATUS_META", { enumerable: true, get: function () { return internal_1.BILLABLE_STATUS_META; } });
Object.defineProperty(exports, "INTAKE_STATUS_META", { enumerable: true, get: function () { return internal_1.INTAKE_STATUS_META; } });
Object.defineProperty(exports, "CONFLICT_CHECK_META", { enumerable: true, get: function () { return internal_1.CONFLICT_CHECK_META; } });
Object.defineProperty(exports, "COURT_EVENT_META", { enumerable: true, get: function () { return internal_1.COURT_EVENT_META; } });
Object.defineProperty(exports, "COURT_URGENCY_META", { enumerable: true, get: function () { return internal_1.COURT_URGENCY_META; } });
Object.defineProperty(exports, "RETAINER_STATUS_META", { enumerable: true, get: function () { return internal_1.RETAINER_STATUS_META; } });
Object.defineProperty(exports, "SIGNATURE_STATUS_META", { enumerable: true, get: function () { return internal_1.SIGNATURE_STATUS_META; } });
Object.defineProperty(exports, "EVIDENCE_KIND_META", { enumerable: true, get: function () { return internal_1.EVIDENCE_KIND_META; } });
Object.defineProperty(exports, "EVIDENCE_STATUS_META", { enumerable: true, get: function () { return internal_1.EVIDENCE_STATUS_META; } });
Object.defineProperty(exports, "DISCLAIMER_META", { enumerable: true, get: function () { return internal_1.DISCLAIMER_META; } });
//# sourceMappingURL=index.js.map