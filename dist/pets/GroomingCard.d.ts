import * as React from 'react';
export type GroomingService = 'bath' | 'haircut' | 'nails' | 'teeth' | 'deshedding' | 'full';
export type GroomingStatus = 'scheduled' | 'due' | 'overdue' | 'done';
export interface GroomingCardProps {
    /** Grooming service; drives icon + label. */
    service: GroomingService;
    /** Where it stands; drives the chip + accent. */
    status: GroomingStatus;
    /** Groomer / salon name. */
    groomer?: string;
    /** Last-done date (already formatted). */
    lastDone?: string;
    /** Next-due date (already formatted). */
    nextDue?: string;
    /** Price label, e.g. "$45". */
    price?: string;
    /** Book action label; hidden when done or no `onBook`. */
    bookLabel?: string;
    onBook?: () => void;
    /** Extra classes on the root. */
    className?: string;
}
/**
 * A grooming service card: service icon + name, a status chip, the last-done and
 * next-due dates, optional groomer + price, and a "Book" action for anything not
 * yet done. Status reads via a labelled chip + left accent bar (never color
 * alone). Token-only colors.
 */
export declare const GroomingCard: React.ForwardRefExoticComponent<GroomingCardProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=GroomingCard.d.ts.map