import * as React from 'react';
import { cn } from '../primitives/cn';
import { Avatar, Button, Rating } from '../primitives';
import type { DoctorCardProps, DoctorAvailability } from './DoctorCard';

/** Same public contract as {@link DoctorCard} — a drop-in alternate design. */
export type DoctorCardV3Props = DoctorCardProps;

const AVAIL_DOT: Record<DoctorAvailability, string> = { available: 'bg-success', busy: 'bg-warn', off: 'bg-neutral-400' };
const AVAIL_LABEL: Record<DoctorAvailability, string> = { available: 'Available', busy: 'Busy', off: 'Off' };

/**
 * DoctorCard, redesigned (v3): a **compact directory row**. A small avatar, the
 * name over a specialty·credentials line, a small rating, an availability dot +
 * word (never color alone), and a quiet Book button on the trailing edge —
 * hairline-bordered for provider lists. The opposite of v2's banner. Same props,
 * token-only.
 */
export const DoctorCardV3 = React.forwardRef<HTMLDivElement, DoctorCardV3Props>(function DoctorCardV3(
  { name, specialty, avatar, rating, reviewCount, credentials, availability, onBook, bookLabel, className, ...rest },
  ref
) {
  void reviewCount;
  const sub = [specialty, credentials].filter((s): s is string => !!s);

  return (
    <div
      ref={ref}
      data-xen-doctor-card=""
      className={cn('flex items-center gap-3 border-b border-border py-2.5', className)}
      {...rest}
    >
      <Avatar src={avatar} name={name} size="sm" />
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-on-surface">{name}</p>
        <div className="flex items-center gap-1.5">
          {typeof rating === 'number' ? <Rating value={rating} size="sm" showValue /> : null}
          {sub.length > 0 ? <span className="truncate text-xs text-muted">{sub.join(' · ')}</span> : null}
        </div>
      </div>
      {availability ? (
        <span className="flex items-center gap-1 text-xs text-muted">
          <span className={cn('inline-block h-2 w-2 rounded-full', AVAIL_DOT[availability])} aria-hidden />
          {AVAIL_LABEL[availability]}
        </span>
      ) : null}
      {onBook ? (
        <Button size="sm" variant="outline" disabled={availability === 'off'} onClick={onBook}>
          {bookLabel ?? 'Book'}
        </Button>
      ) : null}
    </div>
  );
});
