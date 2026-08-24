/**
 * `@xenition/ui/government` — presentational government / civic / public-services
 * blocks for React DOM. Composed from the web primitives (`Card`, `Button`,
 * `Icon`, `Badge`, `Avatar`, `Steps`) and `EmptyState` / `formatMoney` from
 * commerce, styled exclusively from the `--xen-*` token classes — no literal
 * colors. Money is always carried as integer **cents** and funnelled through the
 * single `formatMoney` home, so printed values never drift. Permit / form /
 * appointment / benefit / complaint status is conveyed by **text + glyph +
 * color** (approved/issued → success, denied → danger) — never color alone.
 * Every component takes data + callbacks + variants/states (no fetching, no SDK
 * import). Web parity of `@xenition/ui/native/government`.
 */

export { ServiceCard } from './ServiceCard';
export type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';

export { PermitStatus } from './PermitStatus';
export type { PermitStatusProps, PermitStatusValue } from './PermitStatus';

export { CivicAppointment } from './CivicAppointment';
export type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';

export { FormStatusRow } from './FormStatusRow';
export type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';

export { DocumentRequest } from './DocumentRequest';
export type {
  DocumentRequestProps,
  DocumentType,
  DocumentRequestStatus,
} from './DocumentRequest';

export { PublicNoticeCard } from './PublicNoticeCard';
export type { PublicNoticeCardProps, NoticeCategory } from './PublicNoticeCard';

export { RepresentativeCard } from './RepresentativeCard';
export type { RepresentativeCardProps, Party } from './RepresentativeCard';

export { VotingInfoCard } from './VotingInfoCard';
export type { VotingInfoCardProps, RegistrationStatus } from './VotingInfoCard';

export { TaxSummaryCard } from './TaxSummaryCard';
export type { TaxSummaryCardProps, TaxStatus } from './TaxSummaryCard';

export { BenefitCard } from './BenefitCard';
export type { BenefitCardProps, BenefitType, BenefitStatus } from './BenefitCard';

export { ComplaintRow } from './ComplaintRow';
export type {
  ComplaintRowProps,
  ComplaintStatus,
  ComplaintPriority,
} from './ComplaintRow';

export { CivicAlert } from './CivicAlert';
export type { CivicAlertProps, AlertSeverity } from './CivicAlert';

// Shared domain descriptors + the single money/format home (re-exported for
// ergonomics; mirrors the native module and the insurance module).
export { PERMIT_STATUS, FORM_STATUS, PERMIT_STAGES } from './internal/status';
export type { StatusDescriptor } from './internal/status';
export { formatMoney } from './internal/format';
export type { MoneyFormatter } from './internal/format';
