import * as React from 'react';
import { ScrollView, type ScrollViewProps, type StyleProp, type ViewStyle } from 'react-native';
import { useXenitionTheme } from '../theme';

export interface MessageListProps extends ScrollViewProps {
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

/**
 * Scrollable vertical stack for `ChatBubble` children — the native mirror of the
 * web `MessageList`, the chat/thread viewport. No literal colors.
 */
export function MessageList({
  style,
  contentContainerStyle,
  children,
  ...rest
}: MessageListProps): React.ReactElement {
  const { tokens } = useXenitionTheme();
  return (
    <ScrollView
      style={[{ flex: 1 }, style]}
      contentContainerStyle={[{ gap: tokens.spacing.md, padding: tokens.spacing.lg }, contentContainerStyle]}
      {...rest}
    >
      {children}
    </ScrollView>
  );
}
