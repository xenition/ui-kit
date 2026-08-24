import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface UnreadDividerProps {
    /** Divider label (default "Unread messages"). */
    label?: string;
    /** Optional count of unread messages, appended to the label when > 0. */
    count?: number;
    style?: StyleProp<ViewStyle>;
}
/**
 * Full-width rule marking the first unread message in a thread — the "New
 * messages" line. Uses the primary token so it reads as an active marker.
 * Announced as a header. No literal colors.
 */
export declare function UnreadDivider({ label, count, style, }: UnreadDividerProps): React.ReactElement;
//# sourceMappingURL=UnreadDivider.d.ts.map