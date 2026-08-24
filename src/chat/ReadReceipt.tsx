import * as React from 'react';
import { cn } from '../primitives/cn';

/** Delivery state of an outgoing message. */
export type ReceiptStatus = 'sending' | 'sent' | 'delivered' | 'read' | 'failed';

export interface ReadReceiptProps extends React.HTMLAttributes<HTMLSpanElement> {
  /** Current delivery state (default `sent`). */
  status?: ReceiptStatus;
  /** Glyph font-size in px (default from the `xs` type scale). */
  size?: number;
}

const GLYPH: Record<ReceiptStatus, string> = {
  sending: '🕓',
  sent: '✓',
  delivered: '✓✓',
  read: '✓✓',
  failed: '⚠︎',
};

const LABEL: Record<ReceiptStatus, string> = {
  sending: 'Sending',
  sent: 'Sent',
  delivered: 'Delivered',
  read: 'Read',
  failed: 'Failed to send',
};

const COLOR_CLASS: Record<ReceiptStatus, string> = {
  sending: 'text-muted',
  sent: 'text-muted',
  delivered: 'text-muted',
  read: 'text-primary',
  failed: 'text-danger',
};

/**
 * Delivery-state indicator shown beneath an outgoing message. `read` tints the
 * double-check with the primary token; `failed` uses the danger token. Announced
 * to screen readers via its status label (state is not color-alone — the glyph
 * carries it too). No literal colors.
 */
export const ReadReceipt = React.forwardRef<HTMLSpanElement, ReadReceiptProps>(function ReadReceipt(
  { status = 'sent', size, className, style, ...rest },
  ref
) {
  return (
    <span
      ref={ref}
      role="img"
      aria-label={LABEL[status]}
      className={cn('inline-flex leading-none', !size && 'text-xs', COLOR_CLASS[status], className)}
      style={size ? { fontSize: size, ...style } : style}
      {...rest}
    >
      {GLYPH[status]}
    </span>
  );
});
