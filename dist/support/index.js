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
exports.KBArticleRow = exports.ResolutionTimer = exports.QueueStat = exports.EscalationBanner = exports.MacroList = exports.ConversationPanel = exports.TicketPriority = exports.SatisfactionRating = exports.AgentStatus = exports.CannedResponse = exports.SLABadge = exports.TicketRow = void 0;
var TicketRow_1 = require("./TicketRow");
Object.defineProperty(exports, "TicketRow", { enumerable: true, get: function () { return TicketRow_1.TicketRow; } });
var SLABadge_1 = require("./SLABadge");
Object.defineProperty(exports, "SLABadge", { enumerable: true, get: function () { return SLABadge_1.SLABadge; } });
var CannedResponse_1 = require("./CannedResponse");
Object.defineProperty(exports, "CannedResponse", { enumerable: true, get: function () { return CannedResponse_1.CannedResponse; } });
var AgentStatus_1 = require("./AgentStatus");
Object.defineProperty(exports, "AgentStatus", { enumerable: true, get: function () { return AgentStatus_1.AgentStatus; } });
var SatisfactionRating_1 = require("./SatisfactionRating");
Object.defineProperty(exports, "SatisfactionRating", { enumerable: true, get: function () { return SatisfactionRating_1.SatisfactionRating; } });
var TicketPriority_1 = require("./TicketPriority");
Object.defineProperty(exports, "TicketPriority", { enumerable: true, get: function () { return TicketPriority_1.TicketPriority; } });
var ConversationPanel_1 = require("./ConversationPanel");
Object.defineProperty(exports, "ConversationPanel", { enumerable: true, get: function () { return ConversationPanel_1.ConversationPanel; } });
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
//# sourceMappingURL=index.js.map