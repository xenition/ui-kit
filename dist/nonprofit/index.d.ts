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
export { formatMoney, goalPct } from './internal';
export type { MoneyFormatter } from './internal';
//# sourceMappingURL=index.d.ts.map