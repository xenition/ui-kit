/**
 * Motion helpers — the kit was 98.3% static (audit Part C). These give every
 * component the two motions it most often needs, both reduced-motion-aware by
 * construction, so adding animation is a one-liner instead of hand-rolling
 * `Animated` (and forgetting `useReducedMotion`) each time.
 *
 * Timings follow design.md §36.2: micro-feedback 100–180ms, enter 160–240ms.
 * When the OS asks for reduced motion, every hook here degrades to an instant,
 * final value — no movement, never a broken interaction.
 */
import * as React from 'react';
import { Animated, Easing } from 'react-native';
import { useReducedMotion } from './useReducedMotion';

/**
 * A press-scale spring for tap targets. Returns the animated `scale` value plus
 * `onPressIn`/`onPressOut` handlers to spread onto a `Pressable`. Under reduced
 * motion the scale stays at 1 and the handlers are no-ops.
 *
 * ```tsx
 * const press = usePressScale();
 * <Animated.View style={{ transform: [{ scale: press.scale }] }}>
 *   <Pressable onPressIn={press.onPressIn} onPressOut={press.onPressOut} …/>
 * </Animated.View>
 * ```
 */
export function usePressScale(to = 0.97): {
  scale: Animated.Value;
  onPressIn: () => void;
  onPressOut: () => void;
} {
  const reduced = useReducedMotion();
  const scale = React.useRef(new Animated.Value(1)).current;
  const spring = React.useCallback(
    (value: number) => {
      if (reduced) {
        scale.setValue(1);
        return;
      }
      Animated.spring(scale, {
        toValue: value,
        useNativeDriver: true,
        speed: 40,
        bounciness: 0,
      }).start();
    },
    [reduced, scale]
  );
  return {
    scale,
    onPressIn: React.useCallback(() => spring(to), [spring, to]),
    onPressOut: React.useCallback(() => spring(1), [spring]),
  };
}

/**
 * A mount enter transition: fade in (and optionally rise a few px). Returns a
 * style object to spread onto an `Animated.View`. Under reduced motion the
 * element is simply visible from the first frame.
 *
 * `translateY` defaults to 6px (a gentle rise); pass 0 for a pure fade.
 */
export function useEnter(opts?: { translateY?: number; duration?: number }): {
  opacity: Animated.Value;
  transform: { translateY: Animated.AnimatedInterpolation<number> }[];
} {
  const reduced = useReducedMotion();
  const rise = opts?.translateY ?? 6;
  const duration = opts?.duration ?? 200;
  const progress = React.useRef(new Animated.Value(reduced ? 1 : 0)).current;

  React.useEffect(() => {
    if (reduced) {
      progress.setValue(1);
      return;
    }
    const anim = Animated.timing(progress, {
      toValue: 1,
      duration,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    });
    anim.start();
    // Stop the animation if the component unmounts mid-transition, so the timer
    // doesn't fire into a torn-down tree (avoids leaked-timer warnings in tests
    // and a setState-after-unmount in production).
    return () => anim.stop();
  }, [reduced, duration, progress]);

  return {
    opacity: progress,
    transform: [
      {
        translateY: progress.interpolate({
          inputRange: [0, 1],
          outputRange: [rise, 0],
        }),
      },
    ],
  };
}
