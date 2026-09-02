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
exports.DOCUMENT_KIND_META = exports.DOCUMENT_STATUS_META = exports.MATTER_STAGE_ORDER = exports.MATTER_STAGE_META = exports.PRACTICE_AREA_META = exports.CASE_PRIORITY_META = exports.CASE_STATUS_META = exports.activateOnKey = exports.toneSoftBgClass = exports.toneBgClass = exports.toneTextClass = exports.clampPct = exports.billableCents = exports.formatHours = exports.formatMoney = exports.EmptyState = exports.DisclaimerBannerV4 = exports.SignatureRequestV4 = exports.RetainerBalanceV4 = exports.CourtDateCardV4 = exports.LegalAppointmentV4 = exports.ClientIntakeRowV4 = exports.ContractClauseV4 = exports.BillableTimeRowV4 = exports.EvidenceRowV4 = exports.DocumentRowV4 = exports.MatterStatusV4 = exports.CaseCardV4 = exports.StatusPillV4 = exports.StatusPill = exports.SignatureRequest = exports.EvidenceRow = exports.DisclaimerBanner = exports.RetainerBalanceV3 = exports.RetainerBalanceV2 = exports.RetainerBalance = exports.CourtDateCard = exports.ClientIntakeRow = exports.MatterStatus = exports.BillableTimeRow = exports.LegalAppointmentV3 = exports.LegalAppointmentV2 = exports.LegalAppointment = exports.ContractClause = exports.DocumentRowV3 = exports.DocumentRowV2 = exports.DocumentRow = exports.CaseCardV3 = exports.CaseCardV2 = exports.CaseCard = void 0;
exports.DISCLAIMER_META = exports.EVIDENCE_STATUS_META = exports.EVIDENCE_KIND_META = exports.SIGNATURE_STATUS_META = exports.RETAINER_STATUS_META = exports.COURT_URGENCY_META = exports.COURT_EVENT_META = exports.CONFLICT_CHECK_META = exports.INTAKE_STATUS_META = exports.BILLABLE_STATUS_META = exports.APPOINTMENT_STATUS_META = exports.APPOINTMENT_TYPE_META = exports.CLAUSE_RISK_META = exports.CLAUSE_STATUS_META = void 0;
var CaseCard_1 = require("./CaseCard");
Object.defineProperty(exports, "CaseCard", { enumerable: true, get: function () { return CaseCard_1.CaseCard; } });
var CaseCardV2_1 = require("./CaseCardV2");
Object.defineProperty(exports, "CaseCardV2", { enumerable: true, get: function () { return CaseCardV2_1.CaseCardV2; } });
var CaseCardV3_1 = require("./CaseCardV3");
Object.defineProperty(exports, "CaseCardV3", { enumerable: true, get: function () { return CaseCardV3_1.CaseCardV3; } });
var DocumentRow_1 = require("./DocumentRow");
Object.defineProperty(exports, "DocumentRow", { enumerable: true, get: function () { return DocumentRow_1.DocumentRow; } });
var DocumentRowV2_1 = require("./DocumentRowV2");
Object.defineProperty(exports, "DocumentRowV2", { enumerable: true, get: function () { return DocumentRowV2_1.DocumentRowV2; } });
var DocumentRowV3_1 = require("./DocumentRowV3");
Object.defineProperty(exports, "DocumentRowV3", { enumerable: true, get: function () { return DocumentRowV3_1.DocumentRowV3; } });
var ContractClause_1 = require("./ContractClause");
Object.defineProperty(exports, "ContractClause", { enumerable: true, get: function () { return ContractClause_1.ContractClause; } });
var LegalAppointment_1 = require("./LegalAppointment");
Object.defineProperty(exports, "LegalAppointment", { enumerable: true, get: function () { return LegalAppointment_1.LegalAppointment; } });
var LegalAppointmentV2_1 = require("./LegalAppointmentV2");
Object.defineProperty(exports, "LegalAppointmentV2", { enumerable: true, get: function () { return LegalAppointmentV2_1.LegalAppointmentV2; } });
var LegalAppointmentV3_1 = require("./LegalAppointmentV3");
Object.defineProperty(exports, "LegalAppointmentV3", { enumerable: true, get: function () { return LegalAppointmentV3_1.LegalAppointmentV3; } });
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
var RetainerBalanceV2_1 = require("./RetainerBalanceV2");
Object.defineProperty(exports, "RetainerBalanceV2", { enumerable: true, get: function () { return RetainerBalanceV2_1.RetainerBalanceV2; } });
var RetainerBalanceV3_1 = require("./RetainerBalanceV3");
Object.defineProperty(exports, "RetainerBalanceV3", { enumerable: true, get: function () { return RetainerBalanceV3_1.RetainerBalanceV3; } });
var DisclaimerBanner_1 = require("./DisclaimerBanner");
Object.defineProperty(exports, "DisclaimerBanner", { enumerable: true, get: function () { return DisclaimerBanner_1.DisclaimerBanner; } });
var EvidenceRow_1 = require("./EvidenceRow");
Object.defineProperty(exports, "EvidenceRow", { enumerable: true, get: function () { return EvidenceRow_1.EvidenceRow; } });
var SignatureRequest_1 = require("./SignatureRequest");
Object.defineProperty(exports, "SignatureRequest", { enumerable: true, get: function () { return SignatureRequest_1.SignatureRequest; } });
// ── shared status vocabulary + reusable pill ──────────────────────────────
var StatusPill_1 = require("./StatusPill");
Object.defineProperty(exports, "StatusPill", { enumerable: true, get: function () { return StatusPill_1.StatusPill; } });
/*
 * ── V4 "chambers" (distinguished law-office) design line ──
 * A drop-in V4 variant for each of the 13 originals: elevated calm cards, panels
 * and rows with status by glyph + labelled StatusPill + tone (never color alone)
 * and big legible tabular-nums money / figures. Every V4 is a pure drop-in
 * (`XxxV4Props = XxxProps`) that reuses its base `variant` (all status values
 * honored). The brand gradient is reserved for the chambers moment — the
 * `MatterStatus` hero header. Base/V2/V3 untouched; V4 is additive. Token-driven,
 * dark-mode safe, web + native.
 */
