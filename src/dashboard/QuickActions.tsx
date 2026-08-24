import * as React from 'react';
import { cn } from '../primitives/cn';

export interface QuickAction {
  key: string;
  label: string;
  /** Optional glyph/icon slot rendered above the label. */
  icon?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export interface QuickActionsProps extends React.HTMLAttributes<HTMLDivElement> {
  actions: QuickAction[];
  /** Optional section heading. */
  title?: string;
  /** Number of columns in the grid. */
  columns?: number;
}

/**
 * A grid of labelled quick-action buttons — the shortcut launcher on a
 * dashboard home. Each tile is a square-ish token-bound button with an optional
 * icon above the label. Token-only.
 */
export const QuickActions = React.forwardRef<HTMLDivElement, QuickActionsProps>(
  function QuickActions({ actions, title, columns = 3, className, ...rest }, ref) {
    return (
      <div ref={ref} className={cn('flex flex-col gap-sm', className)} {...rest}>
        {title ? <h3 className="text-lg font-bold text-on-surface">{title}</h3> : null}
        <div
          className="grid gap-sm"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {actions.map((action) => (
            <button
              key={action.key}
              type="button"
              aria-label={action.label}
              disabled={action.disabled}
              onClick={action.onClick}
              className={cn(
                'flex flex-col items-center justify-center gap-xs rounded-[var(--xen-radius-md)] border border-border bg-surface px-sm py-lg',
                'transition-colors hover:bg-neutral-100',
                'disabled:pointer-events-none disabled:opacity-50'
              )}
            >
              {action.icon ? <span aria-hidden>{action.icon}</span> : null}
              <span className="truncate text-sm font-semibold text-on-surface">
                {action.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
);
