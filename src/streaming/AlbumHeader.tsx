import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives';
import { MediaFigure } from '../media';
import type { MediaItem } from '../media';

/**
 * Props for {@link AlbumHeader} — the gradient album / playlist hero (web).
 * Presentational shell only: shaped display data + CTA callbacks; nothing
 * fetches a catalog or a playback engine.
 */
export interface AlbumHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Album / playlist title, set large in near-white ink over the gradient. */
  title: string;
  /** Secondary line — artist, curator, or owner. */
  subtitle?: string;
  /** Cover artwork URL; falls back to a glyph placeholder when absent. */
  artworkUrl?: string;
  /** Metadata facts (e.g. `["2024", "12 songs", "48 min"]`) rendered as frosted chips. */
  meta?: readonly string[];
  /** Fires when the primary Play CTA is pressed; the pill is hidden when unset. */
  onPlay?: () => void;
  /** Fires when the Shuffle CTA is pressed; the ghost button is hidden when unset. */
  onShuffle?: () => void;
}

/**
 * AlbumHeader — the **V4 "spotlight"** gradient hero for an album / playlist
 * (web). The cover sits on a two-hue brand glow (`from-accent-400 to-primary-600`)
 * beside a big near-white title, an optional subtitle, `meta` facts as frosted
 * chips, and Play (a near-white pill) + Shuffle (a ghost button) CTAs. All colors
 * derive from the brand ramp via `--xen-*` classes + gradient utilities — no
 * literal hex; dark-mode safe.
 */
export const AlbumHeader = React.forwardRef<HTMLDivElement, AlbumHeaderProps>(function AlbumHeader(
  { title, subtitle, artworkUrl, meta, onPlay, onShuffle, className, ...rest },
  ref
) {
  const artItem: MediaItem = {
    url: artworkUrl ?? '',
    alt: subtitle ? `${title} — ${subtitle}` : title,
    width: 1,
    height: 1,
  };

  return (
    <div
      ref={ref}
      className={cn(
        'flex flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-xl)] gap-[var(--xen-space-lg)]',
        className
      )}
      {...rest}
    >
      {/* Cover on the gradient. */}
      <div className="mx-auto w-[52%] overflow-hidden rounded-[var(--xen-radius-lg)] bg-primary-50/15 border border-primary-50/30 p-[var(--xen-space-xs)] shadow-lg">
        {artworkUrl ? (
          <div className="overflow-hidden rounded-[var(--xen-radius-md)]">
            <MediaFigure item={artItem} reserveAspect />
          </div>
        ) : (
          <div className="flex aspect-square items-center justify-center">
            <Icon glyph="♪" size="3xl" color="onPrimary" />
          </div>
        )}
      </div>

      {/* Title + subtitle. */}
      <div className="flex flex-col gap-[var(--xen-space-xs)] text-center">
        <span className="text-2xl font-extrabold tracking-tight text-primary-50">{title}</span>
        {subtitle ? <span className="text-base font-semibold text-primary-100">{subtitle}</span> : null}
      </div>

      {/* Meta facts as frosted chips. */}
      {meta && meta.length > 0 ? (
        <div className="flex flex-wrap items-center justify-center gap-[var(--xen-space-sm)]">
          {meta.map((fact, i) => (
            <span
              key={i}
              className="rounded-full bg-primary-50/15 border border-primary-50/30 px-[var(--xen-space-md)] py-[var(--xen-space-xs)] text-sm font-semibold text-primary-100"
            >
              {fact}
            </span>
          ))}
        </div>
      ) : null}

      {/* Play + Shuffle CTAs. */}
      {onPlay || onShuffle ? (
        <div className="flex items-center justify-center gap-[var(--xen-space-sm)]">
          {onPlay ? (
            <button
              type="button"
              aria-label="Play"
              onClick={onPlay}
              className="flex min-h-11 items-center gap-[var(--xen-space-xs)] rounded-full bg-on-primary px-[var(--xen-space-xl)] py-[var(--xen-space-sm)] text-base font-extrabold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
            >
              <Icon glyph="▶" size="base" color="primary" />
              Play
            </button>
          ) : null}
          {onShuffle ? (
            <button
              type="button"
              aria-label="Shuffle"
              onClick={onShuffle}
              className="flex min-h-11 items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-lg)] py-[var(--xen-space-sm)] text-base font-bold text-primary-50 transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
            >
              <Icon glyph="🔀" size="base" color="onPrimary" />
              Shuffle
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
});
