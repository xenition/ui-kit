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
export { EmployeeCard } from './EmployeeCard';
export type { EmployeeCardProps, EmployeeCardVariant, EmployeeContactAction, } from './EmployeeCard';
export { OrgChartNode } from './OrgChartNode';
export type { OrgChartNodeProps, OrgChartNodeVariant } from './OrgChartNode';
export { DirectoryRow } from './DirectoryRow';
export type { DirectoryRowProps, DirectoryRowVariant } from './DirectoryRow';
export { LeaveRequest } from './LeaveRequest';
export type { LeaveRequestProps, LeaveRequestVariant } from './LeaveRequest';
export { PayslipRow } from './PayslipRow';
export type { PayslipRowProps, PayslipRowVariant } from './PayslipRow';
export { TimesheetRow } from './TimesheetRow';
export type { TimesheetRowProps, TimesheetRowVariant } from './TimesheetRow';
export { PerformanceReview } from './PerformanceReview';
export type { PerformanceReviewProps, PerformanceReviewVariant } from './PerformanceReview';
export { OnboardingTask } from './OnboardingTask';
export type { OnboardingTaskProps, OnboardingTaskVariant } from './OnboardingTask';
export { BenefitsEnrollment } from './BenefitsEnrollment';
export type { BenefitsEnrollmentProps, BenefitsEnrollmentVariant } from './BenefitsEnrollment';
export { ShiftSchedule } from './ShiftSchedule';
export type { ShiftScheduleProps, ShiftScheduleVariant, Shift } from './ShiftSchedule';
export { ExpenseClaim } from './ExpenseClaim';
export type { ExpenseClaimProps, ExpenseClaimVariant } from './ExpenseClaim';
export { PolicyAcknowledge } from './PolicyAcknowledge';
export type { PolicyAcknowledgeProps, PolicyAcknowledgeVariant } from './PolicyAcknowledge';
export { EmployeeCardV2 } from './EmployeeCardV2';
export type { EmployeeCardV2Props } from './EmployeeCardV2';
export { EmployeeCardV3 } from './EmployeeCardV3';
export type { EmployeeCardV3Props } from './EmployeeCardV3';
export { LeaveRequestV2 } from './LeaveRequestV2';
export type { LeaveRequestV2Props } from './LeaveRequestV2';
export { LeaveRequestV3 } from './LeaveRequestV3';
export type { LeaveRequestV3Props } from './LeaveRequestV3';
export { PayslipRowV2 } from './PayslipRowV2';
export type { PayslipRowV2Props } from './PayslipRowV2';
export { PayslipRowV3 } from './PayslipRowV3';
export type { PayslipRowV3Props } from './PayslipRowV3';
export { PerformanceReviewV2 } from './PerformanceReviewV2';
export type { PerformanceReviewV2Props } from './PerformanceReviewV2';
export { PerformanceReviewV3 } from './PerformanceReviewV3';
export type { PerformanceReviewV3Props } from './PerformanceReviewV3';
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export { formatMoney, formatHours, clampPct, clampRating, toneColor, toneSlot, EMPLOYMENT_META, EMPLOYEE_STATUS_META, PRESENCE_META, LEAVE_STATUS_META, LEAVE_TYPE_META, PAYSLIP_STATUS_META, TIMESHEET_STATUS_META, REVIEW_STATUS_META, TASK_STATUS_META, BENEFIT_STATUS_META, BENEFIT_TYPE_META, SHIFT_STATUS_META, EXPENSE_STATUS_META, EXPENSE_CATEGORY_META, POLICY_STATUS_META, } from './internal';
export type { HrTone, StatusMeta, EmploymentType, EmployeeStatus, Presence, LeaveStatus, LeaveType, PayslipStatus, TimesheetStatus, ReviewStatus, TaskStatus, BenefitStatus, BenefitType, ShiftStatus, ExpenseStatus, ExpenseCategory, PolicyStatus, } from './internal';
//# sourceMappingURL=index.d.ts.map