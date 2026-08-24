import * as React from 'react';
/** Delivery state of an outgoing message. */
export type ReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export interface ReadReceiptProps extends React.HTMLAttributes<HTMLSpanElement> {
    /** Current delivery state (default `sent`). */
    status?: ReceiptStatus;
    /** Glyph font-size in px (default from the `xs` type scale). */
    size?: number;
}
/**
 * Delivery-state indicator shown beneath an outgoing message. `read` tints the
 * double-check with the primary token; `failed` uses the danger token. Announced
 * to screen readers via its status label (state is not color-alone — the glyph
 * carries it too). No literal colors.
 */
export declare const ReadReceipt: React.ForwardRefExoticComponent<ReadReceiptProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=ReadReceipt.d.ts.map