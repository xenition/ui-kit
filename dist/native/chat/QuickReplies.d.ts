import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface QuickReply {
    /** Stable identifier passed back to `onSelect`. */
    id: string;
    /** Chip label. */
    label: string;
}
export interface QuickRepliesProps {
    /** Suggested replies to render as tappable chips. */
    replies: QuickReply[];
    /** Called with the reply id when a chip is tapped. */
    onSelect?: (id: string) => void;
    style?: StyleProp<ViewStyle>;
}
/**
 * Horizontal strip of suggested-reply chips (smart replies / canned responses).
 * Scrolls horizontally when the suggestions overflow. Each chip is a button.
 * Renders nothing when `replies` is empty. No literal colors.
 */
export declare function QuickReplies({ replies, onSelect, style, }: QuickRepliesProps): React.ReactElement | null;
//# sourceMappingURL=QuickReplies.d.ts.map