"use strict";
/**
 * `@xenition/ui/hr` — presentational HR / people-ops / internal-tools blocks for
 * React DOM (web). The parity of `@xenition/ui/native/hr`: same component names
 * and prop shapes (RN `onPress` → DOM `onClick`, `StyleProp` → `className`),
 * composed from the web primitives (`Card`, `Button`, `Avatar`, `Checkbox`,
 * `Progress`) and `EmptyState` / `formatMoney` from commerce, plus the
 * module-local `StatusPill`. Styled exclusively from the `--xen-*` token classes
 * — no literal colors. Money (payslip / benefits / expense) is carried as
 * integer **cents** and funnelled through the shared `formatMoney` for stable
 * 2-decimal output. Every status — leave pending/approved/denied, task
 * todo/blocked/done, shift open/confirmed, expense approved/rejected — is
 * conveyed by a **glyph + word**, never by color alone. Each component is
 * data + callbacks + variants/states with empty/loading handling and a11y
 * labels; no fetching, no SDK import.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.POLICY_STATUS_META = exports.EXPENSE_CATEGORY_META = exports.EXPENSE_STATUS_META = exports.SHIFT_STATUS_META = exports.BENEFIT_TYPE_META = exports.BENEFIT_STATUS_META = exports.TASK_STATUS_META = exports.REVIEW_STATUS_META = exports.TIMESHEET_STATUS_META = exports.PAYSLIP_STATUS_META = exports.LEAVE_TYPE_META = exports.LEAVE_STATUS_META = exports.PRESENCE_META = exports.EMPLOYEE_STATUS_META = exports.EMPLOYMENT_META = exports.TONE_TEXT_CLASS = exports.toneTextClass = exports.clampRating = exports.clampPct = exports.formatHours = exports.formatMoney = exports.StatusPill = exports.PolicyAcknowledge = exports.ExpenseClaim = exports.ShiftSchedule = exports.BenefitsEnrollment = exports.OnboardingTask = exports.PerformanceReviewV3 = exports.PerformanceReviewV2 = exports.PerformanceReview = exports.TimesheetRow = exports.PayslipRowV3 = exports.PayslipRowV2 = exports.PayslipRow = exports.LeaveRequestV3 = exports.LeaveRequestV2 = exports.LeaveRequest = exports.DirectoryRow = exports.OrgChartNode = exports.EmployeeCardV3 = exports.EmployeeCardV2 = exports.EmployeeCard = void 0;
var EmployeeCard_1 = require("./EmployeeCard");
Object.defineProperty(exports, "EmployeeCard", { enumerable: true, get: function () { return EmployeeCard_1.EmployeeCard; } });
var EmployeeCardV2_1 = require("./EmployeeCardV2");
Object.defineProperty(exports, "EmployeeCardV2", { enumerable: true, get: function () { return EmployeeCardV2_1.EmployeeCardV2; } });
var EmployeeCardV3_1 = require("./EmployeeCardV3");
Object.defineProperty(exports, "EmployeeCardV3", { enumerable: true, get: function () { return EmployeeCardV3_1.EmployeeCardV3; } });
var OrgChartNode_1 = require("./OrgChartNode");
Object.defineProperty(exports, "OrgChartNode", { enumerable: true, get: function () { return OrgChartNode_1.OrgChartNode; } });
var DirectoryRow_1 = require("./DirectoryRow");
Object.defineProperty(exports, "DirectoryRow", { enumerable: true, get: function () { return DirectoryRow_1.DirectoryRow; } });
var LeaveRequest_1 = require("./LeaveRequest");
Object.defineProperty(exports, "LeaveRequest", { enumerable: true, get: function () { return LeaveRequest_1.LeaveRequest; } });
var LeaveRequestV2_1 = require("./LeaveRequestV2");
Object.defineProperty(exports, "LeaveRequestV2", { enumerable: true, get: function () { return LeaveRequestV2_1.LeaveRequestV2; } });
var LeaveRequestV3_1 = require("./LeaveRequestV3");
Object.defineProperty(exports, "LeaveRequestV3", { enumerable: true, get: function () { return LeaveRequestV3_1.LeaveRequestV3; } });
var PayslipRow_1 = require("./PayslipRow");
Object.defineProperty(exports, "PayslipRow", { enumerable: true, get: function () { return PayslipRow_1.PayslipRow; } });
var PayslipRowV2_1 = require("./PayslipRowV2");
Object.defineProperty(exports, "PayslipRowV2", { enumerable: true, get: function () { return PayslipRowV2_1.PayslipRowV2; } });
var PayslipRowV3_1 = require("./PayslipRowV3");
Object.defineProperty(exports, "PayslipRowV3", { enumerable: true, get: function () { return PayslipRowV3_1.PayslipRowV3; } });
var TimesheetRow_1 = require("./TimesheetRow");
Object.defineProperty(exports, "TimesheetRow", { enumerable: true, get: function () { return TimesheetRow_1.TimesheetRow; } });
var PerformanceReview_1 = require("./PerformanceReview");
Object.defineProperty(exports, "PerformanceReview", { enumerable: true, get: function () { return PerformanceReview_1.PerformanceReview; } });
var PerformanceReviewV2_1 = require("./PerformanceReviewV2");
Object.defineProperty(exports, "PerformanceReviewV2", { enumerable: true, get: function () { return PerformanceReviewV2_1.PerformanceReviewV2; } });
var PerformanceReviewV3_1 = require("./PerformanceReviewV3");
Object.defineProperty(exports, "PerformanceReviewV3", { enumerable: true, get: function () { return PerformanceReviewV3_1.PerformanceReviewV3; } });
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
// ── shared status vocabulary + reusable pill ──────────────────────────────
var StatusPill_1 = require("./StatusPill");
Object.defineProperty(exports, "StatusPill", { enumerable: true, get: function () { return StatusPill_1.StatusPill; } });
var internal_1 = require("./internal");
Object.defineProperty(exports, "formatMoney", { enumerable: true, get: function () { return internal_1.formatMoney; } });
Object.defineProperty(exports, "formatHours", { enumerable: true, get: function () { return internal_1.formatHours; } });
Object.defineProperty(exports, "clampPct", { enumerable: true, get: function () { return internal_1.clampPct; } });
Object.defineProperty(exports, "clampRating", { enumerable: true, get: function () { return internal_1.clampRating; } });
Object.defineProperty(exports, "toneTextClass", { enumerable: true, get: function () { return internal_1.toneTextClass; } });
Object.defineProperty(exports, "TONE_TEXT_CLASS", { enumerable: true, get: function () { return internal_1.TONE_TEXT_CLASS; } });
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
//# sourceMappingURL=index.js.map