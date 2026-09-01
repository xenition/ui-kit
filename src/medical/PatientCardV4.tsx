import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import type { PatientCardProps, PatientStatus } from './PatientCard';

/** V4 layout choices for the "clinic" design. */
export type PatientCardLayout = 'full' | 'compact';

/** Drop-in for {@link PatientCardProps} — same props, the V4 "clinic" design. */
export interface PatientCardV4Props extends PatientCardProps {
  /** V4 layout: `full` (card, default) or `compact` (dense single row). */
  variant?: PatientCardLayout;
}

const STATUS_META: Record<PatientStatus, { label: string; tone: BadgeTone; glyph: string }> = {
  stable: { label: 'Stable', tone: 'success', glyph: '●' },
  observation: { label: 'Observation', tone: 'warn', glyph: '◐' },
  critical: { label: 'Critical', tone: 'danger', glyph: '⚠' },
  discharged: { label: 'Discharged', tone: 'neutral', glyph: '✓' },
};

/**
 * PatientCard — **V4** "clinic" design (web parity of the native V4). The calm,
 * clinical take on a patient roster / chart-header row: an elevated rounded card
 * with a soft shadow, the avatar + name + an age·sex·MRN demographic line, an
 * optional room, and a labelled clinical-status badge whose meaning is carried
 * by a glyph + label as well as tone (never color alone). When `onClick` is set
 * the card is a keyboard-activatable `role="button"`. Honors the V4 `variant` —
 * `full` (card, default) and `compact` (a dense single row) — identical
 * props/behavior to {@link PatientCardProps}. All colors from `--xen-*` token
 * classes (no literals). Informational UI only — not a medical device.
 */
export const PatientCardV4 = React.forwardRef<HTMLDivElement, PatientCardV4Props>(function PatientCardV4(
  { name, avatar, age, sex, mrn, status, room, onClick, variant = 'full', className, ...rest },
  ref
) {
  const meta = status ? STATUS_META[status] : undefined;
  const interactive = !!onClick;
  const shell = 'rounded-[var(--xen-radius-lg)] border border-border bg-surface text-on-surface shadow-sm';

  const demo = [age != null ? `${age}y` : undefined, sex, mrn ? `MRN ${mrn}` : undefined].filter(
    Boolean
  ) as string[];
  const a11y = `${name}${demo.length ? `, ${demo.join(', ')}` : ''}${meta ? `, ${meta.label}` : ''}`;

  const interactiveProps = interactive
    ? {
        role: 'button',
        tabIndex: 0,
        onClick: () => onClick?.(),
        onKeyDown: (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick?.();
          }
        },
      }
    : {};

  // ── compact: dense single row ──
  if (variant === 'compact') {
    return (
      <div
        ref={ref}
        data-xen-patient-card=""
        aria-label={a11y}
        {...interactiveProps}
        className={cn(
          shell,
          'flex items-center gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]',
          interactive && 'cursor-pointer transition-opacity hover:opacity-90',
          className
        )}
        {...rest}
      >
        <Avatar src={avatar} name={name} size="sm" />
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="truncate text-sm font-bold text-on-surface">{name}</span>
          {demo.length ? <span className="truncate text-xs tabular-nums text-muted">{demo.join('  ·  ')}</span> : null}
        </div>
        {meta ? (
          <Badge tone={meta.tone} variant="soft">
            <span aria-hidden="true">{meta.glyph}</span> {meta.label}
          </Badge>
        ) : null}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      data-xen-patient-card=""
      aria-label={a11y}
      {...interactiveProps}
      className={cn(
        shell,
        'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]',
        interactive && 'cursor-pointer transition-opacity hover:opacity-90',
        className
      )}
      {...rest}
    >
      <Avatar src={avatar} name={name} size="lg" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-base font-bold text-on-surface">{name}</span>
        {demo.length ? <span className="truncate text-sm tabular-nums text-muted">{demo.join('  ·  ')}</span> : null}
        {room ? (
          <span className="mt-0.5 inline-flex w-fit items-center gap-1 truncate rounded-[var(--xen-radius-sm)] bg-primary/10 px-[var(--xen-space-xs)] text-xs text-muted">
            🛏 {room}
          </span>
        ) : null}
      </div>
      {meta ? (
        <Badge tone={meta.tone} variant="soft">
          <span aria-hidden="true">{meta.glyph}</span> {meta.label}
        </Badge>
      ) : null}
    </div>
  );
});
