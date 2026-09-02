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
import type { CSSProperties } from 'react';
import { MIN_TAP_CLASS } from '../../primitives/internal/chrome-v4';
import { clampPercent, metaLine, SKELETON_CLASS, toneGround, TONE_BG, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import { type BenefitType, type EmploymentType, type ExpenseCategory, type HrTone, type LeaveType, type PayslipStatus, type StatusMeta } from '../internal';
export { clampPercent, metaLine, SKELETON_CLASS, toneGround, TONE_BG, TONE_INK, TONE_ON };
export type { ToneV4 };
/**
 * An HR tone as the contrast-corrected **ink** class.
 *
 * The one correction that reaches all thirteen components, because all
 * thirteen went through `toneTextClass()` to colour a status word.
 */
export declare function toneInkClass(tone: HrTone): string;
/** An HR tone as the **fill** class — a chip, a disc, a rail. Never text. */
export declare function toneFillClass(tone: HrTone): string;
/** The ink guaranteed to read **on** {@link toneFillClass}'s ground. */
export declare function toneOnClass(tone: HrTone): string;
/**
 * Build the one accessible name an interactive HR row or card carries.
 *
 * Commas, not `metaLine`'s middle dot: a screen reader either says "middle
 * dot" out loud or swallows the pause, and this module's rows are decisions —
 * "Payslip Aug 1–15, net $3,200.00, Failed" has to arrive as one sentence.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
/** The focus ring the whole line wears — `--xen-ring` is already 3:1 on surface. */
export declare const FOCUS_RING_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
/** A glyph-only control still has to be 44 **wide**, not just 44 tall. */
export declare const MIN_TAP_SQUARE_CLASS = "min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]";
export { MIN_TAP_CLASS };
/** Money and any figure that stacks in a column. */
export declare const TABULAR_CLASS = "tabular-nums";
/** The ground behind a skeleton block — opaque, never a translucent wash. */
export declare const PLACEHOLDER_CLASS = "rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/**
 * The state-layer pair for something drawn on a card.
 *
 * `ground` overrides the fill for the one case in this module that is not the
 * bare card — an open shift, which sits on a tinted status ground. The layer
 * has to be mixed against the fill the control actually wears, or its
 * text-contrast promise stops being checkable.
 */
export declare function cardStateVars(ground?: string): CSSProperties;
/** The state-layer pair for something drawn straight on the page. */
export declare function surfaceStateVars(): CSSProperties;
/**
 * How far one level of a reporting tree indents, as a CSS length.
 *
 * `OrgChartNode` wrote `style={{ width: level * 24 }}` — a raw pixel literal in
 * a file whose docstring claims "no literals". 24 is not a step on the spacing
 * scale, so a seed that tightened its rhythm indented at the old pitch and the
 * rail stopped lining up with anything else on the screen. `lg` is a real step
 * and the native twin multiplies the same one.
 */
export declare function indentWidth(level: number): string;
/**
 * Leave **type** is identity, not status.
 *
 * `sick: danger` and `parental: success` said that being ill is an error state
 * and that having a baby went well. Both are categories; the glyph already
 * tells them apart.
 */
export declare const LEAVE_TYPE_META_V4: Record<LeaveType, StatusMeta>;
/**
 * Employment **arrangement** is identity, not status.
 *
 * `contractor: warn` drew every contractor in a directory as a warning.
 */
export declare const EMPLOYMENT_META_V4: Record<EmploymentType, StatusMeta>;
/** Expense **category** is identity, not status — `software: success` was not news. */
export declare const EXPENSE_CATEGORY_META_V4: Record<ExpenseCategory, StatusMeta>;
/** Benefit **kind** is identity, not status — a retirement plan is not a success. */
export declare const BENEFIT_TYPE_META_V4: Record<BenefitType, StatusMeta>;
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
export declare const PAYSLIP_DATE_LABELS: Record<PayslipStatus, string>;
//# sourceMappingURL=tone-v4.d.ts.map