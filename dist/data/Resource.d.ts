import * as React from 'react';
import type { ResourceState } from './use-resource';
export interface ResourceProps<T> {
    /** The `{ data, loading, error }` from {@link useResource}. */
    state: ResourceState<T>;
    /** Rendered while loading. */
    loading?: React.ReactNode;
    /** Rendered on error, given the friendly message. */
    error?: (message: string) => React.ReactNode;
    /** Rendered when the resolved data is "empty" (see `isEmpty`). */
    empty?: React.ReactNode;
    /** Rendered with the resolved, non-empty data. */
    children: (data: T) => React.ReactNode;
    /**
     * Overrides emptiness detection. Default: `null`/`undefined`, or an empty
     * array, count as empty.
     */
    isEmpty?: (data: T) => boolean;
}
/**
 * Headless, unstyled branching for the loading / error / empty / ready states
 * of a {@link useResource} result — so pages express just the happy path and
 * pass their own kit-composed fallbacks. It renders NOTHING of its own; every
 * branch is a prop.
 *
 *   <Resource state={posts} loading={<Spinner />} error={(m) => <Notice>{m}</Notice>} empty={<Empty />}>
 *     {(rows) => rows.map((p) => <PostCard key={p.id} post={p} />)}
 *   </Resource>
 */
export declare function Resource<T>({ state, loading, error, empty, children, isEmpty, }: ResourceProps<T>): React.ReactElement | null;
//# sourceMappingURL=Resource.d.ts.map