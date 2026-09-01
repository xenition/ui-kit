"use strict";
/**
 * `@xenition/ui/native/medical` — composed React Native blocks for clinical,
 * telehealth, and patient-facing screens: appointment and doctor cards,
 * prescription / lab-result / health-record rows, a symptom selector, a
 * telehealth call bar, vitals and medication panels, visit summaries, patient
 * cards, and a triage indicator. Every block is styled exclusively from the
 * compiled theme tokens via `useXenitionTheme()` — colors resolve from
 * `SemanticColors` keys, never literal hex — and abnormal / severity states are
 * signalled by text + glyph, never color alone. Mobile-first, native-only.
 *
 * Informational UI only — these components are NOT a medical device and must
 * not be used for diagnosis or treatment decisions.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.VitalsPanelV4 = exports.VisitSummaryV4 = exports.TriageLevelV4 = exports.TelehealthCallBarV4 = exports.SymptomSelectorV4 = exports.PrescriptionRowV4 = exports.PatientCardV4 = exports.MedicationScheduleV4 = exports.LabResultRowV4 = exports.HealthRecordRowV4 = exports.DoctorCardV4 = exports.AppointmentCardV4 = exports.LabResultRowV3 = exports.LabResultRowV2 = exports.PrescriptionRowV3 = exports.PrescriptionRowV2 = exports.DoctorCardV3 = exports.DoctorCardV2 = exports.AppointmentCardV3 = exports.AppointmentCardV2 = exports.HealthRecordRow = exports.TriageLevel = exports.VisitSummary = exports.DoctorCard = exports.MedicationSchedule = exports.VitalsPanel = exports.TelehealthCallBar = exports.PatientCard = exports.LabResultRow = exports.SymptomSelector = exports.PrescriptionRow = exports.AppointmentCard = void 0;
var AppointmentCard_1 = require("./AppointmentCard");
Object.defineProperty(exports, "AppointmentCard", { enumerable: true, get: function () { return AppointmentCard_1.AppointmentCard; } });
var PrescriptionRow_1 = require("./PrescriptionRow");
Object.defineProperty(exports, "PrescriptionRow", { enumerable: true, get: function () { return PrescriptionRow_1.PrescriptionRow; } });
var SymptomSelector_1 = require("./SymptomSelector");
Object.defineProperty(exports, "SymptomSelector", { enumerable: true, get: function () { return SymptomSelector_1.SymptomSelector; } });
var LabResultRow_1 = require("./LabResultRow");
Object.defineProperty(exports, "LabResultRow", { enumerable: true, get: function () { return LabResultRow_1.LabResultRow; } });
var PatientCard_1 = require("./PatientCard");
Object.defineProperty(exports, "PatientCard", { enumerable: true, get: function () { return PatientCard_1.PatientCard; } });
var TelehealthCallBar_1 = require("./TelehealthCallBar");
Object.defineProperty(exports, "TelehealthCallBar", { enumerable: true, get: function () { return TelehealthCallBar_1.TelehealthCallBar; } });
var VitalsPanel_1 = require("./VitalsPanel");
Object.defineProperty(exports, "VitalsPanel", { enumerable: true, get: function () { return VitalsPanel_1.VitalsPanel; } });
var MedicationSchedule_1 = require("./MedicationSchedule");
Object.defineProperty(exports, "MedicationSchedule", { enumerable: true, get: function () { return MedicationSchedule_1.MedicationSchedule; } });
var DoctorCard_1 = require("./DoctorCard");
Object.defineProperty(exports, "DoctorCard", { enumerable: true, get: function () { return DoctorCard_1.DoctorCard; } });
var VisitSummary_1 = require("./VisitSummary");
Object.defineProperty(exports, "VisitSummary", { enumerable: true, get: function () { return VisitSummary_1.VisitSummary; } });
var TriageLevel_1 = require("./TriageLevel");
Object.defineProperty(exports, "TriageLevel", { enumerable: true, get: function () { return TriageLevel_1.TriageLevel; } });
var HealthRecordRow_1 = require("./HealthRecordRow");
Object.defineProperty(exports, "HealthRecordRow", { enumerable: true, get: function () { return HealthRecordRow_1.HealthRecordRow; } });
// Alternate designs (v2 / v3) — drop-in redesigns sharing each base's exact props.
var AppointmentCardV2_1 = require("./AppointmentCardV2");
Object.defineProperty(exports, "AppointmentCardV2", { enumerable: true, get: function () { return AppointmentCardV2_1.AppointmentCardV2; } });
var AppointmentCardV3_1 = require("./AppointmentCardV3");
Object.defineProperty(exports, "AppointmentCardV3", { enumerable: true, get: function () { return AppointmentCardV3_1.AppointmentCardV3; } });
var DoctorCardV2_1 = require("./DoctorCardV2");
Object.defineProperty(exports, "DoctorCardV2", { enumerable: true, get: function () { return DoctorCardV2_1.DoctorCardV2; } });
var DoctorCardV3_1 = require("./DoctorCardV3");
Object.defineProperty(exports, "DoctorCardV3", { enumerable: true, get: function () { return DoctorCardV3_1.DoctorCardV3; } });
var PrescriptionRowV2_1 = require("./PrescriptionRowV2");
Object.defineProperty(exports, "PrescriptionRowV2", { enumerable: true, get: function () { return PrescriptionRowV2_1.PrescriptionRowV2; } });
var PrescriptionRowV3_1 = require("./PrescriptionRowV3");
Object.defineProperty(exports, "PrescriptionRowV3", { enumerable: true, get: function () { return PrescriptionRowV3_1.PrescriptionRowV3; } });
var LabResultRowV2_1 = require("./LabResultRowV2");
Object.defineProperty(exports, "LabResultRowV2", { enumerable: true, get: function () { return LabResultRowV2_1.LabResultRowV2; } });
var LabResultRowV3_1 = require("./LabResultRowV3");
Object.defineProperty(exports, "LabResultRowV3", { enumerable: true, get: function () { return LabResultRowV3_1.LabResultRowV3; } });
/*
 * ── V4 "clinic" (calm, trustworthy clinical) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated calm cards,
 * panels, and rows with clear status by glyph + labelled badge + tone (never
 * color alone) and big legible tabular-nums vitals. Five card/row V4s add an
 * optional `variant` (`full` | `compact`); every V4 keeps its base props (all
 * status values honored). The brand gradient is reserved for the clinic moment —
 * the `VisitSummary` header hero. Base/V2/V3 untouched; V4 is additive.
 * Token-driven, dark-mode safe, web + native. Informational UI only — not a
 * medical device.
 */
