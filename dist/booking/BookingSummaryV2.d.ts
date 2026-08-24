import * as React from 'react';
import type { BookingSummaryProps } from './BookingSummary';
/** Same public contract as {@link BookingSummary} — a drop-in alternate design. */
export type BookingSummaryV2Props = BookingSummaryProps;
/**
 * BookingSummary, redesigned (v2): an **elevated confirmation card**. The title
 * heads a stack of labelled rows — resource, date, and time range — over the
 * trailing action. A prominent review panel. Distinct from v1. Same props,
 * token-only.
 */
export declare const BookingSummaryV2: React.ForwardRefExoticComponent<BookingSummaryProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=BookingSummaryV2.d.ts.map