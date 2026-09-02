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
import { clampPercent, metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import type { BenefitStatus, BenefitType, EmployeeStatus, EmploymentType, ExpenseCategory, ExpenseStatus, LeaveStatus, LeaveType, PayslipStatus, PolicyStatus, Presence, ReviewStatus, ShiftStatus, TaskStatus, TimesheetStatus } from '../internal';
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
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
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
export declare const PILL_TINT = 0.14;
/** How far a neutral identity chip's ground travels from the card toward its ink. */
export declare const CHIP_TINT = 0.06;
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
export declare const TONE_GROUND_TINT = 0.1;
/** The opaque ground a tone-tinted row paints. Web twin: `toneGround(tone)`. */
export declare function toneGround(theme: XenitionNativeTheme, tone: ToneV4): string;
/** The opaque ground a soft {@link StatusPillV4} paints, for a tone. */
export declare function pillGround(theme: XenitionNativeTheme, tone: ToneV4): string;
/**
 * The opaque ground a **neutral identity chip** paints.
 *
 * What a leave type, an employment arrangement, an expense category and a
 * benefit type wear now that they have no tone of their own. One ground for all
 * four, so the eye learns that a tinted chip means a state and a grey chip
 * means a kind.
 */
export declare function chipGround(theme: XenitionNativeTheme): string;
/**
 * The box a neutral identity chip draws — the shape a leave type, an employment
 * arrangement, an expense category and a benefit type wear.
 *
 * Composed once so the five components that render one cannot each arrive at a
 * slightly different pill, and so the *only* difference between an identity
 * chip and a status pill is the thing that matters: the tint.
 */
export declare function chipStyle(theme: XenitionNativeTheme): ViewStyle;
/** Employee lifecycle. */
export declare const EMPLOYEE_STATUS_V4: Record<EmployeeStatus, StatusMetaV4>;
/**
 * Presence.
 *
 * `away` drops from `warn` to `neutral`, which is the same correction
 * `chat/internal/thread-v4` made for the same enum: stepping away from a desk
 * is not a caution. `busy` keeps `danger` because "do not disturb" genuinely is
 * a stop signal.
 */
export declare const PRESENCE_V4: Record<Presence, StatusMetaV4>;
/** Leave request lifecycle. */
export declare const LEAVE_STATUS_V4: Record<LeaveStatus, StatusMetaV4>;
/** Payslip / payment status. */
export declare const PAYSLIP_STATUS_V4: Record<PayslipStatus, StatusMetaV4>;
/** Timesheet approval state. */
export declare const TIMESHEET_STATUS_V4: Record<TimesheetStatus, StatusMetaV4>;
/** Performance review lifecycle. */
export declare const REVIEW_STATUS_V4: Record<ReviewStatus, StatusMetaV4>;
/** Onboarding task state. */
export declare const TASK_STATUS_V4: Record<TaskStatus, StatusMetaV4>;
/** Benefits enrollment state. */
export declare const BENEFIT_STATUS_V4: Record<BenefitStatus, StatusMetaV4>;
/** Shift scheduling state. */
export declare const SHIFT_STATUS_V4: Record<ShiftStatus, StatusMetaV4>;
/** Expense claim lifecycle. */
export declare const EXPENSE_STATUS_V4: Record<ExpenseStatus, StatusMetaV4>;
/** Policy acknowledgement state. */
export declare const POLICY_STATUS_V4: Record<PolicyStatus, StatusMetaV4>;
/**
 * Employment arrangement.
 *
 * `contractor: warn` is gone. A contracting arrangement is a fact about a
 * contract, not a warning about a person, and a directory that paints every
 * contractor amber has said something the HR team did not mean.
 */
export declare const EMPLOYMENT_V4: Record<EmploymentType, IdentityMetaV4>;
/**
 * Category of leave.
 *
 * `sick: danger` and `parental: success` are gone — the two clearest cases in
 * the module of a status colour spent on a kind.
 */
export declare const LEAVE_TYPE_V4: Record<LeaveType, IdentityMetaV4>;
/** Category of an expense line. `software: success` is gone. */
export declare const EXPENSE_CATEGORY_V4: Record<ExpenseCategory, IdentityMetaV4>;
/** Kind of benefit plan. `retirement: success` is gone. */
export declare const BENEFIT_TYPE_V4: Record<BenefitType, IdentityMetaV4>;
//# sourceMappingURL=tone-v4.d.ts.map