var AppointmentCardV4_1 = require("./AppointmentCardV4");
Object.defineProperty(exports, "AppointmentCardV4", { enumerable: true, get: function () { return AppointmentCardV4_1.AppointmentCardV4; } });
var DoctorCardV4_1 = require("./DoctorCardV4");
Object.defineProperty(exports, "DoctorCardV4", { enumerable: true, get: function () { return DoctorCardV4_1.DoctorCardV4; } });
var HealthRecordRowV4_1 = require("./HealthRecordRowV4");
Object.defineProperty(exports, "HealthRecordRowV4", { enumerable: true, get: function () { return HealthRecordRowV4_1.HealthRecordRowV4; } });
var LabResultRowV4_1 = require("./LabResultRowV4");
Object.defineProperty(exports, "LabResultRowV4", { enumerable: true, get: function () { return LabResultRowV4_1.LabResultRowV4; } });
var MedicationScheduleV4_1 = require("./MedicationScheduleV4");
Object.defineProperty(exports, "MedicationScheduleV4", { enumerable: true, get: function () { return MedicationScheduleV4_1.MedicationScheduleV4; } });
var PatientCardV4_1 = require("./PatientCardV4");
Object.defineProperty(exports, "PatientCardV4", { enumerable: true, get: function () { return PatientCardV4_1.PatientCardV4; } });
var PrescriptionRowV4_1 = require("./PrescriptionRowV4");
Object.defineProperty(exports, "PrescriptionRowV4", { enumerable: true, get: function () { return PrescriptionRowV4_1.PrescriptionRowV4; } });
var SymptomSelectorV4_1 = require("./SymptomSelectorV4");
Object.defineProperty(exports, "SymptomSelectorV4", { enumerable: true, get: function () { return SymptomSelectorV4_1.SymptomSelectorV4; } });
var TelehealthCallBarV4_1 = require("./TelehealthCallBarV4");
Object.defineProperty(exports, "TelehealthCallBarV4", { enumerable: true, get: function () { return TelehealthCallBarV4_1.TelehealthCallBarV4; } });
var TriageLevelV4_1 = require("./TriageLevelV4");
Object.defineProperty(exports, "TriageLevelV4", { enumerable: true, get: function () { return TriageLevelV4_1.TriageLevelV4; } });
var VisitSummaryV4_1 = require("./VisitSummaryV4");
Object.defineProperty(exports, "VisitSummaryV4", { enumerable: true, get: function () { return VisitSummaryV4_1.VisitSummaryV4; } });
var VitalsPanelV4_1 = require("./VitalsPanelV4");
Object.defineProperty(exports, "VitalsPanelV4", { enumerable: true, get: function () { return VitalsPanelV4_1.VitalsPanelV4; } });
//# sourceMappingURL=index.js.map