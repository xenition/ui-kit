import * as React from 'react';
import { cn } from '../primitives/cn';
import type { UnreadDividerProps } from './UnreadDivider';

export interface UnreadDividerV4Props extends UnreadDividerProps {
  /** Build the label from the count. Default `'3 unread messages'`. */
  formatCount?: (count: number) => string;
}

/**
 * **V4 unread divider** — the web twin of the native `UnreadDividerV4`, same
 * props as {@link UnreadDivider} plus `formatCount`.
 *
 * ## Three changes
 *
 * 1. **The count reaches the label.** The base drew it beside a fixed
 *    `'Unread'`, so a reader heard the word and the number as two fragments.
 * 2. **It is a `separator` with a name**, which is exactly what it is — a
 *    landmark a reader can jump to.
 * 3. **The rule takes `danger`, the label its corrected ink.**
 */
export const UnreadDividerV4 = React.forwardRef<HTMLDivElement, UnreadDividerV4Props>(
  function UnreadDividerV4({ label = 'Unread', count, formatCount, className, ...rest }, ref) {
    const text =
      typeof count === 'number' && count > 0
        ? (formatCount ?? ((n: number) => `${n} unread ${n === 1 ? 'message' : 'messages'}`))(count)
        : label;

    return (
      <div
        ref={ref}
        role="separator"
        aria-label={text}
        data-xen-unread-divider=""
        className={cn('flex items-center gap-sm', className)}
        {...rest}
      >
        <span aria-hidden className="h-px flex-1 bg-danger" />
        <span className="text-xs font-bold text-danger-text">{text}</span>
        <span aria-hidden className="h-px flex-1 bg-danger" />
      </div>
    );
  }
);
