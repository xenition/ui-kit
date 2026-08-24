import * as React from 'react';
/** Timing state of an open house. */
export type OpenHouseStatus = 'upcoming' | 'live' | 'ended';
export interface OpenHouseBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, 'children'> {
    /** Human date label (e.g. "Sat, Aug 24"). */
    dateLabel: string;
    /** Start time (e.g. "1:00 PM"). */
    startTime?: string;
    /** End time (e.g. "3:00 PM"). */
    endTime?: string;
    /** Timing state — drives tone and prefix (default `upcoming`). */
    status?: OpenHouseStatus;
}
/**
 * Web parity of the native `OpenHouseBadge`: a compact open-house indicator — a
 * token-toned {@link Badge} whose color and prefix track the `status` (upcoming /
 * live / ended) followed by the date and time window. Pure presentation: strings
 * in, no callbacks, nothing fetches. The full window is rendered as one string so
 * it is announced as a single phrase. All colors come from the `--xen-*` tokens
 * (delegated to `Badge`) — no literal colors.
 */
export declare const OpenHouseBadge: React.ForwardRefExoticComponent<OpenHouseBadgeProps & React.RefAttributes<HTMLSpanElement>>;
//# sourceMappingURL=OpenHouseBadge.d.ts.map