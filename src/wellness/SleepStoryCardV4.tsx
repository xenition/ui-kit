import * as React from 'react';
import { cn } from '../primitives/cn';
import { Skeleton } from '../primitives';
import { Icon } from '../primitives/Icon';
import type { SleepStoryCardProps, SleepStoryCategory } from './SleepStoryCard';

export type SleepStoryCardV4Props = SleepStoryCardProps;

interface StoryMeta {
  glyph: string;
  label: string;
}

const STORY_META: Record<SleepStoryCategory, StoryMeta> = {
  nature: { glyph: '🌲', label: 'Nature' },
  fiction: { glyph: '📖', label: 'Fiction' },
  asmr: { glyph: '🎧', label: 'ASMR' },
  music: { glyph: '🎵', label: 'Music' },
  travel: { glyph: '✈️', label: 'Travel' },
  meditation: { glyph: '🌙', label: 'Meditation' },
};

/**
 * SleepStoryCardV4 — the "calm" restyle of {@link SleepStoryCard}. Same props,
 * defaults, labels, a11y and behavior; only the surface changes: a clean neutral
 * row card with a gradient cover tile (category glyph in near-white ink) and a
 * round gradient play/pause button. `playing` swaps the glyph and its a11y label
 * (`aria-pressed`, state not color alone); `locked` and `loading` are preserved.
 * Token-only colors.
 */
export const SleepStoryCardV4 = React.forwardRef<
  HTMLDivElement,
  SleepStoryCardV4Props & React.HTMLAttributes<HTMLDivElement>
>(function SleepStoryCardV4(
  {
    title,
    category,
    narrator,
    durationMin,
    description,
    playing = false,
    locked = false,
    loading = false,
    onPlay,
    className,
    ...rest
  },
  ref
) {
  const meta = STORY_META[category] ?? STORY_META.nature;
  const shell = cn(
    'flex items-center gap-[var(--xen-space-md)] rounded-[var(--xen-radius-lg)] bg-surface border border-border shadow-sm p-[var(--xen-space-md)] text-on-surface',
    className
  );

  if (loading) {
    return (
      <div ref={ref} data-xen-sleep-story-card="" aria-busy="true" aria-label="Loading story" className={shell} {...rest}>
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
    <div ref={ref} data-xen-sleep-story-card="" aria-label={`${meta.label} sleep story: ${title}`} className={shell} {...rest}>
      <div
        aria-hidden="true"
        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-gradient-to-br from-primary-400 to-primary-700"
      >
        <Icon glyph={meta.glyph} size="2xl" color="onPrimary" />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="text-xs font-bold uppercase tracking-wide text-muted">{meta.label}</span>
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
          'flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-primary-400 to-primary-700 transition-opacity',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
          'disabled:opacity-50 disabled:pointer-events-none'
        )}
      >
        <Icon glyph={control} size="base" color="onPrimary" />
      </button>
    </div>
  );
});
