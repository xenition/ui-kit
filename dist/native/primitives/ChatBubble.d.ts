import * as React from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
export interface ChatBubbleProps {
    /** 'me' aligns right with the primary fill; 'them' aligns left with a surface fill. */
    side?: 'me' | 'them';
    /** Optional author / timestamp shown above the bubble. */
    meta?: React.ReactNode;
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * A single themed chat message bubble — the native mirror of the web
 * `ChatBubble`. For chat, support threads, comments. No literal colors.
 */
export declare function ChatBubble({ side, meta, style, children, }: ChatBubbleProps): React.ReactElement;
//# sourceMappingURL=ChatBubble.d.ts.map