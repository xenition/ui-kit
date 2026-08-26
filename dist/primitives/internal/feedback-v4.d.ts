/**
 * Shared plumbing for the **V4 feedback & status line** — `AlertV4`,
 * `BannerV4`, `CalloutV4`, `StatusMessageV4`, `ResultV4`, `ProgressV4`,
 * `SpinnerV4`, `SkeletonV4`, `LoadingOverlayV4`, `StatusDotV4`, `RatingV4`.
 *
 * These components are different from the rest of the kit in one way that
 * decides their whole design: **their colour is their content.** A card is
 * blue because the brand is blue; a danger alert is red because it is
 * dangerous. `design.md` §35.4 draws that line — semantic colours are reserved
 * for meaning, and a component that treats them as palette entries has
 * destroyed the meaning while keeping the hue.
 *
 * Three consequences, all encoded here:
 *
 * 1. **No feedback component takes a brand gradient.** Not one. A gradient
 *    sweeps between two hues, and a tone that sweeps is no longer a tone — the
 *    reader has to decide which end was the message. §35.11 keeps gradients for
 *    the hero and the one primary action; a status band is neither.
 * 2. **The tone is a fixed slot, never "a colour that looked right".** The
 *    table below is the single mapping. The base native `Alert` and `Progress`
 *    both routed `warn` to `accent` — a BRAND colour standing in for a warning,
 *    which is exactly what §35.4 forbids, and which also silently disagreed
 *    with their own web twins (those used `warn`). V4 routes `warn` to `warn`
 *    on both platforms.
 * 3. **A tint has to be opaque.** A translucent 10% wash reads correctly over
 *    the ground it was designed against and nowhere else, and the label on top
 *    of it carries a contrast promise about only that one ground. Composite it
 *    once, at the component, and the component owns its colour wherever it
 *    lands. That is {@link mixToken}, shared with `BadgeV4`.
 *
 * `info` maps to `primary` because this token set has no `info` slot, and that
 * is the one place a semantic and a brand colour legitimately share a value:
 * "the system is telling you something" has no colour of its own in any
 * palette, and borrowing the brand for it is the convention every design system
 * lands on. It is recorded here rather than rediscovered per component.
 */
import type { SemanticColors } from '../../theme/types';
/** The tones the feedback line speaks in. Not every component uses all five. */
export type FeedbackTone = 'info' | 'success' | 'warn' | 'danger' | 'neutral';
/** The three roles a tone plays, as slots the compiler has already resolved. */
export interface ToneSlots {
    /** The tone as a FILL — a solid band, a bar, a rule. Has an `on` pair. */
    fill: keyof SemanticColors;
    /** The label that the compiler guarantees against {@link ToneSlots.fill}. */
    on: keyof SemanticColors;
    /**
     * The tone as TEXT on `surface` — the same hue pushed until it clears AA.
     *
     * Never use {@link ToneSlots.fill} for text. It is a background colour with
     * no promise against `surface`, and a rendered audit of this kit measured
     * one such pairing at 1.32:1.
     */
    text: keyof SemanticColors;
}
/**
 * Tone → slots. The single source for the feedback line, both platforms.
 *
 * `neutral` deliberately has no semantic colour at all: an aside, an empty
 * list and a 404 are not warnings, and tinting them would spend a meaning the
 * product may need later for a real one (§35.4, §35.6).
 */
export declare const TONE_SLOTS: Record<FeedbackTone, ToneSlots>;
/**
 * How much tone a tinted ground carries.
 *
 * Lower than `BadgeV4`'s 14% on purpose. A badge is a small object read on its
 * own; a feedback block is a wide field with a paragraph of body copy on it,
 * and the same mix over that much area reads as a fill rather than as a hint —
 * §7, reduce visual noise. 10% is enough to say "this block has a tone" and
 * little enough that `onSurface` body copy still clears AA on it.
 */
