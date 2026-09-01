import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/**
 * Native reveal effects.
 *
 * The base offered three (`fade`, `fade-up`, `zoom`) against the web's six, on
 * the reasoning that mobile entrances are mount entrances rather than scroll
 * ones — true, and unrelated to which *directions* an entrance may come from.
 * The two slides are a mount entrance as readily as the rise is, and brief §3
 * rule 4 wants the twins to agree, so V4 carries five of the six.
 *
 * `blur-in` stays web-only, and this is the honest reason rather than the
 * blanket one: React Native has no `filter` on a `View`. A real blur needs
 * `@react-native-community/blur` or `expo-blur` — a peer dependency, which
 * brief §3 rule 6 forbids this module.
 */
export type RevealV4Effect = 'fade' | 'fade-up' | 'slide-left' | 'slide-right' | 'zoom';
export interface RevealV4Props {
    children?: React.ReactNode;
    /** Entrance effect (default `fade-up`). */
    effect?: RevealV4Effect;
    /** Delay before the entrance starts, in ms (added to any surrounding `Stagger`). */
    delay?: number;
    /**
     * Entrance duration, in ms. Defaults to `V4_MOTION.enter` (400) — the same
     * number as the web twin, which is the whole point of this file.
     */
    duration?: number;
    /** Style override on the wrapper. */
    style?: StyleProp<ViewStyle>;
}
/**
 * **V4 reveal (native)** — the twin of the web `RevealV4`, and the reason that
 * file exists.
 *
 * 1. **The duration.** This component ran `500ms` while its web twin ran
 *    `600ms`: the same component, two numbers, neither of them on the scale,
 *    and no comment in either file admitting the other existed. Brief §1 calls
 *    it the headline bug of this pass. A reveal is something arriving, so both
 *    twins now default to `V4_MOTION.enter` (400).
 * 2. **The easing.** The base passed no `easing` at all, taking
 *    `Animated.timing`'s default `Easing.inOut(Easing.ease)` — a symmetric
 *    curve, which is the wrong shape for an arrival: it decelerates into place
 *    *and* accelerates out of nothing. {@link EASING_ENTER} is M3's
 *    emphasized-decelerate, the same four control points the web twin hands to
 *    `cubic-bezier()`.
 * 3. **The distance.** `translateY: 16` was a literal in a `FROM` table. It is
 *    `spacing.lg` now, off the same compiled scale the web twin reaches through
 *    `var(--xen-space-lg)`, and the slides take `spacing.xl` — so the two twins
 *    travel the same pixels, not merely similar ones.
 * 4. **Reduced motion is a fade, not a jump.** The base returned a static
 *    `<View style={{ opacity: 1 }}>`: the content simply existed, with no
 *    transition of any kind. `design.md` §36.10 and brief §3 rule 3 both say
 *    that is the wrong reduction — an element that appears with no transition
 *    reads as a glitch. V4 keeps the animation and removes the *travel*: opacity
 *    only, at `V4_MOTION.standard` (200ms) with {@link EASING_STANDARD}, since a
 *    fade starts and ends in place.
 *
 * **This component needs a theme provider above it, and the base did not.**
 * That is the cost of (3) — the spacing scale lives in the compiled theme and
 * React Native cannot read a CSS variable — and it is the same requirement
 * every other V4 native component already carries (the base `AnimatedCounter`
 * included, for its colour).
 *
 * `useNativeDriver: true`: opacity and transform are the two things the native
 * driver handles, so the entrance runs off the JS thread even while a list is
 * still mounting. No colors are painted here — motion only.
 */
export declare function RevealV4({ children, effect, delay, duration, style, }: RevealV4Props): React.ReactElement;
//# sourceMappingURL=RevealV4.d.ts.map