import * as React from 'react';
import { cn } from '../primitives/cn';
import { CHAT_SIZE, PRESENCE_META, TONE_BG, TONE_INK, type ChatSize } from './internal/thread-v4';
import type { PresenceDotProps } from './PresenceDot';

export interface PresenceDotV4Props extends PresenceDotProps {
  /** A named size. Prefer this over the raw pixel `size`, kept for parity. */
  scale?: ChatSize;
  /**
   * Show the presence word beside the dot. Default `false`, so nothing
   * existing moves — but pass it wherever there is room. A coloured dot alone
   * says nothing to a colour-blind user and nothing to a screen reader.
   */
  showLabel?: boolean;
}

/**
 * **V4 presence dot** — the web twin of the native `PresenceDotV4`, same props
 * as {@link PresenceDot} plus `scale` and `showLabel`.
 *
 * ## Three changes
 *
 * 1. **It can carry its word.**
 * 2. **It always has a name.** The base announced nothing unless the caller
 *    passed `label`, so the default rendering was a decorative circle.
 * 3. **`away` stops borrowing `warn`.**
 */
export const PresenceDotV4 = React.forwardRef<HTMLSpanElement, PresenceDotV4Props>(
  function PresenceDotV4(
    { status = 'offline', size, scale = 'sm', ring = false, label, showLabel = false, className, style, ...rest },
    ref
  ) {
    const meta = PRESENCE_META[status];
    const word = label ?? meta.label;

    const dot = (
      <span
        aria-hidden
        className={cn(
          'inline-block shrink-0 rounded-full',
          size == null && CHAT_SIZE[scale],
          TONE_BG[meta.tone],
          ring && 'ring-2 ring-surface'
        )}
        style={size != null ? { width: size, height: size } : undefined}
      />
    );

    if (!showLabel) {
      return (
        <span
          ref={ref}
          role="img"
          // Always named: the base's default rendering was a circle a screen
          // reader skipped entirely.
          aria-label={word}
          data-xen-presence={status}
          className={cn('inline-flex', className)}
          style={style}
          {...rest}
        >
          {dot}
        </span>
      );
    }

    return (
      <span
        ref={ref}
        aria-label={word}
        data-xen-presence={status}
        className={cn('inline-flex items-center gap-xs', className)}
        style={style}
        {...rest}
      >
        {dot}
        <span className={cn('text-xs', meta.tone === 'success' ? TONE_INK.success : 'text-muted-text')}>
          {word}
        </span>
      </span>
    );
  }
);
