import * as React from 'react';
import type { VirtualListProps } from './VirtualList';
export type { VirtualListProps as VirtualListV4Props };
/**
 * `VirtualList`, V4 — a structural primitive, so the V4 changes are confined to
 * the three places it actually paints.
 *
 * ## What a windowing wrapper is, and is not
 *
 * This component's job is a scroll viewport and a row loop. It has no surface
 * of its own to restyle, no state to give feedback for — the rows are whatever
 * `renderItem` returns, and their interactivity belongs to them — and no
 * hierarchy to rebuild. Like `StackV4`, most of it had nothing for a design
 * line to disagree with.
 *
 * It is **not** an alias, because it does paint in three places, and two of
 * them were wrong:
 *
 * 1. **The spinner.** The base rings it in `border-neutral-300` with a
 *    `border-t-primary` head. `neutral-300` is a ramp step, and the ramps carry
 *    the LIGHT orientation in both schemes — so under `[data-theme="dark"]` the
 *    track is a bright ring on a dark page. `border-border` is the
 *    scheme-resolved hairline and is a hairline's worth of contrast in both.
 * 2. **The empty line.** `muted` is a decorative slot with no contrast promise.
 *    "Nothing here yet" is the only thing on screen when it shows, so it takes
 *    `muted-text`, which does. §46 puts that ahead of quietness.
 * 3. **The separators.** These were already right — `divide-border` is
 *    scheme-resolved — so they stay. §9 would rather a list separated by
 *    spacing than by rules, but `separators` is a prop the caller sets, and a
 *    V4 that quietly ignored it would be answering a different question than
 *    the one it was asked.
 *
 * ## The empty state is still only as good as its copy
 *
 * §15 asks that an empty state say what belongs here and what to do next. This
 * one can only render the `emptyText` node it is handed, so what V4 adds is the
 * rhythm — centred, padded, legible — and nothing more. A list that wants the
 * full treatment should pass an `<EmptyStateV4>` as `emptyText`, which works
 * because the prop is a `ReactNode`. That is written here rather than left
 * implicit, because "the empty state is bad" is usually a call-site problem
 * that looks like a component problem.
 *
 * ## Still not windowed
 *
 * Unchanged and worth repeating: the web twin takes no windowing dependency, so
 * every row renders inside an `overflow-auto` box capped at `maxHeight`. It
 * keeps the native API so call sites port, and a windowing library can be
 * dropped in later without touching a prop.
 */
export declare function VirtualListV4<T>({ className, data, renderItem, keyExtractor, estimatedItemSize, separators, emptyText, loading, maxHeight, ...rest }: VirtualListProps<T>): React.ReactElement;
//# sourceMappingURL=VirtualListV4.d.ts.map