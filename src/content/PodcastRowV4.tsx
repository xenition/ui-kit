import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_CLASS } from '../primitives/internal/chrome-v4';
import {
  stateGroundVars,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
} from '../primitives/internal/v4-state';
import type { PodcastRowProps } from './PodcastRow';
import { MEDIA_GROUND_CLASS, metaLine, spokenLine, TONE_INK } from './internal/reading-v4';

export interface PodcastRowV4Props extends PodcastRowProps {
  /** The play control's verb when the episode is stopped. Default `'Play'`. */
  playLabel?: string;
  /** Its verb when the episode is running. Default `'Pause'`. */
  pauseLabel?: string;
}

/** Artwork: 44 compact, 64 standard, both composed from the spacing scale. */
const ART_SIZE = {
  compact: 'h-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))] w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
  standard: 'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]',
} as const;

/**
 * **V4 podcast row** — the web twin of the native `PodcastRowV4`, same props as
 * {@link PodcastRow} plus `playLabel` and `pauseLabel`.
 *
 * ## Five changes
 *
 * 1. **The keyboard can play a podcast.** The base put the row's `onKeyDown`
 *    on the container that *wraps* the play button. Focus the play button,
 *    press Space: the container's handler ran first, called `preventDefault()`
 *    — which cancels the button's own Space activation, because browsers fire
 *    that on keyup — and navigated. Enter fired both: audio started and the
 *    page changed under it. There was no keyboard-only way to play an episode
 *    from a podcast row, and a mouse user never saw it. The row's activation
 *    now sits on a `<button>` that wraps only the artwork and the text, and
 *    the play control is its **sibling** — which removes the key bubbling, the
 *    invalid nested interactive content and native's unreachable play control
 *    in one change.
 * 2. **No dead play button.** `onPlayToggle` is optional; without it the base
 *    still drew a permanently greyed control. It is now not drawn at all.
 * 3. **The play control clears 44.** It was 40 square on both twins.
 * 4. **Press is the state layer.** The component carried three different
 *    opacity dims — 0.9 on the row, 0.8 on play, 0.5 on disabled — two of
 *    which sit at or below M3's disabled band.
 * 5. **The artwork placeholder is the shared media ground**, not
 *    `bg-neutral-100` on web against `colors.border` on native.
 */
export const PodcastRowV4 = React.forwardRef<HTMLDivElement, PodcastRowV4Props>(
  function PodcastRowV4(
    {
      episode,
      playing = false,
      onPlayToggle,
      onClick,
      variant = 'standard',
      playLabel = 'Play',
      pauseLabel = 'Pause',
      className,
      ...rest
    },
    ref
  ) {
    injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);

    if (!episode?.title) return null;

    const compact = variant === 'compact';
    const artSize = ART_SIZE[compact ? 'compact' : 'standard'];
    const meta = metaLine([episode.show, episode.duration]);

    const artwork = episode.artworkUrl ? (
      <img
        src={episode.artworkUrl}
        alt=""
        loading="lazy"
        className={cn(
          'shrink-0 rounded-[var(--xen-radius-md)] object-cover',
          MEDIA_GROUND_CLASS,
          artSize
        )}
      />
    ) : (
      <span
        aria-hidden
        className={cn(
          'flex shrink-0 items-center justify-center rounded-[var(--xen-radius-md)]',
          MEDIA_GROUND_CLASS,
          artSize
        )}
      >
        <span className="text-lg leading-none text-on-card">🎧</span>
      </span>
    );

    const text = (
      <span className="flex min-w-0 flex-1 flex-col gap-xs text-left">
        <span
          className={cn('font-bold text-on-surface', compact ? 'line-clamp-1' : 'line-clamp-2')}
        >
          {episode.title}
        </span>
        {!compact && meta ? (
          <span className={cn('line-clamp-1 text-xs', TONE_INK.muted)}>{meta}</span>
        ) : null}
      </span>
    );

    /*
      Spans, not `<div>`/`<p>`. This subtree is the child of a `<button>` on the
      interactive path, and a button may only contain phrasing content.
    */
    const region = onClick ? (
      <button
        type="button"
        aria-label={spokenLine([episode.title, episode.show, episode.duration])}
        onClick={() => onClick(episode)}
        data-xen-v4-state=""
        style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)') as React.CSSProperties}
        className={cn(
          'flex min-w-0 flex-1 items-center gap-md rounded-[var(--xen-radius-md)] p-xs text-left',
          MIN_TAP_CLASS,
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
      >
        {artwork}
        {text}
      </button>
    ) : (
      <div className="flex min-w-0 flex-1 items-center gap-md p-xs">
        {artwork}
        {text}
      </div>
    );

    return (
      <div
        ref={ref}
        className={cn(
          'flex items-center gap-md rounded-[var(--xen-radius-lg)] border border-border bg-surface p-sm',
          className
        )}
        {...rest}
      >
        {region}

        {/* A sibling of the row's activation, never a descendant of it. */}
        {onPlayToggle ? (
          <button
            type="button"
            aria-label={spokenLine([playing ? pauseLabel : playLabel, episode.title])}
            aria-pressed={playing}
            onClick={() => onPlayToggle(!playing)}
            data-xen-v4-state=""
            style={
              stateGroundVars('var(--xen-primary)', 'var(--xen-on-primary)') as React.CSSProperties
            }
            className={cn(
              'inline-flex shrink-0 items-center justify-center rounded-[var(--xen-radius-full)] bg-primary',
              // The HIG floor, composed from the spacing scale — not a typed 44.
              MIN_TAP_CLASS,
              'w-[calc(var(--xen-space-2xl)_-_var(--xen-space-xs))]',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            <IconV4 glyph={playing ? '❙❙' : '▶'} size="sm" color="onPrimary" />
          </button>
        ) : null}
      </div>
    );
  }
);
