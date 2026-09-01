/**
 * `@xenition/ui/native/support` — presentational React Native components for
 * helpdesk / customer-support apps (ticket queues, agent inboxes, live chat,
 * SLA dashboards, knowledge base). Mobile-first, native-only.
 *
 * Nothing here fetches or owns business logic — the app passes shaped data and
 * receives native callbacks (`onPress`/`onReply`/`onEscalate`/`onRate`/…).
 * Everything is styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()`; there are no literal colors — a seed change (dark mode
 * included) restyles the whole module. SLA / priority / status are always
 * conveyed by text + glyph, not color alone. Built on the `native/primitives`
 * (Card, Button, Icon, Avatar, Rating, StatusDot, Statistic).
 */

export { TicketRow } from './TicketRow';
export type { TicketRowProps, Ticket, TicketStatus } from './TicketRow';

export { SLABadge } from './SLABadge';
export type { SLABadgeProps, SLAState, SLABadgeSize } from './SLABadge';

export { CannedResponse } from './CannedResponse';
export type { CannedResponseProps, CannedResponseData } from './CannedResponse';

export { AgentStatus } from './AgentStatus';
export type { AgentStatusProps, AgentPresence } from './AgentStatus';

export { SatisfactionRating } from './SatisfactionRating';
export type {
  SatisfactionRatingProps,
  SatisfactionVariant,
  SatisfactionSize,
} from './SatisfactionRating';

export { TicketPriority } from './TicketPriority';
export type {
  TicketPriorityProps,
  Priority,
  TicketPriorityVariant,
  TicketPrioritySize,
} from './TicketPriority';

export { ConversationPanel } from './ConversationPanel';
export type {
  ConversationPanelProps,
  ConversationMessage,
  MessageAuthor,
} from './ConversationPanel';

export { MacroList } from './MacroList';
export type { MacroListProps, Macro } from './MacroList';

export { EscalationBanner } from './EscalationBanner';
export type { EscalationBannerProps, EscalationLevel } from './EscalationBanner';

export { QueueStat } from './QueueStat';
export type { QueueStatProps, QueueStatTone } from './QueueStat';

export { ResolutionTimer } from './ResolutionTimer';
export type { ResolutionTimerProps } from './ResolutionTimer';

export { KBArticleRow } from './KBArticleRow';
export type { KBArticleRowProps, KBArticle, KBStatus } from './KBArticleRow';

/* ------------------------------------------------------------------ *
 * Alternate designs (drop-in). Each Vn component shares the base
 * component's public Props (`<Name>VnProps = <Name>Props`); swap the
 * import to restyle a screen with no call-site changes.
 * ------------------------------------------------------------------ */

export { TicketRowV2 } from './TicketRowV2';
export type { TicketRowV2Props } from './TicketRowV2';
export { TicketRowV3 } from './TicketRowV3';
export type { TicketRowV3Props } from './TicketRowV3';

export { ConversationPanelV2 } from './ConversationPanelV2';
export type { ConversationPanelV2Props } from './ConversationPanelV2';
export { ConversationPanelV3 } from './ConversationPanelV3';
export type { ConversationPanelV3Props } from './ConversationPanelV3';

export { AgentStatusV2 } from './AgentStatusV2';
export type { AgentStatusV2Props } from './AgentStatusV2';
export { AgentStatusV3 } from './AgentStatusV3';
export type { AgentStatusV3Props } from './AgentStatusV3';

export { SatisfactionRatingV2 } from './SatisfactionRatingV2';
export type { SatisfactionRatingV2Props } from './SatisfactionRatingV2';
export { SatisfactionRatingV3 } from './SatisfactionRatingV3';
export type { SatisfactionRatingV3Props } from './SatisfactionRatingV3';

/*
 * ── V4 "console" (calm workspace) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated rounded cards, a
 * left status-accent bar, soft-tint status pills (glyph + color, never color
 * alone), one primary accent, and a brand gradient reserved for the peak moments
 * (open-ticket header, agent stats, CSAT results). Base/V2/V3 untouched; V4 is
 * additive. Token-driven, dark-mode safe, web + native.
 */
export { TicketRowV4 } from './TicketRowV4';
export type { TicketRowV4Props } from './TicketRowV4';
export { AgentStatusV4 } from './AgentStatusV4';
export type { AgentStatusV4Props } from './AgentStatusV4';
export { ConversationPanelV4 } from './ConversationPanelV4';
export type { ConversationPanelV4Props } from './ConversationPanelV4';
export { SatisfactionRatingV4 } from './SatisfactionRatingV4';
export type { SatisfactionRatingV4Props } from './SatisfactionRatingV4';
export { TicketPriorityV4 } from './TicketPriorityV4';
export type { TicketPriorityV4Props } from './TicketPriorityV4';
export { SLABadgeV4 } from './SLABadgeV4';
export type { SLABadgeV4Props } from './SLABadgeV4';
export { ResolutionTimerV4 } from './ResolutionTimerV4';
export type { ResolutionTimerV4Props } from './ResolutionTimerV4';
export { CannedResponseV4 } from './CannedResponseV4';
export type { CannedResponseV4Props } from './CannedResponseV4';
export { MacroListV4 } from './MacroListV4';
export type { MacroListV4Props } from './MacroListV4';
export { KBArticleRowV4 } from './KBArticleRowV4';
export type { KBArticleRowV4Props } from './KBArticleRowV4';
export { EscalationBannerV4 } from './EscalationBannerV4';
export type { EscalationBannerV4Props } from './EscalationBannerV4';
export { QueueStatV4 } from './QueueStatV4';
export type { QueueStatV4Props } from './QueueStatV4';

/* ── New components (V4 console line) ── */
export { TicketDetailHeader } from './TicketDetailHeader';
export type { TicketDetailHeaderProps } from './TicketDetailHeader';
export { AgentPerformanceCard } from './AgentPerformanceCard';
export type { AgentPerformanceCardProps, AgentStat } from './AgentPerformanceCard';
export { CSATResultCard } from './CSATResultCard';
export type { CSATResultCardProps } from './CSATResultCard';
export { QueueOverview } from './QueueOverview';
export type { QueueOverviewProps, QueueOverviewTone, QueueStatItem } from './QueueOverview';
export { MessageBubble } from './MessageBubble';
export type { MessageBubbleProps, MessageBubbleSide, MessageBubbleStatus } from './MessageBubble';
export { ReplyBox } from './ReplyBox';
export type { ReplyBoxProps, CannedReply } from './ReplyBox';
