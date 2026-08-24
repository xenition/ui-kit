import * as React from 'react';
import { cn } from './cn';

export type TooltipSide = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Tip content shown on hover/focus. */
  label: React.ReactNode;
  side?: TooltipSide;
  children: React.ReactNode;
  className?: string;
}

const SIDE: Record<TooltipSide, string> = {
  top: 'bottom-full left-1/2 -translate-x-1/2 mb-1',
  bottom: 'top-full left-1/2 -translate-x-1/2 mt-1',
  left: 'right-full top-1/2 -translate-y-1/2 mr-1',
  right: 'left-full top-1/2 -translate-y-1/2 ml-1',
};

/** Hover/focus tooltip bound to the theme tokens. Wrap the trigger as children. */
export function Tooltip({ label, side = 'top', children, className }: TooltipProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  return (
    <span
      className="relative inline-flex"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={() => setOpen(false)}
    >
      {children}
      {open && (
        <span
          role="tooltip"
          className={cn(
            'pointer-events-none absolute z-50 whitespace-nowrap rounded-[var(--xen-radius-sm)]',
            'bg-neutral-900 px-2 py-1 text-xs text-neutral-50 shadow',
            SIDE[side],
            className
          )}
        >
          {label}
        </span>
      )}
    </span>
  );
}
