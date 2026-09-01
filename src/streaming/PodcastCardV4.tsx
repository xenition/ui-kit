import * as React from 'react';
import { cn } from '../primitives/cn';
import { Button, Card, Icon } from '../primitives';
import type { PodcastCardProps, PodcastCardVariant } from './PodcastCard';

/** Drop-in for {@link PodcastCardProps} — same props, the V4 "spotlight" design. */
export type PodcastCardV4Props = PodcastCardProps;

const ART_SIZE: Record<PodcastCardVariant, number> = { grid: 140, list: 64, featured: 120 };

/**
 * PodcastCard — **V4** "spotlight" design (web parity of the native V4). The
 * artwork-forward show card: the cover sits on a subtle brand-gradient **glow**
 * backdrop (`from-accent-400 to-primary-600`) — the signature immersive touch of
 * this line — with title, publisher · episode-count, and (in `featured`) a
 * description plus a `primary` subscribe button. `onClick(podcast)` opens the
 * show (rendered as a `role="button"` `Card` with Enter/Space support). Same
 * props/behavior as {@link PodcastCardProps}; all colors from `--xen-*` token
 * classes + gradient utilities (no literal hex). Composes `Card` / `Button`.
 */
export const PodcastCardV4 = React.forwardRef<HTMLDivElement, PodcastCardV4Props>(function PodcastCardV4(
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

  // Cover on a gradient glow backdrop — the V4 spotlight signature.
  const artwork = (
    <div
      className={cn(
        'overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-accent-400 to-primary-600 p-[var(--xen-space-sm)]',
        list ? '' : 'aspect-square w-full'
      )}
      style={list ? { width: art, height: art } : undefined}
    >
      {podcast.artworkUrl ? (
        <img
          src={podcast.artworkUrl}
          alt=""
          aria-hidden="true"
          className="h-full w-full rounded-[var(--xen-radius-md)] bg-border object-cover"
        />
      ) : (
        <span
          aria-hidden="true"
          className="flex h-full w-full items-center justify-center rounded-[var(--xen-radius-md)]"
        >
          <Icon glyph="🎙" size="2xl" color="onPrimary" />
        </span>
      )}
    </div>
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
      <span className="text-base font-extrabold text-on-surface">{podcast.title}</span>
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
        'flex flex-col gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] shadow-lg',
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
