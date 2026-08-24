"use strict";
/**
 * `@xenition/ui/jobs` — presentational React DOM (web) components for job
 * boards, applicant tracking, and recruiting flows. Data-only web parity of the
 * `@xenition/ui/native/jobs` module: an app passes shaped records ({@link Job},
 * {@link Company}, {@link Application}, {@link Resume}, {@link Interview},
 * {@link RecruiterMessagePayload}) plus callbacks, and every color/radius/spacing
 * comes from the `--xen-*` theme tokens via the Tailwind preset — no literal
 * colors, so a seed change (dark mode included) restyles the whole module.
 * Components compose the shared web primitives (`Card`, `Button`, `Badge`,
 * `Avatar`, `Steps`, `SearchInput`, …) and DOM event idioms (`onClick`). No
 * fetching, no navigation, no global state.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecruiterMessage = exports.SavedJobRow = exports.StatusPipelineV3 = exports.StatusPipelineV2 = exports.StatusPipeline = exports.InterviewSlot = exports.ResumeRow = exports.JobFilterBar = exports.ApplyButton = exports.SkillTag = exports.SalaryRange = exports.ApplicationRowV3 = exports.ApplicationRowV2 = exports.ApplicationRow = exports.CompanyCardV3 = exports.CompanyCardV2 = exports.CompanyCard = exports.JobCardV3 = exports.JobCardV2 = exports.JobCard = exports.formatRelative = exports.formatTime = exports.formatShortDate = exports.formatCompactMoney = exports.formatSalary = exports.STAGE_LABEL = exports.APPLICATION_STAGES = exports.EMPLOYMENT_TYPES = exports.EMPLOYMENT_LABEL = void 0;
var types_1 = require("./types");
Object.defineProperty(exports, "EMPLOYMENT_LABEL", { enumerable: true, get: function () { return types_1.EMPLOYMENT_LABEL; } });
Object.defineProperty(exports, "EMPLOYMENT_TYPES", { enumerable: true, get: function () { return types_1.EMPLOYMENT_TYPES; } });
Object.defineProperty(exports, "APPLICATION_STAGES", { enumerable: true, get: function () { return types_1.APPLICATION_STAGES; } });
Object.defineProperty(exports, "STAGE_LABEL", { enumerable: true, get: function () { return types_1.STAGE_LABEL; } });
// ── pure formatters ───────────────────────────────────────────────────
var format_1 = require("./format");
Object.defineProperty(exports, "formatSalary", { enumerable: true, get: function () { return format_1.formatSalary; } });
Object.defineProperty(exports, "formatCompactMoney", { enumerable: true, get: function () { return format_1.formatCompactMoney; } });
Object.defineProperty(exports, "formatShortDate", { enumerable: true, get: function () { return format_1.formatShortDate; } });
Object.defineProperty(exports, "formatTime", { enumerable: true, get: function () { return format_1.formatTime; } });
Object.defineProperty(exports, "formatRelative", { enumerable: true, get: function () { return format_1.formatRelative; } });
// ── components ────────────────────────────────────────────────────────
var JobCard_1 = require("./JobCard");
Object.defineProperty(exports, "JobCard", { enumerable: true, get: function () { return JobCard_1.JobCard; } });
var JobCardV2_1 = require("./JobCardV2");
Object.defineProperty(exports, "JobCardV2", { enumerable: true, get: function () { return JobCardV2_1.JobCardV2; } });
var JobCardV3_1 = require("./JobCardV3");
Object.defineProperty(exports, "JobCardV3", { enumerable: true, get: function () { return JobCardV3_1.JobCardV3; } });
var CompanyCard_1 = require("./CompanyCard");
Object.defineProperty(exports, "CompanyCard", { enumerable: true, get: function () { return CompanyCard_1.CompanyCard; } });
var CompanyCardV2_1 = require("./CompanyCardV2");
Object.defineProperty(exports, "CompanyCardV2", { enumerable: true, get: function () { return CompanyCardV2_1.CompanyCardV2; } });
var CompanyCardV3_1 = require("./CompanyCardV3");
Object.defineProperty(exports, "CompanyCardV3", { enumerable: true, get: function () { return CompanyCardV3_1.CompanyCardV3; } });
var ApplicationRow_1 = require("./ApplicationRow");
Object.defineProperty(exports, "ApplicationRow", { enumerable: true, get: function () { return ApplicationRow_1.ApplicationRow; } });
var ApplicationRowV2_1 = require("./ApplicationRowV2");
Object.defineProperty(exports, "ApplicationRowV2", { enumerable: true, get: function () { return ApplicationRowV2_1.ApplicationRowV2; } });
var ApplicationRowV3_1 = require("./ApplicationRowV3");
Object.defineProperty(exports, "ApplicationRowV3", { enumerable: true, get: function () { return ApplicationRowV3_1.ApplicationRowV3; } });
var SalaryRange_1 = require("./SalaryRange");
Object.defineProperty(exports, "SalaryRange", { enumerable: true, get: function () { return SalaryRange_1.SalaryRange; } });
var SkillTag_1 = require("./SkillTag");
Object.defineProperty(exports, "SkillTag", { enumerable: true, get: function () { return SkillTag_1.SkillTag; } });
var ApplyButton_1 = require("./ApplyButton");
Object.defineProperty(exports, "ApplyButton", { enumerable: true, get: function () { return ApplyButton_1.ApplyButton; } });
var JobFilterBar_1 = require("./JobFilterBar");
Object.defineProperty(exports, "JobFilterBar", { enumerable: true, get: function () { return JobFilterBar_1.JobFilterBar; } });
var ResumeRow_1 = require("./ResumeRow");
Object.defineProperty(exports, "ResumeRow", { enumerable: true, get: function () { return ResumeRow_1.ResumeRow; } });
var InterviewSlot_1 = require("./InterviewSlot");
Object.defineProperty(exports, "InterviewSlot", { enumerable: true, get: function () { return InterviewSlot_1.InterviewSlot; } });
var StatusPipeline_1 = require("./StatusPipeline");
Object.defineProperty(exports, "StatusPipeline", { enumerable: true, get: function () { return StatusPipeline_1.StatusPipeline; } });
var StatusPipelineV2_1 = require("./StatusPipelineV2");
Object.defineProperty(exports, "StatusPipelineV2", { enumerable: true, get: function () { return StatusPipelineV2_1.StatusPipelineV2; } });
var StatusPipelineV3_1 = require("./StatusPipelineV3");
Object.defineProperty(exports, "StatusPipelineV3", { enumerable: true, get: function () { return StatusPipelineV3_1.StatusPipelineV3; } });
var SavedJobRow_1 = require("./SavedJobRow");
Object.defineProperty(exports, "SavedJobRow", { enumerable: true, get: function () { return SavedJobRow_1.SavedJobRow; } });
var RecruiterMessage_1 = require("./RecruiterMessage");
Object.defineProperty(exports, "RecruiterMessage", { enumerable: true, get: function () { return RecruiterMessage_1.RecruiterMessage; } });
//# sourceMappingURL=index.js.map