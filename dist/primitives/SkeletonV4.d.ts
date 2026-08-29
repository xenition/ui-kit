import * as React from 'react';
import type { SkeletonProps } from './Skeleton';
export type { SkeletonProps as SkeletonV4Props };
/**
 * **V4 skeleton** — the web twin of the native `SkeletonV4`, same props as
 * {@link Skeleton}, a different design line.
 *
 * ## The animation is not allowed to claim progress
 *
 * `design.md` §36.7 says loading feedback exists to reduce uncertainty and must
 * not fabricate precision. The usual skeleton treatment — a highlight sweeping
 * left to right — fails that quietly: a sweep *travels*, and travel across a
 * placeholder reads as loading moving through the content, which is a claim
 * about a request whose state the skeleton cannot see. V4 deliberately does not
 * add one. What it has is a symmetric fade, which says only "not yet", and that
 * is the entire truth available to this component.
 *
 * ## The block is opaque, at both ends of the breath
 *
 * The base used Tailwind's `animate-pulse`, which animates the element's own
 * `opacity` down to 0.5. That makes the placeholder *translucent* for most of
 * every cycle: on a plain page it looks right, and on a filled card or a glass
 * panel it turns into a window showing whatever is behind it.
 *
 * V4 fades one opaque colour over another instead — an `::after` at 16%
 * crossing a block at 8%, both `color-mix`ed into `surface`. The visible colour
 * is always between two real theme colours, so the skeleton looks the same
 * wherever it lands.
 *
 * `bg-neutral-200` was the wrong token for a second reason: a ramp step is not
 * a semantic, so it says nothing about the relationship between a placeholder
 * and the text it replaces. `on-surface` at 8% does — it is that text, faded.
 *
 * ## Matching the layout
 *
 * §36.7 asks for a skeleton "when it matches actual layout", so the text line
 * takes its height from `--xen-text-sm` — the size of the line it is standing
 * in for — rather than from `h-3.5`, which was that size by coincidence.
 *
 * The whole tree is `aria-hidden`. A screen reader should hear the region's own
 * busy state, never a list of empty boxes.
 */
export declare const SkeletonV4: React.ForwardRefExoticComponent<SkeletonProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=SkeletonV4.d.ts.map