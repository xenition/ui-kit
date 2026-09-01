"use strict";
/**
 * `@xenition/ui/productivity` — web (React DOM) productivity blocks.
 *
 * Task / project-management / notes composed components: rows, chips, cards,
 * and board columns built on the web primitives and styled exclusively via the
 * `--xen-*` theme tokens (no literal colors). The DOM parity of
 * `@xenition/ui/native/productivity` — same component + prop names, with
 * `onPress` → `onClick`. Import from `@xenition/ui/productivity`.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.ActivityFeed = exports.CalendarStrip = exports.QuickAddTask = exports.WeeklyReview = exports.TodayHeader = exports.ProjectHeader = exports.AssigneeGroupV4 = exports.DueDatePillV4 = exports.LabelChipV4 = exports.PriorityTagV4 = exports.TimeTrackerV4 = exports.ReminderRowV4 = exports.BoardColumnV4 = exports.SubtaskListV4 = exports.ChecklistItemV4 = exports.MilestoneRowV4 = exports.NoteCardV4 = exports.ProjectCardV4 = exports.TaskRowV4 = exports.ReminderRow = exports.NoteCardV3 = exports.NoteCardV2 = exports.NoteCard = exports.MilestoneRowV3 = exports.MilestoneRowV2 = exports.MilestoneRow = exports.TimeTracker = exports.LabelChip = exports.SubtaskList = exports.BoardColumn = exports.AssigneeGroup = exports.DueDatePill = exports.ProjectCardV3 = exports.ProjectCardV2 = exports.ProjectCard = exports.PriorityTag = exports.ChecklistItem = exports.TaskRowV3 = exports.TaskRowV2 = exports.TaskRow = void 0;
var TaskRow_1 = require("./TaskRow");
Object.defineProperty(exports, "TaskRow", { enumerable: true, get: function () { return TaskRow_1.TaskRow; } });
var TaskRowV2_1 = require("./TaskRowV2");
Object.defineProperty(exports, "TaskRowV2", { enumerable: true, get: function () { return TaskRowV2_1.TaskRowV2; } });
var TaskRowV3_1 = require("./TaskRowV3");
Object.defineProperty(exports, "TaskRowV3", { enumerable: true, get: function () { return TaskRowV3_1.TaskRowV3; } });
var ChecklistItem_1 = require("./ChecklistItem");
Object.defineProperty(exports, "ChecklistItem", { enumerable: true, get: function () { return ChecklistItem_1.ChecklistItem; } });
var PriorityTag_1 = require("./PriorityTag");
Object.defineProperty(exports, "PriorityTag", { enumerable: true, get: function () { return PriorityTag_1.PriorityTag; } });
var ProjectCard_1 = require("./ProjectCard");
Object.defineProperty(exports, "ProjectCard", { enumerable: true, get: function () { return ProjectCard_1.ProjectCard; } });
var ProjectCardV2_1 = require("./ProjectCardV2");
Object.defineProperty(exports, "ProjectCardV2", { enumerable: true, get: function () { return ProjectCardV2_1.ProjectCardV2; } });
var ProjectCardV3_1 = require("./ProjectCardV3");
Object.defineProperty(exports, "ProjectCardV3", { enumerable: true, get: function () { return ProjectCardV3_1.ProjectCardV3; } });
var DueDatePill_1 = require("./DueDatePill");
Object.defineProperty(exports, "DueDatePill", { enumerable: true, get: function () { return DueDatePill_1.DueDatePill; } });
var AssigneeGroup_1 = require("./AssigneeGroup");
Object.defineProperty(exports, "AssigneeGroup", { enumerable: true, get: function () { return AssigneeGroup_1.AssigneeGroup; } });
var BoardColumn_1 = require("./BoardColumn");
Object.defineProperty(exports, "BoardColumn", { enumerable: true, get: function () { return BoardColumn_1.BoardColumn; } });
var SubtaskList_1 = require("./SubtaskList");
Object.defineProperty(exports, "SubtaskList", { enumerable: true, get: function () { return SubtaskList_1.SubtaskList; } });
var LabelChip_1 = require("./LabelChip");
Object.defineProperty(exports, "LabelChip", { enumerable: true, get: function () { return LabelChip_1.LabelChip; } });
var TimeTracker_1 = require("./TimeTracker");
Object.defineProperty(exports, "TimeTracker", { enumerable: true, get: function () { return TimeTracker_1.TimeTracker; } });
var MilestoneRow_1 = require("./MilestoneRow");
Object.defineProperty(exports, "MilestoneRow", { enumerable: true, get: function () { return MilestoneRow_1.MilestoneRow; } });
var MilestoneRowV2_1 = require("./MilestoneRowV2");
Object.defineProperty(exports, "MilestoneRowV2", { enumerable: true, get: function () { return MilestoneRowV2_1.MilestoneRowV2; } });
var MilestoneRowV3_1 = require("./MilestoneRowV3");
Object.defineProperty(exports, "MilestoneRowV3", { enumerable: true, get: function () { return MilestoneRowV3_1.MilestoneRowV3; } });
var NoteCard_1 = require("./NoteCard");
Object.defineProperty(exports, "NoteCard", { enumerable: true, get: function () { return NoteCard_1.NoteCard; } });
var NoteCardV2_1 = require("./NoteCardV2");
Object.defineProperty(exports, "NoteCardV2", { enumerable: true, get: function () { return NoteCardV2_1.NoteCardV2; } });
var NoteCardV3_1 = require("./NoteCardV3");
Object.defineProperty(exports, "NoteCardV3", { enumerable: true, get: function () { return NoteCardV3_1.NoteCardV3; } });
var ReminderRow_1 = require("./ReminderRow");
Object.defineProperty(exports, "ReminderRow", { enumerable: true, get: function () { return ReminderRow_1.ReminderRow; } });
/*
 * ── V4 "flow" (focused task-workspace) design line ──
 * A drop-in V4 variant for each of the 13 originals: calm legible task surfaces
 * where completing a task settles into a soft-success glow, one primary accent,
 * soft-primary progress, and a brand gradient reserved for the focus moments
 * (project header, today dashboard, weekly review). Base/V2/V3 untouched; V4 is
 * additive. Token-driven, dark-mode safe, web + native.
 */
