/**
 * `@xenition/ui/native/nonprofit` — presentational React Native components for
 * nonprofit / charity / fundraising surfaces (browse causes → donate → track a
 * campaign → recognize donors → thank them). Every component is data +
 * callbacks + variants only: no fetching, no SDK import, no external deps. Money
 * is carried as integer **cents** and formatted through the single `formatMoney`
 * home. All colors resolve from the compiled theme tokens via
 * `useXenitionTheme()` (semantic slots + `tokens.ramps.*` + `withAlpha` tints) —
 * no literal colors. Built on the shared `../primitives` (Card, Button, Badge,
 * Icon, Avatar).
 */

export { DonationCard } from './DonationCard';
export type { DonationCardProps, DonationCardVariant } from './DonationCard';

export { CampaignProgress } from './CampaignProgress';
export type { CampaignProgressProps, CampaignProgressVariant, CampaignProgressTone } from './CampaignProgress';

export { CauseCard } from './CauseCard';
export type { CauseCardProps, CauseCardVariant } from './CauseCard';

export { VolunteerShift } from './VolunteerShift';
export type { VolunteerShiftProps } from './VolunteerShift';

export { PledgeRow } from './PledgeRow';
export type { PledgeRowProps, PledgeStatus } from './PledgeRow';

export { DonorRow } from './DonorRow';
export type { DonorRowProps, DonorTier } from './DonorRow';

export { ImpactStat } from './ImpactStat';
export type { ImpactStatProps, ImpactStatVariant, ImpactStatTone } from './ImpactStat';

export { FundraiserCard } from './FundraiserCard';
export type { FundraiserCardProps, FundraiserCardVariant } from './FundraiserCard';

export { RecurringGiftRow } from './RecurringGiftRow';
export type { RecurringGiftRowProps, GiftFrequency, RecurringGiftStatus } from './RecurringGiftRow';

export { EventTicketRow } from './EventTicketRow';
export type { EventTicketRowProps } from './EventTicketRow';

export { MatchingGiftBanner } from './MatchingGiftBanner';
export type { MatchingGiftBannerProps, MatchingGiftVariant } from './MatchingGiftBanner';

export { ThankYouCard } from './ThankYouCard';
export type { ThankYouCardProps, ThankYouCardVariant } from './ThankYouCard';

// Alternate designs (drop-in, identical prop contracts — see `*V2`/`*V3`).
export { DonationCardV2 } from './DonationCardV2';
export type { DonationCardV2Props } from './DonationCardV2';
export { DonationCardV3 } from './DonationCardV3';
export type { DonationCardV3Props } from './DonationCardV3';

export { CampaignProgressV2 } from './CampaignProgressV2';
export type { CampaignProgressV2Props } from './CampaignProgressV2';
export { CampaignProgressV3 } from './CampaignProgressV3';
export type { CampaignProgressV3Props } from './CampaignProgressV3';

export { CauseCardV2 } from './CauseCardV2';
export type { CauseCardV2Props } from './CauseCardV2';
export { CauseCardV3 } from './CauseCardV3';
export type { CauseCardV3Props } from './CauseCardV3';

export { FundraiserCardV2 } from './FundraiserCardV2';
export type { FundraiserCardV2Props } from './FundraiserCardV2';
export { FundraiserCardV3 } from './FundraiserCardV3';
export type { FundraiserCardV3Props } from './FundraiserCardV3';

/*
 * ── V4 "rally" (warm, mission-driven fundraising) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated rounded cards,
 * meters, and rows with soft-primary wells and chips, bold money numerals, and
 * status/tier by glyph + labelled badge. Every V4 keeps its base props (all
 * variant/tone/status values honored). The brand gradient is reserved for the
 * rally moment — the `ThankYouCard` celebration. Base/V2/V3 untouched; V4 is
 * additive. Token-driven, dark-mode safe, web + native.
 */
export { CampaignProgressV4, type CampaignProgressV4Props } from './CampaignProgressV4';
export { CauseCardV4, type CauseCardV4Props } from './CauseCardV4';
export { DonationCardV4, type DonationCardV4Props } from './DonationCardV4';
export { DonorRowV4, type DonorRowV4Props } from './DonorRowV4';
export { EventTicketRowV4, type EventTicketRowV4Props } from './EventTicketRowV4';
export { FundraiserCardV4, type FundraiserCardV4Props } from './FundraiserCardV4';
export { ImpactStatV4, type ImpactStatV4Props } from './ImpactStatV4';
export { MatchingGiftBannerV4, type MatchingGiftBannerV4Props } from './MatchingGiftBannerV4';
export { PledgeRowV4, type PledgeRowV4Props } from './PledgeRowV4';
export { RecurringGiftRowV4, type RecurringGiftRowV4Props } from './RecurringGiftRowV4';
export { ThankYouCardV4, type ThankYouCardV4Props } from './ThankYouCardV4';
export { VolunteerShiftV4, type VolunteerShiftV4Props } from './VolunteerShiftV4';

// Shared money + tint helpers (no external deps).
export { formatMoney, withAlpha, goalPct } from './internal';
export type { MoneyFormatter } from './internal';
