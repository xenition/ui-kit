import * as React from 'react';
import { cn } from '../primitives/cn';

export interface ActivityItem {
  id: string;
  title: string;
  /** Secondary line, e.g. "by Ada · Billing". */
  meta?: string;
  /** Relative or absolute timestamp label, e.g. "2h ago". */
  time?: string;
}

export interface ActivityFeedProps extends React.HTMLAttributes<HTMLDivElement> {
  items: ActivityItem[];
  /** Optional section heading. */
  title?: string;
  /** Copy for the empty state when `items` is empty. */
  emptyMessage?: string;
}

/**
 * A vertical activity/event log with a dot rail. Renders a real empty state
 * (per design.md §15) when there is nothing to show rather than a blank box.
 * Token-only.
 */
export const ActivityFeed = React.forwardRef<HTMLDivElement, ActivityFeedProps>(
  function ActivityFeed(
    { items, title, emptyMessage = 'Activity will appear here as things happen.', className, ...rest },
    ref
  ) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        {title ? <h3 className="text-lg font-bold text-on-surface">{title}</h3> : null}
        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-xs px-lg py-xl text-center">
            <p className="text-base font-semibold text-on-surface">No activity yet</p>
            <p className="max-w-[340px] text-sm text-muted">{emptyMessage}</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-md">
            {items.map((item) => (
              <li key={item.id} className="flex gap-sm">
                <span
                  aria-hidden
                  className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary"
                />
                <div className="flex min-w-0 flex-1 flex-col gap-0.5">
                  <span className="text-base font-semibold text-on-surface">{item.title}</span>
                  {item.meta ? <span className="text-sm text-muted">{item.meta}</span> : null}
                </div>
                {item.time ? (
                  <span className="shrink-0 text-xs text-muted">{item.time}</span>
                ) : null}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);
