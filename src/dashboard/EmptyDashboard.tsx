import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';

export interface EmptyDashboardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Headline, e.g. "Nothing here yet". */
  title: string;
  /** One or two lines explaining what to do next. */
  message?: string;
  /** Label for the single dominant action button. */
  actionLabel?: string;
  onAction?: () => void;
  /** Optional decorative slot above the title (illustration-less by default). */
  icon?: React.ReactNode;
}

/**
 * A first-run / empty dashboard state (design.md §15): a centered headline, a
 * short guiding message, and exactly one dominant action. Illustration-less by
 * default. Token-only.
 */
export const EmptyDashboard = React.forwardRef<HTMLDivElement, EmptyDashboardProps>(
  function EmptyDashboard({ title, message, actionLabel, onAction, icon, className, ...rest }, ref) {
    return (
      <div
        ref={ref}
        aria-label={title}
        className={cn(
          'flex flex-col items-center justify-center gap-sm px-xl py-2xl text-center',
          className
        )}
        {...rest}
      >
        {icon ? <div className="mb-sm">{icon}</div> : null}
        <h2 className="text-xl font-bold text-on-surface">{title}</h2>
        {message ? <p className="max-w-[340px] text-base text-muted">{message}</p> : null}
        {actionLabel && onAction ? (
          <div className="mt-md">
            <Button onClick={onAction}>{actionLabel}</Button>
          </div>
        ) : null}
      </div>
    );
  }
);
