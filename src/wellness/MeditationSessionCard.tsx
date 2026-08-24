import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Progress, Skeleton } from '../primitives';
import { CARD_SHELL, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type MeditationCategory =
  | 'breathing'
  | 'focus'
  | 'sleep'
  | 'calm'
  | 'movement'
  | 'body-scan'
  | 'loving-kindness';

interface CategoryMeta {
  glyph: string;
  label: string;
  color: WellnessSlot;
}

const CATEGORY_META: Record<MeditationCategory, CategoryMeta> = {
  breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
  focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
  sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
  calm: { glyph: '🍃', label: 'Calm', color: 'success' },
  movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
  'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
  'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};

export interface MeditationSessionCardProps {
  /** Session title, e.g. "Morning stillness". */
  title: string;
  /** Category — drives the icon, tag label, and accent tone. */
  category: MeditationCategory;
  /** Length in minutes. */
  durationMin?: number;
  /** Difficulty / experience level. */
  level?: 'beginner' | 'intermediate' | 'advanced';
  /** Teacher / narrator name. */
  instructor?: string;
  /** Short description or focus line. */
  description?: string;
  /** Fraction 0–1 of the session already listened to (shows a resume bar). */
  progress?: number;
  /** Gate the session behind a paywall — swaps the CTA for a locked note. */
  locked?: boolean;
  /** Render a placeholder skeleton instead of content. */
  loading?: boolean;
  /** CTA label; defaults to "Start" (or "Resume" when `progress` > 0). */
  startLabel?: string;
  onStart?: () => void;
  className?: string;
}

/**
 * A meditation session summary card (web parity of the native block): category
 * icon + tag, title, a duration / level / instructor meta strip, an optional
 * resume progress bar, and a single dominant start action. `locked` swaps the
 * CTA for a premium note; `loading` renders a skeleton. `category` sets the icon
 * and accent tone. Token-only colors (`--xen-*` classes, never a literal).
 */
export const MeditationSessionCard = React.forwardRef<HTMLDivElement, MeditationSessionCardProps>(
  function MeditationSessionCard(
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
    },
    ref
  ) {
    const meta = CATEGORY_META[category] ?? CATEGORY_META.calm;

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-meditation-session-card=""
          aria-busy="true"
          aria-label="Loading session"
          className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
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
        className={cn(CARD_SHELL, 'flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]', className)}
      >
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          <div
            aria-hidden="true"
            className={cn(
              'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-lg',
              SLOT_TINT[meta.color]
            )}
          >
            {meta.glyph}
          </div>
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className={cn('text-xs font-bold uppercase tracking-wide', SLOT_TEXT[meta.color])}>
              {meta.label}
            </span>
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
            <Progress value={pct} tone="primary" size="sm" />
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
  }
);

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
