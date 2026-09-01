import * as React from 'react';
import type { PlaylistRowProps } from './PlaylistRow';
/** Drop-in for {@link PlaylistRowProps} — same props, the V4 "spotlight" design. */
export type PlaylistRowV4Props = PlaylistRowProps;
/**
 * PlaylistRow — **V4** "spotlight" design. A calm, clean-surface playlist entry:
 * a rounded cover thumb, title + artist, a trailing duration, and — when
 * `onPlayToggle` is set — a big round **primary** play/pause affordance (the one
 * accent, ≥44px). `onPress(track, index)` selects the row with a soft-`primary`
 * press tint; when `active` the title tints `primary` and the artwork shows a
 * leading now-playing glyph, announced via `accessibilityState.selected`. The
 * `numbered` variant swaps the artwork for a track number. Same props/behavior as
 * {@link PlaylistRowProps}; token-only colors via `useXenitionTheme()`.
 */
export declare function PlaylistRowV4({ track, index, active, state, variant, onPress, onPlayToggle, onMore, style, }: PlaylistRowV4Props): React.ReactElement;
//# sourceMappingURL=PlaylistRowV4.d.ts.map