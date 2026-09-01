import * as React from 'react';
import { cn } from '../primitives/cn';
import { Badge, Icon, type BadgeTone } from '../primitives';
import { formatMoney } from '../commerce';
import type { PropertyStatus } from './PropertyCard';

const STATUS_TONE: Record<PropertyStatus, BadgeTone> = {
  active: 'success',
  pending: 'warn',
  sold: 'danger',
  new: 'primary',
};
const STATUS_LABEL: Record<PropertyStatus, string> = {
  active: 'Active',
  pending: 'Pending',
  sold: 'Sold',
  new: 'New',
};

export interface ListingHeroProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Hero photo URL. Omit to fall back to the brand-gradient ground. */
  imageUrl?: string;
  /** Price in integer minor units (cents). For `rent`, this is the monthly rent. */
  priceCents: number;
  /** ISO 4217 currency code (default `USD`). */
  currency?: string;
  /** Sale vs. rent — `rent` appends a "/mo" suffix to the price. Default `sale`. */
  variant?: 'sale' | 'rent';
  /** Street address / headline line, overlaid on the scrim. */
  address: string;
  /** Secondary locality line (e.g. "Brooklyn, NY 11201"). */
  locality?: string;
  /** Optional status chip overlaid on the photo. */
  status?: PropertyStatus;
  /** Bedroom count, shown in the facts strip. */
  beds?: number;
  /** Bathroom count, shown in the facts strip. */
  baths?: number;
  /** Interior area in square feet, shown in the facts strip. */
  sqft?: number;
  /** Total photo count, shown as a frosted counter over the media. */
  photoCount?: number;
  /** Whether the listing is currently saved (fills the heart). */
  saved?: boolean;
  /** Fires when the saved/heart control is toggled. Hidden when unset. */
  onSave?: () => void;
  /** Fires when the share control is pressed. Hidden when unset. */
  onShare?: () => void;
  /** Fires on the primary tour CTA. The CTA is hidden when unset. */
  onTour?: () => void;
  /** Primary CTA label (default "Schedule tour"). */
  tourLabel?: string;
}

/**
 * ListingHero — the property-detail **peak** for the real-estate V4 "listing"
 * line (web parity of the native twin). A full-bleed hero photo with a bottom
 * `listingScrim` gradient carries the near-white price + address; a status chip,
 * a frosted photo counter, and saved/share controls float over the media; the
 * beds/baths/sqft facts read as frosted tiles and a near-white Tour pill anchors
 * the bottom. With no `imageUrl` it falls back to the brand gradient ground
 * (`from-primary-500 to-primary-700`). Presentational — shaped data + callbacks,
 * nothing fetches. Token-only colors (`--xen-*` classes + gradient utilities),
 * dark-mode safe. The `sale`/`rent` variant only changes the price suffix.
 */
export const ListingHero = React.forwardRef<HTMLDivElement, ListingHeroProps>(function ListingHero(
  {
    imageUrl,
    priceCents,
    currency = 'USD',
    variant = 'sale',
    address,
    locality,
    status,
    beds,
    baths,
    sqft,
    photoCount,
    saved = false,
    onSave,
    onShare,
    onTour,
    tourLabel = 'Schedule tour',
    className,
    ...rest
  },
  ref
) {
  const facts: { glyph: string; value: string }[] = [];
  if (typeof beds === 'number') facts.push({ glyph: '🛏', value: `${beds} bd` });
  if (typeof baths === 'number') facts.push({ glyph: '🛁', value: `${baths} ba` });
  if (typeof sqft === 'number') facts.push({ glyph: '📐', value: `${sqft.toLocaleString()} sqft` });

  const priceText = `${formatMoney(priceCents, currency)}${variant === 'rent' ? '/mo' : ''}`;

  return (
    <div
      ref={ref}
      className={cn(
        'relative isolate flex min-h-[380px] flex-col overflow-hidden rounded-[var(--xen-radius-lg)] bg-gradient-to-br from-primary-500 to-primary-700 text-primary-50',
        className
      )}
      {...rest}
    >
      {/* Hero photo (falls back to the brand gradient ground when absent). */}
      {imageUrl ? (
        <img src={imageUrl} alt={address} className="absolute inset-0 -z-10 h-full w-full object-cover" />
      ) : null}
      {/* Bottom scrim for legible near-white overlay text. */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-gradient-to-t from-neutral-900/70 to-transparent" />

      {/* Top overlays: status + controls. */}
      <div className="flex items-start justify-between gap-[var(--xen-space-md)] p-[var(--xen-space-md)]">
        <div className="flex flex-wrap items-center gap-[var(--xen-space-sm)]">
          {status ? (
            <Badge tone={STATUS_TONE[status]} variant="soft">
              {STATUS_LABEL[status]}
            </Badge>
          ) : null}
          {typeof photoCount === 'number' ? (
            <span className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-full border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-sm)] py-1 text-xs font-semibold text-primary-50">
              <span aria-hidden="true">📷</span>
              {photoCount.toLocaleString()}
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-[var(--xen-space-sm)]">
          {onSave ? (
            <button
              type="button"
              aria-label={saved ? 'Remove from saved' : 'Save listing'}
              aria-pressed={saved}
              onClick={onSave}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
            >
              <Icon glyph={saved ? '❤️' : '🤍'} size="lg" color="onPrimary" aria-hidden="true" />
            </button>
          ) : null}
          {onShare ? (
            <button
              type="button"
              aria-label="Share listing"
              onClick={onShare}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary-50/30 bg-primary-50/15 text-primary-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
            >
              <Icon glyph="↗" size="lg" color="onPrimary" aria-hidden="true" />
            </button>
          ) : null}
        </div>
      </div>

      {/* Bottom content: price, address, facts, CTA. */}
      <div className="mt-auto flex flex-col gap-[var(--xen-space-md)] p-[var(--xen-space-lg)]">
        <div className="flex flex-col gap-[var(--xen-space-xs)]">
          <p aria-label={`Price ${priceText}`} className="text-3xl font-extrabold tracking-tight text-primary-50">
            {priceText}
          </p>
          <p className="truncate text-lg font-bold text-primary-50">{address}</p>
          {locality ? <p className="truncate text-sm text-primary-100">{locality}</p> : null}
        </div>

        {facts.length > 0 ? (
          <div className="flex flex-wrap gap-[var(--xen-space-sm)]">
            {facts.map((f) => (
              <span
                key={f.value}
                className="inline-flex items-center gap-[var(--xen-space-xs)] rounded-[var(--xen-radius-md)] border border-primary-50/30 bg-primary-50/15 px-[var(--xen-space-md)] py-[var(--xen-space-sm)] text-sm font-semibold text-primary-50"
              >
                <span aria-hidden="true">{f.glyph}</span>
                {f.value}
              </span>
            ))}
          </div>
        ) : null}

        {onTour ? (
          <button
            type="button"
            aria-label={tourLabel}
            onClick={onTour}
            className="flex min-h-[44px] w-full items-center justify-center rounded-[var(--xen-radius-md)] bg-on-primary py-[var(--xen-space-md)] text-base font-extrabold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-100"
          >
            {tourLabel}
          </button>
        ) : null}
      </div>
    </div>
  );
});
