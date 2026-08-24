import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';

export type PatientStatus = 'stable' | 'observation' | 'critical' | 'discharged';

const STATUS_META: Record<PatientStatus, { label: string; tone: BadgeTone; glyph: string }> = {
  stable: { label: 'Stable', tone: 'success', glyph: '●' },
  observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
  critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
  discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};

export interface PatientCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Patient full name. */
  name: string;
  /** Optional avatar image URL. */
  avatar?: string;
  /** Age in years. */
  age?: number;
  /** Sex / gender short label, e.g. "F", "M". */
  sex?: string;
  /** Medical record number. */
  mrn?: string;
  /** Clinical status; drives the badge (glyph + label + tone). */
  status?: PatientStatus;
  /** Optional room / bed or ward line. */
  room?: string;
  /** Fires when the card is activated to open the chart — web mirror of native `onPress`. */
  onClick?: () => void;
}

/**
 * A patient roster / chart-header card — the web mirror of the native
 * `PatientCard`. Shows the avatar, name, an age·sex·MRN demographic line, an
 * optional room, and a clinical status badge whose meaning is carried by a
 * glyph + label as well as tone. When `onClick` is set the card is a
 * keyboard-activatable `role="button"`. Composes `Avatar` + `Badge`; token-only
 * colors. Informational UI only — not a medical device.
 */
export const PatientCard = React.forwardRef<HTMLDivElement, PatientCardProps>(
  function PatientCard(
    { name, avatar, age, sex, mrn, status, room, onClick, className, ...rest },
    ref
  ) {
    const meta = status ? STATUS_META[status] : undefined;
    const interactive = !!onClick;

    const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(
      Boolean
    ) as string[];
    const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;

    return (
      <div
        ref={ref}
        data-xen-patient-card=""
        role={interactive ? 'button' : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-label={a11y}
        onClick={interactive ? () => onClick?.() : undefined}
        onKeyDown={
          interactive
            ? (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  onClick?.();
                }
              }
            : undefined
        }
        className={cn(
          'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)] text-on-surface',
          interactive && 'cursor-pointer transition-opacity hover:opacity-90',
          className
        )}
        {...rest}
      >
        <Avatar src={avatar} name={name} size="lg" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-base font-bold text-on-surface">{name}</span>
          {demo.length ? <span className="truncate text-sm text-muted">{demo.join('  ·  ')}</span> : null}
          {room ? <span className="truncate text-xs text-muted">🛏 {room}</span> : null}
        </div>
        {meta ? (
          <Badge tone={meta.tone}>
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        ) : null}
      </div>
    );
  }
);
