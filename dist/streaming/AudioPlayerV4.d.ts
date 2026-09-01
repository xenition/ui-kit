import * as React from 'react';
import type { AudioPlayerProps } from './AudioPlayer';
/** Drop-in for {@link AudioPlayerProps} — same props, the V4 "spotlight" design. */
export type AudioPlayerV4Props = AudioPlayerProps;
/**
 * AudioPlayer — **V4** "spotlight" design (web parity of the native V4). A
 * compact audio transport card: small artwork, title/artist, a clean
 * soft-primary scrubber with time labels, and big round **primary** transport
 * controls (play/pause framed by prev/next in `expanded`). When a cover is
 * present it sits on a subtle brand-gradient glow — the V4 signature — kept
 * light so the card stays a clean surface. Same props/behavior as
 * {@link AudioPlayerProps} (buffering swaps play for a `Spinner`); every color
 * resolves from `--xen-*` token classes — no literal hex.
 */
export declare const AudioPlayerV4: React.ForwardRefExoticComponent<AudioPlayerProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=AudioPlayerV4.d.ts.map