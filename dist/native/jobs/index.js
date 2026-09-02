"use strict";
/**
 * `@xenition/ui/native/jobs` — presentational React Native components for job
 * boards, applicant tracking, and recruiting flows. Mobile-first and data-only:
 * an app passes shaped records ({@link Job}, {@link Company}, {@link Application},
 * {@link Resume}, {@link Interview}, {@link RecruiterMessagePayload}) plus
 * callbacks, and every color/radius/spacing comes from the compiled theme tokens
 * via `useXenitionTheme()` — no literal colors, so a seed change (dark mode
 * included) restyles the whole module. Components compose the shared native
 * primitives (`Card`, `Button`, `Badge`, `Avatar`, `Steps`, …) and native event
 * idioms (`onPress`). No fetching, no navigation, no global state.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusPipelineV4 = exports.SkillTagV4 = exports.SavedJobRowV4 = exports.SalaryRangeV4 = exports.ResumeRowV4 = exports.RecruiterMessageV4 = exports.OfferCardV4 = exports.JobListV4 = exports.JobFilterBarV4 = exports.JobCardV4 = exports.InterviewSlotV4 = exports.CompanyCardV4 = exports.ApplyButtonV4 = exports.ApplicationRowV4 = exports.StatusPipelineV3 = exports.StatusPipelineV2 = exports.ApplicationRowV3 = exports.ApplicationRowV2 = exports.CompanyCardV3 = exports.CompanyCardV2 = exports.JobCardV3 = exports.JobCardV2 = exports.RecruiterMessage = exports.SavedJobRow = exports.StatusPipeline = exports.InterviewSlot = exports.ResumeRow = exports.JobFilterBar = exports.ApplyButton = exports.SkillTag = exports.SalaryRange = exports.ApplicationRow = exports.CompanyCard = exports.JobCard = exports.formatRelative = exports.formatTime = exports.formatShortDate = exports.formatCompactMoney = exports.formatSalary = exports.STAGE_LABEL = exports.APPLICATION_STAGES = exports.EMPLOYMENT_TYPES = exports.EMPLOYMENT_LABEL = void 0;
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
var CompanyCard_1 = require("./CompanyCard");
Object.defineProperty(exports, "CompanyCard", { enumerable: true, get: function () { return CompanyCard_1.CompanyCard; } });
var ApplicationRow_1 = require("./ApplicationRow");
Object.defineProperty(exports, "ApplicationRow", { enumerable: true, get: function () { return ApplicationRow_1.ApplicationRow; } });
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
var SavedJobRow_1 = require("./SavedJobRow");
Object.defineProperty(exports, "SavedJobRow", { enumerable: true, get: function () { return SavedJobRow_1.SavedJobRow; } });
var RecruiterMessage_1 = require("./RecruiterMessage");
Object.defineProperty(exports, "RecruiterMessage", { enumerable: true, get: function () { return RecruiterMessage_1.RecruiterMessage; } });
// ── alternate designs (v2 / v3) — separate drop-in components, same props ──
var JobCardV2_1 = require("./JobCardV2");
Object.defineProperty(exports, "JobCardV2", { enumerable: true, get: function () { return JobCardV2_1.JobCardV2; } });
var JobCardV3_1 = require("./JobCardV3");
Object.defineProperty(exports, "JobCardV3", { enumerable: true, get: function () { return JobCardV3_1.JobCardV3; } });
var CompanyCardV2_1 = require("./CompanyCardV2");
Object.defineProperty(exports, "CompanyCardV2", { enumerable: true, get: function () { return CompanyCardV2_1.CompanyCardV2; } });
var CompanyCardV3_1 = require("./CompanyCardV3");
Object.defineProperty(exports, "CompanyCardV3", { enumerable: true, get: function () { return CompanyCardV3_1.CompanyCardV3; } });
var ApplicationRowV2_1 = require("./ApplicationRowV2");
Object.defineProperty(exports, "ApplicationRowV2", { enumerable: true, get: function () { return ApplicationRowV2_1.ApplicationRowV2; } });
var ApplicationRowV3_1 = require("./ApplicationRowV3");
Object.defineProperty(exports, "ApplicationRowV3", { enumerable: true, get: function () { return ApplicationRowV3_1.ApplicationRowV3; } });
var StatusPipelineV2_1 = require("./StatusPipelineV2");
Object.defineProperty(exports, "StatusPipelineV2", { enumerable: true, get: function () { return StatusPipelineV2_1.StatusPipelineV2; } });
var StatusPipelineV3_1 = require("./StatusPipelineV3");
Object.defineProperty(exports, "StatusPipelineV3", { enumerable: true, get: function () { return StatusPipelineV3_1.StatusPipelineV3; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `JOBS-V4-SPEC.md`. Each is a
// drop-in for its base — same props plus optional additions — except
// `JobListV4` and `OfferCardV4`, which are new and have no base.
var ApplicationRowV4_1 = require("./ApplicationRowV4");
Object.defineProperty(exports, "ApplicationRowV4", { enumerable: true, get: function () { return ApplicationRowV4_1.ApplicationRowV4; } });
var ApplyButtonV4_1 = require("./ApplyButtonV4");
Object.defineProperty(exports, "ApplyButtonV4", { enumerable: true, get: function () { return ApplyButtonV4_1.ApplyButtonV4; } });
var CompanyCardV4_1 = require("./CompanyCardV4");
Object.defineProperty(exports, "CompanyCardV4", { enumerable: true, get: function () { return CompanyCardV4_1.CompanyCardV4; } });
var InterviewSlotV4_1 = require("./InterviewSlotV4");
Object.defineProperty(exports, "InterviewSlotV4", { enumerable: true, get: function () { return InterviewSlotV4_1.InterviewSlotV4; } });
var JobCardV4_1 = require("./JobCardV4");
Object.defineProperty(exports, "JobCardV4", { enumerable: true, get: function () { return JobCardV4_1.JobCardV4; } });
var JobFilterBarV4_1 = require("./JobFilterBarV4");
Object.defineProperty(exports, "JobFilterBarV4", { enumerable: true, get: function () { return JobFilterBarV4_1.JobFilterBarV4; } });
var JobListV4_1 = require("./JobListV4");
Object.defineProperty(exports, "JobListV4", { enumerable: true, get: function () { return JobListV4_1.JobListV4; } });
var OfferCardV4_1 = require("./OfferCardV4");
Object.defineProperty(exports, "OfferCardV4", { enumerable: true, get: function () { return OfferCardV4_1.OfferCardV4; } });
var RecruiterMessageV4_1 = require("./RecruiterMessageV4");
Object.defineProperty(exports, "RecruiterMessageV4", { enumerable: true, get: function () { return RecruiterMessageV4_1.RecruiterMessageV4; } });
var ResumeRowV4_1 = require("./ResumeRowV4");
Object.defineProperty(exports, "ResumeRowV4", { enumerable: true, get: function () { return ResumeRowV4_1.ResumeRowV4; } });
var SalaryRangeV4_1 = require("./SalaryRangeV4");
Object.defineProperty(exports, "SalaryRangeV4", { enumerable: true, get: function () { return SalaryRangeV4_1.SalaryRangeV4; } });
var SavedJobRowV4_1 = require("./SavedJobRowV4");
Object.defineProperty(exports, "SavedJobRowV4", { enumerable: true, get: function () { return SavedJobRowV4_1.SavedJobRowV4; } });
var SkillTagV4_1 = require("./SkillTagV4");
Object.defineProperty(exports, "SkillTagV4", { enumerable: true, get: function () { return SkillTagV4_1.SkillTagV4; } });
var StatusPipelineV4_1 = require("./StatusPipelineV4");
Object.defineProperty(exports, "StatusPipelineV4", { enumerable: true, get: function () { return StatusPipelineV4_1.StatusPipelineV4; } });
//# sourceMappingURL=index.js.map