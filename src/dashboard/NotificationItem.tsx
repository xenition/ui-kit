import * as React from 'react';
import { cn } from '../primitives/cn';

export interface NotificationItemProps {
  title: string;
  /** Optional supporting body line. */
  body?: string;
  /** Timestamp label, e.g. "5m ago". */
  time?: string;
  /** Shows an unread dot and a subtly tinted surface. */
  unread?: boolean;
  /** When set, the row renders as a button. */
  onClick?: () => void;
  className?: string;
}

/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Renders as a `<button>` when `onClick` is supplied. Token-only.
 */
export const NotificationItem = React.forwardRef<HTMLElement, NotificationItemProps>(
  function NotificationItem({ title, body, time, unread = false, onClick, className }, ref) {
    const inner = (
      <>
        <span
          aria-hidden
          className={cn(
            'mt-1.5 h-2 w-2 shrink-0 rounded-full',
            unread ? 'bg-primary' : 'bg-transparent'
          )}
        />
        <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
          <span
            className={cn(
              'text-base text-on-surface',
              unread ? 'font-bold' : 'font-medium'
            )}
          >
            {title}
          </span>
          {body ? <span className="text-sm text-muted">{body}</span> : null}
        </span>
        {time ? <span className="shrink-0 text-xs text-muted">{time}</span> : null}
      </>
    );

    const classes = cn(
      'flex w-full gap-sm rounded-[var(--xen-radius-md)] px-md py-sm',
      unread ? 'bg-neutral-100' : 'bg-surface',
      className
    );
    const label = `${title}${unread ? ', unread' : ''}`;

    if (!onClick) {
      return (
        <div
          ref={ref as React.Ref<HTMLDivElement>}
          aria-label={label}
          className={classes}
        >
          {inner}
        </div>
      );
    }
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        type="button"
        aria-label={label}
        onClick={onClick}
        className={cn(classes, 'text-left transition-opacity hover:opacity-80')}
      >
        {inner}
      </button>
    );
  }
);
