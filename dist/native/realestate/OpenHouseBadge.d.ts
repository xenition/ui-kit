import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
/** Timing state of an open house. */
export type OpenHouseStatus = 'upcoming' | 'live' | 'ended';
export interface OpenHouseBadgeProps {
    /** Human date label (e.g. "Sat, Aug 24"). */
    dateLabel: string;
    /** Start time (e.g. "1:00 PM"). */
    startTime?: string;
    /** End time (e.g. "3:00 PM"). */
    endTime?: string;
    /** Timing state — drives tone and prefix (default `upcoming`). */
    status?: OpenHouseStatus;
    style?: StyleProp<ViewStyle>;
}
/**
 * A compact open-house indicator — a token-toned {@link Badge} whose color and
 * prefix track the `status` (upcoming / live / ended) followed by the date and
 * time window. Pure presentation: strings in, no callbacks, nothing fetches.
 * The full window is rendered as a single string so it is announced as one
 * phrase. Token-only colors (delegated to `Badge`).
 */
export declare function OpenHouseBadge({ dateLabel, startTime, endTime, status, style, }: OpenHouseBadgeProps): React.ReactElement;
//# sourceMappingURL=OpenHouseBadge.d.ts.map