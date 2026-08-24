import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Badge, Button, type BadgeTone } from '../primitives';
import type { TechnicianCardProps, TechnicianStatus } from './TechnicianCard';

/** Presence dot slot rendered over the avatar. */
type Presence = 'online' | 'busy' | 'away' | 'offline';

interface Desc {
  label: string;
  glyph: string;
  tone: BadgeTone;
  presence: Presence;
  /** Token bg-tint halo class around the avatar. */
  halo: string;
}

const STATUS: Record<TechnicianStatus, Desc> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online', halo: 'bg-success/20' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy', halo: 'bg-primary/20' },
  'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away', halo: 'bg-warn/20' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline', halo: 'bg-neutral-200' },
};

const PRESENCE_BG: Record<Presence, string> = {
  online: 'bg-success',
  busy: 'bg-primary',
  away: 'bg-warn',
  offline: 'bg-neutral-400',
};

/**
 * Alternate design (v2) of {@link TechnicianCard} — a drop-in with the **same
 * props**. Where the base is a left-aligned roster row, V2 is a *centered
 * profile card*: an elevated surface, a large **ringed avatar** with a presence
 * dot, name / role stacked centrally, an availability badge, a jobs-today stat,
 * centered skill chips, and full-width **Call / Assign** actions. Availability
 * is a text + glyph badge — never color alone. No literal colors.
 */
export type TechnicianCardV2Props = TechnicianCardProps;

export const TechnicianCardV2 = React.forwardRef<HTMLDivElement, TechnicianCardV2Props>(
  function TechnicianCardV2(
    { name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, className, style },
    ref
  ) {
    const sd = STATUS[status] ?? STATUS.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const showActions = (phone != null && onCall != null) || onAssign != null;

    return (
      <Card
        ref={ref}
        style={style}
        variant="elevated"
        className={cn('flex flex-col items-center gap-[var(--xen-space-sm)] text-center', className)}
      >
        <span className="relative inline-flex shrink-0">
          <span className={cn('inline-flex rounded-full p-1', sd.halo)}>
            <Avatar src={avatarUrl} name={name} size="xl" />
          </span>
          <span
            role="img"
            aria-label={sd.label}
            className={cn(
              'absolute bottom-1 right-1 h-3.5 w-3.5 rounded-full border-2 border-surface',
              PRESENCE_BG[sd.presence]
            )}
          />
        </span>

        <span className="truncate text-lg font-extrabold text-on-surface">{name}</span>
        {role != null ? <span className="truncate text-sm text-muted">{role}</span> : null}

        <Badge tone={sd.tone} variant="soft">{`${sd.glyph} ${sd.label}`}</Badge>

        {jobsToday != null ? (
          <span className="text-xs text-muted">🗒 {Math.max(0, Math.trunc(jobsToday))} jobs today</span>
        ) : null}

        {skillList.length > 0 ? (
          <div className="flex flex-wrap justify-center gap-[var(--xen-space-xs)]">
            {skillList.map((skill, i) => (
              <span
                key={`${skill}-${i}`}
                className="rounded-full bg-primary/10 px-[var(--xen-space-sm)] py-0.5 text-xs font-medium text-primary"
              >
                {skill}
              </span>
            ))}
          </div>
        ) : null}

        {showActions ? (
          <div className="mt-[var(--xen-space-xs)] flex w-full gap-[var(--xen-space-sm)]">
            {phone != null && onCall != null ? (
              <Button variant="outline" size="sm" onClick={onCall} className="flex-1">
                📞 Call
              </Button>
            ) : null}
            {onAssign != null ? (
              <Button variant="primary" size="sm" onClick={onAssign} className="flex-1">
                Assign
              </Button>
            ) : null}
          </div>
        ) : null}
      </Card>
    );
  }
);
