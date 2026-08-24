import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';

export interface TimezoneRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** IANA timezone id, e.g. `America/New_York`. */
  timezone: string;
  /** Optional human label; falls back to the id with underscores replaced. */
  label?: string;
  /** Optional current-offset / abbreviation caption, e.g. `GMT-4 · EDT`. */
  offsetLabel?: string;
  /** Leading row title (default "Time zone"). */
  title?: string;
  /**
   * `row` (default) is a tappable settings row that defers to a host picker;
   * `inline` is a static, non-interactive display line.
   */
  variant?: 'row' | 'inline';
  /** Fires when the row is tapped (row variant). */
  onPress?: () => void;
}

function prettifyZone(id: string): string {
  const tail = id.split('/').slice(-1)[0] ?? id;
  return tail.replace(/_/g, ' ');
}

/**
 * A timezone display/select row for an event form. `row` renders a tappable
 * settings line (globe icon, title, current zone, chevron) that hands off to a
 * host-owned picker; `inline` is a static caption. No date math is done here —
 * offset text is passed in. Token colors only.
 */
export const TimezoneRow = React.forwardRef<HTMLDivElement, TimezoneRowProps>(function TimezoneRow(
  { timezone, label, offsetLabel, title = 'Time zone', variant = 'row', onPress, className, ...rest },
  ref
) {
  const zoneLabel = label ?? prettifyZone(timezone);

  if (variant === 'inline') {
    return (
      <div ref={ref} className={cn('flex items-center', className)} {...rest}>
        <Icon glyph="🌐" size="sm" color="muted" />
        <span className="ml-1 text-sm text-muted">
          {offsetLabel ? `${zoneLabel} · ${offsetLabel}` : zoneLabel}
        </span>
      </div>
    );
  }

  return (
    <button
      ref={ref as React.Ref<HTMLButtonElement> as never}
      type="button"
      aria-label={`${title}: ${zoneLabel}${offsetLabel ? `, ${offsetLabel}` : ''}`}
      onClick={onPress}
      className={cn(
        'flex w-full items-center py-2 text-left transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300 rounded-[var(--xen-radius-sm)]',
        className
      )}
    >
      <Icon glyph="🌐" size="sm" color="muted" />
      <span className="ml-2 text-base font-semibold text-on-surface">{title}</span>
      <span className="flex-1" />
      <span className="flex flex-col items-end">
        <span className="text-sm text-muted">{zoneLabel}</span>
        {offsetLabel ? <span className="text-xs text-muted">{offsetLabel}</span> : null}
      </span>
      <span className="ml-1 text-base text-muted">›</span>
    </button>
  );
});
