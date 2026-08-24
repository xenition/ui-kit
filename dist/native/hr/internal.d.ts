/**
 * Shared vocabulary for the HR / people-ops module: leave, payroll, timesheet,
 * performance, onboarding, benefits, shift, expense and policy statuses. Every
 * status is expressed as a **glyph + label + tone** triple so a component can
 * convey state by text and icon — never by color alone (the accessibility half
 * of the token contract). `tone` values are `SemanticColors`-compatible keys
 * that also map 1:1 onto the `Badge` / `Tag` tone scale, so one status drives a
 * badge and a text color from a single source of truth.
 */
import type { SemanticColors } from '../theme';
import { formatMoney } from '../commerce/money';
export { formatMoney };
/** Tone keys shared by `Badge`, `Tag` and the text-color resolver below. */
export type HrTone = 'neutral' | 'primary' | 'success' | 'warn' | 'danger' | 'accent';
export interface StatusMeta {
    /** Non-color glyph carrying the meaning (emoji or unicode symbol). */
    glyph: string;
    /** Human label — the text half of the text+glyph contract. */
    label: string;
    /** Semantic tone (drives Badge/Tag + text color). */
    tone: HrTone;
}
/**
 * Resolve an {@link HrTone} to a concrete token hex for text/icon color.
 * `neutral` maps to `muted`; everything else is a direct `SemanticColors` slot,
 * so the returned value is always a compiled-theme token, never a literal.
 */
export declare function toneColor(colors: SemanticColors, tone: HrTone): string;
/** Map an {@link HrTone} to a `SemanticColors` key (for `color=` props). */
export declare function toneSlot(tone: HrTone): keyof SemanticColors;
/** Employment arrangement. */
export type EmploymentType = 'fullTime' | 'partTime' | 'contractor' | 'intern';
export declare const EMPLOYMENT_META: Record<EmploymentType, StatusMeta>;
/** Employee lifecycle state. */
export type EmployeeStatus = 'active' | 'onLeave' | 'terminated' | 'probation';
export declare const EMPLOYEE_STATUS_META: Record<EmployeeStatus, StatusMeta>;
/** Presence for the directory (mirrors the primitive Avatar status set). */
export type Presence = 'online' | 'away' | 'busy' | 'offline';
export declare const PRESENCE_META: Record<Presence, StatusMeta>;
/** Leave request lifecycle. */
export type LeaveStatus = 'pending' | 'approved' | 'denied' | 'cancelled';
export declare const LEAVE_STATUS_META: Record<LeaveStatus, StatusMeta>;
/** Category of leave. */
export type LeaveType = 'vacation' | 'sick' | 'personal' | 'parental' | 'unpaid';
export declare const LEAVE_TYPE_META: Record<LeaveType, StatusMeta>;
/** Payslip / payment status. */
export type PayslipStatus = 'paid' | 'processing' | 'pending' | 'failed';
export declare const PAYSLIP_STATUS_META: Record<PayslipStatus, StatusMeta>;
/** Timesheet entry approval state. */
export type TimesheetStatus = 'draft' | 'submitted' | 'approved' | 'rejected';
export declare const TIMESHEET_STATUS_META: Record<TimesheetStatus, StatusMeta>;
/** Performance review lifecycle. */
export type ReviewStatus = 'notStarted' | 'inProgress' | 'submitted' | 'completed';
export declare const REVIEW_STATUS_META: Record<ReviewStatus, StatusMeta>;
/** Onboarding task state. */
export type TaskStatus = 'todo' | 'inProgress' | 'done' | 'blocked';
export declare const TASK_STATUS_META: Record<TaskStatus, StatusMeta>;
/** Benefits enrollment state. */
export type BenefitStatus = 'enrolled' | 'eligible' | 'pending' | 'waived';
export declare const BENEFIT_STATUS_META: Record<BenefitStatus, StatusMeta>;
/** Kind of benefit plan. */
export type BenefitType = 'health' | 'dental' | 'vision' | 'retirement' | 'life';
export declare const BENEFIT_TYPE_META: Record<BenefitType, StatusMeta>;
/** Shift scheduling state. */
export type ShiftStatus = 'open' | 'scheduled' | 'confirmed' | 'swapRequested';
export declare const SHIFT_STATUS_META: Record<ShiftStatus, StatusMeta>;
/** Expense claim lifecycle. */
export type ExpenseStatus = 'draft' | 'submitted' | 'approved' | 'reimbursed' | 'rejected';
export declare const EXPENSE_STATUS_META: Record<ExpenseStatus, StatusMeta>;
/** Category of an expense line. */
export type ExpenseCategory = 'travel' | 'meals' | 'lodging' | 'supplies' | 'software' | 'other';
export declare const EXPENSE_CATEGORY_META: Record<ExpenseCategory, StatusMeta>;
/** Policy acknowledgement state. */
export type PolicyStatus = 'acknowledged' | 'pending' | 'overdue';
export declare const POLICY_STATUS_META: Record<PolicyStatus, StatusMeta>;
/** Clamp a 0–100 percentage into range, tolerating undefined/NaN. */
export declare function clampPct(value: number | undefined): number;
/**
 * Clamp a 0…max rating into range (default max 5), tolerating undefined/NaN.
 * Used by the performance review star meter.
 */
export declare function clampRating(value: number | undefined, max?: number): number;
/**
 * Format decimal hours as a stable `Hh Mm` string (e.g. `7.5` → `7h 30m`).
 * Guards NaN/negatives to `0h 0m`; used by timesheet + shift rows.
 */
export declare function formatHours(hours: number | undefined): string;
//# sourceMappingURL=internal.d.ts.map