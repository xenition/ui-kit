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
export { CaseCardV2 } from './CaseCardV2';
export type { CaseCardV2Props } from './CaseCardV2';
export { CaseCardV3 } from './CaseCardV3';
export type { CaseCardV3Props } from './CaseCardV3';
export { DocumentRow } from './DocumentRow';
export type { DocumentRowProps, DocumentRowVariant } from './DocumentRow';
export { DocumentRowV2 } from './DocumentRowV2';
export type { DocumentRowV2Props } from './DocumentRowV2';
export { DocumentRowV3 } from './DocumentRowV3';
export type { DocumentRowV3Props } from './DocumentRowV3';
export { ContractClause } from './ContractClause';
export type { ContractClauseProps, ContractClauseVariant } from './ContractClause';
export { LegalAppointment } from './LegalAppointment';
export type { LegalAppointmentProps, LegalAppointmentVariant } from './LegalAppointment';
export { LegalAppointmentV2 } from './LegalAppointmentV2';
export type { LegalAppointmentV2Props } from './LegalAppointmentV2';
export { LegalAppointmentV3 } from './LegalAppointmentV3';
export type { LegalAppointmentV3Props } from './LegalAppointmentV3';
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
export { RetainerBalanceV2 } from './RetainerBalanceV2';
export type { RetainerBalanceV2Props } from './RetainerBalanceV2';
export { RetainerBalanceV3 } from './RetainerBalanceV3';
export type { RetainerBalanceV3Props } from './RetainerBalanceV3';
export { DisclaimerBanner } from './DisclaimerBanner';
export type { DisclaimerBannerProps, DisclaimerBannerVariant } from './DisclaimerBanner';
export { EvidenceRow } from './EvidenceRow';
export type { EvidenceRowProps, EvidenceRowVariant } from './EvidenceRow';
export { SignatureRequest } from './SignatureRequest';
export type { SignatureRequestProps, SignatureRequestVariant } from './SignatureRequest';
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export { StatusPillV4, type StatusPillV4Props } from './StatusPillV4';
export { CaseCardV4, type CaseCardV4Props } from './CaseCardV4';
export { MatterStatusV4, type MatterStatusV4Props } from './MatterStatusV4';
export { DocumentRowV4, type DocumentRowV4Props } from './DocumentRowV4';
export { EvidenceRowV4, type EvidenceRowV4Props } from './EvidenceRowV4';
export { BillableTimeRowV4, type BillableTimeRowV4Props } from './BillableTimeRowV4';
export { ContractClauseV4, type ContractClauseV4Props } from './ContractClauseV4';
export { ClientIntakeRowV4, type ClientIntakeRowV4Props } from './ClientIntakeRowV4';
export { LegalAppointmentV4, type LegalAppointmentV4Props } from './LegalAppointmentV4';
export { CourtDateCardV4, type CourtDateCardV4Props } from './CourtDateCardV4';
export { RetainerBalanceV4, type RetainerBalanceV4Props } from './RetainerBalanceV4';
export { SignatureRequestV4, type SignatureRequestV4Props } from './SignatureRequestV4';
export { DisclaimerBannerV4, type DisclaimerBannerV4Props } from './DisclaimerBannerV4';
export { EmptyState } from '../commerce';
export type { EmptyStateProps } from '../commerce';
export { formatMoney, formatHours, billableCents, clampPct, toneTextClass, toneBgClass, toneSoftBgClass, activateOnKey, CASE_STATUS_META, CASE_PRIORITY_META, PRACTICE_AREA_META, MATTER_STAGE_META, MATTER_STAGE_ORDER, DOCUMENT_STATUS_META, DOCUMENT_KIND_META, CLAUSE_STATUS_META, CLAUSE_RISK_META, APPOINTMENT_TYPE_META, APPOINTMENT_STATUS_META, BILLABLE_STATUS_META, INTAKE_STATUS_META, CONFLICT_CHECK_META, COURT_EVENT_META, COURT_URGENCY_META, RETAINER_STATUS_META, SIGNATURE_STATUS_META, EVIDENCE_KIND_META, EVIDENCE_STATUS_META, DISCLAIMER_META, } from './internal';
export type { LegalTone, StatusMeta, CaseStatus, CasePriority, PracticeArea, MatterStage, DocumentStatus, DocumentKind, ClauseStatus, ClauseRisk, AppointmentType, AppointmentStatus, BillableStatus, IntakeStatus, ConflictCheck, CourtEventType, CourtUrgency, RetainerStatus, SignatureStatus, EvidenceKind, EvidenceStatus, DisclaimerTone, } from './internal';
//# sourceMappingURL=index.d.ts.map