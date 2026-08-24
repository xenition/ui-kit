import * as React from 'react';
import { cn } from '../primitives/cn';

export interface UnreadDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Divider label (default "Unread messages"). */
  label?: string;
  /** Optional count of unread messages, prepended to the label when > 0. */
  count?: number;
}

/**
 * Full-width rule marking the first unread message in a thread — the "New
 * messages" line. Uses the primary token so it reads as an active marker.
 * Exposed as a `separator`. No literal colors.
 */
export const UnreadDivider = React.forwardRef<HTMLDivElement, UnreadDividerProps>(
  function UnreadDivider({ label = 'Unread messages', count, className, ...rest }, ref) {
    const text = count != null && count > 0 ? `${count} ${label}` : label;
    return (
      <div
        ref={ref}
        role="separator"
        aria-label={text}
        className={cn('flex items-center gap-2 py-1', className)}
        {...rest}
      >
        <span className="h-px flex-1 bg-primary opacity-50" />
        <span className="text-xs font-semibold text-primary">{text}</span>
        <span className="h-px flex-1 bg-primary opacity-50" />
      </div>
    );
  }
);
