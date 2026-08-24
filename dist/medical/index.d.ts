/**
 * `@xenition/ui/medical` — composed React DOM (web) blocks for clinical,
 * telehealth, and patient-facing screens: appointment and doctor cards,
 * prescription / lab-result / health-record rows, a symptom selector, a
 * telehealth call bar, vitals and medication panels, visit summaries, patient
 * cards, and a triage indicator. The web mirror of `@xenition/ui/native/medical`
 * — same names + props (`onPress` → `onClick`). Every block is styled
 * exclusively from the `--xen-*` theme token classes via the Tailwind preset —
 * no literal colors — and abnormal / severity states are signalled by text +
 * glyph, never color alone.
 *
 * Informational UI only — these components are NOT a medical device and must
 * not be used for diagnosis or treatment decisions.
 */
export { AppointmentCard } from './AppointmentCard';
export type { AppointmentCardProps, AppointmentStatus, AppointmentMode } from './AppointmentCard';
export { AppointmentCardV2 } from './AppointmentCardV2';
export type { AppointmentCardV2Props } from './AppointmentCardV2';
export { AppointmentCardV3 } from './AppointmentCardV3';
export type { AppointmentCardV3Props } from './AppointmentCardV3';
export { PrescriptionRow } from './PrescriptionRow';
export type { PrescriptionRowProps, PrescriptionStatus } from './PrescriptionRow';
export { PrescriptionRowV2 } from './PrescriptionRowV2';
export type { PrescriptionRowV2Props } from './PrescriptionRowV2';
export { PrescriptionRowV3 } from './PrescriptionRowV3';
export type { PrescriptionRowV3Props } from './PrescriptionRowV3';
export { SymptomSelector } from './SymptomSelector';
export type { SymptomSelectorProps, SymptomOption } from './SymptomSelector';
export { LabResultRow } from './LabResultRow';
export type { LabResultRowProps, LabStatus } from './LabResultRow';
export { LabResultRowV2 } from './LabResultRowV2';
export type { LabResultRowV2Props } from './LabResultRowV2';
export { LabResultRowV3 } from './LabResultRowV3';
export type { LabResultRowV3Props } from './LabResultRowV3';
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
export { DoctorCardV2 } from './DoctorCardV2';
export type { DoctorCardV2Props } from './DoctorCardV2';
export { DoctorCardV3 } from './DoctorCardV3';
export type { DoctorCardV3Props } from './DoctorCardV3';
export { VisitSummary } from './VisitSummary';
export type { VisitSummaryProps, VisitSummarySection } from './VisitSummary';
export { TriageLevel } from './TriageLevel';
export type { TriageLevelProps, TriageLevelValue } from './TriageLevel';
export { HealthRecordRow } from './HealthRecordRow';
export type { HealthRecordRowProps, HealthRecordType } from './HealthRecordRow';
//# sourceMappingURL=index.d.ts.map