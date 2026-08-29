import * as React from 'react';
import { Animated, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import type { SemanticColors } from '../theme';
import { useReducedMotion } from './internal/useReducedMotion';
import type { StatusDotProps, StatusDotTone } from './StatusDot';
import { EASING_EXIT } from './internal/motion-v4';

export type { StatusDotProps as StatusDotV4Props, StatusDotTone };

/**
 * Tone → the **text** form of its slot.
 *
 * A status dot is a mark you have to be able to see, and the plain slots are
 * FILL colours: the compiler guarantees `onWarn` against `warn` and promises
 * nothing at all about `warn` against `surface`. A pale amber dot at eight
 * pixels on a white page is a dot nobody can find. The `*Text` forms are those
 * same hues walked until they clear AA on `surface`, and identical wherever the
 * plain slot already did — the same correction the native `Rating` made for its
 * filled star, for exactly the same reason.
 */
const MARK: Record<StatusDotTone, keyof SemanticColors> = {
  success: 'successText',
  warn: 'warnText',
  danger: 'dangerText',
  primary: 'primaryText',
  accent: 'accentText',
  // The one tone with no text form to take, and the one that needs none: it
  // means "no status". `muted` is already a text colour, held to the 3:1 a
  // non-text mark is judged at rather than to the 4.5 the five meanings clear.
  muted: 'muted',
};

/** One full echo. Slow enough to read as a heartbeat rather than a blink. */
const ECHO_MS = 2000;

/**
 * **V4 status dot** — same props as {@link StatusDot}, a different design line.
 *
 * ## A mark this small has to be legible
 *
 * The base painted `colors[tone]` — the raw fill slot. That is the correct
 * colour to put text ON and the wrong colour to draw an eight-pixel mark IN:
 * `warn` on a light page measures barely above the background for many seeds,
 * and the "live" indicator quietly disappears. V4 takes the compiler's
 * contrast-safe text form of the same hue, which clears AA against `surface`
 * and is unchanged wherever the raw slot already did.
 *
 * `design.md` §35.4 is what makes this a correctness issue rather than a taste
 * one: the dot's colour *is* its meaning. A green dot that cannot be
 * distinguished from an amber one at a glance has not said anything.
 *
 * ## The echo says "live", so it is allowed to loop
 *
 * §36.1 asks motion to be functional and §36.13 warns that a permanent
 * animation is a permanent cost. This one earns it narrowly: an expanding echo
 * is how a dot says *now*, and a static dot only says *is*. It stays cheap —
 * scale and opacity, both compositor properties, on a single view — it can be
 * switched off per instance with `pulse={false}`, and Reduce Motion removes it
 * everywhere (§36.10). The solid dot still carries the state without it, so
 * nothing is lost but the movement.
 *
 * ## Size from the scale
 *
 * The default diameter is `spacing.sm` — which is the 8 the base hard-coded.
 * The number was never wrong; a literal just cannot follow the theme's density.
 */
export function StatusDotV4({
  tone = 'success',
  pulse = true,
  label,
  size,
  style,
}: StatusDotProps): React.ReactElement {
  const { colors, tokens } = useXenitionTheme();
  const reduced = useReducedMotion();

  const color = colors[MARK[tone]];
  const d = size ?? tokens.spacing.sm;
  const animate = pulse && !reduced;

  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!animate) {
      anim.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: ECHO_MS,
        easing: EASING_EXIT,
        useNativeDriver: true,
      })
    );
    loop.start();
    return () => loop.stop();
  }, [animate, anim]);

  return (
    <View
      accessible={label !== undefined}
      accessibilityRole={label !== undefined ? 'image' : undefined}
      accessibilityLabel={label}
      importantForAccessibility={label === undefined ? 'no-hide-descendants' : 'yes'}
      style={[{ width: d, height: d, alignItems: 'center', justifyContent: 'center' }, style]}
    >
      {animate ? (
        <Animated.View
          testID="xen-v4-status-echo"
          pointerEvents="none"
          style={{
            position: 'absolute',
            width: d,
            height: d,
            borderRadius: d / 2,
            backgroundColor: color,
            opacity: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [0.75, 0, 0] }),
            transform: [
              { scale: anim.interpolate({ inputRange: [0, 0.7, 1], outputRange: [1, 2.4, 2.4] }) },
            ],
          }}
        />
      ) : null}
      <View
        testID="xen-v4-status-fill"
        style={{ width: d, height: d, borderRadius: d / 2, backgroundColor: color }}
      />
    </View>
  );
}
