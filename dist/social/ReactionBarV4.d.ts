import * as React from 'react';
import type { ReactionBarProps } from './ReactionBar';
/** Drop-in for {@link ReactionBarProps} — same props, the V4 "feed" design. */
export type ReactionBarV4Props = ReactionBarProps;
/**
 * ReactionBar — **V4** "feed" design (web parity of the native V4). A clean wrap
 * of emoji reaction pills, each with a count. The selected reaction highlights
 * with a soft-primary tint pill (`bg-primary/10`, primary border + count); the
 * rest read on a plain surface with a `muted` count. A trailing `+` opens a
 * fuller picker upstream, and the empty tally is handled too. Same props/behavior
 * as {@link ReactionBarProps}; all colors from `--xen-*` token classes (no
 * literals), `aria-pressed` per pill.
 */
export declare const ReactionBarV4: React.ForwardRefExoticComponent<ReactionBarProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=ReactionBarV4.d.ts.map