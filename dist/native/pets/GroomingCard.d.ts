import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
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
    style?: StyleProp<ViewStyle>;
}
/**
 * A grooming service card: service icon + name, a status chip, the last-done and
 * next-due dates, optional groomer + price, and a "Book" action for anything not
 * yet done. Status reads via a labelled chip + left accent bar (never color
 * alone). Token-only colors.
 */
export declare function GroomingCard({ service, status, groomer, lastDone, nextDue, price, bookLabel, onBook, style, }: GroomingCardProps): React.ReactElement;
//# sourceMappingURL=GroomingCard.d.ts.map