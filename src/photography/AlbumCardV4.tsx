import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge } from '../primitives';
import type { AlbumCardProps } from './AlbumCard';

/** Drop-in for {@link AlbumCardProps} — same props, the V4 "studio" design. */
export type AlbumCardV4Props = AlbumCardProps;

/**
 * AlbumCard — **V4** "studio" design (web parity of the native V4). The matted,
 * image-forward take on an album tile: an elevated card whose cover photo floats
 * inside a thin neutral **mat**, a bold title, and the photo-count as a small
 * soft-primary chip with the date trailing. Honors all three `variant` layouts —
 * `cover` (matted photo on top), `list` (horizontal matted thumbnail), and
 * `compact` (dense) — identical props/behavior to {@link AlbumCardProps}. A
 * private album carries a labelled `Badge` (never color alone). All colors from
 * `--xen-*` token classes (no literals); `loading` shows a token-only skeleton;
 * `onClick` makes the whole card a keyboard-operable button.
 */
export const AlbumCardV4 = React.forwardRef<HTMLDivElement, AlbumCardV4Props>(function AlbumCardV4(
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
  const compact = variant === 'compact';
  const interactive = typeof onClick === 'function';

  const container = cn(
    'rounded-[var(--xen-radius-lg)] border border-border bg-surface p-2 text-on-surface shadow-md',
    horizontal ? 'flex flex-row items-center gap-[var(--xen-space-md)]' : 'flex flex-col',
    interactive &&
      'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary',
    className
  );

  if (loading) {
    return (
      <div ref={ref} data-xen-album-card="" aria-label="Loading album" aria-busy="true" className={container}>
        <div
          className={cn(
            'animate-pulse rounded-[var(--xen-radius-md)] bg-neutral-200',
            horizontal ? 'h-[88px] w-[88px] shrink-0' : compact ? 'h-24 w-full' : 'h-40 w-full'
          )}
        />
        <div className="flex flex-1 flex-col gap-[var(--xen-space-sm)] p-[var(--xen-space-sm)]">
          <div className="h-3.5 w-3/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-200" />
          <div className="h-3 w-2/5 animate-pulse rounded-[var(--xen-radius-sm)] bg-neutral-100" />
        </div>
      </div>
    );
  }

  // The matted photo: the cover sits inside a thin neutral mat with rounded corners.
  const mat = cn(
    'overflow-hidden rounded-[var(--xen-radius-md)] bg-neutral-100 ring-1 ring-inset ring-border',
    horizontal ? 'h-[88px] w-[88px] shrink-0' : compact ? 'h-24 w-full' : 'h-44 w-full'
  );
  const media = (
    <div className={mat}>
      {coverUrl ? (
        <img src={coverUrl} alt={title} loading="lazy" className="h-full w-full object-cover" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-2xl text-muted" aria-hidden="true">
          🖼
        </div>
      )}
    </div>
  );

  const body = (
    <div className={cn('flex flex-1 flex-col gap-[var(--xen-space-xs)]', horizontal ? '' : 'px-1 pb-1 pt-[var(--xen-space-md)]')}>
      <div className="flex items-center justify-between gap-[var(--xen-space-sm)]">
        <p className="flex-1 truncate text-base font-bold text-on-surface">{title}</p>
        {isPrivate ? <Badge tone="warn" variant="soft">Private</Badge> : null}
      </div>
      {typeof photoCount === 'number' || dateText ? (
        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          {typeof photoCount === 'number' ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-semibold text-on-surface">
              <span aria-hidden="true">🖼</span>
              {photoCount} {countLabel}
            </span>
          ) : null}
          {dateText ? <span className="truncate text-sm text-muted">{dateText}</span> : null}
        </div>
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
