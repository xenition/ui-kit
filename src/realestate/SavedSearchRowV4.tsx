import * as React from 'react';
import { cn } from '../primitives/cn';
import { Switch, Icon } from '../primitives';
import type { SavedSearchRowProps } from './SavedSearchRow';

/** Drop-in for {@link SavedSearchRowProps} — same props, the V4 "listing" design. */
export type SavedSearchRowV4Props = SavedSearchRowProps;

/**
 * SavedSearchRow — **V4** "listing" design (web parity of the native V4). The
 * editorial take on a saved-searches row: an elevated, rounded card with the
 * query name, a one-line filter summary, a soft-primary "new matches" count
 * pill, and an alerts toggle. Same props/behavior as {@link SavedSearchRowProps};
 * the alert switch renders only when `onToggleAlerts` is provided and is kept out
 * of the row's press target so toggling never runs the search. The
 * row-activation callback stays `onRun` (not the DOM `onClick`). Colors come
 * from the `--xen-*` tokens — no literal colors.
 */
export const SavedSearchRowV4 = React.forwardRef<HTMLDivElement, SavedSearchRowV4Props>(
  function SavedSearchRowV4(
    { name, summary, newCount = 0, alertsOn = false, onToggleAlerts, onRun, className, ...rest },
    ref
  ) {
    const content = (
      <span className="flex flex-1 flex-col gap-0.5">
        <span className="flex items-center gap-2">
          <span className="min-w-0 shrink truncate text-base font-bold text-on-surface">{name}</span>
          {newCount > 0 ? (
            <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
              {`${newCount} new`}
            </span>
          ) : null}
        </span>
        {summary ? <span className="truncate text-sm text-muted">{summary}</span> : null}
      </span>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-3 rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 pl-[var(--xen-space-lg)] text-on-surface shadow-md',
          className
        )}
        {...rest}
      >
        {onRun ? (
          <button
            type="button"
            aria-label={`${name}${newCount > 0 ? `, ${newCount} new matches` : ''}`}
            onClick={onRun}
            className="flex min-h-[44px] flex-1 items-center gap-2 rounded-[var(--xen-radius-md)] text-left transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            {content}
            <Icon glyph="›" size="lg" color="muted" />
          </button>
        ) : (
          content
        )}
        {onToggleAlerts ? (
          <span className="flex min-h-[44px] items-center pr-2">
            <Switch
              checked={alertsOn}
              onCheckedChange={onToggleAlerts}
              aria-label={`Alerts for ${name}, ${alertsOn ? 'on' : 'off'}`}
            />
          </span>
        ) : null}
      </div>
    );
  }
);
