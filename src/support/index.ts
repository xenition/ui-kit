/**
 * `@xenition/ui/support` — presentational React DOM components for helpdesk /
 * customer-support apps (ticket queues, agent inboxes, live chat, SLA
 * dashboards, knowledge base). Web parity of `@xenition/ui/native/support`.
 *
 * Nothing here fetches or owns business logic — the app passes shaped data and
 * receives DOM callbacks (`onClick`/`onReply`/`onEscalate`/`onRate`/…).
 * Everything is styled exclusively via the `--xen-*` token utility classes
 * (Tailwind preset); there are no literal colors — a seed change (dark mode
 * included) restyles the whole module. SLA / priority / status are always
 * conveyed by text + glyph, not color alone. Interactive rows are
 * `role="button"`/`menuitem` with full keyboard support. Built on the web
 * `primitives` (Card, Button, Icon, Badge, Avatar, Rating, StatusDot, Statistic)
 * and the commerce `EmptyState`.
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
