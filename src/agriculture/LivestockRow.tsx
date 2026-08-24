import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge } from '../primitives';

/** Herd / flock health — colors the count and pairs with a text chip. */
export type LivestockHealth = 'healthy' | 'monitor' | 'sick';

export interface LivestockRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Species / group name (e.g. "Dairy Cows", "Layer Hens"). */
  species: string;
  /** Head count for the group. Guarded; shown as "—" when omitted. */
  count?: number;
  /** Leading glyph/emoji. Default `'🐄'`. */
  icon?: string;
  /** Pen / paddock / barn location (e.g. "Barn 2"). */
  location?: string;
  /** Herd health — colors the count and shows a text status chip. */
  health?: LivestockHealth;
  /** Optional secondary metric line (e.g. "avg 640 kg"). */
  detail?: string;
  /** Hide the bottom divider (last row in a list). */
  last?: boolean;
  /** Fires when the row is activated. */
  onClick?: () => void;
}

const HEALTH_META: Record<
  LivestockHealth,
  { label: string; text: string; tone: 'success' | 'warn' | 'danger' }
> = {
  healthy: { label: 'Healthy', text: 'text-on-surface', tone: 'success' },
  monitor: { label: 'Monitor', text: 'text-warn', tone: 'warn' },
  sick: { label: 'Sick', text: 'text-danger', tone: 'danger' },
};

/**
 * A livestock group row — species glyph, name, head count (emphasized), and an
 * optional location, closed by a health {@link Badge}. Health colors the count
 * but is always paired with a text chip so an at-risk group reads without
 * color. `count` is guarded (renders "—" when absent). A hairline divider
 * separates rows unless `last`. When `onClick` is set the row is an accessible
 * `role="button"` with keyboard activation. Token-bound throughout.
 */
export const LivestockRow = React.forwardRef<HTMLDivElement, LivestockRowProps>(
  function LivestockRow(
    {
      species,
      count,
      icon = '🐄',
      location,
      health = 'healthy',
      detail,
      last = false,
      onClick,
      className,
      ...rest
    },
    ref
  ) {
    const meta = HEALTH_META[health];
    const shownCount = typeof count === 'number' ? String(count) : '—';
    const subLine = [location, detail].filter((s) => s != null && s !== '').join(' · ');
    const interactive = typeof onClick === 'function';
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
      if (interactive && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        onClick?.();
      }
    };

    return (
      <div
        ref={ref}
        data-xen-livestock-row=""
        className={cn(
          'flex items-center gap-2 py-2',
          !last && 'border-b border-border',
          interactive && 'cursor-pointer transition-colors hover:bg-neutral-50',
          className
        )}
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={interactive ? `${species}, ${shownCount} head, ${meta.label}` : undefined}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={interactive ? handleKeyDown : undefined}
        {...rest}
      >
        <Icon glyph={icon} size="xl" color="onSurface" />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-semibold text-on-surface">{species}</p>
          {subLine !== '' ? <p className="truncate text-xs text-muted">{subLine}</p> : null}
        </div>
        <div className="flex flex-col items-end gap-0.5">
          <span className={cn('font-heading text-lg font-bold', meta.text)}>{shownCount}</span>
          <Badge tone={meta.tone}>{meta.label}</Badge>
        </div>
      </div>
    );
  }
);
