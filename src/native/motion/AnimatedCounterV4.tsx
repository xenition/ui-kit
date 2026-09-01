import * as React from 'react';
import { Animated, Text, type StyleProp, type TextStyle } from 'react-native';
import { EASING_ENTER } from '../primitives/internal/motion-v4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { useXenitionTheme } from '../theme';

export interface AnimatedCounterV4Props {
  /** Final value. */
  to: number;
  /** Starting value (default 0). */
  from?: number;
  /** Count duration in ms. See {@link COUNT_MS} for why this one is not on the scale. */
  duration?: number;
  /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
  format?: (value: number) => string;
  style?: StyleProp<TextStyle>;
}

/**
 * The default count duration, in ms — **deliberately not from the scale**.
 *
 * Brief §2 draws the line this constant sits on. The M3 scale governs a
 * *transition*: a thing moving from one state to another, where the duration is
 * a property of the interface. A counter is *playback*: the duration is a
 * property of the content. A count from 0 to 12 and a count from 0 to 4,000,000
 * are not the same event, and forcing both onto `enter` (400ms) would make the
 * first feel frantic and the second illegible. So the number stays a caller
 * decision and this is only a starting point — the base's 1500, kept because it
 * is defensible and because the web twin has to agree with it (brief §3
 * rule 4).
 *
 * The **easing** is a different question and does come from the scale: see the
 * component note.
 */
export const COUNT_MS = 1500;

const defaultFormat = (value: number): string => Math.round(value).toLocaleString('en-US');

/**
 * **V4 animated counter (native)** — the twin of the web `AnimatedCounterV4`.
 *
 * 1. **The easing comes from the scale; the duration does not.** The base ran
 *    `Easing.out(Easing.cubic)`, which `motion-v4.ts` names by hand as "what
 *    the line reached for when it needed something decelerating" — a fourth
 *    curve in a system that publishes three. {@link EASING_ENTER} is M3's
 *    emphasized-decelerate, and a number arriving at its value is an arrival
 *    (brief §2). It is the same four control points the web twin hands to
 *    `cubic-bezier()`, so the two counts trace the same arc. The duration stays
 *    the caller's — see {@link COUNT_MS}.
 * 2. **The value is announced once, at the end.** The base said nothing to
 *    assistive tech: a `Text` whose content changed sixty times a second, with
 *    no label and no live region. The naive fix is worse than the silence —
 *    `accessibilityLiveRegion="polite"` on a ticking counter is a screen reader
 *    reading hundreds of intermediate numbers, none of which was ever true. So
 *    the region stays `"none"` for the whole count and flips to `"polite"` on
 *    the last frame, when the text and the label finally agree; and
 *    `accessibilityLabel` carries the **final** value throughout, so a reader
 *    that lands on this element mid-count hears the number the caller meant
 *    rather than whichever frame it caught. Under reduced motion both are true
 *    from the first render.
 *
 * Reduced motion keeps the base's behaviour and does **not** take brief §3
 * rule 3's fade: that rule replaces a *spatial move* with a fade so nothing
 * appears without a transition. Nothing appears here — the element is on screen
 * throughout and only its text changes — so the honest reduction is to skip the
 * playback and show the final value, which is also what the number is for.
 *
 * `useNativeDriver: false`, unchanged and unavoidable: the animated value has
 * to be read on the JS thread to be formatted into text each frame.
 *
 * The `onSurface`-first / caller-`style`-second colour order is the base's, and
 * kept for the base's reason: React Native `Text` does not inherit colour from
 * a `View` ancestor, so a counter with no colour of its own is black — fine on
 * a light surface, 1.29:1 on a dark one.
 */
export function AnimatedCounterV4({
  to,
  from = 0,
  duration = COUNT_MS,
  format = defaultFormat,
  style,
}: AnimatedCounterV4Props): React.ReactElement {
  const { colors } = useXenitionTheme();
  const reduced = useReducedMotion();
  const anim = React.useRef(new Animated.Value(from)).current;
  const [value, setValue] = React.useState(from);
  const [settled, setSettled] = React.useState(false);

  React.useEffect(() => {
    if (reduced || duration <= 0) {
      setValue(to);
      setSettled(true);
      return undefined;
    }
    setSettled(false);
    anim.setValue(from);
    const id = anim.addListener(({ value: v }) => setValue(v));
    const animation = Animated.timing(anim, {
      toValue: to,
      duration,
      easing: EASING_ENTER,
      useNativeDriver: false,
    });
    animation.start(({ finished }) => {
      if (finished) {
        setValue(to);
        setSettled(true);
      }
    });
    return () => {
      animation.stop();
      anim.removeListener(id);
    };
  }, [reduced, from, to, duration, anim]);

  return (
    <Text
      testID="xen-v4-counter"
      accessibilityLabel={format(to)}
      accessibilityLiveRegion={settled ? 'polite' : 'none'}
      style={[{ color: colors.onSurface }, style]}
    >
      {format(value)}
    </Text>
  );
}
