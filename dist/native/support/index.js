"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.SatisfactionRatingV3 = exports.SatisfactionRatingV2 = exports.AgentStatusV3 = exports.AgentStatusV2 = exports.ConversationPanelV3 = exports.ConversationPanelV2 = exports.TicketRowV3 = exports.TicketRowV2 = exports.KBArticleRow = exports.ResolutionTimer = exports.QueueStat = exports.EscalationBanner = exports.MacroList = exports.ConversationPanel = exports.TicketPriority = exports.SatisfactionRating = exports.AgentStatus = exports.CannedResponse = exports.SLABadge = exports.TicketRow = void 0;
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
/* ------------------------------------------------------------------ *
 * Alternate designs (drop-in). Each Vn component shares the base
 * component's public Props (`<Name>VnProps = <Name>Props`); swap the
 * import to restyle a screen with no call-site changes.
 * ------------------------------------------------------------------ */
var TicketRowV2_1 = require("./TicketRowV2");
Object.defineProperty(exports, "TicketRowV2", { enumerable: true, get: function () { return TicketRowV2_1.TicketRowV2; } });
var TicketRowV3_1 = require("./TicketRowV3");
Object.defineProperty(exports, "TicketRowV3", { enumerable: true, get: function () { return TicketRowV3_1.TicketRowV3; } });
var ConversationPanelV2_1 = require("./ConversationPanelV2");
Object.defineProperty(exports, "ConversationPanelV2", { enumerable: true, get: function () { return ConversationPanelV2_1.ConversationPanelV2; } });
var ConversationPanelV3_1 = require("./ConversationPanelV3");
Object.defineProperty(exports, "ConversationPanelV3", { enumerable: true, get: function () { return ConversationPanelV3_1.ConversationPanelV3; } });
var AgentStatusV2_1 = require("./AgentStatusV2");
Object.defineProperty(exports, "AgentStatusV2", { enumerable: true, get: function () { return AgentStatusV2_1.AgentStatusV2; } });
var AgentStatusV3_1 = require("./AgentStatusV3");
Object.defineProperty(exports, "AgentStatusV3", { enumerable: true, get: function () { return AgentStatusV3_1.AgentStatusV3; } });
var SatisfactionRatingV2_1 = require("./SatisfactionRatingV2");
Object.defineProperty(exports, "SatisfactionRatingV2", { enumerable: true, get: function () { return SatisfactionRatingV2_1.SatisfactionRatingV2; } });
var SatisfactionRatingV3_1 = require("./SatisfactionRatingV3");
Object.defineProperty(exports, "SatisfactionRatingV3", { enumerable: true, get: function () { return SatisfactionRatingV3_1.SatisfactionRatingV3; } });
//# sourceMappingURL=index.js.map