import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface EmailThreadRowProps {
    /** Thread subject. */
    subject: string;
    /** Sender / counterpart name. */
    from: string;
    /** Preview snippet of the latest message. */
    snippet?: string;
    /** Avatar image URL; initials fallback from `from`. */
    avatarUrl?: string;
    /** Pre-formatted time (e.g. "9:41 AM"). */
    timestamp?: string;
    /** Unread → bold subject, a leading dot and a tinted surface. */
    unread?: boolean;
    /** Number of messages in the thread (badge when > 1). */
    messageCount?: number;
    /** Show a 📎 attachment marker. */
    hasAttachment?: boolean;
    onPress?: () => void;
    testID?: string;
    style?: StyleProp<ViewStyle>;
}
/**
 * Inbox-style row for an email thread tied to a contact / deal: sender avatar,
 * subject, snippet, timestamp and a message-count badge. Unread threads read as
 * a bold subject plus a leading primary dot **and** an "unread" a11y hint (not
 * color alone) over a token-tinted surface. Guards `messageCount` (badge only
 * when > 1). All colors are theme tokens; the unread wash uses `withAlpha`.
 */
export declare function EmailThreadRow({ subject, from, snippet, avatarUrl, timestamp, unread, messageCount, hasAttachment, onPress, testID, style, }: EmailThreadRowProps): React.ReactElement;
//# sourceMappingURL=EmailThreadRow.d.ts.map