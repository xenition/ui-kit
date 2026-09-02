/**
 * The `kids` module's own V4 vocabulary on native: the box a raised card
 * paints, the box a roster row paints, the inert block a skeleton is drawn
 * from, and the one rule this module exists to enforce — **a child's conduct,
 * an event type and a family role are never a status colour.**
 *
 * ## What is deliberately NOT here
 *
 * **The arithmetic.** `meterParts`, `starParts`, `nextAward` and
 * `needsExplanation` live in `src/kids/family-v4.ts`, which is pure and which
 * both twins import, so the web and native halves cannot disagree about what
 * `used={180} limit={120}` means. Re-deriving any of it here would recreate
 * exactly the drift that file was written to end.
 *
 * **The tone-to-ink table.** That is `primitives/internal/tone-v4`, shared by
 * every V4 vertical. It is re-exported below so a `kids` component reaches one
 * import rather than two.
 *
 * What is left is the handful of *theme-dependent* decisions more than one
 * component in this batch makes. Nothing here is exported from the package.
 */
import type { ViewStyle } from 'react-native';
import type { XenitionNativeTheme } from '../../theme';
import type { ChildMood } from '../ChildProfileCard';
import { metaLine, onPair, skeletonFill, toneFill, toneInk, type ToneV4 } from '../../primitives/internal/tone-v4';
import { minTap } from '../../primitives/internal/chrome-v4';
export { metaLine, onPair, skeletonFill, toneFill, toneInk, minTap };
export type { ToneV4 };
/**
 * The tone anything that is **identity** wears: a behaviour chip beside a
 * six-year-old's name, a school-event type, a family role.
 *
 * This module shipped `negative → danger`, `exam → danger`,
 * `holiday → success` and `caregiver → success`. None of those four is a
 * status: `danger` means *something has gone wrong with the system*, and
 * spending it on a child's conduct is both a status-colour-on-identity
 * violation and a shaming pattern — a saturated red chip with a 👎 against a
 * child's name. An exam is not an error and a caregiver is not a success.
 *
 * Identity is carried by a **glyph and a word** on a neutral chip, which also
 * survives greyscale, CVD and a screen reader, none of which a hue does.
 *
 * It is a named constant rather than the bare string so the rule is greppable
 * and so the four call sites can never drift to four different answers.
 */
export declare const IDENTITY_TONE: ToneV4;
/**
 * The glyph and the word each mood wears.
 *
 * Here rather than in `ChildProfileCardV4` because `ChildSwitcherV4` shows the
 * same mood for the same child, and two tables would eventually disagree about
 * what `sick` looks like. A mood is never a *tone*: `sad` and `sick` are not
 * system faults, and this module does not colour a child by how their day has
 * gone. The words are defaults — the card takes a `moodLabels` override.
 */
export declare const MOOD_GLYPH: Record<ChildMood, string>;
export declare const MOOD_LABEL: Record<ChildMood, string>;
/**
 * Join the fragments of a component's spoken name with commas.
 *
 * Commas, not {@link metaLine}'s ` · `: a reader either says "middle dot" out
 * loud or swallows the pause entirely, and this string is heard rather than
 * seen. `metaLine` stays for the *visible* caption lines.
 */
export declare function spokenLine(parts: ReadonlyArray<string | number | undefined | null>): string;
/**
 * A percentage as React Native's `accessibilityValue`.
 *
 * Always `0..100`, and always fed from `meterParts`' **clamped** `ratio`, never
 * from the raw measurement. `<ScreenTimeBar used={180} limit={120} />`
 * announced `valuenow=180` against `valuemax=120` — an invalid range, read
 * aloud as "180 of 120". The overage is a separate sentence, not a broken
 * meter.
 */
export declare function percentValue(percent: number | undefined): {
    min: number;
    max: number;
    now: number;
};
/**
 * The raised-card box every card-shaped component in this module shares.
 *
 * **`card` / `onCard`, not `surface` / `onSurface`.** Every native container in
 * this module paints `colors.surface` today — the *page* colour — so a card
 * that is supposed to sit above the page is the same colour as the page, and
 * in dark mode the whole screen goes flat. `card` is the token that was split
 * out precisely so a raised surface reads as raised in both schemes.
 *
 * Written out longhand in eight files today, which is eight places for a
 * radius to drift.
 */
export declare function cardStyle(theme: XenitionNativeTheme): ViewStyle;
/**
 * The roster-row box — `FamilyMemberRowV4`, `SchoolEventRowV4`,
 * `RoutineRowV4`.
 *
 * The same `card` ground as {@link cardStyle} with the row family's own
 * geometry: a smaller radius, `md` gutters and a `minHeight` that clears the
 * tap floor even before the row's own controls do. `minHeight` rather than
 * `height`, so a row whose title wraps on a narrow phone grows instead of
 * clipping.
 */
export declare function rowShellStyle(theme: XenitionNativeTheme): ViewStyle;
/**
 * One inert block of a loading skeleton.
 *
 * Every skeleton in this module is `backgroundColor: colors.border` — the
 * **hairline** colour used as a **fill**. On a light seed that is a rule
 * pretending to be a block; on a dark one it very nearly disappears, so the
 * loading state and the empty state look the same. `skeletonFill` is an opaque
 * mix of the card and its own ink, so it reads as a surface in both schemes and
 * borrows nothing from whatever sits behind it.
 *
 * The heights come from the type scale rather than from `12` and `26`, so a
 * skeleton is the size of the text it stands in for on any seed.
 */
export declare function skeletonBlockStyle(theme: XenitionNativeTheme, options: {
    height: number;
    width?: ViewStyle['width'];
    round?: boolean;
}): ViewStyle;
/**
 * The ground a meter track, a percentile band or a star rail is drawn on.
 *
 * The same opaque mix a skeleton uses, and for the same reason: an inert
 * ground that is visibly a surface in both schemes rather than a hairline
 * colour asked to behave like a fill.
 */
export declare function trackGround(theme: XenitionNativeTheme): string;
/**
 * A tap target that clears 44 on both axes, centred.
 *
 * Spelt once because this module is **for children**, whose aim is worse than
 * an adult's and whose fingers are not smaller in the way the interface
 * assumes: the reward stars ship as a ~20px glyph with `hitSlop={6}`, which is
 * a 32px target, and a sticker cell is a 44 circle with no floor under the
 * pressable around it. A `hitSlop` is not a target — it is invisible, it does
 * not grow the ripple, and it does not stop two adjacent stars from
 * overlapping each other's slop.
 */
export declare function tapTargetStyle(theme: XenitionNativeTheme): ViewStyle;
//# sourceMappingURL=tone-v4.d.ts.map