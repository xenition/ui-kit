import * as React from 'react';
import type { AudioPlayerProps } from './AudioPlayer';
/** Drop-in for {@link AudioPlayerProps} — same props, the V4 "spotlight" design. */
export type AudioPlayerV4Props = AudioPlayerProps;
/**
 * AudioPlayer — **V4** "spotlight" design. A compact audio transport card:
 * small artwork, title/artist, a clean soft-primary scrubber with time labels,
 * and big round **primary** transport controls (play/pause framed by prev/next
 * in `expanded`). The artwork sits on a subtle brand-gradient glow — the V4
 * signature — kept light so the card stays a clean surface. Same props/behavior
 * as {@link AudioPlayerProps} (buffering swaps play for a `Spinner`); drive a
 * real player from `onPlayToggle(next)`, `onSeek(seconds)`, `onPrev`, `onNext`.
 * Token-only colors via `useXenitionTheme()` — no literal hex.
 */
export declare function AudioPlayerV4({ track, state, position, duration, variant, onPlayToggle, onSeek, onPrev, onNext, style, }: AudioPlayerV4Props): React.ReactElement;
//# sourceMappingURL=AudioPlayerV4.d.ts.map