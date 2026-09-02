/**
 * The `hr` module's V4 vocabulary on native: which statuses take which ink, and
 * which enums are **identity** and therefore take no tone at all.
 *
 * The arithmetic — ratings, hours, deductions, adverse statuses — lives in
 * `src/hr/workforce-v4.ts` and is shared by both twins. The tone→ink table
 * lives in `primitives/internal/tone-v4`. What is here is the part that is
 * specific to people-ops: eighteen enums, and the line between the ones that
 * describe a **state** and the ones that describe a **kind**.
 *
 * ## Why the identity tables lost their `tone`
 *
 * `internal.ts` gives every enum in the module the same `{ glyph, label, tone }`
 * triple, which reads as symmetry and is actually a category error. `sick`
 * leave is `danger`. `parental` leave is `success`. A `contractor` is `warn`.
 * `software` expenses are `success` and `meals` are `accent`. None of those is
 * a state — nobody is in trouble for being a contractor, and a birth is not a
 * success condition of the payroll system. Spending the alarm colours on a
 * category means that by the time something genuinely *is* wrong, the screen
 * has already used red for a doctor's note and green for a laptop.
 *
 * So the identity tables here are {@link IdentityMetaV4} — `{ glyph, label }`
 * and nothing else. There is no `tone` field to misuse, which is the point: the
 * fix is structural rather than a set of edits that the next table can undo.
 * Identity is carried by the glyph and the word, on a neutral chip
 * ({@link chipGround}).
 *
 * The status tables keep their tones, because a denied request, a failed
 * payment and a blocked task are exactly what `danger` is for.
 *
 * Nothing in this file is exported from the package.
 */

import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { mixToken } from '../../../primitives/internal/v4-depth';
import {
  clampPercent,
  metaLine,
  onPair,
  skeletonFill,
  toneFill,
  toneInk,
  type ToneV4,
} from '../../primitives/internal/tone-v4';
import type {
  BenefitStatus,
  BenefitType,
  EmployeeStatus,
  EmploymentType,
  ExpenseCategory,
  ExpenseStatus,
  LeaveStatus,
  LeaveType,
  PayslipStatus,
  PolicyStatus,
  Presence,
  ReviewStatus,
  ShiftStatus,
  TaskStatus,
  TimesheetStatus,
} from '../internal';

export { clampPercent, metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };

/** A **state** — glyph, word and the tone that state legitimately owns. */
export interface StatusMetaV4 {
  /** Non-colour glyph carrying the meaning. */
  glyph: string;
  /** The word half of the glyph+word contract. */
  label: string;
  /** The tone. Only ever a state; see the module doc. */
  tone: ToneV4;
}

/**
 * A **kind** — glyph and word, and deliberately no tone.
 *
 * A leave type, an employment arrangement, an expense category and a benefit
 * type are all identity. They are told apart by their glyph and their word.
 */
export interface IdentityMetaV4 {
  glyph: string;
  label: string;
}

/**
 * Join the parts of a row into one spoken sentence.
 *
 * Commas rather than {@link metaLine}'s middle dot: a screen reader either says
 * "middle dot" out loud or swallows the pause entirely, and this string is read
 * aloud rather than drawn.
 */
export function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string {
  return parts
    .filter((part): part is string | number => part != null && part !== '')
    .map(String)
    .join(', ');
}

/**
 * How far a soft pill's ground travels from the card toward its tone.
 *
 * The base wrote `withAlpha(tint, 0.14)` at every call site — a *translucent*
 * wash, so the same pill was a different colour on a card, on a tinted row and
 * over the page. Composited once here, against `card`, so it is opaque and the
 * label's contrast against it is a fixed quantity. The step is `calendar`'s
 * `BLOCK_TINT` rounded to the same neighbourhood, so a status pill and an
 * event block read as the same strength of tint.
 */
export const PILL_TINT = 0.14;

/** How far a neutral identity chip's ground travels from the card toward its ink. */
export const CHIP_TINT = 0.06;

