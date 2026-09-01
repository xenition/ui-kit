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

export { AppointmentCard } from './AppointmentCard';
export type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';

export { PrescriptionRow } from './PrescriptionRow';
export type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';

export { SymptomSelector } from './SymptomSelector';
export type { SymptomSelectorProps, SymptomOption } from './SymptomSelector';

export { LabResultRow } from './LabResultRow';
export type { LabResultRowProps, LabStatus } from './LabResultRow';

export { PatientCard } from './PatientCard';
export type { PatientCardProps, PatientStatus } from './PatientCard';

export { TelehealthCallBar } from './TelehealthCallBar';
export type { TelehealthCallBarProps, CallState } from './TelehealthCallBar';

export { VitalsPanel } from './VitalsPanel';
export type { VitalsPanelProps, VitalReading, VitalStatus } from './VitalsPanel';

export { MedicationSchedule } from './MedicationSchedule';
export type { MedicationScheduleProps, MedicationDose } from './MedicationSchedule';

export { DoctorCard } from './DoctorCard';
export type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

export { VisitSummary } from './VisitSummary';
export type { VisitSummaryProps, VisitSummarySection } from './VisitSummary';

export { TriageLevel } from './TriageLevel';
export type { TriageLevelProps, TriageLevelValue } from './TriageLevel';

export { HealthRecordRow } from './HealthRecordRow';
export type { HealthRecordRowProps, HealthRecordType } from './HealthRecordRow';

// Alternate designs (v2 / v3) — drop-in redesigns sharing each base's exact props.
export { AppointmentCardV2 } from './AppointmentCardV2';
export type { AppointmentCardV2Props } from './AppointmentCardV2';
export { AppointmentCardV3 } from './AppointmentCardV3';
export type { AppointmentCardV3Props } from './AppointmentCardV3';

export { DoctorCardV2 } from './DoctorCardV2';
export type { DoctorCardV2Props } from './DoctorCardV2';
export { DoctorCardV3 } from './DoctorCardV3';
export type { DoctorCardV3Props } from './DoctorCardV3';

export { PrescriptionRowV2 } from './PrescriptionRowV2';
export type { PrescriptionRowV2Props } from './PrescriptionRowV2';
export { PrescriptionRowV3 } from './PrescriptionRowV3';
export type { PrescriptionRowV3Props } from './PrescriptionRowV3';

export { LabResultRowV2 } from './LabResultRowV2';
export type { LabResultRowV2Props } from './LabResultRowV2';
export { LabResultRowV3 } from './LabResultRowV3';
export type { LabResultRowV3Props } from './LabResultRowV3';

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
export { AppointmentCardV4, type AppointmentCardV4Props } from './AppointmentCardV4';
export { DoctorCardV4, type DoctorCardV4Props } from './DoctorCardV4';
export { HealthRecordRowV4, type HealthRecordRowV4Props } from './HealthRecordRowV4';
export { LabResultRowV4, type LabResultRowV4Props } from './LabResultRowV4';
export { MedicationScheduleV4, type MedicationScheduleV4Props } from './MedicationScheduleV4';
export { PatientCardV4, type PatientCardV4Props } from './PatientCardV4';
export { PrescriptionRowV4, type PrescriptionRowV4Props } from './PrescriptionRowV4';
export { SymptomSelectorV4, type SymptomSelectorV4Props } from './SymptomSelectorV4';
export { TelehealthCallBarV4, type TelehealthCallBarV4Props } from './TelehealthCallBarV4';
export { TriageLevelV4, type TriageLevelV4Props } from './TriageLevelV4';
export { VisitSummaryV4, type VisitSummaryV4Props } from './VisitSummaryV4';
export { VitalsPanelV4, type VitalsPanelV4Props } from './VitalsPanelV4';
