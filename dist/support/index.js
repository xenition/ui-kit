"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReplyBox = exports.MessageBubble = exports.QueueOverview = exports.CSATResultCard = exports.AgentPerformanceCard = exports.TicketDetailHeader = exports.QueueStatV4 = exports.EscalationBannerV4 = exports.KBArticleRowV4 = exports.MacroListV4 = exports.CannedResponseV4 = exports.ResolutionTimerV4 = exports.SLABadgeV4 = exports.TicketPriorityV4 = exports.SatisfactionRatingV4 = exports.ConversationPanelV4 = exports.AgentStatusV4 = exports.TicketRowV4 = exports.KBArticleRow = exports.ResolutionTimer = exports.QueueStat = exports.EscalationBanner = exports.MacroList = exports.ConversationPanelV3 = exports.ConversationPanelV2 = exports.ConversationPanel = exports.TicketPriority = exports.SatisfactionRatingV3 = exports.SatisfactionRatingV2 = exports.SatisfactionRating = exports.AgentStatusV3 = exports.AgentStatusV2 = exports.AgentStatus = exports.CannedResponse = exports.SLABadge = exports.TicketRowV3 = exports.TicketRowV2 = exports.TicketRow = void 0;
var TicketRow_1 = require("./TicketRow");
Object.defineProperty(exports, "TicketRow", { enumerable: true, get: function () { return TicketRow_1.TicketRow; } });
var TicketRowV2_1 = require("./TicketRowV2");
Object.defineProperty(exports, "TicketRowV2", { enumerable: true, get: function () { return TicketRowV2_1.TicketRowV2; } });
var TicketRowV3_1 = require("./TicketRowV3");
Object.defineProperty(exports, "TicketRowV3", { enumerable: true, get: function () { return TicketRowV3_1.TicketRowV3; } });
var SLABadge_1 = require("./SLABadge");
Object.defineProperty(exports, "SLABadge", { enumerable: true, get: function () { return SLABadge_1.SLABadge; } });
var CannedResponse_1 = require("./CannedResponse");
Object.defineProperty(exports, "CannedResponse", { enumerable: true, get: function () { return CannedResponse_1.CannedResponse; } });
var AgentStatus_1 = require("./AgentStatus");
Object.defineProperty(exports, "AgentStatus", { enumerable: true, get: function () { return AgentStatus_1.AgentStatus; } });
var AgentStatusV2_1 = require("./AgentStatusV2");
Object.defineProperty(exports, "AgentStatusV2", { enumerable: true, get: function () { return AgentStatusV2_1.AgentStatusV2; } });
var AgentStatusV3_1 = require("./AgentStatusV3");
Object.defineProperty(exports, "AgentStatusV3", { enumerable: true, get: function () { return AgentStatusV3_1.AgentStatusV3; } });
var SatisfactionRating_1 = require("./SatisfactionRating");
Object.defineProperty(exports, "SatisfactionRating", { enumerable: true, get: function () { return SatisfactionRating_1.SatisfactionRating; } });
var SatisfactionRatingV2_1 = require("./SatisfactionRatingV2");
Object.defineProperty(exports, "SatisfactionRatingV2", { enumerable: true, get: function () { return SatisfactionRatingV2_1.SatisfactionRatingV2; } });
var SatisfactionRatingV3_1 = require("./SatisfactionRatingV3");
Object.defineProperty(exports, "SatisfactionRatingV3", { enumerable: true, get: function () { return SatisfactionRatingV3_1.SatisfactionRatingV3; } });
var TicketPriority_1 = require("./TicketPriority");
Object.defineProperty(exports, "TicketPriority", { enumerable: true, get: function () { return TicketPriority_1.TicketPriority; } });
var ConversationPanel_1 = require("./ConversationPanel");
Object.defineProperty(exports, "ConversationPanel", { enumerable: true, get: function () { return ConversationPanel_1.ConversationPanel; } });
var ConversationPanelV2_1 = require("./ConversationPanelV2");
Object.defineProperty(exports, "ConversationPanelV2", { enumerable: true, get: function () { return ConversationPanelV2_1.ConversationPanelV2; } });
var ConversationPanelV3_1 = require("./ConversationPanelV3");
Object.defineProperty(exports, "ConversationPanelV3", { enumerable: true, get: function () { return ConversationPanelV3_1.ConversationPanelV3; } });
var MacroList_1 = require("./MacroList");
Object.defineProperty(exports, "MacroList", { enumerable: true, get: function () { return MacroList_1.MacroList; } });
var EscalationBanner_1 = require("./EscalationBanner");
Object.defineProperty(exports, "EscalationBanner", { enumerable: true, get: function () { return EscalationBanner_1.EscalationBanner; } });
var QueueStat_1 = require("./QueueStat");
Object.defineProperty(exports, "QueueStat", { enumerable: true, get: function () { return QueueStat_1.QueueStat; } });
var ResolutionTimer_1 = require("./ResolutionTimer");
Object.defineProperty(exports, "ResolutionTimer", { enumerable: true, get: function () { return ResolutionTimer_1.ResolutionTimer; } });
var KBArticleRow_1 = require("./KBArticleRow");
Object.defineProperty(exports, "KBArticleRow", { enumerable: true, get: function () { return KBArticleRow_1.KBArticleRow; } });
/*
 * ── V4 "console" (calm workspace) design line ──
 * A drop-in V4 variant for each of the 12 originals: elevated rounded cards, a
 * left status-accent bar, soft-tint status pills (glyph + color, never color
 * alone), one primary accent, and a brand gradient reserved for the peak moments
 * (open-ticket header, agent stats, CSAT results). Base/V2/V3 untouched; V4 is
 * additive. Token-driven, dark-mode safe, web + native.
 */