/**
 * How far a tone-tinted **row ground** travels from the card toward its tone.
 *
 * The native spelling of the web twin's `toneGround`, at the same 10%. An open
 * shift is the one row in this module that paints its whole ground from a
 * status tone, and the base did it with `withAlpha(tone, 0.08)` — translucent,
 * so the row was a different colour on a card than on the page, and a different
 * colour again from whatever the web twin's own hand-rolled alpha produced.
 * Composited, named, and the same number on both platforms.
 */
export const TONE_GROUND_TINT = 0.1;

/** The opaque ground a tone-tinted row paints. Web twin: `toneGround(tone)`. */
export function toneGround(theme: XenitionNativeTheme, tone: ToneV4): string {
  return mixToken(theme.colors.card, toneFill(theme, tone), TONE_GROUND_TINT);
}

/** The opaque ground a soft {@link StatusPillV4} paints, for a tone. */
export function pillGround(theme: XenitionNativeTheme, tone: ToneV4): string {
  return mixToken(theme.colors.card, toneFill(theme, tone), PILL_TINT);
}

/**
 * The opaque ground a **neutral identity chip** paints.
 *
 * What a leave type, an employment arrangement, an expense category and a
 * benefit type wear now that they have no tone of their own. One ground for all
 * four, so the eye learns that a tinted chip means a state and a grey chip
 * means a kind.
 */
export function chipGround(theme: XenitionNativeTheme): string {
  return mixToken(theme.colors.card, theme.colors.onCard, CHIP_TINT);
}

/**
 * The box a neutral identity chip draws — the shape a leave type, an employment
 * arrangement, an expense category and a benefit type wear.
 *
 * Composed once so the five components that render one cannot each arrive at a
 * slightly different pill, and so the *only* difference between an identity
 * chip and a status pill is the thing that matters: the tint.
 */
export function chipStyle(theme: XenitionNativeTheme): ViewStyle {
  const { spacing, radius } = theme.tokens;
  return {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: spacing.xs / 2,
    paddingVertical: spacing.xs / 2,
    paddingHorizontal: spacing.xs,
    borderRadius: radius.full,
    backgroundColor: chipGround(theme),
  };
}

// ── states ──────────────────────────────────────────────────────────────

/** Employee lifecycle. */
export const EMPLOYEE_STATUS_V4: Record<EmployeeStatus, StatusMetaV4> = {
  active: { glyph: '✓', label: 'Active', tone: 'success' },
  onLeave: { glyph: '⏸', label: 'On leave', tone: 'warn' },
  terminated: { glyph: '✕', label: 'Terminated', tone: 'danger' },
  probation: { glyph: '◔', label: 'Probation', tone: 'primary' },
};

/**
 * Presence.
 *
 * `away` drops from `warn` to `neutral`, which is the same correction
 * `chat/internal/thread-v4` made for the same enum: stepping away from a desk
 * is not a caution. `busy` keeps `danger` because "do not disturb" genuinely is
 * a stop signal.
 */
export const PRESENCE_V4: Record<Presence, StatusMetaV4> = {
  online: { glyph: '●', label: 'Online', tone: 'success' },
  away: { glyph: '◐', label: 'Away', tone: 'neutral' },
  busy: { glyph: '⊘', label: 'Busy', tone: 'danger' },
  offline: { glyph: '○', label: 'Offline', tone: 'neutral' },
};

/** Leave request lifecycle. */
export const LEAVE_STATUS_V4: Record<LeaveStatus, StatusMetaV4> = {
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  denied: { glyph: '✕', label: 'Denied', tone: 'danger' },
  cancelled: { glyph: '⊘', label: 'Cancelled', tone: 'neutral' },
};

/** Payslip / payment status. */
export const PAYSLIP_STATUS_V4: Record<PayslipStatus, StatusMetaV4> = {
  paid: { glyph: '✓', label: 'Paid', tone: 'success' },
  processing: { glyph: '◔', label: 'Processing', tone: 'primary' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
};

/** Timesheet approval state. */
export const TIMESHEET_STATUS_V4: Record<TimesheetStatus, StatusMetaV4> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};

/** Performance review lifecycle. */
export const REVIEW_STATUS_V4: Record<ReviewStatus, StatusMetaV4> = {
  notStarted: { glyph: '○', label: 'Not started', tone: 'neutral' },
  inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
  submitted: { glyph: '➤', label: 'Submitted', tone: 'accent' },
  completed: { glyph: '✓', label: 'Completed', tone: 'success' },
};

