import * as React from 'react';
import { cn } from '../primitives/cn';
import { SLOT_TINT, SLOT_TEXT, type WellnessSlot } from './_tokens';
import type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

/** Same public contract as {@link SleepStoryCard} — a drop-in alternate design. */
export type SleepStoryCardV2Props = SleepStoryCardProps;

const META: Record<SleepStoryCategory, { glyph: string; label: string; color: WellnessSlot }> = {
  nature: { glyph: '🌲', label: 'Nature', color: 'success' },
  fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
  asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
  music: { glyph: '🎵', label: 'Music', color: 'accent' },
  travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
  meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};

/**
 * SleepStoryCard, redesigned (v2): a **media-hero story card**. A tall slot-tinted
 * panel with the big category glyph and a floating play/pause control tops the
 * title, category·narrator·duration, and teaser. Elevated. Distinct from v1. Same
 * props, token-only.
 */
export const SleepStoryCardV2 = React.forwardRef<HTMLDivElement, SleepStoryCardV2Props>(
  function SleepStoryCardV2({ title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className }, ref) {
    const m = META[category] ?? META.meditation;
    if (loading) {
      return <div ref={ref} data-xen-sleep-story-card="" aria-label="Loading story" className={cn('h-44 animate-pulse rounded-lg bg-neutral-100', className)} />;
    }
    const meta = [m.label, narrator, typeof durationMin === 'number' ? `${durationMin} min` : null].filter((s): s is string => !!s).join(' · ');

    return (
      <div ref={ref} data-xen-sleep-story-card="" className={cn('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md', className)}>
        <div className={cn('relative flex h-28 items-center justify-center text-5xl', SLOT_TINT[m.color])} aria-hidden>
          {m.glyph}
          {locked ? (
            <span className="absolute inset-0 flex items-center justify-center bg-neutral-900/30 text-lg text-neutral-50">🔒</span>
          ) : onPlay ? (
            <button type="button" aria-label={playing ? 'Pause' : 'Play'} onClick={onPlay} className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-surface/90 text-sm text-on-surface">
              {playing ? '❚❚' : '▶'}
            </button>
          ) : null}
        </div>
        <div className="flex flex-col gap-1 p-md">
          <p className="text-base font-bold text-on-surface">{title}</p>
          <p className={cn('text-xs font-semibold', SLOT_TEXT[m.color])}>{meta}</p>
          {description ? <p className="text-sm text-muted">{description}</p> : null}
        </div>
      </div>
    );
  }
);
