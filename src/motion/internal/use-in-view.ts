import * as React from 'react';

export interface UseInViewOptions {
  /** IntersectionObserver threshold. */
  threshold?: number;
  /** Stop observing after the first intersection. */
  once?: boolean;
  /** Treat the element as immediately in view (reduced motion, SSR, tests). */
  disabled?: boolean;
}

/**
 * Tracks whether `ref`'s element intersects the viewport. SSR-safe and
 * IO-safe: when `IntersectionObserver` is unavailable (server, ancient
 * browsers) or `disabled` is set, it reports `true` immediately so content is
 * never hidden forever.
 */
export function useInView(
  ref: React.RefObject<Element | null>,
  { threshold = 0.15, once = true, disabled = false }: UseInViewOptions = {}
): boolean {
  const [inView, setInView] = React.useState(false);

  React.useEffect(() => {
    if (disabled || typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return undefined;
    }
    const el = ref.current;
    if (el === null) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setInView(true);
            if (once) observer.disconnect();
          } else if (!once) {
            setInView(false);
          }
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, threshold, once, disabled]);

  return inView;
}
