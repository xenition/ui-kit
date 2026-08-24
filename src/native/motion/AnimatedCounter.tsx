import * as React from 'react';
import { Animated, Easing, Text, type StyleProp, type TextStyle } from 'react-native';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';

export interface AnimatedCounterProps {
  /** Final value. */
  to: number;
  /** Starting value (default 0). */
  from?: number;
  /** Count duration in ms (default 1500). */
  duration?: number;
  /** Formats the current value for display. Defaults to rounded `toLocaleString()`. */
  format?: (value: number) => string;
  style?: StyleProp<TextStyle>;
}

const defaultFormat = (value: number): string => Math.round(value).toLocaleString('en-US');

/**
 * Counts up (or down) on mount — the native mirror of the web `AnimatedCounter`.
 * On mobile the norm is a **mount** entrance (like the native `Reveal`), so
 * instead of the web's scroll-into-view trigger this counts as soon as it
 * mounts, driven by the RN `Animated` clock with an ease-out curve. Under the
 * OS "Reduce Motion" setting the final value renders immediately. The animated
 * value is read on the JS thread (to format each frame), so this uses
 * `useNativeDriver: false`. Motion-only — inherit color via `style`.
 */
export function AnimatedCounter({
  to,
  from = 0,
  duration = 1500,
  format = defaultFormat,
  style,
}: AnimatedCounterProps): React.ReactElement {
  const reduced = useReducedMotion();
  const anim = React.useRef(new Animated.Value(from)).current;
  const [value, setValue] = React.useState(from);

  React.useEffect(() => {
    if (reduced || duration <= 0) {
      setValue(to);
      return undefined;
    }
    anim.setValue(from);
    const id = anim.addListener(({ value: v }) => setValue(v));
    const animation = Animated.timing(anim, {
      toValue: to,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    });
    animation.start();
    return () => {
      animation.stop();
      anim.removeListener(id);
    };
  }, [reduced, from, to, duration, anim]);

  return <Text style={style}>{format(value)}</Text>;
}
