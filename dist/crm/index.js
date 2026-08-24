"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.clampPct = exports.toneFillClass = exports.toneBadgeTone = exports.toneTextClass = exports.QUOTE_META = exports.ACTIVITY_META = exports.TEMPERATURE_META = exports.OUTCOME_META = exports.NextStepRow = exports.WinLossBadge = exports.TagFilterBar = exports.EmailThreadRow = exports.ContactTimeline = exports.DealForecast = exports.QuoteCard = exports.ActivityLogRow = exports.LeadRowV3 = exports.LeadRowV2 = exports.LeadRow = exports.ContactCardV3 = exports.ContactCardV2 = exports.ContactCard = exports.PipelineBoardV3 = exports.PipelineBoardV2 = exports.PipelineBoard = exports.DealCardV3 = exports.DealCardV2 = exports.DealCard = void 0;
var DealCard_1 = require("./DealCard");
Object.defineProperty(exports, "DealCard", { enumerable: true, get: function () { return DealCard_1.DealCard; } });
var DealCardV2_1 = require("./DealCardV2");
Object.defineProperty(exports, "DealCardV2", { enumerable: true, get: function () { return DealCardV2_1.DealCardV2; } });
var DealCardV3_1 = require("./DealCardV3");
Object.defineProperty(exports, "DealCardV3", { enumerable: true, get: function () { return DealCardV3_1.DealCardV3; } });
var PipelineBoard_1 = require("./PipelineBoard");
Object.defineProperty(exports, "PipelineBoard", { enumerable: true, get: function () { return PipelineBoard_1.PipelineBoard; } });
var PipelineBoardV2_1 = require("./PipelineBoardV2");
Object.defineProperty(exports, "PipelineBoardV2", { enumerable: true, get: function () { return PipelineBoardV2_1.PipelineBoardV2; } });
var PipelineBoardV3_1 = require("./PipelineBoardV3");
Object.defineProperty(exports, "PipelineBoardV3", { enumerable: true, get: function () { return PipelineBoardV3_1.PipelineBoardV3; } });
var ContactCard_1 = require("./ContactCard");
Object.defineProperty(exports, "ContactCard", { enumerable: true, get: function () { return ContactCard_1.ContactCard; } });
var ContactCardV2_1 = require("./ContactCardV2");
Object.defineProperty(exports, "ContactCardV2", { enumerable: true, get: function () { return ContactCardV2_1.ContactCardV2; } });
var ContactCardV3_1 = require("./ContactCardV3");
Object.defineProperty(exports, "ContactCardV3", { enumerable: true, get: function () { return ContactCardV3_1.ContactCardV3; } });
var LeadRow_1 = require("./LeadRow");
Object.defineProperty(exports, "LeadRow", { enumerable: true, get: function () { return LeadRow_1.LeadRow; } });
var LeadRowV2_1 = require("./LeadRowV2");
Object.defineProperty(exports, "LeadRowV2", { enumerable: true, get: function () { return LeadRowV2_1.LeadRowV2; } });
var LeadRowV3_1 = require("./LeadRowV3");
Object.defineProperty(exports, "LeadRowV3", { enumerable: true, get: function () { return LeadRowV3_1.LeadRowV3; } });
var ActivityLogRow_1 = require("./ActivityLogRow");
Object.defineProperty(exports, "ActivityLogRow", { enumerable: true, get: function () { return ActivityLogRow_1.ActivityLogRow; } });
var QuoteCard_1 = require("./QuoteCard");
Object.defineProperty(exports, "QuoteCard", { enumerable: true, get: function () { return QuoteCard_1.QuoteCard; } });
var DealForecast_1 = require("./DealForecast");
Object.defineProperty(exports, "DealForecast", { enumerable: true, get: function () { return DealForecast_1.DealForecast; } });
var ContactTimeline_1 = require("./ContactTimeline");
Object.defineProperty(exports, "ContactTimeline", { enumerable: true, get: function () { return ContactTimeline_1.ContactTimeline; } });
var EmailThreadRow_1 = require("./EmailThreadRow");
Object.defineProperty(exports, "EmailThreadRow", { enumerable: true, get: function () { return EmailThreadRow_1.EmailThreadRow; } });
var TagFilterBar_1 = require("./TagFilterBar");
Object.defineProperty(exports, "TagFilterBar", { enumerable: true, get: function () { return TagFilterBar_1.TagFilterBar; } });
var WinLossBadge_1 = require("./WinLossBadge");
Object.defineProperty(exports, "WinLossBadge", { enumerable: true, get: function () { return WinLossBadge_1.WinLossBadge; } });
var NextStepRow_1 = require("./NextStepRow");
Object.defineProperty(exports, "NextStepRow", { enumerable: true, get: function () { return NextStepRow_1.NextStepRow; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "OUTCOME_META", { enumerable: true, get: function () { return internal_1.OUTCOME_META; } });
Object.defineProperty(exports, "TEMPERATURE_META", { enumerable: true, get: function () { return internal_1.TEMPERATURE_META; } });
Object.defineProperty(exports, "ACTIVITY_META", { enumerable: true, get: function () { return internal_1.ACTIVITY_META; } });
Object.defineProperty(exports, "QUOTE_META", { enumerable: true, get: function () { return internal_1.QUOTE_META; } });
Object.defineProperty(exports, "toneTextClass", { enumerable: true, get: function () { return internal_1.toneTextClass; } });
Object.defineProperty(exports, "toneBadgeTone", { enumerable: true, get: function () { return internal_1.toneBadgeTone; } });
Object.defineProperty(exports, "toneFillClass", { enumerable: true, get: function () { return internal_1.toneFillClass; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
//# sourceMappingURL=index.js.map