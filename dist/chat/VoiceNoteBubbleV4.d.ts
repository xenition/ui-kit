import * as React from 'react';
import type { VoiceNoteBubbleProps } from './VoiceNoteBubble';
export interface VoiceNoteBubbleV4Props extends VoiceNoteBubbleProps {
    /** Copy on the transport, by state. */
    playLabel?: string;
    pauseLabel?: string;
    /** Build the spoken position. Default `'0:12 of 0:42'`. */
    formatPosition?: (elapsed: string, total: string) => string;
}
/**
 * **V4 voice note bubble** — the web twin of the native `VoiceNoteBubbleV4`,
 * same props as {@link VoiceNoteBubble} plus `playLabel`, `pauseLabel` and
 * `formatPosition`.
 *
 * ## Four changes
 *
 * 1. **It reports its position.** The base painted the waveform with
 *    `progress` and announced only "Voice message, 0:42" — so a sighted user
 *    could see how far through they were and a screen-reader user could not.
 *    The bubble is now a `progressbar` carrying elapsed and total, and the
 *    elapsed time is drawn beside the duration.
 * 2. **The transport clears 44.** It was a bare glyph button.
 * 3. **Unplayed bars are a translucent wash of the *same* ink**, not an
 *    `opacity` on the element — 0.38 is the band that means disabled, and an
 *    unplayed second is not disabled.
 * 4. **The waveform is hidden from the reader.** Twelve unlabelled bars are
 *    twelve stops on a tab-through; the bubble's own value carries it.
 */
export declare const VoiceNoteBubbleV4: React.ForwardRefExoticComponent<VoiceNoteBubbleV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=VoiceNoteBubbleV4.d.ts.map