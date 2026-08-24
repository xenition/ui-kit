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
export { ServiceCard } from './ServiceCard';
export type { ServiceCardProps, ServiceCategory, ServiceChannel } from './ServiceCard';
export { PermitStatus } from './PermitStatus';
export type { PermitStatusProps, PermitStatusValue } from './PermitStatus';
export { CivicAppointment } from './CivicAppointment';
export type { CivicAppointmentProps, AppointmentStatus } from './CivicAppointment';
export { FormStatusRow } from './FormStatusRow';
export type { FormStatusRowProps, FormStatusValue } from './FormStatusRow';
export { DocumentRequest } from './DocumentRequest';
export type { DocumentRequestProps, DocumentType, DocumentRequestStatus, } from './DocumentRequest';
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
export type { ComplaintRowProps, ComplaintStatus, ComplaintPriority, } from './ComplaintRow';
export { CivicAlert } from './CivicAlert';
export type { CivicAlertProps, AlertSeverity } from './CivicAlert';
export { ServiceCardV2 } from './ServiceCardV2';
export type { ServiceCardV2Props } from './ServiceCardV2';
export { ServiceCardV3 } from './ServiceCardV3';
export type { ServiceCardV3Props } from './ServiceCardV3';
export { PermitStatusV2 } from './PermitStatusV2';
export type { PermitStatusV2Props } from './PermitStatusV2';
export { PermitStatusV3 } from './PermitStatusV3';
export type { PermitStatusV3Props } from './PermitStatusV3';
export { CivicAppointmentV2 } from './CivicAppointmentV2';
export type { CivicAppointmentV2Props } from './CivicAppointmentV2';
export { CivicAppointmentV3 } from './CivicAppointmentV3';
export type { CivicAppointmentV3Props } from './CivicAppointmentV3';
export { RepresentativeCardV2 } from './RepresentativeCardV2';
export type { RepresentativeCardV2Props } from './RepresentativeCardV2';
export { RepresentativeCardV3 } from './RepresentativeCardV3';
export type { RepresentativeCardV3Props } from './RepresentativeCardV3';
export { PERMIT_STATUS, FORM_STATUS, PERMIT_STAGES } from './internal/status';
export type { StatusDescriptor } from './internal/status';
export { formatMoney } from './internal/format';
export type { MoneyFormatter } from './internal/format';
//# sourceMappingURL=index.d.ts.map