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
export { ServiceCardV2 } from './ServiceCardV2';
export type { ServiceCardV2Props } from './ServiceCardV2';
export { ServiceCardV3 } from './ServiceCardV3';
export type { ServiceCardV3Props } from './ServiceCardV3';
export { PermitStatus } from './PermitStatus';
export type { PermitStatusProps, PermitStatusValue } from './PermitStatus';
export { PermitStatusV2 } from './PermitStatusV2';
export type { PermitStatusV2Props } from './PermitStatusV2';
export { PermitStatusV3 } from './PermitStatusV3';
export type { PermitStatusV3Props } from './PermitStatusV3';
export { CivicAppointment } from './CivicAppointment';
export type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';
export { CivicAppointmentV2 } from './CivicAppointmentV2';
export type { CivicAppointmentV2Props } from './CivicAppointmentV2';
export { CivicAppointmentV3 } from './CivicAppointmentV3';
export type { CivicAppointmentV3Props } from './CivicAppointmentV3';
export { FormStatusRow } from './FormStatusRow';
export type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';
export { DocumentRequest } from './DocumentRequest';
export type { DocumentRequestProps, DocumentType, DocumentRequestStatus, } from './DocumentRequest';
export { PublicNoticeCard } from './PublicNoticeCard';
export type { PublicNoticeCardProps, NoticeCategory } from './PublicNoticeCard';
export { RepresentativeCard } from './RepresentativeCard';
export type { RepresentativeCardProps, Party } from './RepresentativeCard';
export { RepresentativeCardV2 } from './RepresentativeCardV2';
export type { RepresentativeCardV2Props } from './RepresentativeCardV2';
export { RepresentativeCardV3 } from './RepresentativeCardV3';
export type { RepresentativeCardV3Props } from './RepresentativeCardV3';
export { VotingInfoCard } from './VotingInfoCard';
export type { VotingInfoCardProps, RegistrationStatus } from './VotingInfoCard';
export { TaxSummaryCard } from './TaxSummaryCard';
export type { TaxSummaryCardProps, TaxStatus } from './TaxSummaryCard';
export { BenefitCard } from './BenefitCard';
export type { BenefitCardProps, BenefitType, BenefitStatus } from './BenefitCard';
export { ComplaintRow } from './ComplaintRow';
export type { ComplaintRowProps, ComplaintStatus, ComplaintPriority, } from './ComplaintRow';
export { CivicAlert } from './CivicAlert';
export type { CivicAlertProps, AlertSeverity } from './CivicAlert';
export { PERMIT_STATUS, FORM_STATUS, PERMIT_STAGES } from './internal/status';
export type { StatusDescriptor } from './internal/status';
export { formatMoney } from './internal/format';
export type { MoneyFormatter } from './internal/format';
export { BenefitCardV4 } from './BenefitCardV4';
export type { BenefitCardV4Props } from './BenefitCardV4';
export { CivicAlertV4 } from './CivicAlertV4';
export type { CivicAlertV4Props } from './CivicAlertV4';
export { CivicAppointmentV4 } from './CivicAppointmentV4';
export type { CivicAppointmentV4Props } from './CivicAppointmentV4';
export { ComplaintRowV4 } from './ComplaintRowV4';
export type { ComplaintRowV4Props } from './ComplaintRowV4';
export { DocumentRequestV4 } from './DocumentRequestV4';
export type { DocumentRequestV4Props } from './DocumentRequestV4';
export { FormStatusRowV4 } from './FormStatusRowV4';
export type { FormStatusRowV4Props } from './FormStatusRowV4';
export { PermitStatusV4 } from './PermitStatusV4';
export type { PermitStatusV4Props } from './PermitStatusV4';
export { PublicNoticeCardV4 } from './PublicNoticeCardV4';
export type { PublicNoticeCardV4Props } from './PublicNoticeCardV4';
export { RepresentativeCardV4 } from './RepresentativeCardV4';
export type { OfficeTenure, RepresentativeCardV4Props } from './RepresentativeCardV4';
export { ServiceCardV4 } from './ServiceCardV4';
export type { ServiceCardV4Props } from './ServiceCardV4';
export { TaxSummaryCardV4 } from './TaxSummaryCardV4';
export type { TaxSummaryCardV4Props } from './TaxSummaryCardV4';
export { VotingInfoCardV4 } from './VotingInfoCardV4';
export type { VotingInfoCardV4Props } from './VotingInfoCardV4';
//# sourceMappingURL=index.d.ts.map