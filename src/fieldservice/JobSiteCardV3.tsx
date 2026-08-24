import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon, Badge, type BadgeTone } from '../primitives';
import type { JobSiteCardProps, JobSiteStatus } from './JobSiteCard';

/**
 * Alternate design (v3) of {@link JobSiteCard} — a drop-in with the **same
 * props**. The *compact row*: a small glyph disc, the site name over its
 * address + collapsed meta on one line each, a status badge, and an optional
 * trailing **Directions** icon-tap. Bordered surface, no card shadow. Status is
 * a text + glyph badge — never color alone. No literal colors.
 */
export type JobSiteCardV3Props = JobSiteCardProps;

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

export const JobSiteCardV3 = React.forwardRef<HTMLDivElement, JobSiteCardV3Props>(function JobSiteCardV3(
  { name, address, status, crewCount, openOrders, distance, glyph = '🏗', onNavigate, onClick, className, style },
  ref
) {
  const sd = STATUS[status] ?? STATUS.scheduled;
  const interactive = onClick != null;

  const meta = [
    crewCount != null ? `👷 ${Math.max(0, Math.trunc(crewCount))}` : null,
    openOrders != null ? `🗒 ${Math.max(0, Math.trunc(openOrders))}` : null,
    distance != null ? `📍 ${distance}` : null,
  ]
    .filter(Boolean)
    .join('   ');

  return (
    <div
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
      className={cn(
        'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
        interactive && 'cursor-pointer transition-colors hover:bg-neutral-100 motion-reduce:transition-none',
        className
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--xen-radius-md)] bg-accent/10">
        <Icon glyph={glyph} size="base" aria-label="Job site" />
      </span>
      <div className="flex min-w-0 flex-1 flex-col">
        <span className="truncate text-base font-bold text-on-surface">{name}</span>
        <span className="truncate text-xs text-muted">{meta ? `${address}   ·   ${meta}` : address}</span>
      </div>
      <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
      {onNavigate ? (
        <button
          type="button"
          aria-label={`Directions to ${name}`}
          onClick={(e) => {
            e.stopPropagation();
            onNavigate();
          }}
          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-opacity hover:opacity-80 motion-reduce:transition-none"
        >
          <Icon glyph="🧭" size="sm" />
        </button>
      ) : null}
    </div>
  );
});
