/**
 * The `insurance` module's own V4 vocabulary (web) — the twin of
 * `native/insurance/internal/tone-v4.ts`.
 *
 * It replaces `internal/tint.ts` without touching it, because the base, V2 and
 * V3 lines still read that file. Two things in it were wrong, and `ClaimRow` —
 * its only consumer — inherited both:
 *
 * 1. **It inks with fill slots.** `success: 'bg-success/10 text-success'` draws
 *    the glyph in `--xen-success`, the token the compiler guarantees only
 *    `on-success` against; `muted` is a decorative ramp step with no contrast
 *    promise at all. Every status disc in the module was drawn with one of
 *    them. {@link toneInkClass} resolves the same tone to its contrast-corrected
 *    `*-text` slot.
 * 2. **`neutral` and `muted` are `bg-neutral-100`.** The web neutral ramp
 *    mirrors under `[data-theme="dark"]`, so a neutral status disc was a pale
 *    plate punched into a dark page. {@link toneGroundStyle} mixes the tone 10%
 *    into the card instead — the same ground the native twin mixes, so a
 *    denied claim is one colour on two platforms.
 *
 * It also holds the four tables where this module spent a **status** colour on
 * **identity** — a coverage's inclusion, a document's kind, a risk tier and a
 * beneficiary's designation are none of them verdicts — plus the small
 * formatters the components share.
 *
 * Nothing here is exported from the package.
 */
import type { CSSProperties } from 'react';
import { MIN_TAP_CLASS } from '../../primitives/internal/chrome-v4';
import { clampPercent, metaLine, SKELETON_CLASS, toneGround, TONE_BG, TONE_INK, TONE_ON, type ToneV4 } from '../../primitives/internal/tone-v4';
import type { MoneyFormatter } from './format';
import type { StatusDescriptor } from './status';
import type { BeneficiaryKind } from '../BeneficiaryRow';
import type { DocumentKind } from '../PolicyDocumentRow';
import type { PolicyStatus } from '../PolicyCard';
import type { RenewalUrgency } from '../RenewalBanner';
import type { RiskTier } from '../RiskScore';
export { clampPercent, metaLine, SKELETON_CLASS, toneGround, TONE_BG, TONE_INK, TONE_ON };
export { MIN_TAP_CLASS };
export type { ToneV4 };
/** A tone as the contrast-corrected **ink** class. Never a fill. */
export declare function toneInkClass(tone: ToneV4): string;
/** A tone as the **fill** class — a chip, a disc, a rail. Never text. */
export declare function toneFillClass(tone: ToneV4): string;
/** The ink guaranteed to read **on** {@link toneFillClass}'s ground. */
export declare function toneOnClass(tone: ToneV4): string;
/**
 * A tinted status ground as an inline style.
 *
 * `color-mix()` over two custom properties cannot be said as a class bound to
 * a token, and being inline it follows `[data-theme]` with no dark rule of its
 * own — which is exactly what `bg-neutral-100` could not do.
 */
export declare function toneGroundStyle(tone: ToneV4): CSSProperties;
/**
 * The one accessible name an interactive insurance row or card carries.
 *
 * Commas, not `metaLine`'s middle dot: a screen reader either says "middle
 * dot" out loud or swallows the pause, and every row in this module is a
 * decision about money — "Claim CLM-20481, Windshield replacement, Approved,
 * $840.00, 12 Aug" has to arrive as one sentence.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
/** The focus ring the whole module wears — `ring-primary-300` was a ramp step. */
export declare const FOCUS_RING_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
/** A glyph-only control has to be 44 **wide** as well as 44 tall. */
export declare const MIN_TAP_SQUARE_CLASS = "min-h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] min-w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]";
/** Money, percentages and any figure that stacks in a column. */
export declare const TABULAR_CLASS = "tabular-nums";
/** The state-layer pair for something drawn on a card. */
export declare function cardStateVars(ground?: string): CSSProperties;
/** The state-layer pair for something drawn straight on the page. */
export declare function surfaceStateVars(): CSSProperties;
/**
 * Policy lifecycle, as the same descriptor shape claims already use.
 *
 * `PolicyCard` kept this table private, so nothing else in the module could
 * label a policy state and the two new components would have had to invent
 * their own words. The tones are unchanged: a lapsed policy genuinely is an
 * adverse state, and `danger` is what that means.
 */
