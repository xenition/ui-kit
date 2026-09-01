import * as React from 'react';
import { cn } from '../primitives/cn';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import { RECEIPT_META, TONE_INK, type ChatSize } from './internal/thread-v4';
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

const TEXT_SIZE: Record<ChatSize, string> = { sm: 'text-xs', md: 'text-sm', lg: 'text-base' };

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
export const ReadReceiptV4 = React.forwardRef<HTMLSpanElement, ReadReceiptV4Props>(
  function ReadReceiptV4(
    { status = 'sent', size, scale = 'sm', onRetry, retryLabel = 'Retry', statusLabels, className, style, ...rest },
    ref
  ) {
    const meta = RECEIPT_META[status];
    const word = statusLabels?.[status] ?? meta.label;
    const failed = status === 'failed';

    const glyph = (
      <span
        className={cn(size == null && TEXT_SIZE[scale], TONE_INK[meta.tone])}
        style={size != null ? { fontSize: size } : undefined}
      >
        {meta.glyph}
      </span>
    );

    if (failed && onRetry) {
      return (
        <span ref={ref} className={className} style={style} {...rest}>
          <button
            type="button"
            aria-label={`${word}. ${retryLabel}`}
            onClick={onRetry}
            data-xen-v4-chrome="on-surface"
            className={cn(
              'inline-flex items-center gap-xs rounded-[var(--xen-radius-md)] px-xs',
              MIN_TAP_CLASS
            )}
          >
            {glyph}
            <span className="text-xs font-semibold text-danger-text">{retryLabel}</span>
          </button>
        </span>
      );
    }

    return (
      <span
        ref={ref}
        role="status"
        // A failed send interrupts; the other four do not.
        aria-live={failed ? 'assertive' : 'polite'}
        aria-label={word}
        data-xen-receipt={status}
        className={cn('inline-flex', className)}
        style={style}
        {...rest}
      >
        {glyph}
      </span>
    );
  }
);
