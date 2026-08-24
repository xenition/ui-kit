import * as React from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** SSR-safe, one-shot check (no subscription). */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
    return false;
  }
  return window.matchMedia(QUERY).matches;
}

/**
 * React hook for `prefers-reduced-motion`. SSR-safe: returns `false` on the
 * server and subscribes to media-query changes on the client.
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = React.useState<boolean>(prefersReducedMotion);

  React.useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') {
      return undefined;
    }
    const mq = window.matchMedia(QUERY);
    setReduced(mq.matches);
    const onChange = (event: MediaQueryListEvent): void => setReduced(event.matches);
    // Older engines only implement addListener/removeListener.
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onChange);
      return () => mq.removeEventListener('change', onChange);
    }
    mq.addListener(onChange);
    return () => mq.removeListener(onChange);
  }, []);

  return reduced;
}
