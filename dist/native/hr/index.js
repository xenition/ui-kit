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
exports.POLICY_STATUS_META = exports.EXPENSE_CATEGORY_META = exports.EXPENSE_STATUS_META = exports.SHIFT_STATUS_META = exports.BENEFIT_TYPE_META = exports.BENEFIT_STATUS_META = exports.TASK_STATUS_META = exports.REVIEW_STATUS_META = exports.TIMESHEET_STATUS_META = exports.PAYSLIP_STATUS_META = exports.LEAVE_TYPE_META = exports.LEAVE_STATUS_META = exports.PRESENCE_META = exports.EMPLOYEE_STATUS_META = exports.EMPLOYMENT_META = exports.toneSlot = exports.toneColor = exports.clampRating = exports.clampPct = exports.formatHours = exports.formatMoney = exports.StatusPill = exports.PolicyAcknowledge = exports.ExpenseClaim = exports.ShiftSchedule = exports.BenefitsEnrollment = exports.OnboardingTask = exports.PerformanceReview = exports.TimesheetRow = exports.PayslipRow = exports.LeaveRequest = exports.DirectoryRow = exports.OrgChartNode = exports.EmployeeCard = void 0;
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
//# sourceMappingURL=index.js.map