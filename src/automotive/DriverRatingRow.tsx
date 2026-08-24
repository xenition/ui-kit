import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Rating } from '../primitives';

/** Presentation for a {@link DriverRatingRow}. */
export type DriverRatingVariant = 'interactive' | 'readonly';

export interface DriverRatingRowProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onChange'> {
  /** Driver display name. */
  driverName: string;
  /** Optional driver avatar URL. */
  avatarUrl?: string;
  /** Vehicle / trip subtitle, e.g. `'Toyota Prius · Sep 3'`. */
  subtitle?: string;
  /** Current rating value (0–max). Controls the filled glyph count. */
  value?: number;
  /** Number of stars (default 5). */
  max?: number;
  /**
   * Fires with the chosen star (1–max) when tapped. When omitted the row is
   * read-only regardless of `variant`.
   */
  onRate?: (stars: number) => void;
  /** Presentation variant. `readonly` disables tapping. */
  variant?: DriverRatingVariant;
  /** Placeholder skeleton while data loads. */
  loading?: boolean;
}

/**
 * A rate-your-driver row — the driver identity plus a star control that fires
 * `onRate(stars)` when tapped. Interactive stars are real `<button>`s with per-
 * star a11y labels and an `aria-checked` state; when there is no `onRate` (or
 * `variant="readonly"`) it falls back to the read-only `Rating` primitive.
 * Colors come from `--xen-*` token classes — no literal colors. The star count
 * is clamped and indexing is guarded. Web parity of the native
 * `DriverRatingRow`.
 */
export const DriverRatingRow = React.forwardRef<HTMLDivElement, DriverRatingRowProps>(
  function DriverRatingRow(
    {
      driverName,
      avatarUrl,
      subtitle,
      value = 0,
      max = 5,
      onRate,
      variant = 'interactive',
      loading = false,
      className,
      ...rest
    },
    ref
  ) {
    const total = Math.max(1, Math.floor(Number.isFinite(max) ? max : 5));
    const filled = Math.max(0, Math.min(total, Math.round(Number.isFinite(value) ? value : 0)));
    const interactive = variant === 'interactive' && Boolean(onRate);

    if (loading) {
      return (
        <div
          ref={ref}
          data-xen-driver-rating=""
          aria-busy="true"
          aria-label="Loading driver rating"
          className={cn(
            'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
            className
          )}
          {...rest}
        >
          <div className="h-10 w-10 shrink-0 animate-pulse rounded-full bg-neutral-200" />
          <div className="flex flex-1 flex-col gap-[var(--xen-space-xs)]">
            <div className="h-3.5 w-1/2 animate-pulse rounded bg-neutral-200" />
            <div className="h-3 w-[70%] animate-pulse rounded bg-neutral-100" />
          </div>
        </div>
      );
    }

    return (
      <div
        ref={ref}
        data-xen-driver-rating=""
        aria-label={!interactive ? `${driverName} rated ${filled} of ${total} stars` : undefined}
        className={cn(
          'flex items-center gap-[var(--xen-space-sm)] rounded-[var(--xen-radius-lg)] border border-border bg-surface p-[var(--xen-space-md)]',
          className
        )}
        {...rest}
      >
        <Avatar src={avatarUrl} name={driverName} size="md" />
        <div className="min-w-0 flex-1">
          <span className="block truncate text-base font-bold text-on-surface">{driverName}</span>
          {subtitle ? <span className="block truncate text-xs text-muted">{subtitle}</span> : null}
          {interactive ? (
            <div
              role="radiogroup"
              aria-label={`Rate ${driverName}`}
              className="mt-[var(--xen-space-xs)] flex gap-[var(--xen-space-xs)]"
            >
              {Array.from({ length: total }, (_, i) => {
                const star = i + 1;
                const on = star <= filled;
                return (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                    aria-checked={on}
                    onClick={() => onRate?.(star)}
                    className={cn(
                      'text-xl leading-none transition-opacity hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
                      on ? 'text-accent' : 'text-muted'
                    )}
                  >
                    {on ? '★' : '☆'}
                  </button>
                );
              })}
            </div>
          ) : (
            <div className="mt-[var(--xen-space-xs)]">
              <Rating value={filled} max={total} size="md" showValue />
            </div>
          )}
        </div>
      </div>
    );
  }
);
