import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { PodcastCardProps } from './PodcastCard';

/** Same public contract as {@link PodcastCard} — a drop-in alternate design. */
export type PodcastCardV3Props = PodcastCardProps;

/**
 * PodcastCard, redesigned (v3): a **compact show row**. Small artwork left, the
 * title over a publisher·episode-count line, and a quiet Subscribe button on the
 * right — hairline-bordered for a shows list. The opposite of v2's featured card.
 * Same props, token-only.
 */
export const PodcastCardV3 = React.forwardRef<HTMLDivElement, PodcastCardV3Props>(function PodcastCardV3(
  { podcast, subscribed = false, variant, onClick, onSubscribeToggle, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const meta = [podcast.publisher, typeof podcast.episodeCount === 'number' ? `${podcast.episodeCount} eps` : null].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-podcast-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={podcast.title}
      onClick={interactive ? () => onClick?.(podcast) : undefined}
      onKeyDown={interactive ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick?.(podcast); } } : undefined}
      className={cn('flex items-center gap-3 border-b border-border py-2.5', interactive && 'cursor-pointer transition-colors hover:bg-neutral-50', className)}
      {...rest}
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-md bg-neutral-100 text-xl">
        {podcast.artworkUrl ? <img src={podcast.artworkUrl} alt="" className="h-full w-full object-cover" /> : '🎙️'}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{podcast.title}</p>
        {meta ? <p className="truncate text-xs text-muted">{meta}</p> : null}
      </div>
      {onSubscribeToggle ? (
        <Button size="sm" variant={subscribed ? 'ghost' : 'outline'} onClick={(e) => { e.stopPropagation(); onSubscribeToggle(!subscribed); }}>
          {subscribed ? 'Subscribed' : 'Subscribe'}
        </Button>
      ) : null}
    </div>
  );
});