/** Onboarding task state. */
export const TASK_STATUS_V4: Record<TaskStatus, StatusMetaV4> = {
  todo: { glyph: '○', label: 'To do', tone: 'neutral' },
  inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
  done: { glyph: '✓', label: 'Done', tone: 'success' },
  blocked: { glyph: '⛔', label: 'Blocked', tone: 'danger' },
};

/** Benefits enrollment state. */
export const BENEFIT_STATUS_V4: Record<BenefitStatus, StatusMetaV4> = {
  enrolled: { glyph: '✓', label: 'Enrolled', tone: 'success' },
  eligible: { glyph: '●', label: 'Eligible', tone: 'primary' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  waived: { glyph: '✕', label: 'Waived', tone: 'neutral' },
};

/** Shift scheduling state. */
export const SHIFT_STATUS_V4: Record<ShiftStatus, StatusMetaV4> = {
  open: { glyph: '○', label: 'Open', tone: 'warn' },
  scheduled: { glyph: '●', label: 'Scheduled', tone: 'primary' },
  confirmed: { glyph: '✓', label: 'Confirmed', tone: 'success' },
  swapRequested: { glyph: '⇄', label: 'Swap requested', tone: 'accent' },
};

/** Expense claim lifecycle. */
export const EXPENSE_STATUS_V4: Record<ExpenseStatus, StatusMetaV4> = {
  draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
  submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
  approved: { glyph: '✓', label: 'Approved', tone: 'success' },
  reimbursed: { glyph: '💵', label: 'Reimbursed', tone: 'accent' },
  rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};

/** Policy acknowledgement state. */
export const POLICY_STATUS_V4: Record<PolicyStatus, StatusMetaV4> = {
  acknowledged: { glyph: '✓', label: 'Acknowledged', tone: 'success' },
  pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
  overdue: { glyph: '⚠', label: 'Overdue', tone: 'danger' },
};

// ── identity — glyph and word, no tone ──────────────────────────────────

/**
 * Employment arrangement.
 *
 * `contractor: warn` is gone. A contracting arrangement is a fact about a
 * contract, not a warning about a person, and a directory that paints every
 * contractor amber has said something the HR team did not mean.
 */
export const EMPLOYMENT_V4: Record<EmploymentType, IdentityMetaV4> = {
  fullTime: { glyph: '●', label: 'Full-time' },
  partTime: { glyph: '◐', label: 'Part-time' },
  contractor: { glyph: '◇', label: 'Contractor' },
  intern: { glyph: '○', label: 'Intern' },
};

/**
 * Category of leave.
 *
 * `sick: danger` and `parental: success` are gone — the two clearest cases in
 * the module of a status colour spent on a kind.
 */
export const LEAVE_TYPE_V4: Record<LeaveType, IdentityMetaV4> = {
  vacation: { glyph: '🏖', label: 'Vacation' },
  sick: { glyph: '🤒', label: 'Sick' },
  personal: { glyph: '🙂', label: 'Personal' },
  parental: { glyph: '👶', label: 'Parental' },
  unpaid: { glyph: '💤', label: 'Unpaid' },
};

/** Category of an expense line. `software: success` is gone. */
export const EXPENSE_CATEGORY_V4: Record<ExpenseCategory, IdentityMetaV4> = {
  travel: { glyph: '✈', label: 'Travel' },
  meals: { glyph: '🍽', label: 'Meals' },
  lodging: { glyph: '🏨', label: 'Lodging' },
  supplies: { glyph: '📦', label: 'Supplies' },
  software: { glyph: '💻', label: 'Software' },
  other: { glyph: '•', label: 'Other' },
};

/** Kind of benefit plan. `retirement: success` is gone. */
export const BENEFIT_TYPE_V4: Record<BenefitType, IdentityMetaV4> = {
  health: { glyph: '🩺', label: 'Health' },
  dental: { glyph: '🦷', label: 'Dental' },
  vision: { glyph: '👓', label: 'Vision' },
  retirement: { glyph: '🏦', label: 'Retirement' },
  life: { glyph: '🛡', label: 'Life' },
};