var TicketRowV4_1 = require("./TicketRowV4");
Object.defineProperty(exports, "TicketRowV4", { enumerable: true, get: function () { return TicketRowV4_1.TicketRowV4; } });
var AgentStatusV4_1 = require("./AgentStatusV4");
Object.defineProperty(exports, "AgentStatusV4", { enumerable: true, get: function () { return AgentStatusV4_1.AgentStatusV4; } });
var ConversationPanelV4_1 = require("./ConversationPanelV4");
Object.defineProperty(exports, "ConversationPanelV4", { enumerable: true, get: function () { return ConversationPanelV4_1.ConversationPanelV4; } });
var SatisfactionRatingV4_1 = require("./SatisfactionRatingV4");
Object.defineProperty(exports, "SatisfactionRatingV4", { enumerable: true, get: function () { return SatisfactionRatingV4_1.SatisfactionRatingV4; } });
var TicketPriorityV4_1 = require("./TicketPriorityV4");
Object.defineProperty(exports, "TicketPriorityV4", { enumerable: true, get: function () { return TicketPriorityV4_1.TicketPriorityV4; } });
var SLABadgeV4_1 = require("./SLABadgeV4");
Object.defineProperty(exports, "SLABadgeV4", { enumerable: true, get: function () { return SLABadgeV4_1.SLABadgeV4; } });
var ResolutionTimerV4_1 = require("./ResolutionTimerV4");
Object.defineProperty(exports, "ResolutionTimerV4", { enumerable: true, get: function () { return ResolutionTimerV4_1.ResolutionTimerV4; } });
var CannedResponseV4_1 = require("./CannedResponseV4");
Object.defineProperty(exports, "CannedResponseV4", { enumerable: true, get: function () { return CannedResponseV4_1.CannedResponseV4; } });
var MacroListV4_1 = require("./MacroListV4");
Object.defineProperty(exports, "MacroListV4", { enumerable: true, get: function () { return MacroListV4_1.MacroListV4; } });
var KBArticleRowV4_1 = require("./KBArticleRowV4");
Object.defineProperty(exports, "KBArticleRowV4", { enumerable: true, get: function () { return KBArticleRowV4_1.KBArticleRowV4; } });
var EscalationBannerV4_1 = require("./EscalationBannerV4");
Object.defineProperty(exports, "EscalationBannerV4", { enumerable: true, get: function () { return EscalationBannerV4_1.EscalationBannerV4; } });
var QueueStatV4_1 = require("./QueueStatV4");
Object.defineProperty(exports, "QueueStatV4", { enumerable: true, get: function () { return QueueStatV4_1.QueueStatV4; } });
/* ── New components (V4 console line) ── */
var TicketDetailHeader_1 = require("./TicketDetailHeader");
Object.defineProperty(exports, "TicketDetailHeader", { enumerable: true, get: function () { return TicketDetailHeader_1.TicketDetailHeader; } });
var AgentPerformanceCard_1 = require("./AgentPerformanceCard");
Object.defineProperty(exports, "AgentPerformanceCard", { enumerable: true, get: function () { return AgentPerformanceCard_1.AgentPerformanceCard; } });
var CSATResultCard_1 = require("./CSATResultCard");
Object.defineProperty(exports, "CSATResultCard", { enumerable: true, get: function () { return CSATResultCard_1.CSATResultCard; } });
var QueueOverview_1 = require("./QueueOverview");
Object.defineProperty(exports, "QueueOverview", { enumerable: true, get: function () { return QueueOverview_1.QueueOverview; } });
var MessageBubble_1 = require("./MessageBubble");
Object.defineProperty(exports, "MessageBubble", { enumerable: true, get: function () { return MessageBubble_1.MessageBubble; } });
var ReplyBox_1 = require("./ReplyBox");
Object.defineProperty(exports, "ReplyBox", { enumerable: true, get: function () { return ReplyBox_1.ReplyBox; } });
//# sourceMappingURL=index.js.map