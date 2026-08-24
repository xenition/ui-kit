/**
 * `@xenition/ui/crm` — presentational CRM / sales-pipeline blocks for React DOM.
 * The web parity of `@xenition/ui/native/crm`. Composed from the web primitives
 * (`Card`, `Button`, `Icon`, `Badge`, `Avatar`, `Tag`) and the reusable
 * `BarChart` + commerce `formatMoney`/`EmptyState`, styled exclusively from the
 * `--xen-*` token classes — no literal colors. Money is carried as integer
 * **cents** and funnelled through the shared `formatMoney`. Deal outcome (won →
 * `text-success`, lost → `text-danger`), lead temperature and every status are
 * conveyed by a **glyph + word**, never by color alone. Interactive cards become
 * `role="button"` divs with Enter/Space activation. Every component is data +
 * callbacks + variants/states with empty/loading handling and a11y labels — no
 * fetching, no SDK import.
 */
export { DealCard } from './DealCard';
export type { DealCardProps, DealCardVariant, DealOwner } from './DealCard';
export { DealCardV2 } from './DealCardV2';
export type { DealCardV2Props } from './DealCardV2';
export { DealCardV3 } from './DealCardV3';
export type { DealCardV3Props } from './DealCardV3';
export { PipelineBoard } from './PipelineBoard';
export type { PipelineBoardProps, PipelineStage, PipelineDeal, MoveDirection } from './PipelineBoard';
export { PipelineBoardV2 } from './PipelineBoardV2';
export type { PipelineBoardV2Props } from './PipelineBoardV2';
export { PipelineBoardV3 } from './PipelineBoardV3';
export type { PipelineBoardV3Props } from './PipelineBoardV3';
export { ContactCard } from './ContactCard';
export type { ContactCardProps, ContactCardVariant, ContactAction } from './ContactCard';
export { ContactCardV2 } from './ContactCardV2';
export type { ContactCardV2Props } from './ContactCardV2';
export { ContactCardV3 } from './ContactCardV3';
export type { ContactCardV3Props } from './ContactCardV3';
export { LeadRow } from './LeadRow';
export type { LeadRowProps } from './LeadRow';
export { LeadRowV2 } from './LeadRowV2';
export type { LeadRowV2Props } from './LeadRowV2';
export { LeadRowV3 } from './LeadRowV3';
export type { LeadRowV3Props } from './LeadRowV3';
export { ActivityLogRow } from './ActivityLogRow';
export type { ActivityLogRowProps } from './ActivityLogRow';
export { QuoteCard } from './QuoteCard';
export type { QuoteCardProps } from './QuoteCard';
export { DealForecast } from './DealForecast';
export type { DealForecastProps, ForecastPeriod } from './DealForecast';
export { ContactTimeline } from './ContactTimeline';
export type { ContactTimelineProps, TimelineItem } from './ContactTimeline';
export { EmailThreadRow } from './EmailThreadRow';
export type { EmailThreadRowProps } from './EmailThreadRow';
export { TagFilterBar } from './TagFilterBar';
export type { TagFilterBarProps, FilterTag } from './TagFilterBar';
export { WinLossBadge } from './WinLossBadge';
export type { WinLossBadgeProps, WinLossSize, WinLossVariant } from './WinLossBadge';
export { NextStepRow } from './NextStepRow';
export type { NextStepRowProps, NextStepPriority } from './NextStepRow';
export type { CrmTone, StatusMeta, DealOutcome, LeadTemperature, ActivityKind, QuoteStatus } from './internal';
export { OUTCOME_META, TEMPERATURE_META, ACTIVITY_META, QUOTE_META, toneTextClass, toneBadgeTone, toneFillClass, clampPct, } from './internal';
//# sourceMappingURL=index.d.ts.map