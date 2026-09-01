import * as React from 'react';
import { injectStyleOnce } from '../motion/internal/inject';
import { cn } from '../primitives/cn';
import { AvatarV4 } from '../primitives/AvatarV4';
import { BadgeV4 } from '../primitives/BadgeV4';
import { EmptyStateV4 } from '../primitives/EmptyStateV4';
import {
  V4_DISABLED_CLASS,
  V4_STATE_CSS,
  V4_STATE_STYLE_ID,
  stateGroundVars,
} from '../primitives/internal/v4-state';
import { PHOTO_INK, PHOTO_SCRIM_STRONG, PLACEHOLDER_CLASS, spokenLine } from './internal/profile-v4';
import type { WhoLikedYouRowProps } from './WhoLikedYouRow';

export interface WhoLikedYouRowV4Props extends WhoLikedYouRowProps {
  /** Render the total. Default `'12'`. */
  formatCount?: (count: number) => string;
  /** Name for a tile whose face is behind the gate. Default `'Locked'`. */
  lockedLabel?: string;
}

/** 72 — the tile, `2xl + lg`. Wide enough for a 56 avatar and a first name. */
const TILE_CLASS = 'w-[calc(var(--xen-space-2xl)_+_var(--xen-space-lg))]';
/** 64 — a skeleton face, `2xl + md`. */
const SKELETON_FACE_CLASS =
  'h-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))] w-[calc(var(--xen-space-2xl)_+_var(--xen-space-md))]';

/**
 * **V4 who-liked-you row** — the web twin of the native `WhoLikedYouRowV4`,
 * same props as {@link WhoLikedYouRow} plus `formatCount` and `lockedLabel`.
 *
 * ## Five changes
 *
 * 1. **The count is not an error.** `bg-danger text-on-danger` — the most
 *    positive number in the product, painted in the slot that means something
 *    has gone wrong, at the top of the screen the whole premium tier exists to
 *    sell. It is `primary`.
 * 2. **The lock scrim stops inverting.** `bg-neutral-900` over a face, with
 *    `text-neutral-50` on it: the web ramp *mirrors* under `[data-theme="dark"]`,
 *    so in a dark theme the scrim resolved to the near-white step and the
 *    padlock on it vanished — the gate looked broken exactly when it mattered.
 *    `PHOTO_SCRIM_STRONG` and `PHOTO_INK` are fixed in both schemes.
 * 3. **A gate with no way through it is disabled.** `locked` without `onUnlock`
 *    left every tile a focusable `<button>` that did nothing: a keyboard user
 *    tabbed through twelve controls, activated them, and got no response and no
 *    explanation. Those tiles are `disabled`, and the rail itself becomes the
 *    tab stop so the strip is still reachable and scrollable.
 * 4. **The heading is a heading and the strip is a list**, so a reader hears
 *    "3 of 12" rather than twelve unanchored buttons.
 * 5. **Empty and loading are real.** Empty was a lone line of `muted` inside a
 *    dashed box; the skeleton was `bg-neutral-200`, a ramp step that is a
 *    near-white slab on a dark page.
 */
export const WhoLikedYouRowV4 = React.forwardRef<HTMLDivElement, WhoLikedYouRowV4Props>(
  function WhoLikedYouRowV4(
    {
      likers,
      total,
      locked = true,
      title = 'Liked you',
      onClickLiker,
      onUnlock,
      loading = false,
      emptyLabel = 'No likes yet — keep swiping!',
      formatCount,
      lockedLabel = 'Locked',
      className,
      ...rest
    },
    ref
  ) {
    React.useEffect(() => {
      injectStyleOnce(V4_STATE_STYLE_ID, V4_STATE_CSS);
    }, []);

    const list = likers ?? [];
    const count = total ?? list.length;
    const countText = (formatCount ?? ((n: number) => String(n)))(count);

    // Locked with nowhere to go: the tiles cannot respond, so they must not
    // claim they can — and something has to stay reachable, so the rail does.
    const gated = locked && onUnlock == null;

    const header = (
      <div className="mb-sm flex items-center gap-xs">
        <h3 className="font-heading text-base font-bold text-on-surface">{title}</h3>
        {count > 0 ? <BadgeV4 tone="primary" variant="solid" count={count} /> : null}
      </div>
    );

    if (loading) {
      return (
        <div ref={ref} className={className} {...rest}>
          {header}
          <div role="status" aria-busy="true" aria-label={title} className="flex gap-sm">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={cn('block overflow-hidden rounded-full', SKELETON_FACE_CLASS)}
              >
                <span className={cn('block h-full w-full', PLACEHOLDER_CLASS)} />
              </span>
            ))}
          </div>
        </div>
      );
    }

    if (count === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          {header}
          <EmptyStateV4 title={emptyLabel} />
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        {header}
        <ul
          // A scroll container whose every child is disabled is unreachable
          // without this; when the tiles are live they are the stops.
          tabIndex={gated ? 0 : undefined}
          aria-label={gated ? spokenLine([title, countText]) : undefined}
          className={cn(
            'flex list-none gap-sm overflow-x-auto pb-xs',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
          )}
        >
          {list.map((liker, i) => {
            const label = locked
              ? lockedLabel
              : spokenLine([liker.name ?? 'Someone', liker.superLiked ? 'super liked you' : null]);
            return (
              <li key={liker.id} className={cn('shrink-0', TILE_CLASS)}>
                <button
                  type="button"
                  aria-label={label}
                  disabled={gated}
                  onClick={() => (locked ? onUnlock?.() : onClickLiker?.(liker.id))}
                  data-xen-v4-state=""
                  style={stateGroundVars('var(--xen-surface)', 'var(--xen-on-surface)')}
                  className={cn(
                    'flex w-full flex-col items-center gap-xs rounded-[var(--xen-radius-md)] py-xs',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                    V4_DISABLED_CLASS
                  )}
                >
                  <span className="relative inline-flex">
                    <AvatarV4
                      src={locked ? undefined : liker.photoUri}
                      name={locked ? undefined : liker.name}
                      alt=""
                      size="lg"
                      ring={liker.superLiked}
                    />
                    {locked ? (
                      <span
                        aria-hidden="true"
                        style={{ backgroundColor: PHOTO_SCRIM_STRONG, color: PHOTO_INK }}
                        className="absolute inset-0 flex items-center justify-center rounded-full text-lg"
                      >
                        🔒
                      </span>
                    ) : null}
                  </span>
                  {!locked ? (
                    <span className="w-full truncate px-xs text-xs text-muted-text">
                      {liker.name ?? 'Someone'}
                    </span>
                  ) : null}
                </button>
              </li>
            );
          })}
        </ul>
        {locked && onUnlock ? (
          <button
            type="button"
            onClick={() => onUnlock()}
            data-xen-v4-state=""
            style={stateGroundVars(
              'color-mix(in srgb, var(--xen-primary) 12%, var(--xen-surface))',
              'var(--xen-primary)'
            )}
            className={cn(
              'mt-sm w-full rounded-full py-sm text-sm font-bold',
              'bg-[color-mix(in_srgb,var(--xen-primary)_12%,var(--xen-surface))] text-primary-text',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring'
            )}
          >
            See all {countText} likes
          </button>
        ) : null}
      </div>
    );
  }
);
