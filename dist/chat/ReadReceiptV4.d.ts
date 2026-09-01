import * as React from 'react';
import { type ChatSize } from './internal/thread-v4';
import type { ReadReceiptProps, ReceiptStatus } from './ReadReceipt';
export interface ReadReceiptV4Props extends ReadReceiptProps {
    /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
    scale?: ChatSize;
    /**
     * Fires when a failed message's retry is clicked.
     *
     * `failed` is the only receipt state a user must **act** on, and the base
     * drew it as a red glyph and stopped.
     */
    onRetry?: () => void;
    /** Copy on the retry action. Default `'Retry'`. */
    retryLabel?: string;
    /** Override the status words — five English words lived inside. */
    statusLabels?: Partial<Record<ReceiptStatus, string>>;
}
/**
 * **V4 read receipt** — the web twin of the native `ReadReceiptV4`, same props
 * as {@link ReadReceipt} plus `scale`, `onRetry`, `retryLabel` and
 * `statusLabels`.
 *
 * ## Four changes
 *
 * 1. **A failed send is actionable.** See `onRetry`.
 * 2. **It reports as a status, not an image.** `role="img"` on a delivery
 *    state is simply the wrong role.
 * 3. **`failed` announces assertively**, the rest politely — a receipt that
 *    interrupts on every message trains a user to ignore it.
 * 4. **The ink is the contrast-corrected slot**, where the base used `muted`
 *    for three of the five states.
 */
export declare const ReadReceiptV4: React.ForwardRefExoticComponent<ReadReceiptV4Props & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=ReadReceiptV4.d.ts.map