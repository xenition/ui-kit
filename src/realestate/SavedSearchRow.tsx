import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Switch, Icon } from '../primitives';

export interface SavedSearchRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Search name (e.g. "2BR under $600k, Brooklyn"). */
  name: string;
  /** One-line summary of the filters. */
  summary?: string;
  /** Count of new matches since last viewed; shows a primary badge when > 0. */
  newCount?: number;
  /** Whether alert notifications are on. Renders a toggle when `onToggleAlerts` is set. */
  alertsOn?: boolean;
  /** Fires when the alerts toggle changes. */
  onToggleAlerts?: (on: boolean) => void;
  /** Fires when the row body is pressed (e.g. run the search). */
  onRun?: () => void;
}

/**
 * Web parity of the native `SavedSearchRow`: a row in a saved-searches list —
 * name, filter summary, a "new matches" count badge, and an optional alerts
 * toggle. Data + callbacks only; nothing fetches. The alert switch renders only
 * when `onToggleAlerts` is provided and is kept out of the row's press target so
 * toggling never runs the search. Reuses the shared `Badge`, `Switch`, and
 * `Icon`; all colors come from the `--xen-*` tokens — no literal colors.
 *
 * The row-activation callback is `onRun` (not `onClick`) to avoid colliding with
 * the DOM `onClick` handler.
 */
export const SavedSearchRow = React.forwardRef<HTMLDivElement, SavedSearchRowProps>(
  function SavedSearchRow(
    { name, summary, newCount = 0, alertsOn = false, onToggleAlerts, onRun, className, ...rest },
    ref
  ) {
    const content = (
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-2">
          <span className="min-w-0 shrink truncate text-base font-semibold text-on-surface">{name}</span>
          {newCount > 0 ? <Badge tone="primary">{`${newCount} new`}</Badge> : null}
        </span>
        {summary ? <span className="truncate text-sm text-muted">{summary}</span> : null}
      </span>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 border border-border bg-surface px-[var(--xen-space-lg)] py-[var(--xen-space-md)]',
          'rounded-[var(--xen-radius-md)]',
          className
        )}
        {...rest}
      >
        {onRun ? (
          <button
            type="button"
            aria-label={`${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`}
            onClick={onRun}
            className="flex flex-1 items-center gap-2 text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-[var(--xen-radius-sm)]"
          >
            {content}
            <Icon glyph="›" size="lg" color="muted" />
          </button>
        ) : (
          content
        )}
        {onToggleAlerts ? (
          <Switch
            checked={alertsOn}
            onCheckedChange={onToggleAlerts}
            aria-label={`Alerts for ${name}, ${alertsOn ? 'on' : 'off'}`}
          />
        ) : null}
      </div>
    );
  }
);
