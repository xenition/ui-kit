import * as React from 'react';
import {
  Animated,
  Easing,
  Pressable,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { useXenitionTheme } from '../theme';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';

export interface MarqueeV4Props {
  /** Scroll speed in px/s. The loop duration is derived from the content width. */
  speed?: number;
  /** Gap between the two copies. Defaults to the theme's `lg` spacing. */
  gap?: number;
  /**
   * Pause the loop while the row is held. The web twin's counterpart is
   * `pauseOnHover` — see the doc comment for why the name differs.
   */
  pauseOnPress?: boolean;
  /** Style override on the clipping container. */
  style?: StyleProp<ViewStyle>;
  testID?: string;
  children?: React.ReactNode;
}

/**
 * `Marquee`, V4 on native — the same loop as the web twin, with the two gaps
 * the base left open and the reason its numbers are off the motion scale
 * written down.
 *
 * ## Why this component does not take `V4_MOTION` / `EASING_*`
 *
 * Brief §2 draws the line: **the M3 scale governs a *transition* — a thing
 * moving from one state to another. It does not govern *playback* — content
 * that runs for as long as the content takes.** A marquee is playback:
 *
 *   - **The duration stays derived** (`distance / speed`). A row of four logos
 *     and a row of forty are not the same event, and a 400ms marquee is not a
 *     marquee. The caller sets a *speed*, in px/s, which is the property a
 *     reader actually perceives; the duration falls out of it.
 *   - **The easing stays `Easing.linear`.** This is the one a future reader
 *     will "fix" onto `EASING_STANDARD`, so: every curve on the scale starts or
 *     ends at zero velocity. An infinite loop on such a curve decelerates into
 *     its seam and accelerates out of it, which makes the seam visible — the
 *     row reads as stopping and restarting several times a minute instead of
 *     running. `linear` is the correct curve for playback, not a placeholder.
 *
 * Both literals carry that reasoning where they are used, per §3.1.
 *
 * ## Reduced motion stops it rather than fading it
 *
 * The house rule (§3.3, `design.md` §36.10) is that reduced motion replaces a
 * large spatial move with a fade instead of removing it, because an element
 * that appears with no transition reads as a glitch. **A marquee is the
 * documented exception**, for two reasons:
 *
 *   1. A fade substitutes for a transition, and a transition has a still frame
 *      at each end to fade between. A loop has neither end — there is nothing
 *      to fade *to*.
 *   2. Continuous, unstoppable, auto-advancing motion is not incidental here;
 *      it is the whole component, and it is exactly what the OS "Reduce Motion"
 *      setting (and WCAG 2.2.2, Pause/Stop/Hide) is asking about. Stopping is
 *      the right answer, not a degraded one.
 *
 * So under Reduce Motion this renders one static row, and `RevealV4` fades.
 *
 * ## The two gaps this closes
 *
 * **1. The echo copy is now hidden from assistive tech.** The content is
 * rendered twice so the track can translate by exactly one copy and land back
 * where it started. The web `Marquee` marks the second copy `aria-hidden` so a
 * screen reader hears the content once; **the native base hides neither**, so
 * every label in a native marquee is announced twice. The echo here carries
 * `accessibilityElementsHidden` (iOS) and
 * `importantForAccessibility="no-hide-descendants"` (Android), which is the
 * pair `aria-hidden` compiles to.
 *
 * **2. `pauseOnPress` replaces `pauseOnHover`.** Touch has no hover, so the web
 * prop cannot be mirrored by name. Holding the row is the honest translation of
 * pointing at it, and it is the WCAG 2.2.2 pause mechanism for a moving element
 * a reader needs to stop — without adding a separate control that would clutter
 * a logo row. Both props default to `true`; this is the one place the twins
 * deliberately disagree on a prop name, and every other prop and default
 * matches (§3.4).
 *
 * The press target is deliberately **not** an accessibility element
 * (`accessible={false}`): a marquee's items must keep their own labels, and
 * grouping them under one "pause" button would silence the content it exists to
 * present. A screen-reader user gets the stronger, system-level version of the
 * same thing — Reduce Motion, which stops the loop entirely (above).
 *
 * Pausing resumes from where it stopped rather than snapping back to the start,
 * because a reader who held the row to finish reading an item does not expect
 * that item to jump away on release.
 */
export function MarqueeV4({
  speed = 40,
  gap,
  pauseOnPress = true,
  style,
  testID,
  children,
}: MarqueeV4Props): React.ReactElement {
  const { tokens } = useXenitionTheme();
  const reduced = useReducedMotion();
  const trackGap = gap ?? tokens.spacing.lg;

  const [width, setWidth] = React.useState(0);
  const [paused, setPaused] = React.useState(false);
  const x = React.useRef(new Animated.Value(0)).current;
  const running = React.useRef<Animated.CompositeAnimation | null>(null);
  /** Where the last stop left the track, so a resume continues from there. */
  const offset = React.useRef(0);

  React.useEffect(() => {
    if (reduced || paused || width === 0 || speed <= 0) return undefined;

    const distance = width + trackGap;
    // Playback, not a transition (§2): content ÷ speed, in ms.
    const fullDuration = (distance / speed) * 1000;
    let cancelled = false;

    const cycle = (): void => {
      if (cancelled) return;
      x.setValue(0);
      offset.current = 0;
      const loop = Animated.loop(
        Animated.timing(x, {
          toValue: -distance,
          duration: fullDuration,
          // `linear`, and not a scale easing — see the doc comment. An eased
          // loop visibly restarts at the seam.
          easing: Easing.linear,
          useNativeDriver: true,
        })
      );
      running.current = loop;
      loop.start();
    };

    const from = Math.max(-distance, Math.min(0, offset.current));
    if (from === 0) {
      cycle();
    } else {
      // Finish the interrupted pass at the same px/s, then hand over to the
      // steady loop. `Animated.loop` resets to the value it started from, so it
      // cannot itself begin mid-pass.
      x.setValue(from);
      const lead = Animated.timing(x, {
        toValue: -distance,
        duration: ((distance + from) / speed) * 1000,
        easing: Easing.linear, // playback — see above
        useNativeDriver: true,
      });
      running.current = lead;
      lead.start(({ finished }) => {
        if (finished) cycle();
      });
    }

    return () => {
      cancelled = true;
      running.current?.stop();
      running.current = null;
      x.stopAnimation((value) => {
        offset.current = value;
      });
    };
  }, [reduced, paused, width, speed, trackGap, x]);

  const row: ViewStyle = { flexDirection: 'row', alignItems: 'center', gap: trackGap };

  // Reduce Motion: one static row, still clipped so it cannot overflow. No
  // second copy — there is no seam to hide when nothing moves, and a duplicated
  // row of items would just be noise.
  if (reduced) {
    return (
      <View testID={testID} style={[{ overflow: 'hidden' }, style]}>
        <View testID="xen-v4-marquee-content" style={row}>
          {children}
        </View>
      </View>
    );
  }

  const track = (
    <Animated.View testID="xen-v4-marquee-track" style={[row, { transform: [{ translateX: x }] }]}>
      <View
        testID="xen-v4-marquee-content"
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        style={row}
      >
        {children}
      </View>
      {/*
        The seam copy. It exists only so the translate can wrap invisibly, so it
        is hidden from assistive tech — the gap the base left open.
      */}
      <View
        testID="xen-v4-marquee-echo"
        accessibilityElementsHidden
        importantForAccessibility="no-hide-descendants"
        style={[row, { marginLeft: trackGap }]}
      >
        {children}
      </View>
    </Animated.View>
  );

  return (
    <View testID={testID} style={[{ overflow: 'hidden' }, style]}>
      {pauseOnPress ? (
        <Pressable
          testID="xen-v4-marquee-pause"
          // Not an accessibility element on purpose — see the doc comment.
          accessible={false}
          onPressIn={() => setPaused(true)}
          onPressOut={() => setPaused(false)}
        >
          {track}
        </Pressable>
      ) : (
        track
      )}
    </View>
  );
}
