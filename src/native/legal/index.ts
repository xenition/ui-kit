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

export { CaseCard } from './CaseCard';
export type { CaseCardProps, CaseCardVariant } from './CaseCard';

export { DocumentRow } from './DocumentRow';
export type { DocumentRowProps, DocumentRowVariant } from './DocumentRow';

export { ContractClause } from './ContractClause';
export type { ContractClauseProps, ContractClauseVariant } from './ContractClause';

export { LegalAppointment } from './LegalAppointment';
export type { LegalAppointmentProps, LegalAppointmentVariant } from './LegalAppointment';

export { BillableTimeRow } from './BillableTimeRow';
export type { BillableTimeRowProps, BillableTimeRowVariant } from './BillableTimeRow';

export { MatterStatus } from './MatterStatus';
export type { MatterStatusProps, MatterStatusVariant } from './MatterStatus';

export { ClientIntakeRow } from './ClientIntakeRow';
export type { ClientIntakeRowProps, ClientIntakeRowVariant } from './ClientIntakeRow';

export { CourtDateCard } from './CourtDateCard';
export type { CourtDateCardProps, CourtDateCardVariant } from './CourtDateCard';

export { RetainerBalance } from './RetainerBalance';
export type { RetainerBalanceProps, RetainerBalanceVariant } from './RetainerBalance';

export { DisclaimerBanner } from './DisclaimerBanner';
export type { DisclaimerBannerProps, DisclaimerBannerVariant } from './DisclaimerBanner';

export { EvidenceRow } from './EvidenceRow';
export type { EvidenceRowProps, EvidenceRowVariant } from './EvidenceRow';

export { SignatureRequest } from './SignatureRequest';
export type { SignatureRequestProps, SignatureRequestVariant } from './SignatureRequest';

// ── shared status vocabulary + reusable pill ──────────────────────────────
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export {
  formatMoney,
  formatHours,
  billableCents,
  clampPct,
  toneColor,
  toneSlot,
  onToneSlot,
  CASE_STATUS_META,
  CASE_PRIORITY_META,
  PRACTICE_AREA_META,
  MATTER_STAGE_META,
  MATTER_STAGE_ORDER,
  DOCUMENT_STATUS_META,
  DOCUMENT_KIND_META,
  CLAUSE_STATUS_META,
  CLAUSE_RISK_META,
  APPOINTMENT_TYPE_META,
  APPOINTMENT_STATUS_META,
  BILLABLE_STATUS_META,
  INTAKE_STATUS_META,
  CONFLICT_CHECK_META,
  COURT_EVENT_META,
  COURT_URGENCY_META,
  RETAINER_STATUS_META,
  SIGNATURE_STATUS_META,
  EVIDENCE_KIND_META,
  EVIDENCE_STATUS_META,
  DISCLAIMER_META,
} from './internal';
export type {
  LegalTone,
  StatusMeta,
  CaseStatus,
  CasePriority,
  PracticeArea,
  MatterStage,
  DocumentStatus,
  DocumentKind,
  ClauseStatus,
  ClauseRisk,
  AppointmentType,
  AppointmentStatus,
  BillableStatus,
  IntakeStatus,
  ConflictCheck,
  CourtEventType,
  CourtUrgency,
  RetainerStatus,
  SignatureStatus,
  EvidenceKind,
  EvidenceStatus,
  DisclaimerTone,
} from './internal';
