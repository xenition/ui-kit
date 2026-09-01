import * as React from 'react';
import { cn } from '../primitives/cn';
import type { DateSeparatorProps } from './DateSeparator';

export type { DateSeparatorProps as DateSeparatorV4Props };

/**
 * **V4 date separator** — the web twin of the native `DateSeparatorV4`, same
 * props as {@link DateSeparator}.
 *
 * ## Two changes
 *
 * 1. **It is a heading, not a caption.** A date separator is the only landmark
 *    in a long thread; marking it a heading is what lets a screen reader jump
 *    between days instead of scrolling through every message.
 * 2. **The pill takes the card ground and `muted-text`**, where the base used
 *    `surface` — the same colour as the page behind it — so the chip read as
 *    floating text rather than a marker.
 */
export const DateSeparatorV4 = React.forwardRef<HTMLDivElement, DateSeparatorProps>(
  function DateSeparatorV4({ label, className, ...rest }, ref) {
    if (!label) return null;

    return (
      <div
        ref={ref}
        data-xen-date-separator=""
        className={cn('flex justify-center py-sm', className)}
        {...rest}
      >
        <h3 className="rounded-full border border-border bg-card px-md py-xs text-xs font-semibold text-muted-text">
          {label}
        </h3>
      </div>
    );
  }
);
