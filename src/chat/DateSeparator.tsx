import * as React from 'react';
import { cn } from '../primitives/cn';

export interface DateSeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  /** The date/label to show centered in the pill (e.g. "Today", "12 Aug"). */
  label: string;
}

/**
 * Centered date chip that breaks a message stream into day sections. Exposed as
 * a `separator` for screen-reader navigation. No literal colors — the pill fill,
 * border, and text come from semantic tokens.
 */
export const DateSeparator = React.forwardRef<HTMLDivElement, DateSeparatorProps>(
  function DateSeparator({ label, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        role="separator"
        aria-label={label}
        className={cn('flex items-center justify-center py-2', className)}
        {...rest}
      >
        <span className="rounded-full border border-border bg-surface px-3 py-0.5 text-xs font-medium text-muted">
          {label}
        </span>
      </div>
    );
  }
);
