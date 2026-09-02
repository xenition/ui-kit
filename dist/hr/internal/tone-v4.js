"use strict";
/**
 * The `hr` module's own V4 vocabulary (web) — the twin of
 * `native/hr/internal/tone-v4.ts`.
 *
 * `src/hr/internal.ts` had the right idea — a glyph + label + tone triple per
 * status, so no component decides on its own what "denied" looks like — and
 * got two things wrong that every one of the thirteen components inherited
 * through it. This file corrects both without touching the base table, which
 * the base, V2 and V3 lines still read.
 *
 * ## What is corrected
 *
 * 1. **`TONE_TEXT_CLASS` inks text with fill slots.** It maps `success` to
 *    `text-success` and `neutral` to `text-muted`. Those are the **fill**
 *    tokens: the compiler guarantees contrast for `on-success` *against*
 *    `success`, and for `muted` it guarantees nothing at all — `muted` is a
 *    decorative ramp step. Every status word in the module was drawn with one
 *    of them. {@link toneInkClass} resolves the same tone to the
 *    contrast-corrected `*-text` slot instead.
 * 2. **Four of the tables spend a status colour on identity.** `sick: danger`,
 *    `parental: success`, `contractor: warn`, `software: success`,
 *    `retirement: success` — a leave *type*, an employment *arrangement*, an
 *    expense *category* and a benefit *kind* are none of them a status. A
 *    directory of contractors rendered amber, a team taking parental leave
 *    rendered green, and by the time the reader has seen five green things
 *    that are not good news the colour has stopped meaning anything. The `*_V4`
 *    tables below keep the glyph — which is what actually distinguishes a
 *    vacation from a sick day — and take the tone to `neutral`.
 *
 * Nothing here is exported from the package.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PAYSLIP_DATE_LABELS = exports.BENEFIT_TYPE_META_V4 = exports.EXPENSE_CATEGORY_META_V4 = exports.EMPLOYMENT_META_V4 = exports.LEAVE_TYPE_META_V4 = exports.PLACEHOLDER_CLASS = exports.TABULAR_CLASS = exports.MIN_TAP_CLASS = exports.MIN_TAP_SQUARE_CLASS = exports.FOCUS_RING_CLASS = exports.TONE_ON = exports.TONE_INK = exports.TONE_BG = exports.toneGround = exports.SKELETON_CLASS = exports.metaLine = exports.clampPercent = void 0;
exports.toneInkClass = toneInkClass;
exports.toneFillClass = toneFillClass;
exports.toneOnClass = toneOnClass;
exports.spokenLine = spokenLine;
exports.cardStateVars = cardStateVars;
exports.surfaceStateVars = surfaceStateVars;
exports.indentWidth = indentWidth;
const chrome_v4_1 = require("../../primitives/internal/chrome-v4");
Object.defineProperty(exports, "MIN_TAP_CLASS", { enumerable: true, get: function () { return chrome_v4_1.MIN_TAP_CLASS; } });
const v4_state_1 = require("../../primitives/internal/v4-state");
const tone_v4_1 = require("../../primitives/internal/tone-v4");
Object.defineProperty(exports, "clampPercent", { enumerable: true, get: function () { return tone_v4_1.clampPercent; } });
Object.defineProperty(exports, "metaLine", { enumerable: true, get: function () { return tone_v4_1.metaLine; } });
Object.defineProperty(exports, "SKELETON_CLASS", { enumerable: true, get: function () { return tone_v4_1.SKELETON_CLASS; } });
Object.defineProperty(exports, "toneGround", { enumerable: true, get: function () { return tone_v4_1.toneGround; } });
Object.defineProperty(exports, "TONE_BG", { enumerable: true, get: function () { return tone_v4_1.TONE_BG; } });
Object.defineProperty(exports, "TONE_INK", { enumerable: true, get: function () { return tone_v4_1.TONE_INK; } });
Object.defineProperty(exports, "TONE_ON", { enumerable: true, get: function () { return tone_v4_1.TONE_ON; } });
const internal_1 = require("../internal");
/**
 * An HR tone as the contrast-corrected **ink** class.
 *
 * The one correction that reaches all thirteen components, because all
 * thirteen went through `toneTextClass()` to colour a status word.
 */
function toneInkClass(tone) {
    return tone_v4_1.TONE_INK[tone];
}
/** An HR tone as the **fill** class — a chip, a disc, a rail. Never text. */
function toneFillClass(tone) {
    return tone_v4_1.TONE_BG[tone];
}
/** The ink guaranteed to read **on** {@link toneFillClass}'s ground. */
function toneOnClass(tone) {
    return tone_v4_1.TONE_ON[tone];
}
/**
 * Build the one accessible name an interactive HR row or card carries.
 *
 * Commas, not `metaLine`'s middle dot: a screen reader either says "middle
 * dot" out loud or swallows the pause, and this module's rows are decisions —
 * "Payslip Aug 1–15, net $3,200.00, Failed" has to arrive as one sentence.
 */
