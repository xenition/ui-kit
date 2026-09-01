import * as React from 'react';
import { type ChatSize } from './internal/thread-v4';
import type { ReadReceiptProps } from './ReadReceipt';
export interface ReadReceiptV4Props extends ReadReceiptProps {
    /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
    scale?: ChatSize;
    /**
     * Fires when a failed message's retry is pressed.
     *
     * `failed` is the only receipt state a user must **act** on, and the base
     * drew it as a red glyph and stopped. With this the failure is a control;
     * without it, it is still announced assertively.
     */
    onRetry?: () => void;
    /** Copy on the retry action. Default `'Retry'`. */
    retryLabel?: string;
    /** Override the status words — five English words lived inside. */
    statusLabels?: Partial<Record<import('./ReadReceipt').ReceiptStatus, string>>;
}
/**
 * **V4 read receipt** — same props as {@link ReadReceipt} plus `scale`,
 * `onRetry`, `retryLabel` and `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A failed send is actionable.** See `onRetry` — this is the one state
 *    in the component that asks something of the user, and the base drew it
 *    exactly as passively as `sent`.
 * 2. **It reports as a status, not an image.** `accessibilityRole="image"` on
 *    a delivery state is simply the wrong role.
 * 3. **`failed` announces assertively**, the rest politely — a receipt that
 *    interrupts on every message trains a user to ignore it.
 * 4. **The ink is the contrast-corrected slot**, where the base used `muted`,
 *    which carries no promise, for three of the five states.
 */
export declare function ReadReceiptV4({ status, size, scale, onRetry, retryLabel, statusLabels, style, }: ReadReceiptV4Props): React.ReactElement;
//# sourceMappingURL=ReadReceiptV4.d.ts.map