import * as React from 'react';
import type { MiniPlayerProps } from './MiniPlayer';
/** Drop-in for {@link MiniPlayerProps} — same props, the V4 "spotlight" design. */
export type MiniPlayerV4Props = MiniPlayerProps;
/**
 * MiniPlayer — **V4** "spotlight" design. The compact docked bar in the
 * artwork-forward line: a small rounded artwork thumb, title/artist, and a big
 * round **primary** play button (filled, `onPrimary` glyph) — the one accent. A
 * thin `primary` progress line rides the top edge over a soft-`primary` track.
 * The surface stays clean (no big gradient — reserved for the artwork-hero
 * moments). Same props/behavior as {@link MiniPlayerProps}; token-only colors
 * via `useXenitionTheme()`. `variant="floating"` rounds/insets the bar.
 */
export declare function MiniPlayerV4({ track, state, progress, variant, onPlayToggle, onNext, onPress, style, }: MiniPlayerV4Props): React.ReactElement;
//# sourceMappingURL=MiniPlayerV4.d.ts.map