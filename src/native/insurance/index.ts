/**
 * `@xenition/ui/native/insurance` — presentational insurance / policy / claims
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Icon`, `Badge`, `Avatar`, `Progress`, `Steps`, `Field`, `Select`,
 * `Input`) and styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors (colors trace to `SemanticColors`
 * slots or `ramps`-derived `withAlpha` tints). Money is always carried as
 * integer **cents** and funnelled through the single `formatMoney` home, so
 * printed values never drift. Claim/policy status is conveyed by **text +
 * glyph + color** (approved → success, denied → danger) — never color alone.
 * Every component takes data + callbacks + variants/states (no fetching, no SDK
 * import).
 */

export { PolicyCard } from './PolicyCard';
export type {
  PolicyCardProps,
  PolicyVariant,
  PolicyStatus,
  PremiumCadence,
} from './PolicyCard';

export { ClaimRow } from './ClaimRow';
export type { ClaimRowProps, ClaimStatus } from './ClaimRow';

export { CoverageItem } from './CoverageItem';
export type { CoverageItemProps } from './CoverageItem';

export { PremiumSummary } from './PremiumSummary';
export type { PremiumSummaryProps, PremiumLineItem } from './PremiumSummary';

// Alternate drop-in designs (V2 / V3) — same props as the base component, a
// visually distinct treatment. Import in place of the base where a different
// look is wanted; the data contract (integer cents, glyph+text+color status,
// token purity) is identical.
export { PolicyCardV2 } from './PolicyCardV2';
export type { PolicyCardV2Props } from './PolicyCardV2';
export { PolicyCardV3 } from './PolicyCardV3';
export type { PolicyCardV3Props } from './PolicyCardV3';

export { ClaimRowV2 } from './ClaimRowV2';
export type { ClaimRowV2Props } from './ClaimRowV2';
export { ClaimRowV3 } from './ClaimRowV3';
export type { ClaimRowV3Props } from './ClaimRowV3';

export { CoverageItemV2 } from './CoverageItemV2';
export type { CoverageItemV2Props } from './CoverageItemV2';
export { CoverageItemV3 } from './CoverageItemV3';
export type { CoverageItemV3Props } from './CoverageItemV3';

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
// ergonomics; mirrors the finance module).
export { CLAIM_STATUS, POLICY_VARIANT } from './internal/status';
export type { StatusDescriptor } from './internal/status';
export { formatMoney } from './internal/format';
export type { MoneyFormatter } from './internal/format';
