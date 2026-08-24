import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card, Avatar, Badge, Button, type BadgeTone } from '../primitives';

/** Technician availability — text + glyph + color (never color-alone). */
export type TechnicianStatus = 'available' | 'on-job' | 'en-route' | 'offline';

/** Presence dot slot rendered over the avatar. */
type Presence = 'online' | 'busy' | 'away' | 'offline';

interface StatusDescriptor {
  label: string;
  glyph: string;
  tone: BadgeTone;
  presence: Presence;
}

const TECHNICIAN_STATUS: Record<TechnicianStatus, StatusDescriptor> = {
  available: { label: 'Available', glyph: '✓', tone: 'success', presence: 'online' },
  'on-job': { label: 'On job', glyph: '⟳', tone: 'primary', presence: 'busy' },
  'en-route': { label: 'En route', glyph: '→', tone: 'warn', presence: 'away' },
  offline: { label: 'Offline', glyph: '○', tone: 'neutral', presence: 'offline' },
};

/** Token-bound presence dot color; conveyed alongside the labeled status pill. */
const PRESENCE_BG: Record<Presence, string> = {
  online: 'bg-success',
  busy: 'bg-primary',
  away: 'bg-warn',
  offline: 'bg-neutral-400',
};

export interface TechnicianCardProps {
  /** Technician name (e.g. "Marcus Reyes"). */
  name: string;
  /** Role / trade line (e.g. "HVAC Lead"). */
  role?: string;
  /** Availability status — text + glyph + color. */
  status: TechnicianStatus;
  /** Avatar image URL; falls back to initials from `name`. */
  avatarUrl?: string;
  /** Skill / certification chips. */
  skills?: string[];
  /** Count of jobs assigned today, shown as a meta line. */
  jobsToday?: number;
  /** Phone number; when set with `onCall`, renders a Call action. */
  phone?: string;
  /** Fires when the Call action is pressed. */
  onCall?: () => void;
  /** Fires when the Assign action is pressed. */
  onAssign?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * A roster card for a field technician: avatar with a token-bound presence dot,
 * name/role stack, an availability pill (text + glyph + a color that traces to
 * a semantic token — never color alone), skill chips, and Call / Assign
 * actions. Skills are guarded against a missing array. No literal colors.
 */
export const TechnicianCard = React.forwardRef<HTMLDivElement, TechnicianCardProps>(
  function TechnicianCard(
    { name, role, status, avatarUrl, skills, jobsToday, phone, onCall, onAssign, className, style },
    ref
  ) {
    const sd = TECHNICIAN_STATUS[status] ?? TECHNICIAN_STATUS.offline;
    const skillList = Array.isArray(skills) ? skills : [];
    const showActions = (phone != null && onCall != null) || onAssign != null;

    return (
      <Card ref={ref} className={className} style={style}>
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <span className="relative inline-flex shrink-0">
            <Avatar src={avatarUrl} name={name} size="lg" />
            <span
              role="img"
              aria-label={sd.label}
              className={cn(
                'absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-surface',
                PRESENCE_BG[sd.presence]
              )}
            />
          </span>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-lg font-bold text-on-surface">{name}</span>
            {role != null ? <span className="truncate text-sm text-muted">{role}</span> : null}
            {jobsToday != null ? (
              <span className="text-xs text-muted">🗒 {Math.max(0, Math.trunc(jobsToday))} jobs today</span>
            ) : null}
          </div>
          <Badge tone={sd.tone}>{`${sd.glyph} ${sd.label}`}</Badge>
        </div>

        {skillList.length > 0 ? (
          <div className="mt-[var(--xen-space-md)] flex flex-wrap gap-[var(--xen-space-xs)]">
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
          <div className="mt-[var(--xen-space-md)] flex gap-[var(--xen-space-sm)]">
            {phone != null && onCall != null ? (
              <Button variant="outline" size="sm" onClick={onCall} className="flex-1">
                Call
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
