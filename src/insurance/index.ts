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
export type {
  PolicyCardProps,
  PolicyVariant,
  PolicyStatus,
  PremiumCadence,
} from './PolicyCard';
export { PolicyCardV2 } from './PolicyCardV2';
export type { PolicyCardV2Props } from './PolicyCardV2';
export { PolicyCardV3 } from './PolicyCardV3';
export type { PolicyCardV3Props } from './PolicyCardV3';

export { ClaimRow } from './ClaimRow';
export type { ClaimRowProps, ClaimStatus } from './ClaimRow';
export { ClaimRowV2 } from './ClaimRowV2';
export type { ClaimRowV2Props } from './ClaimRowV2';
export { ClaimRowV3 } from './ClaimRowV3';
export type { ClaimRowV3Props } from './ClaimRowV3';

export { CoverageItem } from './CoverageItem';
export type { CoverageItemProps } from './CoverageItem';
export { CoverageItemV2 } from './CoverageItemV2';
export type { CoverageItemV2Props } from './CoverageItemV2';
export { CoverageItemV3 } from './CoverageItemV3';
export type { CoverageItemV3Props } from './CoverageItemV3';

export { PremiumSummary } from './PremiumSummary';
export type { PremiumSummaryProps, PremiumLineItem } from './PremiumSummary';
export { PremiumSummaryV2 } from './PremiumSummaryV2';
export type { PremiumSummaryV2Props } from './PremiumSummaryV2';
export { PremiumSummaryV3 } from './PremiumSummaryV3';
export type { PremiumSummaryV3Props } from './PremiumSummaryV3';

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

// Shared domain descriptors + the single money/format home (re-exported for
// ergonomics; mirrors the native module and the commerce module).
export { CLAIM_STATUS, POLICY_VARIANT } from './internal/status';
export type { StatusDescriptor } from './internal/status';
export { formatMoney } from './internal/format';
export type { MoneyFormatter } from './internal/format';

// ---------------------------------------------------------------------------
// The V4 line. Every one is a sibling of its base — no base, V2 or V3 file was
// touched — and every prop it adds is optional and defaults to today's
// behaviour, so swapping `X` for `XV4` buys the fixes and no surprises.
// ---------------------------------------------------------------------------

export { AgentContactCardV4 } from './AgentContactCardV4';
export type { AgentContactCardV4Props } from './AgentContactCardV4';

export { BeneficiaryRowV4 } from './BeneficiaryRowV4';
export type { BeneficiaryRowV4Props } from './BeneficiaryRowV4';

export { ClaimRowV4 } from './ClaimRowV4';
export type { ClaimRowV4Props } from './ClaimRowV4';

export { ClaimStatusTrackerV4 } from './ClaimStatusTrackerV4';
export type { ClaimStatusTrackerV4Props, ClaimStage } from './ClaimStatusTrackerV4';

export { ClaimTimelineV4 } from './ClaimTimelineV4';
export type {
  ClaimTimelineV4Props,
  ClaimTimelineEntry,
  ClaimTimelineKind,
} from './ClaimTimelineV4';

export { CoverageItemV4 } from './CoverageItemV4';
export type { CoverageItemV4Props } from './CoverageItemV4';

export { DeductibleBarV4 } from './DeductibleBarV4';
export type { DeductibleBarV4Props } from './DeductibleBarV4';

export { InsuranceIdCardV4 } from './InsuranceIdCardV4';
export type { InsuranceIdCardV4Props, InsuranceIdCardV4Labels } from './InsuranceIdCardV4';

export { PolicyCardV4 } from './PolicyCardV4';
export type { PolicyCardV4Props, PolicyCardV4Labels } from './PolicyCardV4';

export { PolicyDocumentRowV4 } from './PolicyDocumentRowV4';
export type { PolicyDocumentRowV4Props } from './PolicyDocumentRowV4';

export { PremiumSummaryV4 } from './PremiumSummaryV4';
export type { PremiumSummaryV4Props } from './PremiumSummaryV4';

export { QuoteFormV4 } from './QuoteFormV4';
export type { QuoteFormV4Props } from './QuoteFormV4';

export { RenewalBannerV4 } from './RenewalBannerV4';
export type { RenewalBannerV4Props } from './RenewalBannerV4';

export { RiskScoreV4 } from './RiskScoreV4';
export type { RiskScoreV4Props } from './RiskScoreV4';

// The module's shared arithmetic, so an app composing these can reconcile a
// premium or read a deductible with the same helpers the components use.
export {
  allocationParts,
  deductibleParts,
  isAdverse,
  premiumParts,
  scoreParts,
} from './coverage-v4';
export type {
  AllocationParts,
  DeductibleParts,
  PremiumParts,
  ScoreParts,
} from './coverage-v4';
