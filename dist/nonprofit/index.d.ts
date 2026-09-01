/**
 * `@xenition/ui/nonprofit` — presentational **React DOM** components for
 * nonprofit / charity / fundraising surfaces (browse causes → donate → track a
 * campaign → recognize donors → thank them). The web parity of
 * `@xenition/ui/native/nonprofit`: identical component + prop names/types, with
 * `onPress` → `onClick` and React Native primitives swapped for DOM. Every
 * component is data + callbacks + variants only: no fetching, no SDK import, no
 * external deps. Money is carried as integer **cents** and formatted through the
 * single `formatMoney` home. All colors resolve from the `--xen-*` Tailwind
 * token classes — no literal colors. Built on the shared `../primitives` (Card,
 * Button, Badge, Icon, Avatar).
 */
export { DonationCard } from './DonationCard';
export type { DonationCardProps, DonationCardVariant } from './DonationCard';
export { DonationCardV2 } from './DonationCardV2';
export type { DonationCardV2Props } from './DonationCardV2';
export { DonationCardV3 } from './DonationCardV3';
export type { DonationCardV3Props } from './DonationCardV3';
export { CampaignProgress } from './CampaignProgress';
export type { CampaignProgressProps, CampaignProgressVariant, CampaignProgressTone } from './CampaignProgress';
export { CampaignProgressV2 } from './CampaignProgressV2';
export type { CampaignProgressV2Props } from './CampaignProgressV2';
export { CampaignProgressV3 } from './CampaignProgressV3';
export type { CampaignProgressV3Props } from './CampaignProgressV3';
export { CauseCard } from './CauseCard';
export type { CauseCardProps, CauseCardVariant } from './CauseCard';
export { CauseCardV2 } from './CauseCardV2';
export type { CauseCardV2Props } from './CauseCardV2';
export { CauseCardV3 } from './CauseCardV3';
export type { CauseCardV3Props } from './CauseCardV3';
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
export { FundraiserCardV2 } from './FundraiserCardV2';
export type { FundraiserCardV2Props } from './FundraiserCardV2';
export { FundraiserCardV3 } from './FundraiserCardV3';
export type { FundraiserCardV3Props } from './FundraiserCardV3';
export { RecurringGiftRow } from './RecurringGiftRow';
export type { RecurringGiftRowProps, GiftFrequency, RecurringGiftStatus } from './RecurringGiftRow';
export { EventTicketRow } from './EventTicketRow';
export type { EventTicketRowProps } from './EventTicketRow';
export { MatchingGiftBanner } from './MatchingGiftBanner';
export type { MatchingGiftBannerProps, MatchingGiftVariant } from './MatchingGiftBanner';
export { ThankYouCard } from './ThankYouCard';
export type { ThankYouCardProps, ThankYouCardVariant } from './ThankYouCard';
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
export { formatMoney, goalPct } from './internal';
export type { MoneyFormatter } from './internal';
//# sourceMappingURL=index.d.ts.map