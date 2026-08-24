import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Progress } from '../primitives';
import { SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';
import type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

/** Same public contract as {@link MeditationSessionCard} — a drop-in alternate design. */
export type MeditationSessionCardV2Props = MeditationSessionCardProps;

const META: Record<MeditationCategory, { glyph: string; label: string; color: WellnessSlot }> = {
  breathing: { glyph: '🌬️', label: 'Breathing', color: 'primary' },
  focus: { glyph: '🎯', label: 'Focus', color: 'accent' },
  sleep: { glyph: '🌙', label: 'Sleep', color: 'primary' },
  calm: { glyph: '🍃', label: 'Calm', color: 'success' },
  movement: { glyph: '🧘', label: 'Movement', color: 'warn' },
  'body-scan': { glyph: '🌀', label: 'Body scan', color: 'accent' },
  'loving-kindness': { glyph: '💗', label: 'Loving kindness', color: 'danger' },
};

/**
 * MeditationSessionCard, redesigned (v2): a **hero session card**. A big category
 * glyph sits in a slot-tinted disc; the title, a category·level·duration·teacher
 * line, and description follow, with a resume bar and a full-width Start CTA (or a
 * locked note). Elevated. Distinct from v1. Same props, token-only.
 */
export const MeditationSessionCardV2 = React.forwardRef<HTMLDivElement, MeditationSessionCardV2Props>(
  function MeditationSessionCardV2({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, className }, ref) {
    const m = META[category] ?? META.calm;
    if (loading) {
      return <div ref={ref} data-xen-meditation-session-card="" aria-label="Loading session" className={cn('h-40 animate-pulse rounded-lg bg-neutral-100', className)} />;
    }
    const meta = [m.label, level, typeof durationMin === 'number' ? `${durationMin} min` : null, instructor].filter((s): s is string => !!s).join(' · ');
    const resume = typeof progress === 'number' && progress > 0;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');

    return (
      <div ref={ref} data-xen-meditation-session-card="" className={cn('flex flex-col gap-3 rounded-lg bg-surface p-md shadow-md', className)}>
        <div className="flex items-center gap-3">
          <span className={cn('flex h-14 w-14 items-center justify-center rounded-full text-2xl', SLOT_TINT[m.color])} aria-hidden>{m.glyph}</span>
          <div className="min-w-0">
            <p className="text-base font-bold text-on-surface">{title}</p>
            <p className={cn('text-xs font-semibold', SLOT_TEXT[m.color])}>{meta}</p>
          </div>
        </div>
        {description ? <p className="text-sm text-muted">{description}</p> : null}
        {resume ? <Progress value={Math.round((progress ?? 0) * 100)} tone="primary" size="sm" /> : null}
        {locked ? (
          <p className="rounded-md bg-neutral-100 px-3 py-2 text-center text-sm text-muted">🔒 Unlock with Premium</p>
        ) : onStart ? (
          <Button size="md" variant="primary" className="w-full" onClick={onStart}>{cta}</Button>
        ) : null}
      </div>
    );
  }
);
