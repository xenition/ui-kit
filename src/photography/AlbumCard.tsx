import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';

/** Layout variants for an album card. */
export type AlbumCardVariant = 'cover' | 'list' | 'compact';

export interface AlbumCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'title'> {
  /** Album title. */
  title: string;
  /** Number of photos in the album. */
  photoCount?: number;
  /** Short date / event line (e.g. "Aug 24, 2026"). */
  dateText?: string;
  /** Cover photo URL. When absent a token-tinted placeholder is drawn. */
  coverUrl?: string;
  /** Marks the album as private / unlisted (labelled, not color-alone). */
  isPrivate?: boolean;
  /** Layout variant (default `cover`). */
  variant?: AlbumCardVariant;
  /** Loading placeholder — token-only skeleton, no content. */
  loading?: boolean;
  /** Word for "photos" in the count line (default `photos`). */
  countLabel?: string;
}

/**
 * A photo-album tile — cover image, title, photo count, and an optional date.
 * `variant` switches a full-bleed `cover` card, a horizontal `list` row, and a
 * dense `compact` tile. A private album shows a labelled `Badge` (never color
 * alone). Reuses the `Badge` primitive; passing `onClick` makes the whole card a
 * keyboard-operable `button`. Token-only — placeholder and surfaces are `--xen-*`.
 */
export const AlbumCard = React.forwardRef<HTMLDivElement, AlbumCardProps>(function AlbumCard(
  {
    title,
    photoCount,
    dateText,
    coverUrl,
    isPrivate = false,
    variant = 'cover',
    loading = false,
    countLabel = 'photos',
    onClick,
    className,
    ...rest
  },
  ref
) {
  const horizontal = variant === 'list';
  const interactive = typeof onClick === 'function';

  const container = cn(
    'overflow-hidden rounded-[var(--xen-radius-lg)] border border-border bg-surface',
    horizontal
      ? 'flex flex-row items-center gap-[var(--xen-space-md)] p-[var(--xen-space-md)]'
      : 'flex flex-col',
    interactive &&
      'cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
    className
  );

  if (loading) {
    return (
      <div
        ref={ref}
        data-xen-album-card=""
        aria-label="Loading album"
        aria-busy="true"
        className={container}
      >
        <div
          className={cn(
            'animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200',
            horizontal ? 'h-[88px] w-[88px] shrink-0' : 'h-40 w-full'
          )}
        />
        <div className={cn('flex flex-1 flex-col gap-[var(--xen-space-sm)]', !horizontal && 'p-[var(--xen-space-md)]')}>
          <div className="h-3.5 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      </div>
    );
  }

  const coverBox = cn(
    'overflow-hidden bg-neutral-100',
    horizontal
      ? 'h-[88px] w-[88px] shrink-0 rounded-[var(--xen-radius-md)]'
      : variant === 'compact'
        ? 'h-24 w-full'
        : 'h-40 w-full'
  );

  const media = (
    <div className={coverBox}>
      {coverUrl ? (
        <img src={coverUrl} alt={title} loading="lazy" className="h-full w-full object-cover" />
      ) : null}
    </div>
  );

  const metaBits: string[] = [];
  if (typeof photoCount === 'number') metaBits.push(`${photoCount} ${countLabel}`);
  if (dateText) metaBits.push(dateText);

  const body = (
    <div className={cn('flex flex-1 flex-col gap-[var(--xen-space-xs)]', !horizontal && 'p-[var(--xen-space-md)]')}>
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <p className="flex-1 truncate text-base font-bold text-on-surface">{title}</p>
        {isPrivate ? <Badge tone="warn">Private</Badge> : null}
      </div>
      {metaBits.length > 0 ? (
        <p className="truncate text-sm text-muted">{metaBits.join(' · ')}</p>
      ) : null}
    </div>
  );

  const label = `${title}${
    typeof photoCount === 'number' ? `, ${photoCount} ${countLabel}` : ''
  }${isPrivate ? ', private' : ''}`;

  return (
    <div
      ref={ref}
      data-xen-album-card=""
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? label : undefined}
      onClick={onClick}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                e.currentTarget.click();
              }
            }
          : undefined
      }
      className={container}
      {...rest}
    >
      {media}
      {body}
    </div>
  );
});
