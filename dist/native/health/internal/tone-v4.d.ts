/**
 * The `health` module's own V4 vocabulary on native: the ground a meter track
 * is drawn on, the tone a range verdict wears, the sentence a card announces,
 * and the one card box the module's eight card-shaped components share.
 *
 * ## What is deliberately NOT here
 *
 * **The arithmetic.** `goalParts`, `rangeVerdict` and `pluralizeUnit` live in
 * `src/health/goal-v4.ts`, which is pure and which both twins import, so the
 * web and native halves of this module cannot disagree about what 12 400 steps
 * against a 10 000 target means. Re-deriving any of it here would recreate
 * exactly the drift that file was written to end.
 *
 * **The tone-to-ink table.** That is `primitives/internal/tone-v4`, shared by
 * every V4 vertical. It is re-exported below so a health component reaches one
 * import rather than two.
 *
 * What is left is the handful of *theme-dependent* decisions more than one
 * component in this batch makes. Nothing here is exported from the package.
 */
import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import { metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { type Appearance } from '../../primitives/internal/appearance';
import type { RangeVerdict } from '../../../health/goal-v4';
export { metaLine, onPair, skeletonFill, toneFill, toneInk };
export type { ToneV4 };
/**
 * The ground a progress track, a ring track or a stage rail is drawn on.
 *
 * Every meter in this module painted its track `colors.border` — the
 * **hairline** colour, used as a **fill**. On a light seed that is a rule
 * pretending to be a bar; on a dark one it very nearly disappears, so a
 * half-full bar and an empty bar looked the same. `skeletonFill` is the
 * module-independent answer to "an inert ground that is visibly a surface":
 * an opaque mix of the card and its own ink, so it reads as a track in both
 * schemes and borrows nothing from whatever sits behind it.
 */
export declare function trackGround(theme: XenitionNativeTheme): string;
/**
 * The tone a {@link RangeVerdict} wears.
 *
 * `low` and `high` both take `warn` rather than one of them taking `danger`.
 * A component knows only that a reading is outside the band it was handed — it
 * does not know whether that is a rounding error or an emergency, and spending
 * `danger` on the first of those is how a status colour stops meaning anything.
 * `undefined` — no band supplied — is `neutral`, so "we do not know" never
 * borrows a status colour at all.
 */
export declare function verdictTone(verdict: RangeVerdict | undefined): ToneV4;
/** Default wording for each verdict. Every component takes a `rangeLabels` override. */
export declare const RANGE_LABEL: Record<RangeVerdict, string>;
/**
 * The tone a change delta wears.
 *
 * This is a genuine status — a reading moved the way the user wanted or it did
 * not — so `success` / `danger` are spent correctly here. `lowerIsBetter`
 * flips it for weight, body fat and waist. A zero or absent delta is
 * `neutral`: nothing happened, and nothing happening is not a warning.
 */
export declare function deltaTone(delta: number | undefined, lowerIsBetter?: boolean): ToneV4;
/**
 * Join the fragments of a card's spoken name with commas.
 *
 * Commas, not {@link metaLine}'s ` · `: a reader either says "middle dot" out
 * loud or swallows the pause entirely, and this string is heard rather than
 * seen. `metaLine` stays for the *visible* caption lines.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
/**
 * A percentage as React Native's `accessibilityValue`.
 *
 * Five components in this module draw a meter, and none of them exposed a
 * value: `MiniBar` and `ProgressRing` both hard-code
 * `accessibilityRole="image"`, so a progress ring announced itself as a
 * picture and the number it was drawn to communicate never reached anybody.
 * Wrapping them means re-stating the value, and re-stating it five times is
 * five chances to state it differently.
 */
export declare function percentValue(percent: number | undefined): {
    min: number;
    max: number;
    now: number;
};
/**
 * The card box the module's card-shaped components share: the caller's
 * `appearance`, one radius, one padding, one internal gap.
 *
 * Written out longhand in eight files today, which is eight places for a
 * radius to drift. `appearanceStyle` still owns fill, border and depth, so the
 * visual-diversity system is untouched.
 */
export declare function cardStyle(theme: XenitionNativeTheme, appearance: Appearance | undefined): ViewStyle;
/**
 * The same box for a component whose `classic` appearance is deliberately
 * surface-free — the rings, the ring tile and the streak readout, which sit
 * directly on the page unless the caller asks for a treatment.
 */
export declare function looseCardStyle(theme: XenitionNativeTheme, appearance: Appearance | undefined): ViewStyle | null;
//# sourceMappingURL=tone-v4.d.ts.map