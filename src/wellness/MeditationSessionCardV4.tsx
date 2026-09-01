import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Skeleton } from '../primitives';
import { Icon } from '../primitives/Icon';
import type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

export type MeditationSessionCardV4Props = MeditationSessionCardProps;

interface CategoryMeta {
  glyph: string;
  label: string;
}

const CATEGORY_META: Record<MeditationCategory, CategoryMeta> = {
  breathing: { glyph: '🌬️', label: 'Breathing' },
  focus: { glyph: '🎯', label: 'Focus' },
  sleep: { glyph: '🌙', label: 'Sleep' },
  calm: { glyph: '🍃', label: 'Calm' },
  movement: { glyph: '🧘', label: 'Movement' },
  'body-scan': { glyph: '🌀', label: 'Body scan' },
  'loving-kindness': { glyph: '💗', label: 'Loving kindness' },
};

/**
 * MeditationSessionCardV4 — the "calm" restyle of {@link MeditationSessionCard}.
 * Same props, defaults, labels, a11y and behavior; only the surface changes: a
 * clean neutral card whose one spot of color is a gradient cover tile carrying
 * the category glyph in near-white ink, and a slim gradient resume fill. The
 * Start/Resume CTA, locked note, and loading skeleton are preserved. Token-only
 * colors (`--xen-*` classes, never a literal).
 */
export const MeditationSessionCardV4 = React.forwardRef<
  HTMLDivElement,
  MeditationSessionCardV4Props & React.HTMLAttributes<HTMLDivElement>
>(function MeditationSessionCardV4(
  {
    title,
    category,
    durationMin,
    level,
    instructor,
    description,
    progress,
    locked = false,
    loading = false,
    startLabel,
    onStart,
    className,
    ...rest
  },
  ref
) {
  const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;
  const shell =
    'flex flex-col gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-[var(--xen-space-lg)] text-on-surface';

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-meditation-session-card=""
        aria-busy="true"
        aria-label="Loading session"
        className={cn(shell, className)}
        {...rest}
      >
        <Skeleton width="40%" height={14} />
        <Skeleton width="80%" height={20} />
        <Skeleton width="60%" height={14} />
      </div>
    );
  }

  const resume = progress != null && progress > 0 && progress < 1;
  const cta = startLabel ?? (resume ? 'Resume' : 'Start');
  const pct = progress != null ? Math.round(Math.min(Math.max(progress, 0), 1) * 100) : 0;

  return (
    <div
      ref={ref}
      data-xen-meditation-session-card=""
      aria-label={`${meta.label} session: ${title}${locked ? ', premium' : ''}${
        resume ? `, ${pct}% complete` : ''
      }`}
      className={cn(shell, className)}
      {...rest}
    >
      <div className="flex items-center gap-[var(--xen-space-md)]">
        <div
          aria-hidden="true"
          className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700"
        >
          <Icon glyph={meta.glyph} size="2xl" color="onPrimary" />
        </div>
        <div className="flex min-w-0 flex-1 flex-col gap-0.5">
          <span className="text-xs font-bold uppercase tracking-wide text-muted">{meta.label}</span>
          <span className="truncate text-lg font-bold text-on-surface">{title}</span>
        </div>
        {locked ? (
          <span aria-label="Premium" className="text-base">
            🔒
          </span>
        ) : null}
      </div>

      {description ? <p className="line-clamp-2 text-sm text-muted">{description}</p> : null}

      <div className="flex flex-wrap gap-[var(--xen-space-lg)]">
        {durationMin != null ? <Meta label="Duration" value={`${durationMin} min`} /> : null}
        {level ? <Meta label="Level" value={cap(level)} /> : null}
        {instructor ? <Meta label="Teacher" value={instructor} /> : null}
      </div>

      {resume ? (
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-neutral-200">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-primary-400 to-primary-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-xs text-muted">{pct}% complete</span>
        </div>
      ) : null}

      {locked ? (
        <p className="text-sm font-semibold text-muted">🔒 Unlock with a membership</p>
      ) : onStart ? (
        <Button variant="primary" onClick={onStart}>
          {cta}
        </Button>
      ) : null}
    </div>
  );
});

function Meta({ label, value }: { label: string; value: string }): React.ReactElement {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted">{label}</span>
      <span className="text-base font-semibold text-on-surface">{value}</span>
    </div>
  );
}

function cap(s: string): string {
  return s.length === 0 ? s : s.charAt(0).toUpperCase() + s.slice(1);
}
