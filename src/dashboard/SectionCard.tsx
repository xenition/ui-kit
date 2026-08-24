import * as React from 'react';
import { cn } from '../primitives/cn';

export interface SectionCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Section heading. */
  title: string;
  /** Optional muted description under the title. */
  subtitle?: string;
  /** Trailing header slot, e.g. a "See all" link. */
  action?: React.ReactNode;
  /** Optional divider between the header and the body. */
  divided?: boolean;
  children: React.ReactNode;
}

/**
 * A titled card wrapper: a header row (title + optional subtitle + trailing
 * action) above a body slot, inside a bordered `surface` card. The standard
 * container for grouping dashboard content. Token-only.
 */
export const SectionCard = React.forwardRef<HTMLDivElement, SectionCardProps>(
  function SectionCard({ title, subtitle, action, divided = false, children, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        className={cn(
          'flex flex-col gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-lg text-on-surface',
          className
        )}
        {...rest}
      >
        <div className="flex items-center justify-between gap-sm">
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <h3 className="text-lg font-bold text-on-surface">{title}</h3>
            {subtitle ? <p className="text-sm text-muted">{subtitle}</p> : null}
          </div>
          {action ? <div className="shrink-0">{action}</div> : null}
        </div>
        {divided ? <div className="h-px bg-border" /> : null}
        <div>{children}</div>
      </div>
    );
  }
);
