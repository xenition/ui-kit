import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface NotificationItemProps {
    title: string;
    /** Optional supporting body line. */
    body?: string;
    /** Timestamp label, e.g. "5m ago". */
    time?: string;
    /** Shows an unread dot and a subtly tinted surface. */
    unread?: boolean;
    onPress?: () => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * A single notification row: title, optional body, timestamp, and an unread
 * indicator. Pressable when `onPress` is supplied. Token-only.
 */
export declare function NotificationItem({ title, body, time, unread, onPress, style, }: NotificationItemProps): React.ReactElement;
//# sourceMappingURL=NotificationItem.d.ts.map