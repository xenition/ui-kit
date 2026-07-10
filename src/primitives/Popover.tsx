import * as React from 'react';
import { cn } from './cn';
import { useDismiss } from './useDismiss';

export interface PopoverProps {
  /** Clickable trigger. */
  trigger: React.ReactNode;
  children: React.ReactNode;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

/** Click-triggered floating panel bound to the theme tokens. Closes on outside click / Escape. */
export function Popover({ trigger, children, align = 'start', className }: PopoverProps): React.ReactElement {
  const [open, setOpen] = React.useState(false);
  const ref = useDismiss<HTMLDivElement>(open, () => setOpen(false));
  const alignCls =
    align === 'end' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0';
  return (
    <div ref={ref} className="relative inline-block">
      <span onClick={() => setOpen((o) => !o)}>{trigger}</span>
      {open && (
        <div
          className={cn(
            'absolute z-50 mt-1 min-w-[12rem] rounded-[var(--xen-radius-md)] border border-border',
            'bg-surface p-2 text-on-surface shadow-lg',
            alignCls,
            className
          )}
        >
          {children}
        </div>
      )}
    </div>
  );
}
