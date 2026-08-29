/**
 * `prefers-reduced-motion` for React Native — the OS "Reduce Motion" toggle,
 * read via `AccessibilityInfo`. Components that animate (StatusDot's echo,
 * future motion) gate their animation on this, exactly as the web layer gates
 * on the CSS media query. SSR/native-safe: the async read never throws and the
 * initial value is the motion-on default.
 *
 * Two paths, chosen by whether a `XenitionNativeThemeProviderV4` is mounted
 * above:
 *
 * - **With a V4 root** — the provider has already resolved the preference once
 *   for the whole tree, so this hook reads it off context. No second listener,
 *   no second async read, and no motion-on frame before the answer lands (the
 *   provider holds the first paint until it knows).
 * - **Without one** — the standalone behaviour below, unchanged: own listener,
 *   own read, `false` until the promise resolves. Every existing caller keeps
 *   exactly the behaviour it has today.
 *
 * `useContext` is called unconditionally and before the other hooks, so hook
 * order is identical on both paths.
 */
import { useContext, useEffect, useState } from 'react';
import { AccessibilityInfo } from 'react-native';
import { XenitionNativeMotionContext } from '../XenitionNativeThemeProviderV4';

export function useReducedMotion(): boolean {
  const shared = useContext(XenitionNativeMotionContext);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    // A V4 root owns the subscription for the whole tree; do not open a second.
    if (shared !== null) return;

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
    // `shared` is stable for the life of a tree in practice (a provider does
    // not appear and disappear above a mounted component), so with no V4 root
    // this effect still runs exactly once, as it always did.
  }, [shared]);

  return shared !== null ? shared.reducedMotion : reduced;
}