var TaskRowV4_1 = require("./TaskRowV4");
Object.defineProperty(exports, "TaskRowV4", { enumerable: true, get: function () { return TaskRowV4_1.TaskRowV4; } });
var ProjectCardV4_1 = require("./ProjectCardV4");
Object.defineProperty(exports, "ProjectCardV4", { enumerable: true, get: function () { return ProjectCardV4_1.ProjectCardV4; } });
var NoteCardV4_1 = require("./NoteCardV4");
Object.defineProperty(exports, "NoteCardV4", { enumerable: true, get: function () { return NoteCardV4_1.NoteCardV4; } });
var MilestoneRowV4_1 = require("./MilestoneRowV4");
Object.defineProperty(exports, "MilestoneRowV4", { enumerable: true, get: function () { return MilestoneRowV4_1.MilestoneRowV4; } });
var ChecklistItemV4_1 = require("./ChecklistItemV4");
Object.defineProperty(exports, "ChecklistItemV4", { enumerable: true, get: function () { return ChecklistItemV4_1.ChecklistItemV4; } });
var SubtaskListV4_1 = require("./SubtaskListV4");
Object.defineProperty(exports, "SubtaskListV4", { enumerable: true, get: function () { return SubtaskListV4_1.SubtaskListV4; } });
var BoardColumnV4_1 = require("./BoardColumnV4");
Object.defineProperty(exports, "BoardColumnV4", { enumerable: true, get: function () { return BoardColumnV4_1.BoardColumnV4; } });
var ReminderRowV4_1 = require("./ReminderRowV4");
Object.defineProperty(exports, "ReminderRowV4", { enumerable: true, get: function () { return ReminderRowV4_1.ReminderRowV4; } });
var TimeTrackerV4_1 = require("./TimeTrackerV4");
Object.defineProperty(exports, "TimeTrackerV4", { enumerable: true, get: function () { return TimeTrackerV4_1.TimeTrackerV4; } });
var PriorityTagV4_1 = require("./PriorityTagV4");
Object.defineProperty(exports, "PriorityTagV4", { enumerable: true, get: function () { return PriorityTagV4_1.PriorityTagV4; } });
var LabelChipV4_1 = require("./LabelChipV4");
Object.defineProperty(exports, "LabelChipV4", { enumerable: true, get: function () { return LabelChipV4_1.LabelChipV4; } });
var DueDatePillV4_1 = require("./DueDatePillV4");
Object.defineProperty(exports, "DueDatePillV4", { enumerable: true, get: function () { return DueDatePillV4_1.DueDatePillV4; } });
var AssigneeGroupV4_1 = require("./AssigneeGroupV4");
Object.defineProperty(exports, "AssigneeGroupV4", { enumerable: true, get: function () { return AssigneeGroupV4_1.AssigneeGroupV4; } });
/* ── New components (V4 flow line) ── */
var ProjectHeader_1 = require("./ProjectHeader");
Object.defineProperty(exports, "ProjectHeader", { enumerable: true, get: function () { return ProjectHeader_1.ProjectHeader; } });
var TodayHeader_1 = require("./TodayHeader");
Object.defineProperty(exports, "TodayHeader", { enumerable: true, get: function () { return TodayHeader_1.TodayHeader; } });
var WeeklyReview_1 = require("./WeeklyReview");
Object.defineProperty(exports, "WeeklyReview", { enumerable: true, get: function () { return WeeklyReview_1.WeeklyReview; } });
var QuickAddTask_1 = require("./QuickAddTask");
Object.defineProperty(exports, "QuickAddTask", { enumerable: true, get: function () { return QuickAddTask_1.QuickAddTask; } });
var CalendarStrip_1 = require("./CalendarStrip");
Object.defineProperty(exports, "CalendarStrip", { enumerable: true, get: function () { return CalendarStrip_1.CalendarStrip; } });
var ActivityFeed_1 = require("./ActivityFeed");
Object.defineProperty(exports, "ActivityFeed", { enumerable: true, get: function () { return ActivityFeed_1.ActivityFeed; } });
//# sourceMappingURL=index.js.map