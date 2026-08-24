import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Icon, Badge, Button, type BadgeTone } from '../primitives';
import { DISC_TINT } from './internal/format';
import type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';

/**
 * Alternate design (v2) of {@link JobSiteCard} — a drop-in with the **same
 * props**. Where the base is a compact horizontal summary, V2 is a *banner +
 * stats card*: a tinted **site banner** (large glyph, name, address, status
 * pill), a row of **crew / open-order / distance stat tiles**, and a
 * full-width **Directions** action. Status is a text + glyph badge — never
 * color alone. No literal colors.
 */
export type JobSiteCardV2Props = JobSiteCardProps;

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
}

const STATUS: Record<JobSiteStatus, Desc> = {
  active: { label: 'On site', glyph: '▶', tone: 'success' },
  scheduled: { label: 'Scheduled', glyph: '📅', tone: 'primary' },
  completed: { label: 'Completed', glyph: '✓', tone: 'neutral' },
  blocked: { label: 'Blocked', glyph: '⚠', tone: 'danger' },
};

function StatTile({ value, label }: { value: string; label: string }): React.ReactElement {
  return (
    <div className="flex flex-1 flex-col items-center gap-0.5 rounded-[var(--xen-radius-md)] bg-neutral-100 py-[var(--xen-space-sm)]">
      <span className="text-lg font-extrabold text-on-surface">{value}</span>
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

export const JobSiteCardV2 = React.forwardRef<HTMLDivElement, JobSiteCardV2Props>(function JobSiteCardV2(
  { name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, className, style },
  ref
) {
  const sd = STATUS[status] ?? STATUS.scheduled;
  const interactive = onClick != null;
  const hasStats = crewCount != null || openOrders != null || distance != null;

  return (
    <Card
      ref={ref}
      style={style}
      padding="none"
      className={cn(
        'overflow-hidden',
        interactive &&
          'cursor-pointer transition duration-200 hover:-translate-y-0.5 hover:shadow-md active:scale-[.99] motion-reduce:transition-none motion-reduce:hover:transform-none',
        className
      )}
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
    >
      <div className="flex items-center gap-[var(--xen-space-md)] bg-accent/10 p-[var(--xen-space-lg)]">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent/20">
          <Icon glyph={glyph} size="2xl" aria-label="Job site" />
        </span>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-xl font-extrabold text-on-surface">{name}</span>
          <span className="truncate text-sm text-muted">{address}</span>
        </div>
        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>
      </div>

      {hasStats ? (
        <div className="flex gap-[var(--xen-space-sm)] px-[var(--xen-space-lg)] pt-[var(--xen-space-md)]">
          {crewCount != null ? <StatTile value={`${Math.max(0, Math.trunc(crewCount))}`} label="crew" /> : null}
          {openOrders != null ? (
            <StatTile value={`${Math.max(0, Math.trunc(openOrders))}`} label="open orders" />
          ) : null}
          {distance != null ? <StatTile value={distance} label="away" /> : null}
        </div>
      ) : null}

      <div className="p-[var(--xen-space-lg)] pt-[var(--xen-space-md)]">
        {onNavigate ? (
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={(e) => {
              e.stopPropagation();
              onNavigate();
            }}
          >
            🧭 Directions
          </Button>
        ) : null}
      </div>
    </Card>
  );
});
