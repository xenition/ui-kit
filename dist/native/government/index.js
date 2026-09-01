"use strict";
/**
 * `@xenition/ui/native/government` — presentational government / civic /
 * public-services blocks for React Native. Composed from the native primitives
 * (`Card`, `Button`, `Icon`, `Badge`, `Avatar`, `Steps`) and styled exclusively
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors
 * (colors trace to `SemanticColors` slots or `ramps`-derived `withAlpha`
 * tints). Money is always carried as integer **cents** and funnelled through the
 * single `formatMoney` home, so printed values never drift. Permit / form /
 * appointment / benefit / complaint status is conveyed by **text + glyph +
 * color** (approved/issued → success, denied → danger) — never color alone.
 * Every component takes data + callbacks + variants/states (no fetching, no SDK
 * import).
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VotingInfoCardV4 = exports.TaxSummaryCardV4 = exports.ServiceCardV4 = exports.RepresentativeCardV4 = exports.PublicNoticeCardV4 = exports.PermitStatusV4 = exports.FormStatusRowV4 = exports.DocumentRequestV4 = exports.ComplaintRowV4 = exports.CivicAppointmentV4 = exports.CivicAlertV4 = exports.BenefitCardV4 = exports.formatMoney = exports.PERMIT_STAGES = exports.FORM_STATUS = exports.PERMIT_STATUS = exports.RepresentativeCardV3 = exports.RepresentativeCardV2 = exports.CivicAppointmentV3 = exports.CivicAppointmentV2 = exports.PermitStatusV3 = exports.PermitStatusV2 = exports.ServiceCardV3 = exports.ServiceCardV2 = exports.CivicAlert = exports.ComplaintRow = exports.BenefitCard = exports.TaxSummaryCard = exports.VotingInfoCard = exports.RepresentativeCard = exports.PublicNoticeCard = exports.DocumentRequest = exports.FormStatusRow = exports.CivicAppointment = exports.PermitStatus = exports.ServiceCard = void 0;
var ServiceCard_1 = require("./ServiceCard");
Object.defineProperty(exports, "ServiceCard", { enumerable: true, get: function () { return ServiceCard_1.ServiceCard; } });
var PermitStatus_1 = require("./PermitStatus");
Object.defineProperty(exports, "PermitStatus", { enumerable: true, get: function () { return PermitStatus_1.PermitStatus; } });
var CivicAppointment_1 = require("./CivicAppointment");
Object.defineProperty(exports, "CivicAppointment", { enumerable: true, get: function () { return CivicAppointment_1.CivicAppointment; } });
var FormStatusRow_1 = require("./FormStatusRow");
Object.defineProperty(exports, "FormStatusRow", { enumerable: true, get: function () { return FormStatusRow_1.FormStatusRow; } });
var DocumentRequest_1 = require("./DocumentRequest");
Object.defineProperty(exports, "DocumentRequest", { enumerable: true, get: function () { return DocumentRequest_1.DocumentRequest; } });
var PublicNoticeCard_1 = require("./PublicNoticeCard");
Object.defineProperty(exports, "PublicNoticeCard", { enumerable: true, get: function () { return PublicNoticeCard_1.PublicNoticeCard; } });
var RepresentativeCard_1 = require("./RepresentativeCard");
Object.defineProperty(exports, "RepresentativeCard", { enumerable: true, get: function () { return RepresentativeCard_1.RepresentativeCard; } });
var VotingInfoCard_1 = require("./VotingInfoCard");
Object.defineProperty(exports, "VotingInfoCard", { enumerable: true, get: function () { return VotingInfoCard_1.VotingInfoCard; } });
var TaxSummaryCard_1 = require("./TaxSummaryCard");
Object.defineProperty(exports, "TaxSummaryCard", { enumerable: true, get: function () { return TaxSummaryCard_1.TaxSummaryCard; } });
var BenefitCard_1 = require("./BenefitCard");
Object.defineProperty(exports, "BenefitCard", { enumerable: true, get: function () { return BenefitCard_1.BenefitCard; } });
var ComplaintRow_1 = require("./ComplaintRow");
Object.defineProperty(exports, "ComplaintRow", { enumerable: true, get: function () { return ComplaintRow_1.ComplaintRow; } });
var CivicAlert_1 = require("./CivicAlert");
Object.defineProperty(exports, "CivicAlert", { enumerable: true, get: function () { return CivicAlert_1.CivicAlert; } });
// Alternate designs (V2 / V3) — drop-in replacements sharing each base
// component's `Props` (`<Name>V2Props = <Name>Props`), distinct layouts.
var ServiceCardV2_1 = require("./ServiceCardV2");
Object.defineProperty(exports, "ServiceCardV2", { enumerable: true, get: function () { return ServiceCardV2_1.ServiceCardV2; } });
var ServiceCardV3_1 = require("./ServiceCardV3");
Object.defineProperty(exports, "ServiceCardV3", { enumerable: true, get: function () { return ServiceCardV3_1.ServiceCardV3; } });
var PermitStatusV2_1 = require("./PermitStatusV2");
Object.defineProperty(exports, "PermitStatusV2", { enumerable: true, get: function () { return PermitStatusV2_1.PermitStatusV2; } });
var PermitStatusV3_1 = require("./PermitStatusV3");
Object.defineProperty(exports, "PermitStatusV3", { enumerable: true, get: function () { return PermitStatusV3_1.PermitStatusV3; } });
var CivicAppointmentV2_1 = require("./CivicAppointmentV2");
Object.defineProperty(exports, "CivicAppointmentV2", { enumerable: true, get: function () { return CivicAppointmentV2_1.CivicAppointmentV2; } });
var CivicAppointmentV3_1 = require("./CivicAppointmentV3");
Object.defineProperty(exports, "CivicAppointmentV3", { enumerable: true, get: function () { return CivicAppointmentV3_1.CivicAppointmentV3; } });
var RepresentativeCardV2_1 = require("./RepresentativeCardV2");
Object.defineProperty(exports, "RepresentativeCardV2", { enumerable: true, get: function () { return RepresentativeCardV2_1.RepresentativeCardV2; } });
var RepresentativeCardV3_1 = require("./RepresentativeCardV3");
Object.defineProperty(exports, "RepresentativeCardV3", { enumerable: true, get: function () { return RepresentativeCardV3_1.RepresentativeCardV3; } });
// Shared domain descriptors + the single money/format home (re-exported for
// ergonomics; mirrors the insurance module).
var status_1 = require("./internal/status");
Object.defineProperty(exports, "PERMIT_STATUS", { enumerable: true, get: function () { return status_1.PERMIT_STATUS; } });
Object.defineProperty(exports, "FORM_STATUS", { enumerable: true, get: function () { return status_1.FORM_STATUS; } });
Object.defineProperty(exports, "PERMIT_STAGES", { enumerable: true, get: function () { return status_1.PERMIT_STAGES; } });
var format_1 = require("./internal/format");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return format_1.formatMoney; } });
// The V4 line — each a drop-in for its base (`<Name>V4Props extends
// <Name>Props`), every added prop optional and defaulting to today's
// behaviour. Shared civic vocabulary lives in `internal/civic-v4`.
var BenefitCardV4_1 = require("./BenefitCardV4");
Object.defineProperty(exports, "BenefitCardV4", { enumerable: true, get: function () { return BenefitCardV4_1.BenefitCardV4; } });
var CivicAlertV4_1 = require("./CivicAlertV4");
Object.defineProperty(exports, "CivicAlertV4", { enumerable: true, get: function () { return CivicAlertV4_1.CivicAlertV4; } });
var CivicAppointmentV4_1 = require("./CivicAppointmentV4");
Object.defineProperty(exports, "CivicAppointmentV4", { enumerable: true, get: function () { return CivicAppointmentV4_1.CivicAppointmentV4; } });
var ComplaintRowV4_1 = require("./ComplaintRowV4");
Object.defineProperty(exports, "ComplaintRowV4", { enumerable: true, get: function () { return ComplaintRowV4_1.ComplaintRowV4; } });
var DocumentRequestV4_1 = require("./DocumentRequestV4");
Object.defineProperty(exports, "DocumentRequestV4", { enumerable: true, get: function () { return DocumentRequestV4_1.DocumentRequestV4; } });
var FormStatusRowV4_1 = require("./FormStatusRowV4");
Object.defineProperty(exports, "FormStatusRowV4", { enumerable: true, get: function () { return FormStatusRowV4_1.FormStatusRowV4; } });
var PermitStatusV4_1 = require("./PermitStatusV4");
Object.defineProperty(exports, "PermitStatusV4", { enumerable: true, get: function () { return PermitStatusV4_1.PermitStatusV4; } });
var PublicNoticeCardV4_1 = require("./PublicNoticeCardV4");
Object.defineProperty(exports, "PublicNoticeCardV4", { enumerable: true, get: function () { return PublicNoticeCardV4_1.PublicNoticeCardV4; } });
var RepresentativeCardV4_1 = require("./RepresentativeCardV4");
Object.defineProperty(exports, "RepresentativeCardV4", { enumerable: true, get: function () { return RepresentativeCardV4_1.RepresentativeCardV4; } });
var ServiceCardV4_1 = require("./ServiceCardV4");
Object.defineProperty(exports, "ServiceCardV4", { enumerable: true, get: function () { return ServiceCardV4_1.ServiceCardV4; } });
var TaxSummaryCardV4_1 = require("./TaxSummaryCardV4");
Object.defineProperty(exports, "TaxSummaryCardV4", { enumerable: true, get: function () { return TaxSummaryCardV4_1.TaxSummaryCardV4; } });
var VotingInfoCardV4_1 = require("./VotingInfoCardV4");
Object.defineProperty(exports, "VotingInfoCardV4", { enumerable: true, get: function () { return VotingInfoCardV4_1.VotingInfoCardV4; } });
//# sourceMappingURL=index.js.map