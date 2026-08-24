import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Badge, Button, Rating } from '../primitives';
import type { BadgeTone } from '../primitives';
import type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV2Props = DoctorCardProps;

const AVAIL: Record<DoctorAvailability, { glyph: string; label: string; tone: BadgeTone }> = {
  available: { glyph: '🟢', label: 'Available', tone: 'success' },
  busy: { glyph: '🟠', label: 'Busy', tone: 'warn' },
  off: { glyph: '⚪', label: 'Off', tone: 'neutral' },
};

/**
 * DoctorCard, redesigned (v2): a **banner profile card**. A primary-tinted cover
 * carries a large avatar straddling its edge; the name, specialty, rating,
 * credentials, and an availability badge center beneath, with a full-width Book
 * CTA. Elevated. Distinct from v1's compact row. Same props, token-only.
 */
export const DoctorCardV2 = React.forwardRef<HTMLDivElement, DoctorCardV2Props>(function DoctorCardV2(
  { name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel, className, ...rest },
  ref
) {
  const av = availability ? AVAIL[availability] : undefined;

  return (
    <div
      ref={ref}
      data-xen-doctor-card=""
      className={cn('overflow-hidden rounded-lg bg-surface text-center shadow-md', className)}
      {...rest}
    >
      <div className="h-14 bg-primary/20" />
      <div className="flex flex-col items-center gap-1 px-md pb-md">
        <div className="-mt-10 rounded-full border-4 border-surface">
          <Avatar src={avatar} name={name} size="xl" />
        </div>
        <p className="text-lg font-bold text-on-surface">{name}</p>
        <p className="text-sm text-primary">{specialty}</p>
        {typeof rating === 'number' ? (
          <div className="flex items-center gap-1.5">
            <Rating value={rating} size="sm" showValue />
            {typeof reviewCount === 'number' ? <span className="text-xs text-muted">({reviewCount})</span> : null}
          </div>
        ) : null}
        {credentials ? <p className="text-xs text-muted">{credentials}</p> : null}
        {av ? <Badge tone={av.tone}>{`${av.glyph} ${av.label}`}</Badge> : null}
        {onBook ? (
          <Button size="md" variant="primary" className="mt-1 w-full" disabled={availability === 'off'} onClick={onBook}>
            {bookLabel ?? 'Book'}
          </Button>
        ) : null}
      </div>
    </div>
  );
});
