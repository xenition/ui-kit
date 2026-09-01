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
 * **V4 driver card** — the web twin of the native `DriverCardV4`, same props
 * as {@link DriverCard} plus four copy hooks.
 *
 * ## Five changes
 *
 * 1. **The rating carries its number** — `RatingV4 showValue`. Five glyphs at
 *    `sm` is not a number.
 * 2. **Presence is a dot *and* a word.** `online` was a green circle and
 *    nothing else: invisible to a colour-blind user and to a screen reader.
 * 3. **An interactive card is a real `<button>`**, not a div with
 *    `role="button"` and a hand-written key handler.
 * 4. **The skeleton is opaque**, not a translucent wash that borrows whatever
 *    is behind it.
 * 5. **The message and call actions are named** — they were glyph-only
 *    buttons with no accessible name at all.
 *
 * **Renders nothing without a `name`** (§4.5).
 */
export declare const DriverCardV4: React.ForwardRefExoticComponent<DriverCardV4Props & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=DriverCardV4.d.ts.map