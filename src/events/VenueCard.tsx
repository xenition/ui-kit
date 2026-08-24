import * as React from 'react';
import { cn } from '../primitives/cn';
import { Icon } from '../primitives/Icon';
import { Rating } from '../primitives/Rating';

/** Emphasis of a {@link VenueCard}. */
export type VenueCardVariant = 'default' | 'compact';

export interface VenueCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Venue name. */
  name: string;
  /** Street / address line. */
  address?: string;
  /** Distance label, e.g. `1.2 mi`. */
  distance?: string;
  /** Seating / attendee capacity. */
  capacity?: number;
  /** Optional 0–5 rating. */
  rating?: number;
  /** Photo URL. When absent a token map placeholder is drawn. */
  imageUrl?: string;
  /** Alt text for the photo (defaults to the name). */
  imageAlt?: string;
  /** Density. `compact` drops the media band. */
  variant?: VenueCardVariant;
  /** Directions handler; renders a small directions affordance when provided. */
  onDirections?: () => void;
}

/**
 * Venue summary — a photo (or token placeholder), name, address, and optional
 * capacity / rating / distance meta. `compact` removes the media for dense
 * lists. Passing `onClick` makes the whole card an accessible button; a separate
 * `onDirections` renders a nested directions button (its clicks don't trigger
 * the card). Colors come from the `--xen-*` tokens; no literal colors.
 */
export const VenueCard = React.forwardRef<HTMLDivElement, VenueCardProps>(function VenueCard(
  { name, address, distance, capacity, rating, imageUrl, imageAlt, variant = 'default', onDirections, onClick, onKeyDown, className, ...rest },
  ref
) {
  const isCompact = variant === 'compact';
  const clickable = typeof onClick === 'function';

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    onKeyDown?.(e);
    if (clickable && (e.key === 'Enter' || e.key === ' ') && !e.defaultPrevented) {
      e.preventDefault();
      (e.currentTarget as HTMLDivElement).click();
    }
  };

  return (
    <div
      ref={ref}
      className={cn(
        'overflow-hidden rounded-lg border border-border bg-surface text-on-surface',
        isCompact ? 'flex flex-row' : 'flex flex-col',
        clickable && 'cursor-pointer transition-opacity hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300',
        className
      )}
      onClick={onClick}
      onKeyDown={clickable ? handleKeyDown : onKeyDown}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      aria-label={clickable ? name : undefined}
      {...rest}
    >
      {!isCompact ? (
        <div className="h-28 w-full bg-neutral-100">
          {imageUrl ? (
            <img src={imageUrl} alt={imageAlt ?? name} className="h-full w-full object-cover" />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <Icon glyph="🗺️" size="2xl" aria-label={imageAlt ?? name} />
            </div>
          )}
        </div>
      ) : null}
      <div className="flex flex-1 flex-col gap-xs p-md">
        <p className="truncate text-base font-bold text-on-surface">{name}</p>
        {address ? (
          <p className="flex items-center gap-xs truncate text-sm text-muted">
            <Icon glyph="📍" size="sm" color="muted" />
            <span className="flex-1 truncate">{address}</span>
          </p>
        ) : null}
        <div className="flex flex-row flex-wrap items-center gap-md">
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {typeof capacity === 'number' ? <span className="text-xs text-muted">{`Seats ${capacity}`}</span> : null}
          {distance ? <span className="text-xs text-muted">{distance}</span> : null}
        </div>
        {onDirections ? (
          <button
            type="button"
            aria-label={`Directions to ${name}`}
            onClick={(e) => {
              e.stopPropagation();
              onDirections();
            }}
            className="mt-xs self-start text-sm font-semibold text-primary transition-opacity hover:opacity-70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-300"
          >
            Directions
          </button>
        ) : null}
      </div>
    </div>
  );
});
