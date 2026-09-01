"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.WinLossBadgeV4 = exports.TagFilterBarV4 = exports.QuoteCardV4 = exports.PipelineBoardV4 = exports.NextStepRowV4 = exports.LeadRowV4 = exports.EmailThreadRowV4 = exports.DealForecastV4 = exports.DealCardV4 = exports.ContactTimelineV4 = exports.ContactCardV4 = exports.ActivityLogRowV4 = exports.clampPct = exports.toneColor = exports.QUOTE_META = exports.ACTIVITY_META = exports.TEMPERATURE_META = exports.OUTCOME_META = exports.LeadRowV3 = exports.LeadRowV2 = exports.PipelineBoardV3 = exports.PipelineBoardV2 = exports.ContactCardV3 = exports.ContactCardV2 = exports.DealCardV3 = exports.DealCardV2 = exports.NextStepRow = exports.WinLossBadge = exports.TagFilterBar = exports.EmailThreadRow = exports.ContactTimeline = exports.DealForecast = exports.QuoteCard = exports.ActivityLogRow = exports.LeadRow = exports.ContactCard = exports.PipelineBoard = exports.DealCard = void 0;
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
// --- Alternate designs (drop-in: each V2/V3 accepts the same props as its base) ---
var DealCardV2_1 = require("./DealCardV2");
Object.defineProperty(exports, "DealCardV2", { enumerable: true, get: function () { return DealCardV2_1.DealCardV2; } });
var DealCardV3_1 = require("./DealCardV3");
Object.defineProperty(exports, "DealCardV3", { enumerable: true, get: function () { return DealCardV3_1.DealCardV3; } });
var ContactCardV2_1 = require("./ContactCardV2");
Object.defineProperty(exports, "ContactCardV2", { enumerable: true, get: function () { return ContactCardV2_1.ContactCardV2; } });
var ContactCardV3_1 = require("./ContactCardV3");
Object.defineProperty(exports, "ContactCardV3", { enumerable: true, get: function () { return ContactCardV3_1.ContactCardV3; } });
var PipelineBoardV2_1 = require("./PipelineBoardV2");
Object.defineProperty(exports, "PipelineBoardV2", { enumerable: true, get: function () { return PipelineBoardV2_1.PipelineBoardV2; } });
var PipelineBoardV3_1 = require("./PipelineBoardV3");
Object.defineProperty(exports, "PipelineBoardV3", { enumerable: true, get: function () { return PipelineBoardV3_1.PipelineBoardV3; } });
var LeadRowV2_1 = require("./LeadRowV2");
Object.defineProperty(exports, "LeadRowV2", { enumerable: true, get: function () { return LeadRowV2_1.LeadRowV2; } });
var LeadRowV3_1 = require("./LeadRowV3");
Object.defineProperty(exports, "LeadRowV3", { enumerable: true, get: function () { return LeadRowV3_1.LeadRowV3; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "OUTCOME_META", { enumerable: true, get: function () { return internal_1.OUTCOME_META; } });
Object.defineProperty(exports, "TEMPERATURE_META", { enumerable: true, get: function () { return internal_1.TEMPERATURE_META; } });
Object.defineProperty(exports, "ACTIVITY_META", { enumerable: true, get: function () { return internal_1.ACTIVITY_META; } });
Object.defineProperty(exports, "QUOTE_META", { enumerable: true, get: function () { return internal_1.QUOTE_META; } });
Object.defineProperty(exports, "toneColor", { enumerable: true, get: function () { return internal_1.toneColor; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `CONTENT-CRM-V4-BRIEF.md`. Each
// is a drop-in for its base — same props plus optional additions.
var ActivityLogRowV4_1 = require("./ActivityLogRowV4");
Object.defineProperty(exports, "ActivityLogRowV4", { enumerable: true, get: function () { return ActivityLogRowV4_1.ActivityLogRowV4; } });
var ContactCardV4_1 = require("./ContactCardV4");
Object.defineProperty(exports, "ContactCardV4", { enumerable: true, get: function () { return ContactCardV4_1.ContactCardV4; } });
var ContactTimelineV4_1 = require("./ContactTimelineV4");
Object.defineProperty(exports, "ContactTimelineV4", { enumerable: true, get: function () { return ContactTimelineV4_1.ContactTimelineV4; } });
var DealCardV4_1 = require("./DealCardV4");
Object.defineProperty(exports, "DealCardV4", { enumerable: true, get: function () { return DealCardV4_1.DealCardV4; } });
var DealForecastV4_1 = require("./DealForecastV4");
Object.defineProperty(exports, "DealForecastV4", { enumerable: true, get: function () { return DealForecastV4_1.DealForecastV4; } });
var EmailThreadRowV4_1 = require("./EmailThreadRowV4");
Object.defineProperty(exports, "EmailThreadRowV4", { enumerable: true, get: function () { return EmailThreadRowV4_1.EmailThreadRowV4; } });
var LeadRowV4_1 = require("./LeadRowV4");
Object.defineProperty(exports, "LeadRowV4", { enumerable: true, get: function () { return LeadRowV4_1.LeadRowV4; } });
var NextStepRowV4_1 = require("./NextStepRowV4");
Object.defineProperty(exports, "NextStepRowV4", { enumerable: true, get: function () { return NextStepRowV4_1.NextStepRowV4; } });
var PipelineBoardV4_1 = require("./PipelineBoardV4");
Object.defineProperty(exports, "PipelineBoardV4", { enumerable: true, get: function () { return PipelineBoardV4_1.PipelineBoardV4; } });
var QuoteCardV4_1 = require("./QuoteCardV4");
Object.defineProperty(exports, "QuoteCardV4", { enumerable: true, get: function () { return QuoteCardV4_1.QuoteCardV4; } });
var TagFilterBarV4_1 = require("./TagFilterBarV4");
Object.defineProperty(exports, "TagFilterBarV4", { enumerable: true, get: function () { return TagFilterBarV4_1.TagFilterBarV4; } });
var WinLossBadgeV4_1 = require("./WinLossBadgeV4");
Object.defineProperty(exports, "WinLossBadgeV4", { enumerable: true, get: function () { return WinLossBadgeV4_1.WinLossBadgeV4; } });
//# sourceMappingURL=index.js.map