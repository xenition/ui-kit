/**
 * The tone vocabulary shared by every **V4 vertical** (web) — the twin of
 * `native/primitives/internal/tone-v4.ts`, as classes and custom properties
 * rather than resolved hexes.
 *
 * Same reasoning: twenty status enums across `agriculture`, `automotive` and
 * `beauty`, each independently deciding that `muted` or `success` was a *text*
 * colour. It is not — `muted` is a ramp step with no contrast promise, and
 * `success` is a **fill** slot the compiler guarantees only `on-success`
 * against. `agriculture/internal/farm-v4.ts` wrote this table first; three
 * modules needing it is where it stops being module-local.
 *
 * Nothing in this file is exported from the package.
 */
import type { BadgeTone } from '../Badge';
/**
 * The tones a vertical's status enum resolves to. Identical to `BadgeTone`, so
 * a status's badge and its ink can never disagree about which tone it is.
 */
export type ToneV4 = BadgeTone;
/** The **ink** class a tone takes. Every one is the contrast-corrected slot. */
export declare const TONE_INK: Record<ToneV4, string>;
/** The **fill** class a tone paints with, when it is a chip, a disc or a rail. */
export declare const TONE_BG: Record<ToneV4, string>;
/**
 * The ink that goes **on** {@link TONE_BG} — the compiler's paired slot.
 *
 * This exists because of a defect, not for symmetry: `automotive/TripRoute`
 * painted its markers `bg-[tone]` and their glyphs `text-on-primary`
 * regardless, so a `success` marker wore the brand's ink and whether it was
 * readable depended on the seed. Both sides being strings means no type can
 * catch it; a table can.
 */
export declare const TONE_ON: Record<ToneV4, string>;
/** The tone's fill as a custom property, for a `color-mix()` tint. */
export declare const TONE_VAR: Record<ToneV4, string>;
/**
 * How far a status ground travels from the card toward its tone. 10%: enough
 * to read as "this one is different", not enough to compete with the copy on
 * it. The same number the native twin mixes.
 */
export declare const GROUND_TINT = 10;
/** A tinted ground for a status container, as an inline background value. */
export declare function toneGround(tone: ToneV4): string;
/**
 * The class a loading skeleton takes.
 *
 * **Opaque, and mixed against the card's own ground.** Six components across
 * these modules used a translucent wash of `muted`, which borrows whatever is
 * behind it — so the same skeleton was a different colour on a card, on a
 * tinted band and over an image.
 */
export declare const SKELETON_CLASS = "rounded-[var(--xen-radius-sm)] bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/**
 * Clamp a percentage into 0–100, or `undefined` when there is nothing to show.
 */
export declare function clampPercent(value: number | undefined): number | undefined;
/** Join a row's optional caption fragments, dropping the empty ones. */
export declare function metaLine(parts: ReadonlyArray<string | number | undefined | null>): string;
/**
 * A star rating as its three renderable parts.
 *
 * Four components across these modules drew five glyphs and stopped. The
 * **numeral** is what a low-vision user reads, what a colour-blind user reads,
 * and what everyone actually compares.
 */
export interface RatingV4 {
    filled: number;
    total: number;
    /** The value, formatted — `'4.9'`. `null` when there is nothing to show. */
    text: string | null;
    /** The group's accessible name. */
    label: string;
}
export declare function ratingParts(options: {
    value?: number;
    max?: number;
    count?: number;
    format?: (value: number, max: number, count?: number) => string;
    decimals?: number;
}): RatingV4;
//# sourceMappingURL=tone-v4.d.ts.map