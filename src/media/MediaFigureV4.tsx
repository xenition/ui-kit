import * as React from 'react';
import { cn } from '../primitives/cn';
import { IconV4 } from '../primitives/IconV4';
import { aspectStyle } from './aspect';
import type { MediaFigureProps } from './MediaFigure';

export interface MediaFigureV4Props extends MediaFigureProps {
  /**
   * Accessible name for the press target when the item carries neither `alt`
   * nor `caption`. Default `'Open media'` — which the base hard-coded.
   */
  openLabel?: string;
  /** Announced after the name for a video item. Default `'video'`. */
  videoLabel?: string;
}

/**
 * **V4 media figure** — the web twin of the native `MediaFigureV4`, same props
 * as {@link MediaFigure} plus `openLabel` and `videoLabel`.
 *
 * ## Four changes
 *
 * 1. **A video inside a press target is no longer a `<video controls>` inside
 *    a `<button>`.** That is nested interactive content: invalid HTML, and in
 *    practice clicking the play control also fired `onActivate`, so the user
 *    got a lightbox instead of playback. With `onActivate` the figure shows the
 *    **poster** and a play badge and hands the intent over; without it the
 *    figure *is* the player and keeps the full `<video controls>`.
 * 2. **The placeholder ground is `muted`, not `bg-neutral-100`** — a ramp step
 *    carries the light orientation in both schemes, so it was a pale rectangle
 *    on a dark page.
 * 3. **The caption takes `muted-text`**, the slot with a contrast promise.
 * 4. **Focus is the shared `--xen-ring`**, not `ring-primary-300`, so a
 *    keyboard user sees the same indicator here as on every other control.
 */
export const MediaFigureV4 = React.forwardRef<HTMLElement, MediaFigureV4Props>(
  function MediaFigureV4(
    {
      item,
      loading = 'lazy',
      reserveAspect = true,
      onActivate,
      openLabel = 'Open media',
      videoLabel = 'video',
      className,
      ...rest
    },
    ref
  ) {
    const aspect = reserveAspect ? aspectStyle(item.width, item.height) : undefined;
    const video = item.kind === 'video';
    const name = [item.alt ?? item.caption ?? openLabel, video ? videoLabel : null]
      .filter(Boolean)
      .join(', ');

    /*
      With a press handler the figure is a *link to* the media, so it shows a
      still. Without one the figure IS the media, so a video gets real controls.
      The two cannot be combined: a `<video controls>` inside a `<button>` is
      nested interactive content.
    */
    const still =
      video && !item.poster ? null : (
        <img
          src={video ? item.poster : item.url}
          alt={item.alt ?? item.caption ?? ''}
          loading={loading}
          width={item.width}
          height={item.height}
          className="h-full w-full object-cover"
        />
      );

    const media =
      video && !onActivate ? (
        <video
          src={item.url}
          poster={item.poster}
          controls
          preload="metadata"
          className="h-full w-full object-cover"
        />
      ) : (
        still
      );

    const box = (
      <div
        className="relative flex items-center justify-center overflow-hidden rounded-[var(--xen-radius-md)] bg-muted"
        style={aspect}
      >
        {onActivate ? (
          <button
            type="button"
            onClick={onActivate}
            data-xen-v4-chrome="on-surface"
            className="block h-full w-full"
            aria-label={name}
          >
            {media}
          </button>
        ) : (
          media
        )}
        {video && onActivate ? (
          <span
            aria-hidden
            className="pointer-events-none absolute flex h-12 w-12 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--xen-on-surface)_55%,transparent)] text-surface"
          >
            <IconV4 glyph="▶" size="lg" />
          </span>
        ) : null}
      </div>
    );

    return (
      <figure
        ref={ref}
        data-xen-media-figure=""
        className={cn('flex flex-col gap-sm', className)}
        {...rest}
      >
        {box}
        {item.caption ? (
          <figcaption className="text-sm leading-relaxed text-muted-text">{item.caption}</figcaption>
        ) : null}
      </figure>
    );
  }
);
