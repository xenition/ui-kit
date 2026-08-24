/**
 * Shared vocabulary for the **web** HR / people-ops module — the DOM parity of
 * `native/hr/internal.ts`. Every status is expressed as a **glyph + label +
 * tone** triple so a component conveys state by text and icon, never by color
 * alone (the accessibility half of the token contract). `tone` values map 1:1
 * onto a `text-*` token class via {@link toneTextClass} / {@link TONE_TEXT_CLASS},
 * so one status drives a token-bound text color from a single source of truth —
 * no literal colors. Money is carried as integer **cents** and funnelled through
 * the shared {@link formatMoney} for stable 2-decimal output.
 */
import { formatMoney } from '../commerce';

export { formatMoney };

/** Tone keys shared by the status metas and the token-class resolver below. */
export type HrTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';

export interface StatusMeta {
  /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
  glyph: string;
  /** Human label — the text half of the text+glyph contract. */
  label: string;
  /** Semantic tone (drives the token text class). */
  tone: HrTone;
}

/** Map an {@link HrTone} to a token-bound `text-*` class (never a literal). */
export const TONE_TEXT_CLASS: Record<HrTone, string> = {
  neutral: 'text-muted',
  primary: 'text-primary',
  success: 'text-success',
  warn: 'text-warn',
  danger: 'text-danger',
  accent: 'text-accent',
};

/** Resolve an {@link HrTone} to its token `text-*` class. */
export function toneTextClass(tone: HrTone): string {
  return TONE_TEXT_CLASS[tone];
}

// ── employment ────────────────────────────────────────────────────────────

/** Employment arrangement. */
export type EmploymentType = 'fullTime' | 'partTime' | 'contractor' | 'intern';

export const EMPLOYMENT_META: Record<EmploymentType, StatusMeta> = {
  fullTime: { glyph: '●', label: 'Full-time', tone: 'primary' },
  partTime: { glyph: '◐', label: 'Part-time', tone: 'accent' },
  contractor: { glyph: '◇', label: 'Contractor', tone: 'warn' },
  intern: { glyph: '○', label: 'Intern', tone: 'neutral' },
};

/** Employee lifecycle state. */
export type EmployeeStatus = 'active' | 'onLeave' | 'terminated' | 'probation';

export const EMPLOYEE_STATUS_META: Record<EmployeeStatus, StatusMeta> = {
  active: { glyph: '✓', label: 'Active', tone: 'success' },
  onLeave: { glyph: '⏸', label: 'On leave', tone: 'warn' },
  terminated: { glyph: '✕', label: 'Terminated', tone: 'danger' },
  probation: { glyph: '◔', label: 'Probation', tone: 'primary' },
};

/** Presence for the directory. */
export type Presence = 'online' | 'away' | 'busy' | 'offline';

export const PRESENCE_META: Record<Presence, StatusMeta> = {
  online: { glyph: '●', label: 'Online', tone: 'success' },
  away: { glyph: '◐', label: 'Away', tone: 'warn' },
  busy: { glyph: '⊘', label: 'Busy', tone: 'danger' },
  offline: { glyph: '○', label: 'Offline', tone: 'neutral' },
};

// ── leave ───────────────────────────────────────────────────────────────

/** Leave request lifecycle. */
export type LeaveStatus = 'pending' | 'approved' | 'denied' | 'cancelled';

export const LEAVE_STATUS_META: Record<LeaveStatus, StatusMeta> = {
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  denied: { glyph: '✕', label: 'Denied', tone: 'danger' },
  cancelled: { glyph: '⊘', label: 'Cancelled', tone: 'neutral' },
};

/** Category of leave. */
export type LeaveType = 'vacation' | 'sick' | 'personal' | 'parental' | 'unpaid';

export const LEAVE_TYPE_META: Record<LeaveType, StatusMeta> = {
  vacation: { glyph: '🏖', label: 'Vacation', tone: 'primary' },
  sick: { glyph: '🤒', label: 'Sick', tone: 'danger' },
  personal: { glyph: '🙂', label: 'Personal', tone: 'accent' },
  parental: { glyph: '👶', label: 'Parental', tone: 'success' },
  unpaid: { glyph: '💤', label: 'Unpaid', tone: 'neutral' },
};

// ── payroll ─────────────────────────────────────────────────────────────

/** Payslip / payment status. */
export type PayslipStatus = 'paid' | 'processing' | 'pending' | 'failed';

export const PAYSLIP_STATUS_META: Record<PayslipStatus, StatusMeta> = {
  paid: { glyph: '✓', label: 'Paid', tone: 'success' },
  processing: { glyph: '◔', label: 'Processing', tone: 'primary' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
};

// ── timesheet ───────────────────────────────────────────────────────────

/** Timesheet entry approval state. */
export type TimesheetStatus = 'draft' | 'submitted' | 'approved' | 'rejected';

export const TIMESHEET_STATUS_META: Record<TimesheetStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};

// ── performance ─────────────────────────────────────────────────────────

/** Performance review lifecycle. */
export type ReviewStatus = 'notStarted' | 'inProgress' | 'submitted' | 'completed';

