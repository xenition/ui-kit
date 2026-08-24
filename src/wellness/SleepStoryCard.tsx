import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives';
import { CARD_SHELL, SLOT_BG, SLOT_ON, SLOT_TEXT, SLOT_TINT, type WellnessSlot } from './_tokens';

export type SleepStoryCategory = 'nature' | 'fiction' | 'asmr' | 'music' | 'travel' | 'meditation';

interface StoryMeta {
  glyph: string;
  label: string;
  color: WellnessSlot;
}

const STORY_META: Record<SleepStoryCategory, StoryMeta> = {
  nature: { glyph: '🌲', label: 'Nature', color: 'success' },
  fiction: { glyph: '📖', label: 'Fiction', color: 'primary' },
  asmr: { glyph: '🎧', label: 'ASMR', color: 'accent' },
  music: { glyph: '🎵', label: 'Music', color: 'accent' },
  travel: { glyph: '✈️', label: 'Travel', color: 'primary' },
  meditation: { glyph: '🌙', label: 'Meditation', color: 'primary' },
};

export interface SleepStoryCardProps {
  /** Story title. */
  title: string;
  /** Category — drives the icon, tag, and accent tone. */
  category: SleepStoryCategory;
  /** Narrator name. */
  narrator?: string;
  /** Length in minutes. */
  durationMin?: number;
  /** Short teaser. */
  description?: string;
  /** Whether this story is currently playing (swaps the play glyph to pause). */
  playing?: boolean;
  /** Gate behind a paywall. */
  locked?: boolean;
  /** Render a placeholder skeleton. */
  loading?: boolean;
  /** Fires on the play / pause control. */
  onPlay?: () => void;
  className?: string;
}

/**
 * A sleep-story tile (web parity of the native block): a soft category-tinted
 * cover, title + narrator + length, and a round play / pause control rendered as
 * a real `<button>`. `playing` flips the control glyph and its a11y label
 * (`aria-pressed`, state not color alone); `locked` disables it with a lock;
 * `loading` renders a skeleton. Token-only colors.
 */
export const SleepStoryCard = React.forwardRef<HTMLDivElement, SleepStoryCardProps>(function SleepStoryCard(
  { title, category, narrator, durationMin, description, playing = false, locked = false, loading = false, onPlay, className },
  ref
) {
  const meta = STORY_META[category] ?? STORY_META.nature;
  const shell = cn(CARD_SHELL, 'flex items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]', className);

  if (loading) {
    return (
      <div ref={ref} data-xen-sleep-story-card="" aria-busy="true" aria-label="Loading story" className={shell}>
        <Skeleton variant="rect" width={56} height={56} />
        <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
          <Skeleton width="70%" height={16} />
          <Skeleton width="45%" height={14} />
        </div>
      </div>
    );
  }

  const control = locked ? '🔒' : playing ? '⏸' : '▶';
  const controlLabel = locked ? 'Locked' : playing ? 'Pause' : 'Play';
  const subLine =
    [narrator, durationMin != null ? `${durationMin} min` : null].filter(Boolean).join(' · ') ||
    description ||
    '';

  return (
    <div ref={ref} data-xen-sleep-story-card="" aria-label={`${meta.label} sleep story: ${title}`} className={shell}>
      <div
        aria-hidden="true"
        className={cn('flex h-14 w-14 items-center justify-center rounded-[var(--xen-radius-md)] text-xl', SLOT_TINT[meta.color])}
      >
        {meta.glyph}
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className={cn('text-xs font-bold uppercase tracking-wide', SLOT_TEXT[meta.color])}>{meta.label}</span>
        <span className="truncate text-base font-bold text-on-surface">{title}</span>
        <span className="truncate text-xs text-muted">{subLine}</span>
      </div>

      <button
        type="button"
        aria-pressed={playing}
        aria-label={controlLabel}
        disabled={locked || !onPlay}
        onClick={locked ? undefined : onPlay}
        className={cn(
          'flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-base transition-opacity',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'disabled:opacity-50 disabled:pointer-events-none',
          playing ? cn(SLOT_BG[meta.color], SLOT_ON[meta.color]) : cn(SLOT_TINT[meta.color], SLOT_TEXT[meta.color])
        )}
      >
        {control}
      </button>
    </div>
  );
});
