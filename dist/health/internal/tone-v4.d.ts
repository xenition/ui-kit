/**
 * The `health` V4 line's web-only skin: the surface presets, the meter track,
 * the range vocabulary and the one state-layer wiring every file in the batch
 * repeats.
 *
 * Everything that is *arithmetic* lives in `../goal-v4` and is shared with the
 * native twin. Everything here is a Tailwind class or a CSS custom property, so
 * it cannot be shared and is deliberately module-local — `V4-CONVENTIONS.md`
 * puts a batch's non-pure shared helper at `src/<module>/internal/<name>-v4.ts`
 * for exactly this case.
 *
 * ## Why this file exists rather than `../internal.ts`
 *
 * `health/internal.ts` maps every tone to its **fill** — `success:
 * 'text-success'`, which is `var(--xen-success)` and measures as low as 1.32:1
 * as text. Nine of the thirteen base components ink a number or a caption with
 * it. That map is load-bearing for the base, V2 and V3 files and is not this
 * pass's to change, so the V4 files take their ink from
 * `primitives/internal/tone-v4`'s `TONE_INK` — the contrast-corrected `*Text`
 * slots — and never import `TEXT_CLASS`.
 */
import type * as React from 'react';
import type { ToneV4 } from '../../primitives/internal/tone-v4';
import type { RangeVerdict } from '../goal-v4';
/**
 * The surface presets, matching `native/primitives/internal/appearance.ts`
 * value for value.
 *
 * The type is declared here because the web half of the kit has no appearance
 * module at all — which is the drift the `appearance` prop closes:
 * `<MealCard appearance="elevated" />` compiles on native and is a type error
 * on web, so the same screen cannot be written twice.
 */
export type Appearance = 'classic' | 'elevated' | 'soft' | 'outline' | 'minimal' | 'filled';
/**
 * The card shell's *layout* — radius and padding only.
 *
 * Fill, edge and depth are {@link appearanceClass}'s business, so the two
 * compose: a component picks its own gap and stacking without also deciding
 * what surface it is.
 */
export declare const HEALTH_CARD_CLASS = "rounded-[var(--xen-radius-lg)] p-lg";
/** The same shell one step down, for a tile rather than a card. */
export declare const HEALTH_TILE_CLASS = "rounded-[var(--xen-radius-md)] p-md";
/**
 * Fill, edge and depth for one appearance.
 *
 * `classic` is `card`/`on-card` where the base line wrote `bg-surface`. That is
 * the one deliberate visual change: `--xen-card` is the slot that exists so a
 * raised surface reads as raised in dark mode, where a shadow on a near-black
 * page is invisible and the answer is to lighten the card instead. Every other
 * V4 card in the kit already sits on it.
 */
export declare function appearanceClass(appearance?: Appearance): string;
/**
 * The **optional** frame, for the components that draw no surface of their own.
 *
 * `MetricRing`, `ActivityRings` and `StreakCounter` are marks, not cards: they
 * sit inside somebody else's panel and `classic` means *no panel*, which is why
 * the native twin writes `appearance !== 'classic' ? appearanceStyle(…) : null`
 * for exactly these three. Returning `undefined` rather than the classic skin
 * keeps the two halves saying the same thing about the same default.
 */
export declare function frameClass(appearance?: Appearance): string | undefined;
/**
 * The element-scoped properties that make an activation's state layer opaque
 * against whatever ground its card actually wears.
 *
 * Spread onto `style` beside `data-xen-v4-state=""`. The two together are the
 * whole press and hover treatment; every `hover:opacity-90`,
 * `hover:opacity-80`, `hover:opacity-70` and `hover:bg-neutral-100` in the base
 * thirteen is deleted rather than translated. `opacity` was never press — 0.38
 * is M3's *disabled* band, so a pressed goal card read as an unavailable one.
 *
 * `outline` and `minimal` paint no ground of their own, so their layer is mixed
 * against the page instead of against a card that is not there.
 */
export declare function appearanceStateVars(appearance?: Appearance): React.CSSProperties;
/**
 * The unfilled part of a meter.
 *
 * Not `bg-border`, which is what five of the base components used: `--xen-border`
 * is a **hairline** colour, so a 8px-tall bar of it reads as a drawn box around
 * a hole rather than as the part of the measure that has not been filled. This
 * is the same derived neutral the V4 charts use for a grid line, spelled locally
 * so `health` does not have to inject the charts sheet to draw one bar.
 */
export declare const TRACK_CLASS = "bg-[color-mix(in_srgb,var(--xen-on-card)_12%,var(--xen-card))]";
/** {@link TRACK_CLASS} as a raw colour, for an SVG `stroke` or `fill`. */
export declare const TRACK_VAR = "color-mix(in srgb, var(--xen-on-card) 12%, var(--xen-card))";
/** The one focus ring the V4 line shares — `--xen-ring`, never a ramp step. */
export declare const FOCUS_RING_CLASS = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
/**
 * The tone a range verdict earns.
 *
 * This is the one place in `health` where a status colour is *correct*: a
 * reading outside its normal band genuinely is a status. Freeing
 * `success`/`warn`/`danger` from discipline and macro identity — `cardio` was
 * permanently `danger`, `walking` permanently `success`, `carbs` permanently
 * `warn` — is what makes the vocabulary available to say this at all.
 *
 * Both directions take `warn`, and deliberately so. A component knows only that
 * a reading is outside the band it was handed — not whether that is a rounding
 * error or an emergency — and spending `danger` on the first of those is how a
 * status colour stops meaning anything. Nor is `high` the worse end in general:
 * an acute low blood sugar is the more urgent of the two. The native twin
 * reasons identically in `verdictTone()`.
 */
export declare const VERDICT_TONE: Record<RangeVerdict, ToneV4>;
/** The default English word for each verdict. Every caller can replace it. */
export declare const VERDICT_LABEL: Record<RangeVerdict, string>;
/**
 * Join the parts of one accessible name.
 *
 * Commas, not the visible ` · `: a screen reader either reads "middle dot" out
 * loud or swallows the pause entirely, and a name is not a caption.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | false | null | undefined>): string;
//# sourceMappingURL=tone-v4.d.ts.map