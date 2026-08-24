import * as React from 'react';

export interface ResourceState<T> {
  /** The resolved value, or null before the first success / after an error. */
  data: T | null;
  loading: boolean;
  /** A friendly, user-safe message — never a raw error internal. */
  error: string | null;
  /** Re-run the fetcher — call after a mutation (create/update/delete) to reload. */
  refetch: () => void;
}

/**
 * The single message shown for ANY load failure. Data-layer errors (network,
 * 5xx, thrown `AppClientError`) are collapsed to this — pages never surface
 * raw internals, and there's one string to translate/brand.
 */
export const FRIENDLY_ERROR =
  'We could not load this content right now. Please check your connection and try again.';

/**
 * Minimal data-loading hook for template pages. Runs `fetcher` on mount (and
 * whenever `deps` change), tracking `{ data, loading, error }`. Any rejection
 * is collapsed into {@link FRIENDLY_ERROR}. The in-flight result is dropped on
 * unmount / deps-change so a late resolve can't set state on a gone component.
 *
 *   const { data, loading, error } = useResource(() => api.cms.items('posts'), []);
 *
 * This is the framework half of the moved template data layer: pair it with
 * `@xenition/sdk/client` and a template writes zero hand-rolled fetch/hook code.
 */
export function useResource<T>(
  fetcher: () => Promise<T>,
  deps: unknown[] = []
): ResourceState<T> {
  const [state, setState] = React.useState<Omit<ResourceState<T>, 'refetch'>>({
    data: null,
    loading: true,
    error: null,
  });
  const [tick, setTick] = React.useState(0);
  const refetch = React.useCallback(() => setTick((t) => t + 1), []);

  React.useEffect(() => {
    let cancelled = false;
    setState({ data: null, loading: true, error: null });
    fetcher().then(
      (data) => {
        if (!cancelled) setState({ data, loading: false, error: null });
      },
      () => {
        if (!cancelled) setState({ data: null, loading: false, error: FRIENDLY_ERROR });
      }
    );
    return () => {
      cancelled = true;
    };
    // The fetcher identity is intentionally NOT a dep — callers pass an inline
    // closure and control re-runs through `deps` (+ `tick` from refetch()),
    // matching useEffect ergonomics.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, refetch };
}
