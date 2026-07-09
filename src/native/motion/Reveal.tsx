import * as React from 'react';
import { Animated, View, type StyleProp, type ViewStyle } from 'react-native';
import { useReducedMotion } from '../primitives/internal/useReducedMotion';
import { StaggerConfigContext, StaggerIndexContext } from './Stagger';

/**
 * Native reveal effects. On mobile the norm is a **mount** entrance rather than
 * a scroll-triggered one, so the web's scroll/slide variants collapse to the
 * three that read well as an entrance: `fade`, `fade-up` (fade + small
 * translateY), and `zoom` (fade + scale).
 */
export type RevealEffect = 'fade' | 'fade-up' | 'zoom';

export interface RevealProps {
  children?: React.ReactNode;
  /** Entrance effect (default `fade-up`). */
  effect?: RevealEffect;
  /** Delay before the entrance starts, in ms (added to any surrounding `Stagger`). */
  delay?: number;
  /** Entrance duration, in ms (default 500). */
  duration?: number;
  /** Style override on the wrapper. */
  style?: StyleProp<ViewStyle>;
}

// Starting offset/scale for each effect (the animated value drives 0→1).
const FROM = {
  translateY: 16,
  scale: 0.92,
};

/**
 * Mount-entrance wrapper — the native mirror of the web `Reveal`, adapted to
 * mobile: content animates **in on mount** via `Animated` (no
 * IntersectionObserver / scroll trigger — those are web-only). Under the OS
 * "Reduce Motion" setting the animation is skipped entirely and children render
 * immediately in their final state. A surrounding `Stagger` adds
 * `base + index * interval` to the `delay`. No literal colors (motion only).
 */
export function Reveal({
  children,
  effect = 'fade-up',
  delay = 0,
  duration = 500,
  style,
}: RevealProps): React.ReactElement {
  const reduced = useReducedMotion();

  const staggerConfig = React.useContext(StaggerConfigContext);
  const staggerIndex = React.useContext(StaggerIndexContext);
  const totalDelay =
    delay +
    (staggerConfig !== null ? staggerConfig.delay + staggerIndex * staggerConfig.interval : 0);

  const anim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (reduced) {
      anim.setValue(1);
      return undefined;
    }
    anim.setValue(0);
    const animation = Animated.timing(anim, {
      toValue: 1,
      duration,
      delay: totalDelay,
      useNativeDriver: true,
    });
    animation.start();
    return () => animation.stop();
  }, [reduced, anim, duration, totalDelay]);

  // Reduced motion: render immediately, statically, at full visibility.
  if (reduced) {
    return (
      <View testID="xen-reveal" style={[{ opacity: 1 }, style]}>
        {children}
      </View>
    );
  }

  // Inline literals (mirrors the StatusDot echo pattern) so the Animated
  // transform types line up; `fade` carries no transform.
  const transform =
    effect === 'fade-up'
      ? [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [FROM.translateY, 0] }) }]
      : effect === 'zoom'
        ? [{ scale: anim.interpolate({ inputRange: [0, 1], outputRange: [FROM.scale, 1] }) }]
        : [];

  return (
    <Animated.View testID="xen-reveal" style={[{ opacity: anim, transform }, style]}>
      {children}
    </Animated.View>
  );
}
