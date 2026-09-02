/**
 * The `kids` V4 line's web-only skin: the card and row shells, the meter track,
 * the identity vocabulary this module is not allowed to spend a status colour
 * on, and the two helpers every file in the batch would otherwise repeat.
 *
 * Everything that is *arithmetic* lives in `../family-v4` and is shared with
 * the native twin verbatim. Everything here is a Tailwind class, a CSS custom
 * property or a DOM-shaped aria bundle, so it cannot be shared and is
 * deliberately module-local — `V4-CONVENTIONS.md` puts a batch's non-pure
 * shared helper at `src/<module>/internal/<name>-v4.ts` for exactly this case.
 *
 * ## The rule this file exists to enforce
 *
 * **This module renders children.** `success`, `warn` and `danger` mean
 * *something has happened to the system*, and the base line spent all three on
 * things that are identity rather than status: a child's conduct
 * (`BehaviorBadge`'s `negative → danger`), a school-calendar item's type
 * (`exam → danger`, `holiday → success`) and a person's place in a family
 * (`caregiver → success`). Painting a six-year-old's "Interrupted" in the same
 * red the kit uses for a failed payment is both a status-colour-on-identity
 * violation and a shaming pattern.
 *
 * So identity resolves through {@link IdentityTone}, which contains no status
 * colour at all — only the two brand slots and neutral — and every component
 * that draws identity also draws a glyph and a word, so nothing is carried by
 * colour in the first place.
 */
import type * as React from 'react';
import type { ToneV4 } from '../../primitives/internal/tone-v4';
import type { MeterParts } from '../family-v4';
/**
 * The tones identity is allowed to take.
 *
 * `primary` and `accent` are the seed's own two brand slots and carry no
 * meaning beyond "these are different from each other"; `neutral` is the
 * absence of a claim. None of the three says anything went wrong, which is the
 * whole point — see the module doc.
 *
 * The four base files that carry the comment *"Native `accent` tone maps to
 * `primary` on web (web Badge has no accent)"* are wrong and have been since
 * `BadgeTone` gained `accent`; that stale note is what flattened `child`,
 * `sibling` and `trip` onto `primary` on web while native drew them in
 * `accent`. Both twins read `accent` now.
 */
export type IdentityTone = Extract<ToneV4, 'primary' | 'accent' | 'neutral'>;
/**
 * The card shell's *layout* — radius and padding only, so a component picks
 * its own stacking without also deciding what surface it is.
 */
export declare const KIDS_CARD_CLASS = "rounded-[var(--xen-radius-lg)] p-lg";
/**
 * A raised card's fill, edge and ink.
 *
 * `card`/`on-card` where the base line wrote `bg-surface`: `--xen-card` is the
 * slot that exists so a raised surface still reads as raised in dark mode,
 * where a shadow on a near-black page is invisible and the answer is to
 * lighten the card instead. Every other V4 card in the kit already sits on it.
 */
export declare const KIDS_CARD_GROUND_CLASS = "border border-border bg-card text-on-card";
/** The one focus ring the V4 line shares — `--xen-ring`, never a ramp step. */
export declare const FOCUS_RING_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
/**
 * The unfilled part of a meter.
 *
 * Not `bg-border`, which is what the base screen-time and allowance bars
 * inherited from `Progress`: `--xen-border` is a **hairline** colour, so a
 * bar of it reads as a drawn box around a hole rather than as the part of the
 * measure that has not been filled yet.
 */
export declare const TRACK_CLASS = "bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/** {@link TRACK_CLASS} as a raw colour, for an SVG `fill`. */
export declare const TRACK_VAR = "color-mix(in srgb, var(--xen-on-card) 12%, var(--xen-card))";
/** M3's disabled band, 0.38 — never `opacity-50`, which is a round number. */
export declare const DISABLED_CLASS = "pointer-events-none opacity-[0.38]";
/**
 * A 44 square that holds a glyph — a sticker's disc, a routine's slot icon.
 *
 * Composed from the spacing scale (`2xl - xs` is 44 at the kit's scale) rather
 * than written as `h-11`, so a seed that re-scales its rhythm re-scales the
 * targets with it. It is the same expression `MIN_TAP` composes, and this
 * module needs it on **both** axes and as a fixed size rather than a floor:
 * a grid of stickers whose discs are each a different width is a ragged grid.
 */
export declare const GLYPH_SLOT_CLASS: string;
/**
 * The element-scoped properties that make an activation's state layer opaque
 * against the card it actually sits on.
 *
 * Spread onto `style` beside `data-xen-v4-state=""`. The two together are the
 * whole press and hover treatment; every `hover:opacity-70` and
 * `hover:bg-neutral-50` in the twelve base files is deleted rather than
 * translated. `opacity` was never press — 0.38 is M3's *disabled* band, so a
 * pressed chore card read as an unavailable one.
 */
export declare function cardStateVars(): React.CSSProperties;
/** The same, for a control that sits directly on the page rather than a card. */
export declare function surfaceStateVars(): React.CSSProperties;
/**
 * Join the parts of one accessible name.
 *
 * Commas, not the visible ` · `: a screen reader either reads "middle dot" out
 * loud or swallows the pause entirely, and a name is not a caption. A
 * multi-part row is one stop, not four.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | false | null | undefined>): string;
/** Join a row's *visible* caption fragments — this one keeps the middle dot. */
export declare function captionLine(parts: ReadonlyArray<string | number | false | null | undefined>): string;
/** Everything a `role="progressbar"` element needs, as DOM attributes. */
export interface MeterAria {
    role: 'progressbar';
    'aria-valuenow': number;
    'aria-valuemin': number;
    'aria-valuemax': number;
    'aria-valuetext': string;
}
/**
 * A meter's aria bundle, derived from {@link MeterParts}.
 *
 * **`aria-valuenow` is drawn from `ratio`, never from `value`.** That is the
 * whole reason this helper exists: `<ScreenTimeBar used={180} limit={120} />`
 * announced `valuenow=180` against `valuemax=120`, an invalid range that a
 * reader says out loud as "180 of 120", and `<AllowanceTracker balance={-20}
 * goal={{target: 100}} />` announced `-20` against `valuemin=0`. The clamp
 * belongs to the *drawing*; the real reading is not thrown away, it goes into
 * `aria-valuetext` where it can say "four hours, over by two" in words.
 */
export declare function meterAria(parts: MeterParts, valueText: string): MeterAria;
/**
 * A child's balance, formatted.
 *
 * `AllowanceTracker` built money by string concatenation —
 * `` `${currency}${amount.toLocaleString(…)}` `` — so `balance={-5}` rendered
 * **`$-5`**, with the sign on the wrong side of the symbol, and `5.5` rendered
 * `$5.5` instead of `$5.50`. A wallet that cannot print its own minority unit
 * is not a wallet.
 *
 * The base's `currency` prop is documented as a *symbol prefix* and defaults to
 * `'$'`, so it cannot simply be handed to `Intl` — `new Intl.NumberFormat(…,
 * { currency: '$' })` throws `RangeError`. A three-letter code goes through
 * `commerce/money`'s {@link formatMoney} (which is the kit's single home for
 * currency rendering, and takes minor units); anything else keeps its place as
 * a prefix but gets the sign, the grouping and the two decimal places a
 * currency is owed.
 */
export declare function allowanceMoney(amount: number, currency?: string, locale?: string): string;
//# sourceMappingURL=tone-v4.d.ts.map