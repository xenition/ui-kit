/**
 * `@xenition/ui/native/crm` — presentational CRM / sales-pipeline blocks for
 * React Native. Composed from the native primitives (`Card`, `Button`, `Icon`,
 * `Badge`, `Avatar`, `Tag`) and the reusable `BarChart`, styled exclusively
 * from the compiled theme tokens via `useXenitionTheme()` — no literal colors.
 * Money is carried as integer **cents** and funnelled through the shared
 * `formatMoney`. Deal outcome (won → `success`, lost → `danger`), lead
 * temperature and every status are conveyed by a **glyph + word**, never by
 * color alone. Every component is data + callbacks + variants/states with
 * empty/loading handling and a11y labels — no fetching, no SDK import.
 */

export { DealCard } from './DealCard';
export type { DealCardProps, DealCardVariant, DealOwner } from './DealCard';

export { PipelineBoard } from './PipelineBoard';
export type {
  PipelineBoardProps,
  PipelineStage,
  PipelineDeal,
  MoveDirection,
} from './PipelineBoard';

export { ContactCard } from './ContactCard';
export type { ContactCardProps, ContactCardVariant, ContactAction } from './ContactCard';

export { LeadRow } from './LeadRow';
export type { LeadRowProps } from './LeadRow';

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

// --- Alternate designs (drop-in: each V2/V3 accepts the same props as its base) ---
export { DealCardV2 } from './DealCardV2';
export type { DealCardV2Props } from './DealCardV2';
export { DealCardV3 } from './DealCardV3';
export type { DealCardV3Props } from './DealCardV3';

export { ContactCardV2 } from './ContactCardV2';
export type { ContactCardV2Props } from './ContactCardV2';
export { ContactCardV3 } from './ContactCardV3';
export type { ContactCardV3Props } from './ContactCardV3';

export { PipelineBoardV2 } from './PipelineBoardV2';
export type { PipelineBoardV2Props } from './PipelineBoardV2';
export { PipelineBoardV3 } from './PipelineBoardV3';
export type { PipelineBoardV3Props } from './PipelineBoardV3';

export { LeadRowV2 } from './LeadRowV2';
export type { LeadRowV2Props } from './LeadRowV2';
export { LeadRowV3 } from './LeadRowV3';
export type { LeadRowV3Props } from './LeadRowV3';

// Shared CRM vocabulary (status glyph/label/tone maps + helpers).
export type {
  CrmTone,
  StatusMeta,
  DealOutcome,
  LeadTemperature,
  ActivityKind,
  QuoteStatus,
} from './internal';
export {
  OUTCOME_META,
  TEMPERATURE_META,
  ACTIVITY_META,
  QUOTE_META,
  toneColor,
  clampPct,
} from './internal';

// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `CONTENT-CRM-V4-BRIEF.md`. Each
// is a drop-in for its base — same props plus optional additions.
export { ActivityLogRowV4 } from './ActivityLogRowV4';
export type { ActivityLogRowV4Props } from './ActivityLogRowV4';
export { ContactCardV4 } from './ContactCardV4';
export type { ContactCardV4Props } from './ContactCardV4';
export { ContactTimelineV4 } from './ContactTimelineV4';
export type { ContactTimelineV4Props } from './ContactTimelineV4';
export { DealCardV4 } from './DealCardV4';
export type { DealCardV4Props } from './DealCardV4';
export { DealForecastV4 } from './DealForecastV4';
export type { DealForecastV4Props } from './DealForecastV4';
export { EmailThreadRowV4 } from './EmailThreadRowV4';
export type { EmailThreadRowV4Props } from './EmailThreadRowV4';
export { LeadRowV4 } from './LeadRowV4';
export type { LeadRowV4Props } from './LeadRowV4';
export { NextStepRowV4 } from './NextStepRowV4';
export type { NextStepRowV4Props } from './NextStepRowV4';
export { PipelineBoardV4 } from './PipelineBoardV4';
export type { PipelineBoardV4Props } from './PipelineBoardV4';
export { QuoteCardV4 } from './QuoteCardV4';
export type { QuoteCardV4Props } from './QuoteCardV4';
export { TagFilterBarV4 } from './TagFilterBarV4';
export type { TagFilterBarV4Props } from './TagFilterBarV4';
export { WinLossBadgeV4 } from './WinLossBadgeV4';
export type { WinLossBadgeV4Props } from './WinLossBadgeV4';