var StatusPillV4_1 = require("./StatusPillV4");
Object.defineProperty(exports, "StatusPillV4", { enumerable: true, get: function () { return StatusPillV4_1.StatusPillV4; } });
var CaseCardV4_1 = require("./CaseCardV4");
Object.defineProperty(exports, "CaseCardV4", { enumerable: true, get: function () { return CaseCardV4_1.CaseCardV4; } });
var MatterStatusV4_1 = require("./MatterStatusV4");
Object.defineProperty(exports, "MatterStatusV4", { enumerable: true, get: function () { return MatterStatusV4_1.MatterStatusV4; } });
var DocumentRowV4_1 = require("./DocumentRowV4");
Object.defineProperty(exports, "DocumentRowV4", { enumerable: true, get: function () { return DocumentRowV4_1.DocumentRowV4; } });
var EvidenceRowV4_1 = require("./EvidenceRowV4");
Object.defineProperty(exports, "EvidenceRowV4", { enumerable: true, get: function () { return EvidenceRowV4_1.EvidenceRowV4; } });
var BillableTimeRowV4_1 = require("./BillableTimeRowV4");
Object.defineProperty(exports, "BillableTimeRowV4", { enumerable: true, get: function () { return BillableTimeRowV4_1.BillableTimeRowV4; } });
var ContractClauseV4_1 = require("./ContractClauseV4");
Object.defineProperty(exports, "ContractClauseV4", { enumerable: true, get: function () { return ContractClauseV4_1.ContractClauseV4; } });
var ClientIntakeRowV4_1 = require("./ClientIntakeRowV4");
Object.defineProperty(exports, "ClientIntakeRowV4", { enumerable: true, get: function () { return ClientIntakeRowV4_1.ClientIntakeRowV4; } });
var LegalAppointmentV4_1 = require("./LegalAppointmentV4");
Object.defineProperty(exports, "LegalAppointmentV4", { enumerable: true, get: function () { return LegalAppointmentV4_1.LegalAppointmentV4; } });
var CourtDateCardV4_1 = require("./CourtDateCardV4");
Object.defineProperty(exports, "CourtDateCardV4", { enumerable: true, get: function () { return CourtDateCardV4_1.CourtDateCardV4; } });
var RetainerBalanceV4_1 = require("./RetainerBalanceV4");
Object.defineProperty(exports, "RetainerBalanceV4", { enumerable: true, get: function () { return RetainerBalanceV4_1.RetainerBalanceV4; } });
var SignatureRequestV4_1 = require("./SignatureRequestV4");
Object.defineProperty(exports, "SignatureRequestV4", { enumerable: true, get: function () { return SignatureRequestV4_1.SignatureRequestV4; } });
var DisclaimerBannerV4_1 = require("./DisclaimerBannerV4");
Object.defineProperty(exports, "DisclaimerBannerV4", { enumerable: true, get: function () { return DisclaimerBannerV4_1.DisclaimerBannerV4; } });
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