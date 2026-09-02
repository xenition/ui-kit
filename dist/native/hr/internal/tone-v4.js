"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.BENEFIT_TYPE_V4 = exports.EXPENSE_CATEGORY_V4 = exports.LEAVE_TYPE_V4 = exports.EMPLOYMENT_V4 = exports.POLICY_STATUS_V4 = exports.EXPENSE_STATUS_V4 = exports.SHIFT_STATUS_V4 = exports.BENEFIT_STATUS_V4 = exports.TASK_STATUS_V4 = exports.REVIEW_STATUS_V4 = exports.TIMESHEET_STATUS_V4 = exports.PAYSLIP_STATUS_V4 = exports.LEAVE_STATUS_V4 = exports.PRESENCE_V4 = exports.EMPLOYEE_STATUS_V4 = exports.TONE_GROUND_TINT = exports.CHIP_TINT = exports.PILL_TINT = exports.toneInk = exports.toneFill = exports.skeletonFill = exports.onPair = exports.metaLine = exports.clampPercent = void 0;
exports.spokenLine = spokenLine;
exports.toneGround = toneGround;
exports.pillGround = pillGround;
exports.chipGround = chipGround;
exports.chipStyle = chipStyle;
const v4_depth_1 = require("../../../primitives/internal/v4-depth");
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "onPair", { enumerable: true, get: function () { return tone_v4_1.onPair; } });
Object.defineProperty(exports, "skeletonFill", { enumerable: true, get: function () { return tone_v4_1.skeletonFill; } });
Object.defineProperty(exports, "toneFill", { enumerable: true, get: function () { return tone_v4_1.toneFill; } });
Object.defineProperty(exports, "toneInk", { enumerable: true, get: function () { return tone_v4_1.toneInk; } });
/**
 * Join the parts of a row into one spoken sentence.
 *
 * Commas rather than {@link metaLine}'s middle dot: a screen reader either says
 * "middle dot" out loud or swallows the pause entirely, and this string is read
 * aloud rather than drawn.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
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
exports.PILL_TINT = 0.14;
/** How far a neutral identity chip's ground travels from the card toward its ink. */
exports.CHIP_TINT = 0.06;
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
exports.TONE_GROUND_TINT = 0.1;
/** The opaque ground a tone-tinted row paints. Web twin: `toneGround(tone)`. */
function toneGround(theme, tone) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, (0, tone_v4_1.toneFill)(theme, tone), exports.TONE_GROUND_TINT);
}
/** The opaque ground a soft {@link StatusPillV4} paints, for a tone. */
function pillGround(theme, tone) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, (0, tone_v4_1.toneFill)(theme, tone), exports.PILL_TINT);
}
/**
 * The opaque ground a **neutral identity chip** paints.
 *
 * What a leave type, an employment arrangement, an expense category and a
 * benefit type wear now that they have no tone of their own. One ground for all
 * four, so the eye learns that a tinted chip means a state and a grey chip
 * means a kind.
 */
function chipGround(theme) {
    return (0, v4_depth_1.mixToken)(theme.colors.card, theme.colors.onCard, exports.CHIP_TINT);
}
/**
 * The box a neutral identity chip draws — the shape a leave type, an employment
 * arrangement, an expense category and a benefit type wear.
 *
 * Composed once so the five components that render one cannot each arrive at a
 * slightly different pill, and so the *only* difference between an identity
 * chip and a status pill is the thing that matters: the tint.
 */
