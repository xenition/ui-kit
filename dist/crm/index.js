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
exports.clampPct = exports.toneFillClass = exports.toneBadgeTone = exports.toneTextClass = exports.QUOTE_META = exports.ACTIVITY_META = exports.TEMPERATURE_META = exports.OUTCOME_META = exports.NextStepRow = exports.WinLossBadge = exports.TagFilterBar = exports.EmailThreadRow = exports.ContactTimeline = exports.DealForecast = exports.QuoteCard = exports.ActivityLogRow = exports.LeadRow = exports.ContactCard = exports.PipelineBoard = exports.DealCard = void 0;
var DealCard_1 = require("./DealCard");
Object.defineProperty(exports, "DealCard", { enumerable: true, get: function () { return DealCard_1.DealCard; } });
var PipelineBoard_1 = require("./PipelineBoard");
Object.defineProperty(exports, "PipelineBoard", { enumerable: true, get: function () { return PipelineBoard_1.PipelineBoard; } });
var ContactCard_1 = require("./ContactCard");
Object.defineProperty(exports, "ContactCard", { enumerable: true, get: function () { return ContactCard_1.ContactCard; } });
var LeadRow_1 = require("./LeadRow");
Object.defineProperty(exports, "LeadRow", { enumerable: true, get: function () { return LeadRow_1.LeadRow; } });
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