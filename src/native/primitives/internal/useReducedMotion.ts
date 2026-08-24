/**
 * `prefers-reduced-motion` for React Native — the OS "Reduce Motion" toggle,
 * read via `AccessibilityInfo`. Components that animate (StatusDot's echo,
 * future motion) gate their animation on this, exactly as the web layer gates
 * on the CSS media query. SSR/native-safe: the async read never throws and the
 * initial value is the motion-on default.
 */
import { useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    let mounted = true;
    AccessibilityInfo.isReduceMotionEnabled()
      .then((value) => {
        if (mounted) setReduced(value);
      })
      .catch(() => {
        /* older platforms may reject; treat as motion-on */
      });

    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', (value: boolean) =>
      setReduced(value)
    );

    return () => {
      mounted = false;
      // RN >= 0.65 returns a subscription with `.remove()`.
      sub?.remove?.();
    };
  }, []);

  return reduced;
}
