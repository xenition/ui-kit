"use strict";
/**
 * `@xenition/ui/native/legal` — presentational law-firm / legal-practice blocks
 * for React Native. Composed from the native primitives (`Card`, `Button`,
 * `Avatar`, `EmptyState`) and the module-local `StatusPill`, styled exclusively
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 * Money (billable time / retainer) is carried as integer **cents** and funnelled
 * through the shared `formatMoney` for stable 2-decimal output. Every status —
 * case open/closed, matter stage, document draft/signed/filed, clause
 * flagged/agreed, appointment scheduled/cancelled, billing unbilled/billed,
 * intake new/retained, court urgency, retainer health, signature sent/signed,
 * evidence admitted/objected — is conveyed by a **glyph + word**, never by color
 * alone. Each component is data + callbacks + variants/states with empty/loading
 * handling and a11y labels; no fetching, no SDK import.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DISCLAIMER_META = exports.EVIDENCE_STATUS_META = exports.EVIDENCE_KIND_META = exports.SIGNATURE_STATUS_META = exports.RETAINER_STATUS_META = exports.COURT_URGENCY_META = exports.COURT_EVENT_META = exports.CONFLICT_CHECK_META = exports.INTAKE_STATUS_META = exports.BILLABLE_STATUS_META = exports.APPOINTMENT_STATUS_META = exports.APPOINTMENT_TYPE_META = exports.CLAUSE_RISK_META = exports.CLAUSE_STATUS_META = exports.DOCUMENT_KIND_META = exports.DOCUMENT_STATUS_META = exports.MATTER_STAGE_ORDER = exports.MATTER_STAGE_META = exports.PRACTICE_AREA_META = exports.CASE_PRIORITY_META = exports.CASE_STATUS_META = exports.onToneSlot = exports.toneSlot = exports.toneColor = exports.clampPct = exports.billableCents = exports.formatHours = exports.formatMoney = exports.StatusPill = exports.RetainerBalanceV3 = exports.RetainerBalanceV2 = exports.LegalAppointmentV3 = exports.LegalAppointmentV2 = exports.DocumentRowV3 = exports.DocumentRowV2 = exports.CaseCardV3 = exports.CaseCardV2 = exports.SignatureRequest = exports.EvidenceRow = exports.DisclaimerBanner = exports.RetainerBalance = exports.CourtDateCard = exports.ClientIntakeRow = exports.MatterStatus = exports.BillableTimeRow = exports.LegalAppointment = exports.ContractClause = exports.DocumentRow = exports.CaseCard = void 0;
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
// ── alternate designs (v2 / v3) — drop-in, identical Props ─────────────────
var CaseCardVariants_1 = require("./CaseCardVariants");
Object.defineProperty(exports, "CaseCardV2", { enumerable: true, get: function () { return CaseCardVariants_1.CaseCardV2; } });
Object.defineProperty(exports, "CaseCardV3", { enumerable: true, get: function () { return CaseCardVariants_1.CaseCardV3; } });
var DocumentRowVariants_1 = require("./DocumentRowVariants");
Object.defineProperty(exports, "DocumentRowV2", { enumerable: true, get: function () { return DocumentRowVariants_1.DocumentRowV2; } });
Object.defineProperty(exports, "DocumentRowV3", { enumerable: true, get: function () { return DocumentRowVariants_1.DocumentRowV3; } });
var LegalAppointmentVariants_1 = require("./LegalAppointmentVariants");
Object.defineProperty(exports, "LegalAppointmentV2", { enumerable: true, get: function () { return LegalAppointmentVariants_1.LegalAppointmentV2; } });
Object.defineProperty(exports, "LegalAppointmentV3", { enumerable: true, get: function () { return LegalAppointmentVariants_1.LegalAppointmentV3; } });
var RetainerBalanceVariants_1 = require("./RetainerBalanceVariants");
Object.defineProperty(exports, "RetainerBalanceV2", { enumerable: true, get: function () { return RetainerBalanceVariants_1.RetainerBalanceV2; } });
Object.defineProperty(exports, "RetainerBalanceV3", { enumerable: true, get: function () { return RetainerBalanceVariants_1.RetainerBalanceV3; } });
// ── shared status vocabulary + reusable pill ──────────────────────────────
var StatusPill_1 = require("./StatusPill");
Object.defineProperty(exports, "StatusPill", { enumerable: true, get: function () { return StatusPill_1.StatusPill; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "formatHours", { enumerable: true, get: function () { return internal_1.formatHours; } });
Object.defineProperty(exports, "billableCents", { enumerable: true, get: function () { return internal_1.billableCents; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
Object.defineProperty(exports, "toneColor", { enumerable: true, get: function () { return internal_1.toneColor; } });
Object.defineProperty(exports, "toneSlot", { enumerable: true, get: function () { return internal_1.toneSlot; } });
Object.defineProperty(exports, "onToneSlot", { enumerable: true, get: function () { return internal_1.onToneSlot; } });
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