function spokenLine(parts) {
    return parts
        .filter((part) => part != null && part !== '')
        .map(String)
        .join(', ');
}
/** The focus ring the whole line wears — `--xen-ring` is already 3:1 on surface. */
exports.FOCUS_RING_CLASS = 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring';
/** A glyph-only control still has to be 44 **wide**, not just 44 tall. */
exports.MIN_TAP_SQUARE_CLASS = `${chrome_v4_1.MIN_TAP_CLASS} min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]`;
/** Money and any figure that stacks in a column. */
exports.TABULAR_CLASS = 'tabular-nums';
/** The ground behind a skeleton block — opaque, never a translucent wash. */
exports.PLACEHOLDER_CLASS = tone_v4_1.SKELETON_CLASS;
/**
 * The state-layer pair for something drawn on a card.
 *
 * `ground` overrides the fill for the one case in this module that is not the
 * bare card — an open shift, which sits on a tinted status ground. The layer
 * has to be mixed against the fill the control actually wears, or its
 * text-contrast promise stops being checkable.
 */
function cardStateVars(ground = 'var(--xen-card)') {
    return (0, v4_state_1.stateGroundVars)(ground, 'var(--xen-on-card)');
}
/** The state-layer pair for something drawn straight on the page. */
function surfaceStateVars() {
    return (0, v4_state_1.stateGroundVars)('var(--xen-surface)', 'var(--xen-on-surface)');
}
/**
 * How far one level of a reporting tree indents, as a CSS length.
 *
 * `OrgChartNode` wrote `style={{ width: level * 24 }}` — a raw pixel literal in
 * a file whose docstring claims "no literals". 24 is not a step on the spacing
 * scale, so a seed that tightened its rhythm indented at the old pitch and the
 * rail stopped lining up with anything else on the screen. `lg` is a real step
 * and the native twin multiplies the same one.
 */
function indentWidth(level) {
    const depth = Math.max(0, Math.floor(Number.isFinite(level) ? level : 0));
    return `calc(var(--xen-space-lg) * ${depth})`;
}
/**
 * Leave **type** is identity, not status.
 *
 * `sick: danger` and `parental: success` said that being ill is an error state
 * and that having a baby went well. Both are categories; the glyph already
 * tells them apart.
 */
exports.LEAVE_TYPE_META_V4 = {
    vacation: { ...internal_1.LEAVE_TYPE_META.vacation, tone: 'neutral' },
    sick: { ...internal_1.LEAVE_TYPE_META.sick, tone: 'neutral' },
    personal: { ...internal_1.LEAVE_TYPE_META.personal, tone: 'neutral' },
    parental: { ...internal_1.LEAVE_TYPE_META.parental, tone: 'neutral' },
    unpaid: { ...internal_1.LEAVE_TYPE_META.unpaid, tone: 'neutral' },
};
/**
 * Employment **arrangement** is identity, not status.
 *
 * `contractor: warn` drew every contractor in a directory as a warning.
 */
exports.EMPLOYMENT_META_V4 = {
    fullTime: { ...internal_1.EMPLOYMENT_META.fullTime, tone: 'neutral' },
    partTime: { ...internal_1.EMPLOYMENT_META.partTime, tone: 'neutral' },
    contractor: { ...internal_1.EMPLOYMENT_META.contractor, tone: 'neutral' },
    intern: { ...internal_1.EMPLOYMENT_META.intern, tone: 'neutral' },
};
/** Expense **category** is identity, not status — `software: success` was not news. */
exports.EXPENSE_CATEGORY_META_V4 = {
    travel: { ...internal_1.EXPENSE_CATEGORY_META.travel, tone: 'neutral' },
    meals: { ...internal_1.EXPENSE_CATEGORY_META.meals, tone: 'neutral' },
    lodging: { ...internal_1.EXPENSE_CATEGORY_META.lodging, tone: 'neutral' },
    supplies: { ...internal_1.EXPENSE_CATEGORY_META.supplies, tone: 'neutral' },
    software: { ...internal_1.EXPENSE_CATEGORY_META.software, tone: 'neutral' },
    other: { ...internal_1.EXPENSE_CATEGORY_META.other, tone: 'neutral' },
};
/** Benefit **kind** is identity, not status — a retirement plan is not a success. */
exports.BENEFIT_TYPE_META_V4 = {
    health: { ...internal_1.BENEFIT_TYPE_META.health, tone: 'neutral' },
    dental: { ...internal_1.BENEFIT_TYPE_META.dental, tone: 'neutral' },
    vision: { ...internal_1.BENEFIT_TYPE_META.vision, tone: 'neutral' },
    retirement: { ...internal_1.BENEFIT_TYPE_META.retirement, tone: 'neutral' },
    life: { ...internal_1.BENEFIT_TYPE_META.life, tone: 'neutral' },
};
/**
 * What the word before a payslip's date means, per status.
 *
 * `PayslipRow` printed the literal `Paid ` before `payDate` whatever the
 * status was, so a failed payment rendered "Paid 15 Aug" one line above a
 * "✕ Failed" pill. Only `paid` may claim the money moved.
 *
 * The other three are not one case but two, and the words say which: a run
 * that has not happened yet is `Expected`, and one on which nothing landed is
 * `Attempted`. "Pay date" would be true of all three and useful for none —
 * least of all on the failed row, where the reader most needs to know that the
 * date came and went. The native twin uses these same four words.
 */
exports.PAYSLIP_DATE_LABELS = {
    paid: 'Paid',
    processing: 'Expected',
    pending: 'Expected',
    failed: 'Attempted',
};
//# sourceMappingURL=tone-v4.js.map