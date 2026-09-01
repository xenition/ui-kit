import * as React from 'react';
import type { VoiceNoteBubbleProps } from './VoiceNoteBubble';
export interface VoiceNoteBubbleV4Props extends VoiceNoteBubbleProps {
    /** Accessible names for the transport. Defaults `'Play'` / `'Pause'`. */
    playLabel?: string;
    pauseLabel?: string;
    /** Build the spoken position. Default `'0:12 of 0:42'`. */
    formatPosition?: (elapsed: string, total: string) => string;
}
/**
 * **V4 voice note bubble** — same props as {@link VoiceNoteBubble} plus
 * `playLabel`, `pauseLabel` and `formatPosition`.
 *
 * ## Four changes
 *
 * 1. **It reports its position.** The base painted the waveform with
 *    `progress` and announced only "Voice message, 0:42" — so a user could see
 *    how far through they were and a screen-reader user could not. The bubble
 *    is now a `progressbar` carrying elapsed and total, and the elapsed time
 *    is drawn beside the duration.
 * 2. **The transport clears 44.** It was a glyph with `hitSlop={8}` — under
 *    the minimum, on the only control in the component.
 * 3. **Unplayed bars are a translucent wash of the *same* ink**, not
 *    `opacity: 0.4` on the element — 0.38 is the band that means disabled, and
 *    an unplayed second is not disabled.
 * 4. **The waveform is hidden from the reader.** Twelve unlabelled bars are
 *    twelve stops on a swipe-through; the bubble's own value carries the
 *    information.
 */
export declare function VoiceNoteBubbleV4({ side, durationSec, playing, progress, waveform, meta, playLabel, pauseLabel, formatPosition, onPlayToggle, style, }: VoiceNoteBubbleV4Props): React.ReactElement;
//# sourceMappingURL=VoiceNoteBubbleV4.d.ts.map