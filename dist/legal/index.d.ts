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
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export { EmptyState } from '../commerce';
export type { EmptyStateProps } from '../commerce';
export { formatMoney, formatHours, billableCents, clampPct, toneTextClass, toneBgClass, toneSoftBgClass, activateOnKey, CASE_STATUS_META, CASE_PRIORITY_META, PRACTICE_AREA_META, MATTER_STAGE_META, MATTER_STAGE_ORDER, DOCUMENT_STATUS_META, DOCUMENT_KIND_META, CLAUSE_STATUS_META, CLAUSE_RISK_META, APPOINTMENT_TYPE_META, APPOINTMENT_STATUS_META, BILLABLE_STATUS_META, INTAKE_STATUS_META, CONFLICT_CHECK_META, COURT_EVENT_META, COURT_URGENCY_META, RETAINER_STATUS_META, SIGNATURE_STATUS_META, EVIDENCE_KIND_META, EVIDENCE_STATUS_META, DISCLAIMER_META, } from './internal';
export type { LegalTone, StatusMeta, CaseStatus, CasePriority, PracticeArea, MatterStage, DocumentStatus, DocumentKind, ClauseStatus, ClauseRisk, AppointmentType, AppointmentStatus, BillableStatus, IntakeStatus, ConflictCheck, CourtEventType, CourtUrgency, RetainerStatus, SignatureStatus, EvidenceKind, EvidenceStatus, DisclaimerTone, } from './internal';
//# sourceMappingURL=index.d.ts.map