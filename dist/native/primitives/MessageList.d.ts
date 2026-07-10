import * as React from 'react';
import { type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
export interface MessageListProps extends ScrollViewProps {
    style?: StyleProp<ViewStyle>;
    children?: React.ReactNode;
}
/**
 * Scrollable vertical stack for `ChatBubble` children — the native mirror of the
 * web `MessageList`, the chat/thread viewport. No literal colors.
 */
export declare function MessageList({ style, contentContainerStyle, children, ...rest }: MessageListProps): React.ReactElement;
//# sourceMappingURL=MessageList.d.ts.map