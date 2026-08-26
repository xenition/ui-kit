import * as React from 'react';
import type { SkeletonProps } from './Skeleton';
export type { SkeletonProps as SkeletonV4Props };
/**
 * **V4 skeleton** — same props as {@link Skeleton}, a different design line.
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
 * Under Reduce Motion the fade stops and the block rests at its brighter end
 * (§36.10) — still obviously a placeholder, just a still one.
 *
 * ## The block is opaque, at both ends of the breath
 *
 * The base animated `opacity` between 0.4 and 1 over a `muted` fill. That makes
 * the placeholder *translucent* for most of every cycle: on a plain page it
 * looks right, and on a filled card or a glass panel it turns into a window
 * showing whatever is behind it, at a different colour every 700ms.
 *
 * V4 fades one opaque colour over another instead — a second block at 16%
 * crossing over a first at 8%, both composited into `surface`. The visible
 * colour is always between two real theme colours, so the skeleton looks the
 * same wherever it lands, and the ground under it never shows through.
 *
 * `muted` was also the wrong token for a different reason: it is the kit's
 * de-emphasised **text** colour, sized for legibility of a word, not for a
 * field of it. A block of it is far heavier than the content it stands in for.
 *
 * ## Matching the layout
 *
 * §36.7 asks for a skeleton "when it matches actual layout", so the text line
 * takes its height from `typography.scale.sm` — the size of the line it is
 * standing in for — rather than from a number that happened to be 14.
 *
 * The whole tree is hidden from assistive technology. A screen reader should
 * hear the region's own busy state, never a list of empty boxes.
 */
export declare function SkeletonV4({ variant, width, height, lines, style, }: SkeletonProps): React.ReactElement;
//# sourceMappingURL=SkeletonV4.d.ts.map