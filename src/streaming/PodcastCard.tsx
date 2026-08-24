import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Card, Icon } from '../primitives';
import type { StreamPodcast } from './types';

export type PodcastCardVariant = 'grid' | 'list' | 'featured';

export interface PodcastCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** The show to render. */
  podcast: StreamPodcast;
  /** Whether the user is subscribed (controlled) — toggles the action label. */
  subscribed?: boolean;
  /**
   * - `grid`     — square artwork above stacked meta (default).
   * - `list`     — artwork left, meta right, single row.
   * - `featured` — large artwork + description + prominent subscribe button.
   */
  variant?: PodcastCardVariant;
  /** Card click — open the show (maps native `onPress`). */
  onClick?: (podcast: StreamPodcast) => void;
  /** Called with the next subscribed state; shows a subscribe control when set. */
  onSubscribeToggle?: (next: boolean) => void;
}

const ART_SIZE: Record<PodcastCardVariant, number> = { grid: 140, list: 64, featured: 120 };

/**
 * A podcast show card (web) — artwork, title, publisher, episode count, and (in
 * `featured`) a description plus a subscribe button. `onClick(podcast)` opens the
 * show (rendered as a `role="button"` `Card` with Enter/Space support);
 * `onSubscribeToggle(next)` flips the subscription via a `Button` (stops
 * propagation), with the label + a11y reflecting `subscribed`. Composes
 * `Card` / `Button`. Token-only — no literal hex.
 */
export const PodcastCard = React.forwardRef<HTMLDivElement, PodcastCardProps>(function PodcastCard(
  { podcast, subscribed = false, variant = 'grid', onClick, onSubscribeToggle, className, ...rest },
  ref
) {
  const list = variant === 'list';
  const featured = variant === 'featured';
  const art = ART_SIZE[variant];
  const interactive = !!onClick;

  const meta = [
    podcast.publisher,
    podcast.episodeCount != null ? `${podcast.episodeCount} episodes` : undefined,
  ]
    .filter(Boolean)
    .join(' · ');

  const artwork = podcast.artworkUrl ? (
    <img
      src={podcast.artworkUrl}
      alt=""
      aria-hidden="true"
      className={cn('rounded-[var(--xen-radius-md)] bg-border object-cover', list ? '' : 'aspect-square w-full')}
      style={list ? { width: art, height: art } : undefined}
    />
  ) : (
    <span
      aria-hidden="true"
      className={cn(
        'flex items-center justify-center rounded-[var(--xen-radius-md)] bg-accent',
        list ? '' : 'aspect-square w-full'
      )}
      style={list ? { width: art, height: art } : undefined}
    >
      <Icon glyph="🎙" size="2xl" color="onPrimary" />
    </span>
  );

  const subscribeBtn = onSubscribeToggle ? (
    <Button
      variant={subscribed ? 'secondary' : 'primary'}
      size="sm"
      onClick={(e) => {
        e.stopPropagation();
        onSubscribeToggle(!subscribed);
      }}
      aria-label={subscribed ? `Unsubscribe from ${podcast.title}` : `Subscribe to ${podcast.title}`}
    >
      {subscribed ? 'Subscribed' : 'Subscribe'}
    </Button>
  ) : null;

  const textBlock = (
    <div className={cn('flex flex-col gap-0.5', list && 'min-w-0 flex-1')}>
      <span className="text-base font-bold text-on-surface">{podcast.title}</span>
      {meta ? <span className="truncate text-xs text-muted">{meta}</span> : null}
      {featured && podcast.description ? (
        <span className="mt-[var(--xen-space-xs)] text-sm text-muted">{podcast.description}</span>
      ) : null}
      {featured && subscribeBtn ? (
        <div className="mt-[var(--xen-space-sm)] self-start">{subscribeBtn}</div>
      ) : null}
    </div>
  );

  const inner = list ? (
    <div className="flex items-center gap-[var(--xen-space-md)]">
      {artwork}
      {textBlock}
      {!featured && subscribeBtn ? <div>{subscribeBtn}</div> : null}
    </div>
  ) : featured ? (
    <div className="flex gap-[var(--xen-space-md)]">
      <div style={{ width: art }}>{artwork}</div>
      {textBlock}
    </div>
  ) : (
    <div className="flex flex-col gap-[var(--xen-space-sm)]">
      {artwork}
      {textBlock}
      {subscribeBtn ? <div className="self-start">{subscribeBtn}</div> : null}
    </div>
  );

  return (
    <Card
      ref={ref}
      data-xen-podcast-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? podcast.title : undefined}
      onClick={interactive ? () => onClick!(podcast) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                onClick!(podcast);
              }
            }
          : undefined
      }
      className={cn(
        'flex flex-col gap-[var(--xen-space-sm)]',
        interactive &&
          'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      {...rest}
    >
      {inner}
    </Card>
  );
});
