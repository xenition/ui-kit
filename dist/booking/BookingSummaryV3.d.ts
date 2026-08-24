import * as React from 'react';
import type { BookingSummaryProps } from './BookingSummary';
/** Same public contract as {@link BookingSummary} — a drop-in alternate design. */
export type BookingSummaryV3Props = BookingSummaryProps;
/**
 * BookingSummary, redesigned (v3): a **compact confirmation line**. The resource ·
 * date · time fold onto a dense two-line block with the action pinned right — a
 * tight review row for a checkout footer. The opposite of v2's panel. Same props,
 * token-only.
 */
export declare const BookingSummaryV3: React.ForwardRefExoticComponent<BookingSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingSummaryV3.d.ts.map