"use strict";
/**
 * `@xenition/ui/native/hr` — presentational HR / people-ops / internal-tools
 * blocks for React Native. Composed from the native primitives (`Card`,
 * `Button`, `Avatar`, `Checkbox`, `EmptyState`) and the module-local
 * `StatusPill`, styled exclusively from the compiled theme tokens via
 * `useXenitionTheme()` — no literal colors. Money (payslip / benefits / expense)
 * is carried as integer **cents** and funnelled through the shared `formatMoney`
 * for stable 2-decimal output. Every status — leave pending/approved/denied,
 * task todo/blocked/done, shift open/confirmed, expense approved/rejected — is
 * conveyed by a **glyph + word**, never by color alone. Each component is
 * data + callbacks + variants/states with empty/loading handling and a11y
 * labels; no fetching, no SDK import.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnboardingTaskV4 = exports.LeaveRequestV4 = exports.LeaveBalanceV4 = exports.ExpenseClaimV4 = exports.EmployeeCardV4 = exports.DirectoryRowV4 = exports.BenefitsEnrollmentV4 = exports.ApprovalQueueV4 = exports.POLICY_STATUS_META = exports.EXPENSE_CATEGORY_META = exports.EXPENSE_STATUS_META = exports.SHIFT_STATUS_META = exports.BENEFIT_TYPE_META = exports.BENEFIT_STATUS_META = exports.TASK_STATUS_META = exports.REVIEW_STATUS_META = exports.TIMESHEET_STATUS_META = exports.PAYSLIP_STATUS_META = exports.LEAVE_TYPE_META = exports.LEAVE_STATUS_META = exports.PRESENCE_META = exports.EMPLOYEE_STATUS_META = exports.EMPLOYMENT_META = exports.toneSlot = exports.toneColor = exports.clampRating = exports.clampPct = exports.formatHours = exports.formatMoney = exports.StatusPill = exports.PerformanceReviewV3 = exports.PerformanceReviewV2 = exports.PayslipRowV3 = exports.PayslipRowV2 = exports.LeaveRequestV3 = exports.LeaveRequestV2 = exports.EmployeeCardV3 = exports.EmployeeCardV2 = exports.PolicyAcknowledge = exports.ExpenseClaim = exports.ShiftSchedule = exports.BenefitsEnrollment = exports.OnboardingTask = exports.PerformanceReview = exports.TimesheetRow = exports.PayslipRow = exports.LeaveRequest = exports.DirectoryRow = exports.OrgChartNode = exports.EmployeeCard = void 0;
exports.TimesheetRowV4 = exports.StatusPillV4 = exports.ShiftScheduleV4 = exports.PolicyAcknowledgeV4 = exports.PerformanceReviewV4 = exports.PayslipRowV4 = exports.OrgChartNodeV4 = void 0;
var EmployeeCard_1 = require("./EmployeeCard");
Object.defineProperty(exports, "EmployeeCard", { enumerable: true, get: function () { return EmployeeCard_1.EmployeeCard; } });
var OrgChartNode_1 = require("./OrgChartNode");
Object.defineProperty(exports, "OrgChartNode", { enumerable: true, get: function () { return OrgChartNode_1.OrgChartNode; } });
var DirectoryRow_1 = require("./DirectoryRow");
Object.defineProperty(exports, "DirectoryRow", { enumerable: true, get: function () { return DirectoryRow_1.DirectoryRow; } });
var LeaveRequest_1 = require("./LeaveRequest");
Object.defineProperty(exports, "LeaveRequest", { enumerable: true, get: function () { return LeaveRequest_1.LeaveRequest; } });
var PayslipRow_1 = require("./PayslipRow");
Object.defineProperty(exports, "PayslipRow", { enumerable: true, get: function () { return PayslipRow_1.PayslipRow; } });
var TimesheetRow_1 = require("./TimesheetRow");
Object.defineProperty(exports, "TimesheetRow", { enumerable: true, get: function () { return TimesheetRow_1.TimesheetRow; } });
var PerformanceReview_1 = require("./PerformanceReview");
Object.defineProperty(exports, "PerformanceReview", { enumerable: true, get: function () { return PerformanceReview_1.PerformanceReview; } });
var OnboardingTask_1 = require("./OnboardingTask");
Object.defineProperty(exports, "OnboardingTask", { enumerable: true, get: function () { return OnboardingTask_1.OnboardingTask; } });
var BenefitsEnrollment_1 = require("./BenefitsEnrollment");
Object.defineProperty(exports, "BenefitsEnrollment", { enumerable: true, get: function () { return BenefitsEnrollment_1.BenefitsEnrollment; } });
var ShiftSchedule_1 = require("./ShiftSchedule");
Object.defineProperty(exports, "ShiftSchedule", { enumerable: true, get: function () { return ShiftSchedule_1.ShiftSchedule; } });
var ExpenseClaim_1 = require("./ExpenseClaim");
Object.defineProperty(exports, "ExpenseClaim", { enumerable: true, get: function () { return ExpenseClaim_1.ExpenseClaim; } });
var PolicyAcknowledge_1 = require("./PolicyAcknowledge");
Object.defineProperty(exports, "PolicyAcknowledge", { enumerable: true, get: function () { return PolicyAcknowledge_1.PolicyAcknowledge; } });
// ── alternate designs (V2 / V3) — drop-in, same Props ─────────────────────
var EmployeeCardV2_1 = require("./EmployeeCardV2");
Object.defineProperty(exports, "EmployeeCardV2", { enumerable: true, get: function () { return EmployeeCardV2_1.EmployeeCardV2; } });
var EmployeeCardV3_1 = require("./EmployeeCardV3");
Object.defineProperty(exports, "EmployeeCardV3", { enumerable: true, get: function () { return EmployeeCardV3_1.EmployeeCardV3; } });
var LeaveRequestV2_1 = require("./LeaveRequestV2");
Object.defineProperty(exports, "LeaveRequestV2", { enumerable: true, get: function () { return LeaveRequestV2_1.LeaveRequestV2; } });
var LeaveRequestV3_1 = require("./LeaveRequestV3");
Object.defineProperty(exports, "LeaveRequestV3", { enumerable: true, get: function () { return LeaveRequestV3_1.LeaveRequestV3; } });
var PayslipRowV2_1 = require("./PayslipRowV2");
Object.defineProperty(exports, "PayslipRowV2", { enumerable: true, get: function () { return PayslipRowV2_1.PayslipRowV2; } });
var PayslipRowV3_1 = require("./PayslipRowV3");
Object.defineProperty(exports, "PayslipRowV3", { enumerable: true, get: function () { return PayslipRowV3_1.PayslipRowV3; } });
var PerformanceReviewV2_1 = require("./PerformanceReviewV2");
Object.defineProperty(exports, "PerformanceReviewV2", { enumerable: true, get: function () { return PerformanceReviewV2_1.PerformanceReviewV2; } });
var PerformanceReviewV3_1 = require("./PerformanceReviewV3");
Object.defineProperty(exports, "PerformanceReviewV3", { enumerable: true, get: function () { return PerformanceReviewV3_1.PerformanceReviewV3; } });
// ── shared status vocabulary + reusable pill ──────────────────────────────
var StatusPill_1 = require("./StatusPill");
Object.defineProperty(exports, "StatusPill", { enumerable: true, get: function () { return StatusPill_1.StatusPill; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "formatHours", { enumerable: true, get: function () { return internal_1.formatHours; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
Object.defineProperty(exports, "clampRating", { enumerable: true, get: function () { return internal_1.clampRating; } });
Object.defineProperty(exports, "toneColor", { enumerable: true, get: function () { return internal_1.toneColor; } });
Object.defineProperty(exports, "toneSlot", { enumerable: true, get: function () { return internal_1.toneSlot; } });
Object.defineProperty(exports, "EMPLOYMENT_META", { enumerable: true, get: function () { return internal_1.EMPLOYMENT_META; } });
Object.defineProperty(exports, "EMPLOYEE_STATUS_META", { enumerable: true, get: function () { return internal_1.EMPLOYEE_STATUS_META; } });
Object.defineProperty(exports, "PRESENCE_META", { enumerable: true, get: function () { return internal_1.PRESENCE_META; } });
Object.defineProperty(exports, "LEAVE_STATUS_META", { enumerable: true, get: function () { return internal_1.LEAVE_STATUS_META; } });
Object.defineProperty(exports, "LEAVE_TYPE_META", { enumerable: true, get: function () { return internal_1.LEAVE_TYPE_META; } });
Object.defineProperty(exports, "PAYSLIP_STATUS_META", { enumerable: true, get: function () { return internal_1.PAYSLIP_STATUS_META; } });
Object.defineProperty(exports, "TIMESHEET_STATUS_META", { enumerable: true, get: function () { return internal_1.TIMESHEET_STATUS_META; } });
Object.defineProperty(exports, "REVIEW_STATUS_META", { enumerable: true, get: function () { return internal_1.REVIEW_STATUS_META; } });
Object.defineProperty(exports, "TASK_STATUS_META", { enumerable: true, get: function () { return internal_1.TASK_STATUS_META; } });
Object.defineProperty(exports, "BENEFIT_STATUS_META", { enumerable: true, get: function () { return internal_1.BENEFIT_STATUS_META; } });
Object.defineProperty(exports, "BENEFIT_TYPE_META", { enumerable: true, get: function () { return internal_1.BENEFIT_TYPE_META; } });
Object.defineProperty(exports, "SHIFT_STATUS_META", { enumerable: true, get: function () { return internal_1.SHIFT_STATUS_META; } });
Object.defineProperty(exports, "EXPENSE_STATUS_META", { enumerable: true, get: function () { return internal_1.EXPENSE_STATUS_META; } });
Object.defineProperty(exports, "EXPENSE_CATEGORY_META", { enumerable: true, get: function () { return internal_1.EXPENSE_CATEGORY_META; } });
Object.defineProperty(exports, "POLICY_STATUS_META", { enumerable: true, get: function () { return internal_1.POLICY_STATUS_META; } });
// ── The V4 line ────────────────────────────────────────────────────────
// The current design pattern, built against `HR-V4-SPEC.md`. Each is a drop-in
// for its base — same props plus optional additions — except `ApprovalQueueV4`
// and `LeaveBalanceV4`, which are new and have no base.
var ApprovalQueueV4_1 = require("./ApprovalQueueV4");
Object.defineProperty(exports, "ApprovalQueueV4", { enumerable: true, get: function () { return ApprovalQueueV4_1.ApprovalQueueV4; } });
var BenefitsEnrollmentV4_1 = require("./BenefitsEnrollmentV4");
Object.defineProperty(exports, "BenefitsEnrollmentV4", { enumerable: true, get: function () { return BenefitsEnrollmentV4_1.BenefitsEnrollmentV4; } });
var DirectoryRowV4_1 = require("./DirectoryRowV4");
Object.defineProperty(exports, "DirectoryRowV4", { enumerable: true, get: function () { return DirectoryRowV4_1.DirectoryRowV4; } });
var EmployeeCardV4_1 = require("./EmployeeCardV4");
Object.defineProperty(exports, "EmployeeCardV4", { enumerable: true, get: function () { return EmployeeCardV4_1.EmployeeCardV4; } });
var ExpenseClaimV4_1 = require("./ExpenseClaimV4");
Object.defineProperty(exports, "ExpenseClaimV4", { enumerable: true, get: function () { return ExpenseClaimV4_1.ExpenseClaimV4; } });
var LeaveBalanceV4_1 = require("./LeaveBalanceV4");
Object.defineProperty(exports, "LeaveBalanceV4", { enumerable: true, get: function () { return LeaveBalanceV4_1.LeaveBalanceV4; } });
var LeaveRequestV4_1 = require("./LeaveRequestV4");
Object.defineProperty(exports, "LeaveRequestV4", { enumerable: true, get: function () { return LeaveRequestV4_1.LeaveRequestV4; } });
var OnboardingTaskV4_1 = require("./OnboardingTaskV4");
Object.defineProperty(exports, "OnboardingTaskV4", { enumerable: true, get: function () { return OnboardingTaskV4_1.OnboardingTaskV4; } });
var OrgChartNodeV4_1 = require("./OrgChartNodeV4");
Object.defineProperty(exports, "OrgChartNodeV4", { enumerable: true, get: function () { return OrgChartNodeV4_1.OrgChartNodeV4; } });
var PayslipRowV4_1 = require("./PayslipRowV4");
Object.defineProperty(exports, "PayslipRowV4", { enumerable: true, get: function () { return PayslipRowV4_1.PayslipRowV4; } });
var PerformanceReviewV4_1 = require("./PerformanceReviewV4");
Object.defineProperty(exports, "PerformanceReviewV4", { enumerable: true, get: function () { return PerformanceReviewV4_1.PerformanceReviewV4; } });
var PolicyAcknowledgeV4_1 = require("./PolicyAcknowledgeV4");
Object.defineProperty(exports, "PolicyAcknowledgeV4", { enumerable: true, get: function () { return PolicyAcknowledgeV4_1.PolicyAcknowledgeV4; } });
var ShiftScheduleV4_1 = require("./ShiftScheduleV4");
Object.defineProperty(exports, "ShiftScheduleV4", { enumerable: true, get: function () { return ShiftScheduleV4_1.ShiftScheduleV4; } });
var StatusPillV4_1 = require("./StatusPillV4");
Object.defineProperty(exports, "StatusPillV4", { enumerable: true, get: function () { return StatusPillV4_1.StatusPillV4; } });
var TimesheetRowV4_1 = require("./TimesheetRowV4");
Object.defineProperty(exports, "TimesheetRowV4", { enumerable: true, get: function () { return TimesheetRowV4_1.TimesheetRowV4; } });
//# sourceMappingURL=index.js.map