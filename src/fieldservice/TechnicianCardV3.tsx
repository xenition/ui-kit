import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Icon, type BadgeTone } from '../primitives';
import type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';

/** Presence dot slot rendered over the avatar. */
type Presence = 'online' | 'busy' | 'away' | 'offline';

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  presence: Presence;
}

const STATUS: Record<TechnicianStatus, Desc> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
  'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};

const PRESENCE_BG: Record<Presence, string> = {
  online: 'bg-success',
  busy: 'bg-primary',
  away: 'bg-warn',
  offline: 'bg-neutral-400',
};

/**
 * Alternate design (v3) of {@link TechnicianCard} — a drop-in with the **same
 * props**. The *compact roster row*: a small avatar with a token-bound presence
 * dot, the name + role / jobs-today collapsed onto a meta line, an availability
 * badge, and trailing **Call / Assign** icon-taps. Bordered surface, no card
 * shadow. Availability is a text + glyph badge — never color alone. No literal
 * colors.
 */
export type TechnicianCardV3Props = TechnicianCardProps;

export const TechnicianCardV3 = React.forwardRef<HTMLDivElement, TechnicianCardV3Props>(
  function TechnicianCardV3(
    { name, role, status, avatarUrl, jobsToday, phone, onCall, onAssign, className, style },
    ref
  ) {
    const sd = STATUS[status] ?? STATUS.offline;
    const sub = [role, jobsToday != null ? `🗒 ${Math.max(0, Math.trunc(jobsToday))}` : null]
      .filter(Boolean)
      .join('   ·   ');

    return (
      <div
        ref={ref}
        style={style}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-md)] border border-border bg-surface px-[var(--xen-space-md)] py-[var(--xen-space-sm)]',
          className
        )}
      >
        <span className="relative inline-flex shrink-0">
          <Avatar src={avatarUrl} name={name} size="sm" />
          <span
            role="img"
            aria-label={sd.label}
            className={cn(
              'absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface',
              PRESENCE_BG[sd.presence]
            )}
          />
        </span>
        <div className="flex min-w-0 flex-1 flex-col">
          <span className="truncate text-sm font-bold text-on-surface">{name}</span>
          {sub ? <span className="truncate text-xs text-muted">{sub}</span> : null}
        </div>
        <Badge tone={sd.tone} variant="soft" size="sm">{`${sd.glyph} ${sd.label}`}</Badge>
        {phone != null && onCall != null ? (
          <button
            type="button"
            aria-label={`Call ${name}`}
            onClick={onCall}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-opacity hover:opacity-80 motion-reduce:transition-none"
          >
            <Icon glyph="📞" size="sm" />
          </button>
        ) : null}
        {onAssign != null ? (
          <button
            type="button"
            aria-label={`Assign ${name}`}
            onClick={onAssign}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 transition-opacity hover:opacity-80 motion-reduce:transition-none"
          >
            <Icon glyph="＋" size="sm" color="primary" />
          </button>
        ) : null}
      </div>
    );
  }
);
