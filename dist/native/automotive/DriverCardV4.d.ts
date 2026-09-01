import * as React from 'react';
import type { DriverCardProps } from './DriverCard';
export interface DriverCardV4Props extends DriverCardProps {
    /** Accessible name for the message action. Default `'Message driver'`. */
    messageLabel?: string;
    /** Accessible name for the call action. Default `'Call driver'`. */
    callLabel?: string;
    /** Words for the presence dot. Defaults `'Online'` / `'Offline'`. */
    onlineLabel?: string;
    offlineLabel?: string;
    /** Format the trip count. Default `'1,204 trips'`. */
    formatTripCount?: (trips: number) => string;
}
/**
 * **V4 driver card** — same props as {@link DriverCard} plus four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number.** The base drew five glyphs and stopped;
 *    `RatingV4 showValue` puts `4.9` beside them, which is what a low-vision
 *    user reads and what everyone actually compares.
 * 2. **Presence is not a coloured dot alone.** `online` was a green circle and
 *    nothing else — invisible to a colour-blind user and to a screen reader.
 *    It is now a dot **and** a word.
 * 3. **Press is a state layer**, not `opacity` on the card's content, which is
 *    the signal M3 spends 0.38 on to mean *disabled*.
 * 4. **The skeleton is opaque.** The base used a translucent wash of `muted`,
 *    which borrows whatever is behind it.
 * 5. **The message and call actions are named.** They were glyph-only
 *    buttons with no accessible name at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare function DriverCardV4({ name, avatarUrl, rating, tripCount, vehicle, plate, etaLabel, online, variant, messageLabel, callLabel, onlineLabel, offlineLabel, formatTripCount, onMessage, onCall, onPress, loading, style, }: DriverCardV4Props): React.ReactElement | null;
//# sourceMappingURL=DriverCardV4.d.ts.map