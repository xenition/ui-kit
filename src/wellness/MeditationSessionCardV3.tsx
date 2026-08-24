import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import { type WellnessSlot } from './_tokens';
import type { MeditationSessionCardProps, MeditationCategory } from './MeditationSessionCard';

/** Same public contract as {@link MeditationSessionCard} — a drop-in alternate design. */
export type MeditationSessionCardV3Props = MeditationSessionCardProps;

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
 * MeditationSessionCard, redesigned (v3): a **dense session line**. The category
 * glyph leads, the title over a category·duration·level line, a thin resume
 * underline, and a quiet Start/Resume (or lock) trails — hairline-bordered for a
 * library list. The opposite of v2's hero. Same props, token-only.
 */
export const MeditationSessionCardV3 = React.forwardRef<HTMLDivElement, MeditationSessionCardV3Props>(
  function MeditationSessionCardV3({ title, category, durationMin, level, instructor, description, progress, locked = false, loading = false, startLabel, onStart, className }, ref) {
    void instructor;
    void description;
    const m = META[category] ?? META.calm;
    if (loading) {
      return <div ref={ref} data-xen-meditation-session-card="" aria-label="Loading session" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }
    const meta = [m.label, typeof durationMin === 'number' ? `${durationMin} min` : null, level].filter((s): s is string => !!s).join(' · ');
    const resume = typeof progress === 'number' && progress > 0;
    const cta = startLabel ?? (resume ? 'Resume' : 'Start');

    return (
      <div ref={ref} data-xen-meditation-session-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}>
        <span className="text-xl" aria-hidden>{m.glyph}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
          <p className="truncate text-xs text-muted">{meta}</p>
          {resume ? (
            <div className="mt-1 h-0.5 w-full overflow-hidden rounded-full bg-neutral-100">
              <div className="h-full rounded-full bg-primary" style={{ width: `${Math.round((progress ?? 0) * 100)}%` }} />
            </div>
          ) : null}
        </div>
        {locked ? <span className="text-sm text-muted" aria-label="Locked">🔒</span> : onStart ? <Button size="sm" variant="ghost" onClick={onStart}>{cta}</Button> : null}
      </div>
    );
  }
);
