import * as React from 'react';
import type { LightboxProps } from './Lightbox';
export interface LightboxV4Props extends LightboxProps {
    /**
     * Fires when a video's play affordance is pressed.
     *
     * The kit ships no video player and must not — the dependency is the host's
     * decision. The lightbox shows the poster and hands the intent over; without
     * this the play badge is a picture of a button, so it is only drawn when the
     * handler exists.
     */
    onPlay?: (index: number) => void;
    /** Accessible name for the play affordance. Default `'Play video'`. */
    playLabel?: string;
    /** Build the position line. Default `'3 / 12'`. */
    formatCounter?: (position: number, total: number) => string;
}
/**
 * **V4 lightbox** — same props as {@link Lightbox} plus `onPlay`, `playLabel`
 * and `formatCounter`.
 *
 * ## Five changes
 *
 * 1. **A video shows its poster, and can be played.** The base rendered
 *    `<Image source={{ uri: item.url }} />` for every item, so opening a clip
 *    showed a broken image at full screen.
 * 2. **The media box is not a 320×320 square.** The base pinned both
 *    dimensions, so a panorama and a portrait were letterboxed into the same
 *    square. It now fills the available space and keeps its ratio.
 * 3. **The controls clear 44 and are vertically centred properly.** They were
 *    40×40 pinned at `top: '45%'` — a magic number that lands off-centre at
 *    every aspect ratio.
 * 4. **The overlay pays the safe-area inset**, so the close button is not
 *    under the notch and the caption is not under the home indicator.
 * 5. **The scrim comes from `scrimColor()`**, the same one every V4 overlay
 *    uses, rather than this component's own ramp-and-alpha expression.
 *
 * Swipe-to-navigate, `loop`, and the reduced-motion check are the base's and
 * are kept. Needs a `SafeAreaProvider` above it, which Expo mounts by default.
 */
export declare function LightboxV4({ items, index, onClose, onPrev, onNext, onPlay, loop, label, closeLabel, prevLabel, nextLabel, playLabel, formatCounter, }: LightboxV4Props): React.ReactElement | null;
//# sourceMappingURL=LightboxV4.d.ts.map