import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { DISC_TINT } from './internal/format';

/** Site activity state — text + glyph + color (never color-alone). */
export type JobSiteStatus = 'active' | 'scheduled' | 'completed' | 'blocked';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const JOB_SITE_STATUS: Record<JobSiteStatus, StatusDescriptor> = {
  active: { label: 'On site', glyph: '▶', tone: 'success' },
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
  blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};

export interface JobSiteCardProps {
  /** Site / customer name (e.g. "Riverside Plaza"). */
  name: string;
  /** Street address, already formatted by the caller. */
  address: string;
  /** Activity status. */
  status: JobSiteStatus;
  /** Number of crew currently assigned to the site. */
  crewCount?: number;
  /** Count of open work orders at the site. */
  openOrders?: number;
  /** Localized distance string (e.g. "3.2 mi"). */
  distance?: string;
  /** Leading glyph for the site disc (emoji or symbol). */
  glyph?: string;
  /** Fires when the navigate/directions action is pressed. */
  onNavigate?: () => void;
  /** Fires on card click; the card is only a button when supplied. */
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A summary card for a job site. A tinted leading glyph disc, name/address
 * stack, a status pill (text + glyph + a color that traces to a semantic token
 * — never color alone), crew / open-order / distance meta, and an optional
 * "Directions" action. Becomes a `role="button"` surface (click / Enter /
 * Space) only when `onClick` is supplied; the Directions action is a real
 * `<button>` that stops propagation. Every color traces to a `--xen-*` token.
 */
export const JobSiteCard = React.forwardRef<HTMLDivElement, JobSiteCardProps>(function JobSiteCard(
  { name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, className, style },
  ref
) {
  const sd = JOB_SITE_STATUS[status] ?? JOB_SITE_STATUS.scheduled;
  const interactive = onClick != null;

  return (
    <Card
      ref={ref}
      style={style}
      {...(interactive
        ? {
            role: 'button',
            tabIndex: 0,
            'aria-label': `${name}, ${address}, ${sd.label}`,
            onClick,
            onKeyDown: (e: React.KeyboardEvent) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick?.();
              }
            },
          }
        : {})}
      className={cn(interactive && 'cursor-pointer transition-shadow hover:shadow-md', className)}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <span
          className={cn(
            'flex h-11 w-11 items-center justify-center rounded-[var(--xen-radius-md)]',
            DISC_TINT.accent
          )}
        >
          <Icon glyph={glyph} size="xl" aria-label="Job site" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-lg font-bold text-on-surface">{name}</span>
          <span className="truncate text-sm text-muted">{address}</span>
        </div>
        <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge>
      </div>

      <div className="mt-[var(--xen-space-md)] flex items-center justify-between gap-[var(--xen-space-md)] border-t border-border pt-[var(--xen-space-md)]">
        <div className="flex flex-wrap gap-[var(--xen-space-md)]">
          {crewCount != null ? (
            <span className="text-xs text-muted">👷 {Math.max(0, Math.trunc(crewCount))} crew</span>
          ) : null}
          {openOrders != null ? (
            <span className="text-xs text-muted">🗒 {Math.max(0, Math.trunc(openOrders))} open</span>
          ) : null}
          {distance != null ? <span className="text-xs text-muted">📍 {distance}</span> : null}
        </div>
        {onNavigate ? (
          <Button
            variant="outline"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
          >
            Directions
          </Button>
        ) : null}
      </div>
    </Card>
  );
});
