import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { type ReceiptStatus } from './ReadReceipt';
export interface GroupMessage {
    /** Stable identifier. */
    id: string;
    /** Message body text. */
    text: string;
    /** Optional timestamp label shown on the last bubble (e.g. "09:41"). */
    time?: string;
}
export interface MessageGroupProps {
    /** `me` aligns right on the primary fill; `them` aligns left on a surface fill. */
    side?: 'me' | 'them';
    /** Consecutive messages from one author, oldest first. */
    messages: GroupMessage[];
    /** Author display name (shown for `them` group headers). */
    authorName?: string;
    /** Avatar image URI for the author (shown on the `them` side). */
    avatarUri?: string;
    /** Show the author avatar (default true for `them`, false for `me`). */
    showAvatar?: boolean;
    /** Delivery state for an outgoing group — a receipt on the last bubble. */
    receipt?: ReceiptStatus;
    style?: StyleProp<ViewStyle>;
}
/**
 * A run of consecutive messages from a single author, rendered as stacked
 * primitive `ChatBubble`s with a shared avatar + name header. Outgoing groups
 * can show a `ReadReceipt` on the last bubble. Incoming (`them`) groups are a
 * polite live region so new messages are announced. No literal colors.
 */
export declare function MessageGroup({ side, messages, authorName, avatarUri, showAvatar, receipt, style, }: MessageGroupProps): React.ReactElement;
//# sourceMappingURL=MessageGroup.d.ts.map