function chipStyle(theme) {
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
exports.EMPLOYEE_STATUS_V4 = {
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
exports.PRESENCE_V4 = {
    online: { glyph: '●', label: 'Online', tone: 'success' },
    away: { glyph: '◐', label: 'Away', tone: 'neutral' },
    busy: { glyph: '⊘', label: 'Busy', tone: 'danger' },
    offline: { glyph: '○', label: 'Offline', tone: 'neutral' },
};
/** Leave request lifecycle. */
exports.LEAVE_STATUS_V4 = {
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    denied: { glyph: '✕', label: 'Denied', tone: 'danger' },
    cancelled: { glyph: '⊘', label: 'Cancelled', tone: 'neutral' },
};
/** Payslip / payment status. */
exports.PAYSLIP_STATUS_V4 = {
    paid: { glyph: '✓', label: 'Paid', tone: 'success' },
    processing: { glyph: '◔', label: 'Processing', tone: 'primary' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    failed: { glyph: '✕', label: 'Failed', tone: 'danger' },
};
/** Timesheet approval state. */
exports.TIMESHEET_STATUS_V4 = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};
/** Performance review lifecycle. */
exports.REVIEW_STATUS_V4 = {
    notStarted: { glyph: '○', label: 'Not started', tone: 'neutral' },
    inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
    submitted: { glyph: '➤', label: 'Submitted', tone: 'accent' },
    completed: { glyph: '✓', label: 'Completed', tone: 'success' },
};
/** Onboarding task state. */
exports.TASK_STATUS_V4 = {
    todo: { glyph: '○', label: 'To do', tone: 'neutral' },
    inProgress: { glyph: '◔', label: 'In progress', tone: 'primary' },
    done: { glyph: '✓', label: 'Done', tone: 'success' },
    blocked: { glyph: '⛔', label: 'Blocked', tone: 'danger' },
};
/** Benefits enrollment state. */
exports.BENEFIT_STATUS_V4 = {
    enrolled: { glyph: '✓', label: 'Enrolled', tone: 'success' },
    eligible: { glyph: '●', label: 'Eligible', tone: 'primary' },
    pending: { glyph: '⋯', label: 'Pending', tone: 'warn' },
    waived: { glyph: '✕', label: 'Waived', tone: 'neutral' },
};
/** Shift scheduling state. */
exports.SHIFT_STATUS_V4 = {
    open: { glyph: '○', label: 'Open', tone: 'warn' },
    scheduled: { glyph: '●', label: 'Scheduled', tone: 'primary' },
    confirmed: { glyph: '✓', label: 'Confirmed', tone: 'success' },
    swapRequested: { glyph: '⇄', label: 'Swap requested', tone: 'accent' },
};
/** Expense claim lifecycle. */
exports.EXPENSE_STATUS_V4 = {
    draft: { glyph: '✎', label: 'Draft', tone: 'neutral' },
    submitted: { glyph: '➤', label: 'Submitted', tone: 'primary' },
    approved: { glyph: '✓', label: 'Approved', tone: 'success' },
    reimbursed: { glyph: '💵', label: 'Reimbursed', tone: 'accent' },
    rejected: { glyph: '✕', label: 'Rejected', tone: 'danger' },
};
/** Policy acknowledgement state. */
exports.POLICY_STATUS_V4 = {
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
exports.EMPLOYMENT_V4 = {
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
exports.LEAVE_TYPE_V4 = {
    vacation: { glyph: '🏖', label: 'Vacation' },
    sick: { glyph: '🤒', label: 'Sick' },
    personal: { glyph: '🙂', label: 'Personal' },
    parental: { glyph: '👶', label: 'Parental' },
    unpaid: { glyph: '💤', label: 'Unpaid' },
};
/** Category of an expense line. `software: success` is gone. */
exports.EXPENSE_CATEGORY_V4 = {
    travel: { glyph: '✈', label: 'Travel' },
    meals: { glyph: '🍽', label: 'Meals' },
    lodging: { glyph: '🏨', label: 'Lodging' },
    supplies: { glyph: '📦', label: 'Supplies' },
    software: { glyph: '💻', label: 'Software' },
    other: { glyph: '•', label: 'Other' },
};
/** Kind of benefit plan. `retirement: success` is gone. */
exports.BENEFIT_TYPE_V4 = {
    health: { glyph: '🩺', label: 'Health' },
    dental: { glyph: '🦷', label: 'Dental' },
    vision: { glyph: '👓', label: 'Vision' },
    retirement: { glyph: '🏦', label: 'Retirement' },
    life: { glyph: '🛡', label: 'Life' },
};
//# sourceMappingURL=tone-v4.js.map