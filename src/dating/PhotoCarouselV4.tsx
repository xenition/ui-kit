import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import { IconV4 } from '../primitives/IconV4';
import { MIN_TAP_SQUARE_CLASS } from '../primitives/internal/nav-v4';
import {
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import { PHOTO_INK, PHOTO_SCRIM, PLACEHOLDER_CLASS } from './internal/profile-v4';
import type { PhotoCarouselProps, PhotoCarouselRatio } from './PhotoCarousel';

export interface PhotoCarouselV4Props extends PhotoCarouselProps {
  /** Name for the previous control. Default `'Previous photo'`. */
  previousLabel?: string;
  /** Name for the next control. Default `'Next photo'`. */
  nextLabel?: string;
  /** Build the position line. Default `'Photo 2 of 5'`. */
  formatPosition?: (index: number, total: number) => string;
  /**
   * Draw the step controls. Default `true`.
   *
   * `false` is for a pager a caller drives itself through `index` — a deck
   * card, a thumbnail strip — where a chevron on the photo would be a control
   * that competes with the gesture.
   */
  showControls?: boolean;
}

const RATIO: Record<PhotoCarouselRatio, string> = {
  portrait: 'aspect-[4/5]',
  square: 'aspect-square',
  landscape: 'aspect-[3/2]',
};

/**
 * **V4 photo carousel** — the web twin of the native `PhotoCarouselV4`, same
 * props as {@link PhotoCarousel} plus `previousLabel`, `nextLabel`,
 * `formatPosition` and `showControls`.
 *
 * ## Four changes
 *
 * 1. **The frame looks steppable.** Both twins rendered two `<button>`s with
 *    **no children** — invisible halves of the photo, with no focus ring on
 *    web. Nothing told a sighted user that tapping the picture did anything,
 *    and a keyboard user tabbed onto a control with no visible location. The
 *    halves are kept, because a thumb-sized tap zone is the right target on a
 *    phone, and each one now carries a visible chevron.
 * 2. **The position is exposed, and re-announced when it moves.** The base
 *    built `Photo 2 of 5` and hung it on a role-less `<div>`, where a reader
 *    ignored it. It names the pager group *and* rides a polite live region, so
 *    stepping a photo says so.
 * 3. **The chevrons and the rail are pinned to the photo, not to the theme.**
 *    The indicator rail was `bg-surface` over `bg-neutral-500` — a themed slot
 *    and a ramp step, both of which invert under `[data-theme="dark"]` while
 *    the photograph underneath does not. They are `PHOTO_INK` on `PHOTO_SCRIM`.
 * 4. **Empty and loading are real.** The empty frame was an emoji over a line
 *    of `muted` (a decorative slot, used as text); loading was an undecorated
 *    `bg-neutral-200` block announced to nobody.
 */
export const PhotoCarouselV4 = React.forwardRef<HTMLDivElement, PhotoCarouselV4Props>(
  function PhotoCarouselV4(
    {
      photos,
      index,
      onIndexChange,
      ratio = 'portrait',
      rounded = true,
      loading = false,
      emptyLabel = 'No photos yet',
      previousLabel = 'Previous photo',
      nextLabel = 'Next photo',
      formatPosition,
      showControls = true,
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const list = photos ?? [];
    const controlled = index != null;
    const [internal, setInternal] = React.useState(0);
    const active = Math.max(0, Math.min(list.length - 1, controlled ? index : internal));

    const go = (next: number): void => {
      const clamped = Math.max(0, Math.min(list.length - 1, next));
      if (!controlled) setInternal(clamped);
      if (clamped !== active) onIndexChange?.(clamped);
    };

    const frame = cn(
      'relative w-full overflow-hidden',
      RATIO[ratio],
      rounded ? 'rounded-[var(--xen-radius-lg)]' : 'rounded-none',
      className
    );

    /**
     * The ground behind an unloaded photo. It is a child rather than a class on
     * the frame because {@link PLACEHOLDER_CLASS} carries its own radius, and
     * two arbitrary `rounded-[…]` values on one element resolve by stylesheet
     * order — which nothing here controls.
     */
    const ground = <span aria-hidden="true" className={cn('absolute inset-0', PLACEHOLDER_CLASS)} />;

    if (loading) {
      return (
        <div
          ref={ref}
          role="status"
          aria-busy="true"
          aria-label={emptyLabel}
          className={frame}
          {...rest}
        >
          {ground}
        </div>
      );
    }

    if (list.length === 0) {
      return (
        <div
          ref={ref}
          className={cn(frame, 'flex items-center justify-center bg-surface')}
          {...rest}
        >
          <EmptyStateV4 icon={<span className="text-2xl">📷</span>} title={emptyLabel} />
        </div>
      );
    }

    const current = list[active] ?? list[0]!;
    const position = (formatPosition ?? ((i: number, n: number) => `Photo ${i + 1} of ${n}`))(
      active,
      list.length
    );

    const control = (
      label: string,
      name: 'chevron-left' | 'chevron-right',
      target: number,
      disabled: boolean,
      align: string
    ): React.ReactElement => (
      <button
        type="button"
        aria-label={label}
        disabled={disabled}
        onClick={() => go(target)}
        data-xen-v4-state=""
        // The hover veil is white over the photograph — the scrim's own ink —
        // rather than the theme's, which would be dark on a dark page.
        style={stateGroundVars('transparent', PHOTO_INK)}
        className={cn(
          'flex flex-1 cursor-pointer items-center px-sm',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-ring',
          V4_DISABLED_CLASS,
          align
        )}
      >
        <span
          aria-hidden="true"
          style={{ backgroundColor: PHOTO_SCRIM, color: PHOTO_INK }}
          className={cn('inline-flex items-center justify-center rounded-full', MIN_TAP_SQUARE_CLASS)}
        >
          <IconV4 name={name} size="xl" />
        </span>
      </button>
    );

    return (
      <div ref={ref} role="group" aria-label={position} className={frame} {...rest}>
        {ground}
        <img
          src={current.uri}
          alt={current.alt ?? ''}
          className="relative h-full w-full object-cover"
        />

        {showControls ? (
          <div className="absolute inset-0 flex">
            {control(previousLabel, 'chevron-left', active - 1, active === 0, 'justify-start')}
            {control(
              nextLabel,
              'chevron-right',
              active + 1,
              active >= list.length - 1,
              'justify-end'
            )}
          </div>
        ) : null}

        {/* Segmented rail. Decorative — the group's name carries the position. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-sm top-sm flex gap-xs">
          {list.map((photo, i) => (
            <span
              key={`${photo.uri}-${i}`}
              style={{ backgroundColor: PHOTO_INK, opacity: i <= active ? 1 : 0.4 }}
              className="h-xs flex-1 rounded-full"
            />
          ))}
        </div>

        {/* The move itself, announced. A changing `aria-label` on the group is
            not an event a reader reports; a live region is. */}
        <span role="status" aria-live="polite" className="sr-only">
          {position}
        </span>
      </div>
    );
  }
);
