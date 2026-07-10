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
export declare const FRIENDLY_ERROR = "We could not load this content right now. Please check your connection and try again.";
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
export declare function useResource<T>(fetcher: () => Promise<T>, deps?: unknown[]): ResourceState<T>;
//# sourceMappingURL=use-resource.d.ts.map