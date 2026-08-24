/**
 * `@xenition/ui/insurance` — presentational insurance / policy / claims blocks
 * for React DOM. Composed from the web primitives (`Card`, `Button`, `Icon`,
 * `Badge`, `Avatar`, `Progress`, `Steps`, `Field`, `Select`, `Input`) and
 * `EmptyState` / `formatMoney` from commerce, styled exclusively from the
 * `--xen-*` token classes — no literal colors. Money is always carried as
 * integer **cents** and funnelled through the single `formatMoney` home, so
 * printed values never drift. Claim/policy status is conveyed by **text +
 * glyph + color** (approved → success, denied → danger) — never color alone.
 * Every component takes data + callbacks + variants/states (no fetching, no SDK
 * import). Web parity of `@xenition/ui/native/insurance`.
 */
export { PolicyCard } from './PolicyCard';
export type { PolicyCardProps, PolicyVariant, PolicyStatus, PremiumCadence, } from './PolicyCard';
export { ClaimRow } from './ClaimRow';
export type { ClaimRowProps, ClaimStatus } from './ClaimRow';
export { CoverageItem } from './CoverageItem';
export type { CoverageItemProps } from './CoverageItem';
export { PremiumSummary } from './PremiumSummary';
export type { PremiumSummaryProps, PremiumLineItem } from './PremiumSummary';
export { QuoteForm } from './QuoteForm';
export type { QuoteFormProps, QuoteValues } from './QuoteForm';
export { DeductibleBar } from './DeductibleBar';
export type { DeductibleBarProps } from './DeductibleBar';
export { BeneficiaryRow } from './BeneficiaryRow';
export type { BeneficiaryRowProps, BeneficiaryKind } from './BeneficiaryRow';
export { ClaimStatusTracker } from './ClaimStatusTracker';
export type { ClaimStatusTrackerProps } from './ClaimStatusTracker';
export { PolicyDocumentRow } from './PolicyDocumentRow';
export type { PolicyDocumentRowProps, DocumentKind } from './PolicyDocumentRow';
export { RiskScore } from './RiskScore';
export type { RiskScoreProps, RiskTier } from './RiskScore';
export { RenewalBanner } from './RenewalBanner';
export type { RenewalBannerProps, RenewalUrgency } from './RenewalBanner';
export { AgentContactCard } from './AgentContactCard';
export type { AgentContactCardProps } from './AgentContactCard';
export { CLAIM_STATUS, POLICY_VARIANT } from './internal/status';
export type { StatusDescriptor } from './internal/status';
export { formatMoney } from './internal/format';
export type { MoneyFormatter } from './internal/format';
//# sourceMappingURL=index.d.ts.map