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
export { EmployeeCard } from './EmployeeCard';
export type { EmployeeCardProps, EmployeeCardVariant, EmployeeContactAction, } from './EmployeeCard';
export { EmployeeCardV2 } from './EmployeeCardV2';
export type { EmployeeCardV2Props } from './EmployeeCardV2';
export { EmployeeCardV3 } from './EmployeeCardV3';
export type { EmployeeCardV3Props } from './EmployeeCardV3';
export { OrgChartNode } from './OrgChartNode';
export type { OrgChartNodeProps, OrgChartNodeVariant } from './OrgChartNode';
export { DirectoryRow } from './DirectoryRow';
export type { DirectoryRowProps, DirectoryRowVariant } from './DirectoryRow';
export { LeaveRequest } from './LeaveRequest';
export type { LeaveRequestProps, LeaveRequestVariant } from './LeaveRequest';
export { LeaveRequestV2 } from './LeaveRequestV2';
export type { LeaveRequestV2Props } from './LeaveRequestV2';
export { LeaveRequestV3 } from './LeaveRequestV3';
export type { LeaveRequestV3Props } from './LeaveRequestV3';
export { PayslipRow } from './PayslipRow';
export type { PayslipRowProps, PayslipRowVariant } from './PayslipRow';
export { PayslipRowV2 } from './PayslipRowV2';
export type { PayslipRowV2Props } from './PayslipRowV2';
export { PayslipRowV3 } from './PayslipRowV3';
export type { PayslipRowV3Props } from './PayslipRowV3';
export { TimesheetRow } from './TimesheetRow';
export type { TimesheetRowProps, TimesheetRowVariant } from './TimesheetRow';
export { PerformanceReview } from './PerformanceReview';
export type { PerformanceReviewProps, PerformanceReviewVariant } from './PerformanceReview';
export { PerformanceReviewV2 } from './PerformanceReviewV2';
export type { PerformanceReviewV2Props } from './PerformanceReviewV2';
export { PerformanceReviewV3 } from './PerformanceReviewV3';
export type { PerformanceReviewV3Props } from './PerformanceReviewV3';
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
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export { formatMoney, formatHours, clampPct, clampRating, toneTextClass, TONE_TEXT_CLASS, EMPLOYMENT_META, EMPLOYEE_STATUS_META, PRESENCE_META, LEAVE_STATUS_META, LEAVE_TYPE_META, PAYSLIP_STATUS_META, TIMESHEET_STATUS_META, REVIEW_STATUS_META, TASK_STATUS_META, BENEFIT_STATUS_META, BENEFIT_TYPE_META, SHIFT_STATUS_META, EXPENSE_STATUS_META, EXPENSE_CATEGORY_META, POLICY_STATUS_META, } from './internal';
export type { HrTone, StatusMeta, EmploymentType, EmployeeStatus, Presence, LeaveStatus, LeaveType, PayslipStatus, TimesheetStatus, ReviewStatus, TaskStatus, BenefitStatus, BenefitType, ShiftStatus, ExpenseStatus, ExpenseCategory, PolicyStatus, } from './internal';
export { BenefitsEnrollmentV4 } from './BenefitsEnrollmentV4';
export type { BenefitsEnrollmentV4Props } from './BenefitsEnrollmentV4';
export { DirectoryRowV4 } from './DirectoryRowV4';
export type { DirectoryRowV4Props } from './DirectoryRowV4';
export { EmployeeCardV4 } from './EmployeeCardV4';
export type { EmployeeCardV4Props } from './EmployeeCardV4';
export { ExpenseClaimV4 } from './ExpenseClaimV4';
export type { ExpenseClaimV4Props } from './ExpenseClaimV4';
export { LeaveRequestV4 } from './LeaveRequestV4';
export type { LeaveRequestV4Props } from './LeaveRequestV4';
export { OnboardingTaskV4 } from './OnboardingTaskV4';
export type { OnboardingTaskV4Props } from './OnboardingTaskV4';
export { OrgChartNodeV4 } from './OrgChartNodeV4';
export type { OrgChartNodeV4Props } from './OrgChartNodeV4';
export { PayslipRowV4 } from './PayslipRowV4';
export type { PayslipRowV4Props } from './PayslipRowV4';
export { PerformanceReviewV4 } from './PerformanceReviewV4';
export type { PerformanceReviewV4Props } from './PerformanceReviewV4';
export { PolicyAcknowledgeV4 } from './PolicyAcknowledgeV4';
export type { PolicyAcknowledgeV4Props } from './PolicyAcknowledgeV4';
export { ShiftScheduleV4 } from './ShiftScheduleV4';
export type { ShiftScheduleV4Props } from './ShiftScheduleV4';
export { StatusPillV4 } from './StatusPillV4';
export type { StatusPillV4Props } from './StatusPillV4';
export { TimesheetRowV4 } from './TimesheetRowV4';
export type { TimesheetRowV4Props } from './TimesheetRowV4';
export { LeaveBalanceV4 } from './LeaveBalanceV4';
export type { LeaveBalanceV4Props, LeaveBalanceV4Variant } from './LeaveBalanceV4';
export { ApprovalQueueV4 } from './ApprovalQueueV4';
export type { ApprovalQueueV4Props } from './ApprovalQueueV4';
export { ratingParts, hoursParts, deductionParts, isAdverse, pluralizeCount, } from './workforce-v4';
export type { RatingParts, HoursParts, AmountParts, AmountDirection } from './workforce-v4';
//# sourceMappingURL=index.d.ts.map