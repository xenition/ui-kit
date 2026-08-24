import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Delivery state of an outgoing message. */
export type ReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';
export interface ReadReceiptProps {
    /** Current delivery state (default `sent`). */
    status?: ReceiptStatus;
    /** Glyph size in px (default from the `xs` type scale). */
    size?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Delivery-state indicator shown beneath an outgoing message. `read` tints the
 * double-check with the primary token; `failed` uses the danger token. Announced
 * to screen readers via its status label. No literal colors.
 */
export declare function ReadReceipt({ status, size, style, }: ReadReceiptProps): React.ReactElement;
//# sourceMappingURL=ReadReceipt.d.ts.map