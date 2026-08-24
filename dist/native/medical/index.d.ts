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
//# sourceMappingURL=index.d.ts.map