import * as React from 'react';
import type { PlaylistRowProps } from './PlaylistRow';
/** Drop-in for {@link PlaylistRowProps} — same props, the V4 "spotlight" design. */
export type PlaylistRowV4Props = PlaylistRowProps;
/**
 * PlaylistRow — **V4** "spotlight" design (web parity of the native V4). A calm,
 * clean-surface playlist entry: a rounded cover thumb, title + artist, a trailing
 * duration, and — when `onPlayToggle` is set — a big round **primary** play/pause
 * affordance (the one accent, ≥44px). Selecting the row via `onClick` renders it
 * as a `role="button"` with Enter/Space support and a soft-`primary` hover/press
 * tint; when `active` the title tints `primary` and the row shows a leading
 * now-playing glyph, announced via `aria-current`. The `numbered` variant swaps
 * the artwork for a track number. Same props/behavior as {@link PlaylistRowProps};
 * all colors from `--xen-*` token classes (no literal hex).
 */
export declare const PlaylistRowV4: React.ForwardRefExoticComponent<PlaylistRowProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=PlaylistRowV4.d.ts.map