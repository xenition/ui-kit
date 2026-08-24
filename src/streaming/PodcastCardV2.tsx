import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button } from '../primitives';
import type { PodcastCardProps } from './PodcastCard';

/** Same public contract as {@link PodcastCard} — a drop-in alternate design. */
export type PodcastCardV2Props = PodcastCardProps;

/**
 * PodcastCard, redesigned (v2): a **featured show card**. Large square artwork
 * atop the title, publisher, episode count, a short description, and a prominent
 * Subscribe button — elevated, hover-lift. Distinct from v1's grid tile. Same
 * props, token-only.
 */
export const PodcastCardV2 = React.forwardRef<HTMLDivElement, PodcastCardV2Props>(function PodcastCardV2(
  { podcast, subscribed = false, variant, onClick, onSubscribeToggle, className, ...rest },
  ref
) {
  void variant;
  const interactive = typeof onClick === 'function';
  const meta = [podcast.publisher, typeof podcast.episodeCount === 'number' ? `${podcast.episodeCount} episodes` : null].filter((s): s is string => !!s).join(' · ');

  return (
    <div
      ref={ref}
      data-xen-podcast-card=""
      className={cn('flex flex-col overflow-hidden rounded-lg bg-surface shadow-md transition-transform hover:-translate-y-0.5 hover:shadow-lg motion-reduce:transition-none motion-reduce:hover:translate-y-0', className)}
      {...rest}
    >
      <button
        type="button"
        aria-label={interactive ? `Open ${podcast.title}` : podcast.title}
        onClick={interactive ? () => onClick?.(podcast) : undefined}
        className="block aspect-square w-full overflow-hidden bg-neutral-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary"
        disabled={!interactive}
      >
        {podcast.artworkUrl ? <img src={podcast.artworkUrl} alt="" className="h-full w-full object-cover" /> : <span className="flex h-full w-full items-center justify-center text-4xl">🎙️</span>}
      </button>
      <div className="flex flex-col gap-2 p-md">
        <div>
          <p className="text-base font-bold text-on-surface">{podcast.title}</p>
          {meta ? <p className="text-xs text-muted">{meta}</p> : null}
        </div>
        {podcast.description ? <p className="line-clamp-2 text-sm text-muted">{podcast.description}</p> : null}
        {onSubscribeToggle ? (
          <Button size="md" variant={subscribed ? 'outline' : 'primary'} className="w-full" onClick={() => onSubscribeToggle(!subscribed)}>
            {subscribed ? 'Subscribed' : 'Subscribe'}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