export declare const POLICY_STATUS_META_V4: Record<PolicyStatus, StatusDescriptor>;
/**
 * Whether a coverage is included, as a **glyph**, not a verdict.
 *
 * `included → success` / `excluded → muted` said that a policy covering water
 * damage is good news and that one excluding it is a failure. Inclusion is a
 * property of the contract; the reader is reading a list of them and half will
 * always be excluded. A page of green ticks beside red-adjacent greys teaches
 * the eye to stop reading either. The glyph — and, now, a word — is what
 * actually tells them apart.
 */
export declare const COVERAGE_MARK_V4: Record<'included' | 'excluded', StatusDescriptor>;
/**
 * Risk tier as identity, not verdict.
 *
 * `low → success` / `high → danger` is the module's most confident misuse of a
 * status colour: the tier is an underwriting *classification*, the same kind of
 * thing as a credit band, and colouring it green told the applicant they had
 * passed something. Worse, an explicit `tier` overrode the score outright, so
 * `score={95} tier="low"` drew a green "Low risk" pill beside 95 / 100 and the
 * colour was the loudest thing on the screen. The ordering now lives where it
 * is checkable — the numeral, the scale it sits on and the meter — and the
 * glyph carries the tier.
 */
export declare const RISK_TIER_META_V4: Record<RiskTier, StatusDescriptor>;
/** Renewal urgency genuinely is a status — an overdue policy is not covered. */
export declare const RENEWAL_URGENCY_META_V4: Record<RenewalUrgency, StatusDescriptor>;
/**
 * Document kind — identity, and it needs a **word**, not just a glyph.
 *
 * The base built its meta line from `kind.replace('-', ' ')`, so the row read
 * "id card · 1.2 MB" in lower case whatever the locale, and the emoji was the
 * only other thing distinguishing a declaration page from an invoice.
 */
export declare const DOCUMENT_KIND_META_V4: Record<DocumentKind, {
    label: string;
    glyph: string;
}>;
/** Primary vs contingent — a designation, so `neutral` both ways. */
export declare const BENEFICIARY_KIND_LABEL: Record<BeneficiaryKind, string>;
/**
 * A percentage as a whole number and its spoken form.
 *
 * `formatPct` rounds for display and the components then announced the
 * unrounded float separately; one place, one number.
 */
export declare function percentText(value: number): string;
/**
 * A money figure that is allowed to be negative.
 *
 * Every component in the module wrote `Math.max(0, Math.trunc(cents))`, so
 * `coverageCents={-1}` printed "$0.00" — indistinguishable from a policy that
 * genuinely covers nothing, and from a fetch that returned a sentinel. The
 * figure is now printed as it is (`Intl` renders `-$0.01` perfectly well) and
 * `negative` lets the caller's component say a word about it.
 */
export interface MoneyV4 {
    /** The formatted figure, never clamped. */
    text: string;
    /** Whether the caller handed us a below-zero amount. */
    negative: boolean;
}
export declare function moneyParts(cents: number | undefined, currency: string | undefined, format: MoneyFormatter): MoneyV4 | undefined;
/** The word appended to a figure that cannot be an amount of money. */
export declare const NEGATIVE_AMOUNT_LABEL = "Amount unavailable";
/**
 * Bytes as a human-readable size.
 *
 * The default behind `formatSize`. Base-1000 units, because that is what a
 * carrier's document portal quotes and what the caller was hand-formatting
 * into the `size` string before.
 */
export declare function formatBytes(bytes: number): string;
//# sourceMappingURL=tone-v4.d.ts.map