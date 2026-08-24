import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar } from '../primitives';

export interface Liker {
  id: string;
  name?: string;
  photoUri?: string;
  /** Super-liked you (highlighted). */
  superLiked?: boolean;
}

export interface WhoLikedYouRowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** People who liked the user. */
  likers?: Liker[];
  /** Total count (may exceed the loaded `likers`). Defaults to `likers.length`. */
  total?: number;
  /** Obscure faces behind an "unlock" scrim (premium gate). Defaults to true. */
  locked?: boolean;
  /** Section heading. */
  title?: string;
  /** Fires when a specific liker is clicked (only when unlocked). */
  onClickLiker?: (id: string) => void;
  /** Fires when the locked row / "see all" is clicked (upsell). */
  onUnlock?: () => void;
  /** Loading skeleton. */
  loading?: boolean;
  /** Copy when nobody has liked yet. */
  emptyLabel?: string;
}

/**
 * Horizontal "who liked you" strip — the web parity of the native likes row.
 * Shows a scrollable rail of liker avatars with a total count pill; when `locked`
 * (a premium gate) the faces sit behind a token scrim and each tile becomes an
 * unlock CTA instead of exposing identities. Handles loading and empty states.
 * Token classes only; lock state is announced in the a11y label, never by color.
 */
export const WhoLikedYouRow = React.forwardRef<HTMLDivElement, WhoLikedYouRowProps>(
  function WhoLikedYouRow(
    { likers, total, locked = true, title = 'Liked you', onClickLiker, onUnlock, loading = false, emptyLabel = 'No likes yet — keep swiping!', className, ...rest },
    ref
  ) {
    const list = likers ?? [];
    const count = total ?? list.length;

    const header = (
      <div className="mb-sm flex items-center gap-xs">
        <span className="text-base font-bold text-on-surface">{title}</span>
        {count > 0 ? (
          <span className="rounded-full bg-danger px-sm py-0.5 text-xs font-bold text-on-danger">{count}</span>
        ) : null}
      </div>
    );

    if (loading) {
      return (
        <div ref={ref} className={className} {...rest}>
          {header}
          <div className="flex gap-sm">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="h-16 w-16 rounded-full bg-neutral-200" />
            ))}
          </div>
        </div>
      );
    }

    if (count === 0) {
      return (
        <div ref={ref} className={className} {...rest}>
          {header}
          <div
            aria-label={emptyLabel}
            className="flex items-center justify-center rounded-[var(--xen-radius-lg)] border border-border p-lg"
          >
            <span className="text-sm text-muted">{emptyLabel}</span>
          </div>
        </div>
      );
    }

    return (
      <div ref={ref} className={className} {...rest}>
        {header}
        <div className="flex gap-sm overflow-x-auto pb-1">
          {list.map((liker, i) => {
            const label = locked
              ? `Locked like ${i + 1}`
              : `${liker.name ?? 'Someone'}${liker.superLiked ? ', super liked you' : ''}`;
            return (
              <button
                key={liker.id}
                type="button"
                aria-label={label}
                onClick={() => (locked ? onUnlock?.() : onClickLiker?.(liker.id))}
                className="flex w-[72px] shrink-0 flex-col items-center gap-xs"
              >
                <span className="relative">
                  <Avatar
                    src={locked ? undefined : liker.photoUri}
                    name={locked ? '?' : liker.name}
                    size="lg"
                    className={liker.superLiked ? 'ring-2 ring-primary ring-offset-1' : undefined}
                  />
                  {locked ? (
                    <span className="absolute inset-0 flex items-center justify-center rounded-full bg-neutral-900 text-lg text-neutral-50" aria-hidden="true">
                      🔒
                    </span>
                  ) : null}
                </span>
                {!locked ? (
                  <span className="max-w-[68px] truncate text-xs text-muted">{liker.name ?? 'Someone'}</span>
                ) : null}
              </button>
            );
          })}
        </div>
        {locked ? (
          <button
            type="button"
            aria-label={`Unlock to see who liked you, ${count} total`}
            onClick={() => onUnlock?.()}
            className="mt-sm w-full rounded-full bg-primary-50 py-sm text-sm font-bold text-primary transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            See all {count} likes
          </button>
        ) : null}
      </div>
    );
  }
);
