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
export type {
  EmployeeCardProps,
  EmployeeCardVariant,
  EmployeeContactAction,
} from './EmployeeCard';

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

// ── shared status vocabulary + reusable pill ──────────────────────────────
export { StatusPill } from './StatusPill';
export type { StatusPillProps, StatusPillVariant, StatusPillSize } from './StatusPill';
export {
  formatMoney,
  formatHours,
  clampPct,
  clampRating,
  toneTextClass,
  TONE_TEXT_CLASS,
  EMPLOYMENT_META,
  EMPLOYEE_STATUS_META,
  PRESENCE_META,
  LEAVE_STATUS_META,
  LEAVE_TYPE_META,
  PAYSLIP_STATUS_META,
  TIMESHEET_STATUS_META,
  REVIEW_STATUS_META,
  TASK_STATUS_META,
  BENEFIT_STATUS_META,
  BENEFIT_TYPE_META,
  SHIFT_STATUS_META,
  EXPENSE_STATUS_META,
  EXPENSE_CATEGORY_META,
  POLICY_STATUS_META,
} from './internal';
export type {
  HrTone,
  StatusMeta,
  EmploymentType,
  EmployeeStatus,
  Presence,
  LeaveStatus,
  LeaveType,
  PayslipStatus,
  TimesheetStatus,
  ReviewStatus,
  TaskStatus,
  BenefitStatus,
  BenefitType,
  ShiftStatus,
  ExpenseStatus,
  ExpenseCategory,
  PolicyStatus,
} from './internal';