export declare const TINT = 0.1;
/**
 * The tint an ASIDE carries — a tip, a note, a callout.
 *
 * The feedback line has a loudness ladder and it is set by tint depth, not by
 * hue: a `Banner` is the solid tone, an `Alert` is {@link TINT} plus a full
 * strength rule, and a `Callout` is this — a wash, no rule. §35.6 asks colour to
 * create hierarchy rather than noise, and three components all painting the
 * same 10% block would be three components shouting the same volume while
 * meaning three different things.
 */
export declare const TINT_ASIDE = 0.06;
/**
 * A tone's contrast floor when it is a NON-TEXT element — a rule, a ring, a
 * status dot, the head of a spinner.
 *
 * WCAG judges UI boundaries and meaningful graphics at 3:1, not 4.5:1. Holding
 * a 4px rule to a text threshold would push every accent toward the extremes
 * and cost the tone its identity for no accessibility gain.
 */
export declare const MIN_NON_TEXT_CONTRAST = 3;
/**
 * Motion for the busy states, in milliseconds.
 *
 * `design.md` §36.7 asks loading feedback to reduce uncertainty, and §36.1 asks
 * motion to be functional. Both are really the same demand: **the animation may
 * not imply information the system does not have.** So the two loops here are
 * deliberately shapeless.
 *
 * - `spin` is one full revolution. Slow enough not to read as panic, fast
 *   enough to read as alive. It is indeterminate BECAUSE the wait is: a bar
 *   that fills would be inventing a percentage.
 * - `pulse` is one half of a skeleton's breath. Note what it is not — a
 *   left-to-right shimmer sweep. A sweep travels, and travel across a
 *   placeholder reads as loading PROGRESSING through the content, which is a
 *   claim about a request whose state the skeleton cannot see. A symmetric
 *   fade says only "not yet", which is the entire truth available.
 *
 * Both are switched off wholesale under Reduce Motion (§36.10). The static
 * remains — a broken ring, a filled block — still carry the state, so nothing
 * is lost but the movement.
 *
 * **These two deliberately stay off `V4_MOTION`.** M3's scale measures how long
 * a thing takes to get from one state to another; a spinner and a breathing
 * skeleton never arrive, so what these numbers set is a *period*, not a
 * duration, and putting a 200ms transition duration on a loop would give a
 * strobe. M3 itself has no state-transition token for a progress indicator
 * either — its circular indicator runs on its own ~1568ms cycle.
 */
export declare const BUSY_MOTION: {
    readonly spin: 900;
    readonly pulse: 700;
};
/**
 * A semantic slot as its CSS custom property.
 *
 * `successText` → `var(--xen-success-text)`, matching `toCssVars`. The web
 * twins need this for `color-mix()` grounds, where a Tailwind class cannot
 * reach: the mix has to name the variable itself.
 */
export declare function toneVar(slot: keyof SemanticColors): string;
/**
 * An opaque mix of one semantic slot into another, as CSS.
 *
 * The web twin of `mixToken`. `color-mix` composites at paint time against a
 * real colour rather than against whatever is behind the element, so a tinted
 * block keeps its colour on a card, on glass and on the page — the same
 * guarantee the native twin gets from compositing in JS.
 *
 * No space after the commas: the Tailwind arbitrary-value form of this string
 * turns every space into an underscore, and `,_var(...)` is a different class
 * from the one `BadgeV4` established. CSS accepts both spellings.
 */
export declare function mixCss(slot: keyof SemanticColors, into: keyof SemanticColors, amount: number): string;
/** A tone composited into `surface` — the feedback line's tinted ground. */
export declare function tintCss(slot: keyof SemanticColors, amount?: number): string;
/** {@link mixCss} as a Tailwind arbitrary value (spaces become underscores). */
export declare function mixArbitrary(slot: keyof SemanticColors, into: keyof SemanticColors, amount: number): string;
/** {@link tintCss} as a Tailwind arbitrary value. */
export declare function tintArbitrary(slot: keyof SemanticColors, amount?: number): string;
//# sourceMappingURL=feedback-v4.d.ts.map