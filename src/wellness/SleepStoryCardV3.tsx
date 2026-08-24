import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLOT_TINT, type WellnessSlot } from './_tokens';
import type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

/** Same public contract as {@link SleepStoryCard} — a drop-in alternate design. */
export type SleepStoryCardV3Props = SleepStoryCardProps;

const META: Record<SleepStoryCategory, { glyph: string; label: string; color: WellnessSlot }> = {
  nature: { glyph: '🌲', label: 'Nature', color: 'success' },
  fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
  asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
  music: { glyph: '🎵', label: 'Music', color: 'accent' },
  travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
  meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};

/**
 * SleepStoryCard, redesigned (v3): a **dense story row**. A slot-tinted glyph tile,
 * the title over a category·narrator·duration line, and a compact play/pause (or
 * lock) on the right — hairline-bordered for a playlist. The opposite of v2's
 * media hero. Same props, token-only.
 */
export const SleepStoryCardV3 = React.forwardRef<HTMLDivElement, SleepStoryCardV3Props>(
  function SleepStoryCardV3({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className }, ref) {
    void description;
    const m = META[category] ?? META.meditation;
    if (loading) {
      return <div ref={ref} data-xen-sleep-story-card="" aria-label="Loading story" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}><div className="h-3 w-2/5 animate-pulse rounded-sm bg-neutral-100" /></div>;
    }
    const meta = [m.label, narrator, typeof durationMin === 'number' ? `${durationMin} min` : null].filter((s): s is string => !!s).join(' · ');

    return (
      <div ref={ref} data-xen-sleep-story-card="" className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}>
        <span className={cn('flex h-11 w-11 shrink-0 items-center justify-center rounded-md text-xl', SLOT_TINT[m.color])} aria-hidden>{m.glyph}</span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-on-surface">{title}</p>
          <p className="truncate text-xs text-muted">{meta}</p>
        </div>
        {locked ? <span className="text-sm text-muted" aria-label="Locked">🔒</span> : onPlay ? (
          <button type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={onPlay} className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm text-primary">{playing ? '❚❚' : '▶'}</button>
        ) : null}
      </div>
    );
  }
);
