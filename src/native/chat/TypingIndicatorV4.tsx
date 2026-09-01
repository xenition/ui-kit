import * as React from 'react';
import { Animated, Easing, View } from 'react-native';
import { useXenitionTheme } from '../theme';
import { TextV4 } from '../primitives/TextV4';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { appearanceStyle } from '../primitives/internal/appearance';
import { V4_MOTION } from '../../primitives/internal/v4-motion';
import { chatSize, type ChatSize } from './internal/thread-v4';
import type { TypingIndicatorProps } from './TypingIndicator';

export interface TypingIndicatorV4Props extends TypingIndicatorProps {
  /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
  scale?: ChatSize;
  /** Build the spoken line. Default `'Ada is typing'` / `'Typing'`. */
  formatLabel?: (name?: string) => string;
}

/** How far apart the three dots start, in ms. Geometric — it is a stagger. */
const STAGGER = 150;

/** One breathing dot. */
function Dot({
  delay,
  size,
  animate,
  color,
  radius,
}: {
  delay: number;
  size: number;
  animate: boolean;
  color: string;
  radius: number;
}): React.ReactElement {
  const value = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (!animate) {
      value.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(value, {
          toValue: 1,
          duration: V4_MOTION.standard,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(value, {
          toValue: 0,
          duration: V4_MOTION.standard,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [value, animate, delay]);

  return (
    <Animated.View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        backgroundColor: color,
        transform: [
          { translateY: value.interpolate({ inputRange: [0, 1], outputRange: [0, -size / 2] }) },
        ],
      }}
    />
  );
}

/**
 * **V4 typing indicator** — same props as {@link TypingIndicator} plus
 * `scale` and `formatLabel`.
 *
 * ## Three changes
 *
 * 1. **The loop is on the M3 motion scale.** The base timed its own dots; a
 *    breathing dot is a state change, so it takes `standard`.
 * 2. **The name line is a prop.** `'Ada is typing'` was assembled inside the
 *    component, out of a localizing host's reach — and the word order is not
 *    universal.
 * 3. **The dots are hidden from the reader.** The live region carries the
 *    message; three unlabelled circles beside it are three extra stops.
 *
 * `useReducedMotion()` still collapses the animation entirely — the base did
 * this correctly and it is kept.
 */
export function TypingIndicatorV4({
  name,
  bubble = true,
  size,
  scale = 'sm',
  appearance = 'classic',
  formatLabel,
  style,
}: TypingIndicatorV4Props): React.ReactElement {
  const theme = useXenitionTheme();
  const { colors, tokens } = theme;
  const reduced = useReducedMotion();

  const dot = size ?? chatSize(theme, scale) / 2;
  const spoken = (formatLabel ?? ((n?: string) => (n ? `${n} is typing` : 'Typing')))(name);

  const dots = (
    <View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ flexDirection: 'row', alignItems: 'flex-end', gap: dot * 0.6 }}
    >
      {[0, STAGGER, STAGGER * 2].map((delay) => (
        <Dot
          key={delay}
          delay={delay}
          size={dot}
          animate={!reduced}
          color={colors.mutedText}
          radius={tokens.radius.full}
        />
      ))}
    </View>
  );

  return (
    <View
      accessibilityLiveRegion="polite"
      accessibilityLabel={spoken}
      style={[
        { flexDirection: 'row', alignItems: 'center', gap: tokens.spacing.sm },
        style,
      ]}
    >
      {name ? (
        <TextV4 size="xs" tone="mutedText">
          {name}
        </TextV4>
      ) : null}
      {bubble ? (
        <View
          style={{
            ...appearanceStyle(appearance, colors, tokens),
            borderRadius: tokens.radius.lg,
            paddingVertical: tokens.spacing.sm,
            paddingHorizontal: tokens.spacing.md,
          }}
        >
          {dots}
        </View>
      ) : (
        dots
      )}
    </View>
  );
}
