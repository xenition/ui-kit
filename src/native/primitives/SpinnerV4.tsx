import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { useXenitionTheme } from '../theme';
import { mixToken } from '../../primitives/internal/v4-depth';
import { BUSY_MOTION, MIN_NON_TEXT_CONTRAST } from '../../primitives/internal/feedback-v4';
import { ensureContrast } from '../../theme/color';
import { useReducedMotion } from './internal/useReducedMotion';
import type { SpinnerProps, SpinnerSize } from './Spinner';

export type { SpinnerProps as SpinnerV4Props, SpinnerSize };

/**
 * How much of the brand the ring's track carries.
 *
 * The track is not grey. A spinner is one object, and a grey ring with a
 * coloured notch reads as two — the eye separates them before it reads the
 * rotation. Compositing a fifth of `primary` into `surface` keeps the whole
 * ring in one hue family, so what moves is a bright arc around a quiet one
 * rather than a chip orbiting a hoop.
 */
const TRACK_MIX = 0.2;

/**
 * **V4 spinner** — same props as {@link Spinner}, a different design line.
 *
 * ## Why it stopped being an `ActivityIndicator`
 *
 * The base spinner is the platform's `ActivityIndicator`, which spins whatever
 * the user's accessibility settings say. `design.md` §36.10 asks that motion be
 * respected as a preference, and a component that cannot switch itself off is
 * not respecting anything. V4 draws its own ring — a circle with one edge in
 * the brand — so Reduce Motion can actually stop it.
 *
 * Stopped, it is still a spinner: the ring keeps its bright arc, and a ring
 * that is brighter on one side is legible as "working" without moving at all.
 * §36.10's point is that the *information* survives the loss of the animation,
 * not that the component disappears.
 *
 * ## What the motion is allowed to say
 *
 * §36.7: loading feedback exists to reduce uncertainty, and it must not
 * fabricate precision. A spinner is what you use when the wait is short and
 * **unknown**, so this one is honestly shapeless — one continuous revolution,
 * no start, no end, no percentage. It never becomes a bar, never fills, never
 * accelerates toward a finish it cannot see. The moment a component knows the
 * fraction, the right component is `ProgressV4`.
 *
 * ## Tokens all the way down
 *
 * The three sizes are `spacing.md` / `lg` / `xl` — which happen to be the very
 * 16 / 24 / 32 the base hard-coded. The point is not that those numbers were
 * wrong; it is that a number written into a component cannot move when the
 * theme's density does. The stroke is derived from the diameter, and the bright
 * arc is held to 3:1 against its own track — WCAG's bar for a meaningful
 * graphic, which is what a spinner is.
 */
export function SpinnerV4({ size = 'md', style }: SpinnerProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();

  const spacing = tokens.spacing;
  const diameter: Record<SpinnerSize, number> = {
    sm: spacing.md,
    md: spacing.lg,
    lg: spacing.xl,
  };
  const d = diameter[size];
  // Proportional to the ring, so it thickens with the theme instead of being
  // three numbers that happen to have been chosen together.
  const stroke = Math.max(2, Math.round(d / 10));

  const track = mixToken(colors.surface, colors.primary, TRACK_MIX);
  const head = ensureContrast(colors.primary, track, MIN_NON_TEXT_CONTRAST);

  const turn = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reduced) {
      turn.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(turn, {
        toValue: 1,
        duration: BUSY_MOTION.spin,
        // Linear: a revolution has no beginning and no end to ease into, and
        // easing one would imply a rhythm the wait does not have (§36.3).
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [reduced, turn]);

  return (
    <Animated.View
      accessibilityRole="progressbar"
      accessibilityLabel="Loading"
      testID="xen-v4-spinner"
      style={[
        {
          width: d,
          height: d,
          borderRadius: d / 2,
          borderWidth: stroke,
          borderColor: track,
          borderTopColor: head,
          transform: reduced
            ? []
            : [
                {
                  rotate: turn.interpolate({
                    inputRange: [0, 1],
                    outputRange: ['0deg', '360deg'],
                  }),
                },
              ],
        },
        style,
      ]}
    />
  );
}
