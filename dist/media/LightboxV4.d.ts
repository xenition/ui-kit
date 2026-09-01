import * as React from 'react';
import type { LightboxProps } from './Lightbox';
export interface LightboxV4Props extends LightboxProps {
    /**
     * Fires when a video's play affordance is pressed, when the viewer is
     * showing a poster rather than a player.
     *
     * Supplying it swaps the inline `<video controls>` for a poster and a play
     * button — which is what a host that wants to hand playback to its own
     * player (an HLS stream, a DRM wrapper, an analytics-instrumented embed)
     * needs, and which the base offered no way to do.
     */
    onPlay?: (index: number) => void;
    /** Accessible name for that affordance. Default `'Play video'`. */
    playLabel?: string;
    /** Build the position line. Default `'3 / 12'`. */
    formatCounter?: (position: number, total: number) => string;
}
/**
 * **V4 lightbox** — the web twin of the native `LightboxV4`, same props as
 * {@link Lightbox} plus `onPlay`, `playLabel` and `formatCounter`.
 *
 * The focus trap, the Escape/arrow keys and the focus restore are the base's
 * and are kept whole — they are the best thing about this component.
 *
 * ## Four changes
 *
 * 1. **Playback can be handed to the host.** See `onPlay`.
 * 2. **The controls clear 44.** They were `h-10 w-10`, on the three buttons a
 *    user reaches for while holding a phone one-handed.
 * 3. **The controls are `IconV4`**, not three hand-drawn inline `<svg>` paths
 *    with a literal stroke width, and they hover with the shared state layer
 *    rather than `hover:bg-neutral-100`.
 * 4. **The scrim is the kit's scrim** — see {@link LIGHTBOX_V4_CSS}.
 *
 * The overlay also pays `env(safe-area-inset-*)`, so on a notched phone in
 * landscape the close button is not under the sensor housing.
 */
export declare function LightboxV4({ items, index, onClose, onPrev, onNext, onPlay, loop, label, closeLabel, prevLabel, nextLabel, playLabel, formatCounter, }: LightboxV4Props): React.ReactElement | null;
//# sourceMappingURL=LightboxV4.d.ts.map