export const REVIEW_STATUS_META: Record<ReviewStatus, StatusMeta> = {
  notStarted: { glyph: '○', label: 'Not started', tone: 'neutral' },
  inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
  submitted: { glyph: '➤', label: 'Submitted', tone: 'accent' },
  completed: { glyph: '✓', label: 'Completed', tone: 'success' },
};

// ── onboarding ──────────────────────────────────────────────────────────

/** Onboarding task state. */
export type TaskStatus = 'todo' | 'inProgress' | 'done' | 'blocked';

export const TASK_STATUS_META: Record<TaskStatus, StatusMeta> = {
  todo: { glyph: '○', label: 'To do', tone: 'neutral' },
  inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
  done: { glyph: '✓', label: 'Done', tone: 'success' },
  blocked: { glyph: '⛔', label: 'Blocked', tone: 'danger' },
};

// ── benefits ────────────────────────────────────────────────────────────

/** Benefits enrollment state. */
export type BenefitStatus = 'enrolled' | 'eligible' | 'pending' | 'waived';

export const BENEFIT_STATUS_META: Record<BenefitStatus, StatusMeta> = {
  enrolled: { glyph: '✓', label: 'Enrolled', tone: 'success' },
  eligible: { glyph: '●', label: 'Eligible', tone: 'primary' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  waived: { glyph: '✕', label: 'Waived', tone: 'neutral' },
};

/** Kind of benefit plan. */
export type BenefitType = 'health' | 'dental' | 'vision' | 'retirement' | 'life';

export const BENEFIT_TYPE_META: Record<BenefitType, StatusMeta> = {
  health: { glyph: '🩺', label: 'Health', tone: 'primary' },
  dental: { glyph: '🦷', label: 'Dental', tone: 'accent' },
  vision: { glyph: '👓', label: 'Vision', tone: 'primary' },
  retirement: { glyph: '🏦', label: 'Retirement', tone: 'success' },
  life: { glyph: '🛡', label: 'Life', tone: 'neutral' },
};

// ── shift ───────────────────────────────────────────────────────────────

/** Shift scheduling state. */
export type ShiftStatus = 'open' | 'scheduled' | 'confirmed' | 'swapRequested';

export const SHIFT_STATUS_META: Record<ShiftStatus, StatusMeta> = {
  open: { glyph: '○', label: 'Open', tone: 'warn' },
  scheduled: { glyph: '●', label: 'Scheduled', tone: 'primary' },
  confirmed: { glyph: '✓', label: 'Confirmed', tone: 'success' },
  swapRequested: { glyph: '⇄', label: 'Swap requested', tone: 'accent' },
};

// ── expense ─────────────────────────────────────────────────────────────

/** Expense claim lifecycle. */
export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'reimbursed' | 'rejected';

export const EXPENSE_STATUS_META: Record<ExpenseStatus, StatusMeta> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  reimbursed: { glyph: '💵', label: 'Reimbursed', tone: 'accent' },
  rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};

/** Category of an expense line. */
export type ExpenseCategory =
  | 'travel'
  | 'meals'
  | 'lodging'
  | 'supplies'
  | 'software'
  | 'other';

export const EXPENSE_CATEGORY_META: Record<ExpenseCategory, StatusMeta> = {
  travel: { glyph: '✈', label: 'Travel', tone: 'primary' },
  meals: { glyph: '🍽', label: 'Meals', tone: 'accent' },
  lodging: { glyph: '🏨', label: 'Lodging', tone: 'primary' },
  supplies: { glyph: '📦', label: 'Supplies', tone: 'neutral' },
  software: { glyph: '💻', label: 'Software', tone: 'success' },
  other: { glyph: '•', label: 'Other', tone: 'neutral' },
};

// ── policy ──────────────────────────────────────────────────────────────

/** Policy acknowledgement state. */
export type PolicyStatus = 'acknowledged' | 'pending' | 'overdue';

export const POLICY_STATUS_META: Record<PolicyStatus, StatusMeta> = {
  acknowledged: { glyph: '✓', label: 'Acknowledged', tone: 'success' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  overdue: { glyph: '⚠', label: 'Overdue', tone: 'danger' },
};

// ── numeric helpers ─────────────────────────────────────────────────────

/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export function clampPct(value: number | undefined): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(100, Math.round(value)));
}

/**
 * Clamp a 0…max rating into range (default max 5), tolerating undefined/NaN.
 * Used by the performance review star meter.
 */
export function clampRating(value: number | undefined, max = 5): number {
  if (value == null || !Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(max, value));
}

/**
 * Format decimal hours as a stable `Hh Mm` string (e.g. `7.5` → `7h 30m`).
 * Guards NaN/negatives to `0h 0m`; used by timesheet + shift rows.
 */
export function formatHours(hours: number | undefined): string {
  const h = hours == null || !Number.isFinite(hours) || hours < 0 ? 0 : hours;
  const whole = Math.floor(h);
  const mins = Math.round((h - whole) * 60);
  if (mins === 60) return `${whole + 1}h 0m`;
  return `${whole}h ${mins}m`;
}
