import * as React from 'react';
import { cn } from '../primitives/cn';
import { Card } from '../primitives/Card';
import { Avatar } from '../primitives/Avatar';
import { Badge, type BadgeTone } from '../primitives/Badge';
import { Button } from '../primitives/Button';
import { Rating } from '../primitives/Rating';

export type DoctorAvailability = 'available' | 'busy' | 'off';

const AVAIL_META: Record<DoctorAvailability, { label: string; tone: BadgeTone; glyph: string }> = {
  available: { label: 'Available today', tone: 'success', glyph: '●' },
  busy: { label: 'Limited slots', tone: 'warn', glyph: '◐' },
  off: { label: 'Not accepting', tone: 'neutral', glyph: '○' },
};

export interface DoctorCardProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onClick'> {
  /** Clinician name. */
  name: string;
  /** Specialty, e.g. "Dermatology". */
  specialty: string;
  /** Optional avatar image URL. */
  avatar?: string;
  /** Average patient rating (0–5). */
  rating?: number;
  /** Number of reviews backing the rating. */
  reviewCount?: number;
  /** Years of experience or a short credential line. */
  credentials?: string;
  /** Booking availability; drives the badge (glyph + label + tone). */
  availability?: DoctorAvailability;
  /** Fires when the book CTA is pressed — web mirror of native `onBook`. */
  onBook?: () => void;
  /** Overrides the book CTA label. */
  bookLabel?: string;
}

/**
 * A clinician profile card for a provider directory — the web mirror of the
 * native `DoctorCard`. Shows the avatar, name, specialty, a star rating with
 * review count, an optional credential line, an availability badge (glyph +
 * label + tone), and a "Book" CTA. Composes `Card`, `Avatar`, `Rating`,
 * `Badge`, and `Button`; token-only colors. Informational UI only — not a
 * medical device.
 */
export const DoctorCard = React.forwardRef<HTMLDivElement, DoctorCardProps>(
  function DoctorCard(
    { name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel = 'Book', className, ...rest },
    ref
  ) {
    const meta = availability ? AVAIL_META[availability] : undefined;
    const a11y = `${name}, ${specialty}${rating != null ? `, rated ${rating} out of 5` : ''}${
      meta ? `, ${meta.label}` : ''
    }`;

    return (
      <Card
        ref={ref}
        data-xen-doctor-card=""
        aria-label={a11y}
        className={cn('flex flex-col gap-[var(--xen-space-md)]', className)}
        {...rest}
      >
        <div className="flex items-center gap-[var(--xen-space-md)]">
          <Avatar src={avatar} name={name} size="lg" />
          <div className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="truncate text-base font-bold text-on-surface">{name}</span>
            <span className="truncate text-sm text-muted">{specialty}</span>
            {credentials ? <span className="truncate text-xs text-muted">{credentials}</span> : null}
          </div>
          {meta ? (
            <Badge tone={meta.tone}>
              <span aria-hidden="true">{meta.glyph}</span> {meta.label}
            </Badge>
          ) : null}
        </div>

        {rating != null ? (
          <div className="flex items-center gap-[var(--xen-space-sm)]">
            <Rating value={rating} />
            {reviewCount != null ? (
              <span className="text-xs text-muted">
                {rating.toFixed(1)} ({reviewCount})
              </span>
            ) : null}
          </div>
        ) : null}

        {onBook ? (
          <Button variant="primary" onClick={() => onBook()}>
            {bookLabel}
          </Button>
        ) : null}
      </Card>
    );
  }
);
